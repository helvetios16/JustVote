<template>
  <div class="ml-8 top-[48px] fixed z-10 w-[calc(100%-240px-2rem)] overflow-y-auto pb-12 pr-8">
    <div v-if="voting" class="animate-fade-in-down">
      <h1 class="text-4xl font-extrabold text-text-main mb-3 leading-tight">{{ voting.title }}</h1>
      <p class="text-xl text-text-secondary mb-10">{{ voting.description }}</p>

      <div
        class="relative bg-card-bg p-8 rounded-xl shadow-2xl backdrop-blur-md border border-border animate-slide-in-left overflow-hidden"
      >
        <!-- Fondo sutil para la tarjeta -->
        <div
          class="absolute inset-0 bg-gradient-to-br from-bg-main-alt to-card-bg-blue opacity-30 rounded-xl -z-10"
        ></div>

        <h2 class="text-2xl font-bold text-text-main mb-8">¡Es tu turno de votar!</h2>

        <div class="flex flex-col gap-5 mb-10">
          <label
            v-for="(option, index) in options"
            :key="index"
            class="flex items-center p-5 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-[1.02] relative group"
            :class="{
              'bg-indigo-600 text-white shadow-lg ring-2 ring-indigo-400':
                selectedOption === option.label,
              'bg-bg-main-alt hover:bg-border text-text-main border border-transparent group-hover:border-indigo-500':
                selectedOption !== option.label,
            }"
          >
            <input
              type="radio"
              :id="`option-${index}`"
              :value="option.label"
              v-model="selectedOption"
              class="hidden"
            />
            <div
              class="w-7 h-7 rounded-full border-3 flex items-center justify-center mr-4 transition-colors duration-300 flex-shrink-0"
              :class="{
                'border-white bg-white': selectedOption === option.label,
                'border-text-secondary bg-transparent group-hover:border-indigo-500':
                  selectedOption !== option.label,
              }"
            >
              <svg
                v-if="selectedOption === option.label"
                class="w-5 h-5 text-indigo-600 animate-pop-in"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <span class="text-xl font-semibold">{{ option.label }}</span>
            <!-- Borde de brillo en hover/seleccionado -->
            <div
              class="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-indigo-500 transition-colors duration-300"
              :class="{ '!border-white': selectedOption === option.label }"
            ></div>
          </label>
        </div>

        <button
          @click="submitVote"
          :disabled="!selectedOption || isLoading || !canVote()"
          class="w-full bg-gradient-to-r from-accent-start to-accent-end hover:from-indigo-700 hover:to-fuchsia-600 text-white font-extrabold py-4 px-6 rounded-xl transition-all duration-300 text-xl flex items-center justify-center gap-3 shadow-lg transform hover:scale-102"
          :class="{ 'opacity-70 cursor-not-allowed': !selectedOption || isLoading || !canVote() }"
        >
          <span
            v-if="isLoading"
            class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-7 w-7"
          ></span>
          {{ getButtonText() }}
        </button>
      </div>
    </div>
    <div v-else class="text-center text-text-secondary animate-fade-in mt-20">
      <p class="text-2xl font-semibold mb-4">¡Oops! Elección no encontrada.</p>
      <p class="text-lg mb-8">
        Parece que el enlace es incorrecto o la votación ya no está activa.
      </p>
      <RouterLink
        to="/dashboard/vote"
        class="inline-block bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200 shadow-md"
      >
        Volver a las Elecciones Disponibles
      </RouterLink>
    </div>

    <!-- Modal de Confirmación/Error -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade-in"
    >
      <div
        class="bg-card-bg p-10 rounded-xl shadow-2xl border border-border max-w-md w-full text-center animate-zoom-in"
      >
        <svg
          v-if="modalType === 'success'"
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
          v-else-if="modalType === 'error'"
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
        <h2 class="text-3xl font-bold text-text-main mb-4">{{ modalTitle }}</h2>
        <p class="text-lg text-text-secondary mb-8">{{ modalMessage }}</p>
        <button
          @click="closeModal"
          class="bg-accent-start hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md transform hover:scale-105"
        >
          {{ modalType === 'success' ? '¡Genial!' : 'Entendido' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { useRouter, RouterLink } from 'vue-router';
import {
  getOptionsByVotingEventId,
  createVoteByOptionId,
} from '@/features/vote/services/voteEvent';
import { getParticipantsForUser } from '@/features/vote/services/participantController';
import type { VotingEvent } from '@/shared/interfaces/votingEvent.interface';
import type { Option } from '@/shared/interfaces/option.interface';
import type { Participant } from '@/shared/interfaces/participant.interface';

const router = useRouter();

const props = defineProps<{ id: string }>();

const voting = ref<VotingEvent | undefined>(undefined);
const participant = ref<Participant | undefined>(undefined);
const options = ref<Option[]>([]);
const selectedOption = ref<string | null>(null);
const isLoading = ref(false);
const showModal = ref(false);
const modalTitle = ref('');
const modalMessage = ref('');
const modalType = ref<'success' | 'error'>('success');

watchEffect(async () => {
  if (props.id) {
    try {
      // Get all participants for user and filter by voting ID
      const participants = await getParticipantsForUser();
      const foundParticipant = participants.find(p => p.votingId === props.id);
      
      if (!foundParticipant) {
        console.warn('User is not a participant in this voting event');
        voting.value = undefined;
        participant.value = undefined;
        return;
      }
      
      // Set participant data
      participant.value = foundParticipant;
      
      // Transform participant data to VotingEvent format
      voting.value = {
        id: foundParticipant.votingId,
        title: foundParticipant.votingTitle,
        description: foundParticipant.eventDescription,
        startTime: '', // Not available in participant data
        endTime: '', // Not available in participant data
        userId: foundParticipant.userId,
        userName: foundParticipant.name,
        status: foundParticipant.votingEventStatus,
      };
      
      // Check if voting is still open and user can vote
      if (foundParticipant.votingEventStatus !== 'OPENED') {
        console.warn('Voting event is closed');
      }
      
      if (foundParticipant.status === 'BANNED') {
        console.warn('User is banned from this voting event');
      }
      
      options.value = await getOptionsByVotingEventId(props.id);
      selectedOption.value = null;
    } catch (error) {
      console.error('Error fetching voting event or options:', error);
      voting.value = undefined;
      participant.value = undefined;
    }
  } else {
    voting.value = undefined;
    participant.value = undefined;
  }
});

// Helper functions
const canVote = () => {
  return voting.value?.status === 'OPENED' && 
         participant.value?.status !== 'BANNED' && 
         participant.value?.status !== 'VOTED';
};

const getButtonText = () => {
  if (isLoading.value) return 'Enviando Voto...';
  if (voting.value?.status === 'CLOSED') return 'Votación Cerrada';
  if (participant.value?.status === 'BANNED') return 'Acceso Denegado';
  if (participant.value?.status === 'VOTED') return 'Ya Has Votado';
  return 'Votar Ahora';
};

const submitVote = async () => {
  if (!selectedOption.value || !voting.value || !canVote()) {
    modalType.value = 'error';
    modalTitle.value = 'Error de Votación';
    
    if (!canVote()) {
      if (participant.value?.status === 'BANNED') {
        modalMessage.value = 'No tienes acceso para votar en esta elección.';
      } else if (participant.value?.status === 'VOTED') {
        modalMessage.value = 'Ya has votado en esta elección.';
      } else if (voting.value?.status === 'CLOSED') {
        modalMessage.value = 'Esta votación ya ha cerrado.';
      } else {
        modalMessage.value = 'No puedes votar en esta elección en este momento.';
      }
    } else {
      modalMessage.value = 'Por favor, selecciona una opción antes de votar.';
    }
    
    showModal.value = true;
    return;
  }

  isLoading.value = true;

  try {
    const selectedOptionObject = options.value.find((opt) => opt.label === selectedOption.value);
    if (!selectedOptionObject) {
      throw new Error('Opción seleccionada no encontrada.');
    }

    await createVoteByOptionId(selectedOptionObject.id);

    modalType.value = 'success';
    modalTitle.value = '¡Voto Registrado!';
    modalMessage.value = `Tu voto por "${selectedOption.value}" ha sido registrado con éxito en la elección "${voting.value.title}".`;

    showModal.value = true;
  } catch (error: any) {
    modalType.value = 'error';
    modalTitle.value = 'Error al Votar';
    modalMessage.value = error.message || 'Ocurrió un error inesperado al enviar tu voto.';
    showModal.value = true;
  } finally {
    isLoading.value = false;
  }
};

const closeModal = () => {
  showModal.value = false;
  if (modalType.value === 'success') {
    router.push('/dashboard/vote');
  }
};
</script>

<style scoped>
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

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
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes popIn {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  80% {
    transform: scale(1.2);
    opacity: 1;
  }
  100% {
    transform: scale(1);
  }
}

@keyframes bounceIn {
  0% {
    transform: scale(0.1);
    opacity: 0;
  }
  60% {
    transform: scale(1.2);
    opacity: 1;
  }
  100% {
    transform: scale(1);
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

.animate-fade-in-down {
  animation: fadeInDown 0.6s ease-out forwards;
}

.animate-slide-in-left {
  animation: slideInLeft 0.7s ease-out forwards 0.2s;
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}

.animate-zoom-in {
  animation: zoomIn 0.3s ease-out forwards;
}

.animate-pop-in {
  animation: popIn 0.3s ease-out forwards;
}

.animate-bounce-in {
  animation: bounceIn 0.5s ease-out forwards;
}

.animate-shake {
  animation: shake 0.5s ease-out forwards;
}

.loader {
  border-top-color: #3498db;
  -webkit-animation: spin 1s linear infinite;
  animation: spin 1s linear infinite;
}

@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
