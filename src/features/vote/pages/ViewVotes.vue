<template>
  <div class="ml-8 mt-[48px] w-[calc(100%-240px-2rem)] pr-8">
    <h1 class="text-3xl font-bold text-text-main mb-6">Elecciones Disponibles 🗳️</h1>
    <p class="text-lg text-text-secondary mb-8">
      Descubre las votaciones activas y haz tu elección. ¡Tu voz es importante!
    </p>
    <button
      v-if="elections.length > 0"
      @click="openAddEventModal"
      class="inline-block bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-200 mb-8"
    >
      Agregar Evento
    </button>

    <div v-if="elections.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="election in elections"
        :key="election.id"
        class="bg-card-bg p-6 rounded-lg shadow-xl backdrop-blur-sm border border-border flex flex-col justify-between"
      >
        <div>
          <h2 class="text-xl font-semibold text-text-main mb-2">{{ election.title }}</h2>
          <p class="text-text-secondary mb-4 line-clamp-3">{{ election.description }}</p>
          <p class="text-sm text-text-secondary">
            Inicio: {{ new Date(election.startTime).toLocaleString() }}
          </p>
          <p class="text-sm text-text-secondary mb-2">
            Fin: {{ new Date(election.endTime).toLocaleString() }}
          </p>
        </div>
        <div class="mt-4">
          <p class="text-sm text-text-secondary mb-2">Estado: {{ election.status }}</p>
          <RouterLink
            :to="`vote/${election.id}`"
            class="block w-full text-center bg-accent-start hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Ver Detalles y Votar
          </RouterLink>
        </div>
      </div>
    </div>
    <div v-else class="bg-card-bg p-8 rounded-lg text-center text-text-secondary">
      <p class="text-xl mb-4">¡Parece que no hay elecciones activas en este momento!</p>
      <p class="mb-6">Haz clic abajo para crear una nueva.</p>
      <button
        @click="openAddEventModal"
        class="inline-block bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-200"
      >
        Agregar Evento
      </button>
    </div>

    <!-- Modal para agregar evento -->
    <div
      v-if="showAddEventModal"
      class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade-in"
    >
      <div
        class="bg-card-bg p-8 rounded-lg shadow-2xl border border-border max-w-md w-full text-center animate-zoom-in"
      >
        <h2 class="text-2xl font-bold text-text-main mb-4">Agregar Evento por Código</h2>
        <p class="text-text-secondary mb-6">
          Introduce el código del evento para agregarlo a tu lista.
        </p>
        <input
          type="text"
          v-model="eventCode"
          placeholder="Código del evento"
          class="w-full p-3 rounded-md bg-bg-main-alt text-text-main border border-border focus:outline-none focus:ring-2 focus:ring-accent-start mb-6"
        />
        <div class="flex justify-center gap-4">
          <button
            @click="handleConfirmAddEvent"
            class="bg-accent-start hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 flex-grow"
          >
            Confirmar
          </button>
          <button
            @click="closeAddEventModal"
            class="bg-gray-700 hover:bg-gray-600 text-text-main font-bold py-2 px-4 rounded-lg transition-colors duration-200 flex-grow"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>

    <!-- Modal de Confirmación/Error -->
    <div
      v-if="showConfirmationModal"
      class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade-in"
    >
      <div
        class="bg-card-bg p-10 rounded-xl shadow-2xl border border-border max-w-md w-full text-center animate-zoom-in"
      >
        <svg
          v-if="confirmationType === 'success'"
          xmlns="http://www.w3.org/2000/svg"
          class="h-20 w-20 text-green-500 mx-auto mb-6 animate-bounce-in"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <svg
          v-else-if="confirmationType === 'error'"
          xmlns="http://www.w3.org/2000/svg"
          class="h-20 w-20 text-red-500 mx-auto mb-6 animate-shake"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h2 class="text-3xl font-bold text-text-main mb-4">{{ confirmationTitle }}</h2>
        <p class="text-lg text-text-secondary mb-8">{{ confirmationMessage }}</p>
        <button
          @click="closeConfirmationModal"
          class="bg-accent-start hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md transform hover:scale-105"
        >
          {{ confirmationType === 'success' ? '¡Genial!' : 'Entendido' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import { getVotingEvents } from '@/features/create/services/eventController';
import { createParticipantForVotingEvent } from '@/features/vote/services/participantController';
import type { VotingEvent } from '@/shared/interfaces/votingEvent.interface';

const elections = ref<VotingEvent[]>([]);
const showAddEventModal = ref(false);
const eventCode = ref('');
const showConfirmationModal = ref(false);
const confirmationTitle = ref('');
const confirmationMessage = ref('');
const confirmationType = ref<'success' | 'error'>('success');

onMounted(async () => {
  try {
    elections.value = await getVotingEvents();
  } catch (error) {
    console.error('Error fetching voting events:', error);
  }
});

const openAddEventModal = () => {
  showAddEventModal.value = true;
  eventCode.value = ''; // Clear previous input
};

const closeAddEventModal = () => {
  showAddEventModal.value = false;
};

const handleConfirmAddEvent = async () => {
  try {
    await createParticipantForVotingEvent(eventCode.value.trim());
    confirmationType.value = 'success';
    confirmationTitle.value = 'Evento Agregado!';
    confirmationMessage.value = `Te has unido al evento con código "${eventCode.value}" con éxito.`;
  } catch (error: any) {
    confirmationType.value = 'error';
    confirmationTitle.value = 'Error al Agregar Evento';
    confirmationMessage.value =
      error.response?.data?.message ||
      `No se pudo agregar el evento con código "${eventCode.value}". Por favor, verifica el código.`;
  } finally {
    showAddEventModal.value = false;
    showConfirmationModal.value = true;
  }
};

const closeConfirmationModal = () => {
  showConfirmationModal.value = false;
};
</script>

<style scoped>
/* Any specific styles not handled by Tailwind can go here */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Animations for modals */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes zoomIn {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes bounceIn {
  0%,
  20%,
  40%,
  60%,
  80%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  10%,
  30%,
  50%,
  70%,
  90% {
    transform: translateX(-5px);
  }
  20%,
  40%,
  60%,
  80% {
    transform: translateX(5px);
  }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}

.animate-zoom-in {
  animation: zoomIn 0.3s ease-out forwards;
}

.animate-bounce-in {
  animation: bounceIn 0.5s ease-out forwards;
}

.animate-shake {
  animation: shake 0.5s ease-out forwards;
}
</style>
