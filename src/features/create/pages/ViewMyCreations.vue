<template>
  <div class="ml-8 top-[48px] fixed z-10 w-[calc(100%-240px-2rem)] pr-8">
    <h1 class="text-3xl font-bold text-text-main mb-6">Mis Votaciones Creadas 📝</h1>
    <p class="text-lg text-text-secondary mb-8">
      Aquí puedes gestionar las votaciones que has creado.
    </p>

    <div v-if="myCreations.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="election in myCreations"
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
        <div class="mt-4 flex flex-col gap-2">
          <button
            @click="copyEventId(election.id)"
            class="block w-full text-center bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Copiar ID
          </button>
          <RouterLink
            :to="`/dashboard/create/${election.id}`"
            class="block w-full text-center bg-accent-start hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Ver Detalles
          </RouterLink>
        </div>
      </div>
    </div>
    <div v-else class="bg-card-bg p-8 rounded-lg text-center text-text-secondary">
      <p class="text-xl mb-4">¡Aún no has creado ninguna votación!</p>
      <p class="mb-6">¿Por qué no creas una ahora?</p>
      <RouterLink
        to="/dashboard/create"
        class="inline-block bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-200"
      >
        Crear Nueva Elección
      </RouterLink>
    </div>

    <!-- Notification -->
    <div
      v-if="showNotification"
      class="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg transition-opacity duration-300"
      :class="{ 'opacity-100': showNotification, 'opacity-0': !showNotification }"
    >
      {{ notificationMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import { getVotingEvents } from '@/features/create/services/eventController';
import type { VotingEvent } from '@/shared/interfaces/votingEvent.interface';

const myCreations = ref<VotingEvent[]>([]);
const showNotification = ref(false);
const notificationMessage = ref('');

const copyEventId = async (id: string) => {
  try {
    await navigator.clipboard.writeText(id);
    notificationMessage.value = 'ID copiado al portapapeles!';
    showNotification.value = true;
    setTimeout(() => {
      showNotification.value = false;
    }, 2000);
  } catch (err) {
    console.error('Error al copiar el ID:', err);
    notificationMessage.value = 'Error al copiar el ID.';
    showNotification.value = true;
    setTimeout(() => {
      showNotification.value = false;
    }, 2000);
  }
};

onMounted(async () => {
  try {
    myCreations.value = await getVotingEvents();
  } catch (error) {
    console.error("Error fetching user's voting events:", error);
  }
});
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
