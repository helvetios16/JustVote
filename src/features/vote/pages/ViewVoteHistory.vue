<template>
  <div class="mt-[48px] w-full px-8">
    <h1 class="text-3xl font-bold text-text-main mb-6">Historial de Votaciones 📊</h1>
    <p class="text-lg text-text-secondary mb-8">
      Revisa todas las elecciones en las que has participado o que ya han finalizado.
    </p>

    <!-- Filtros -->
    <div class="mb-6 flex flex-wrap gap-4">
      <button
        @click="activeFilter = 'all'"
        :class="[
          'px-4 py-2 rounded-lg font-medium transition-colors duration-200',
          activeFilter === 'all' 
            ? 'bg-accent-start text-white' 
            : 'bg-card-bg text-text-secondary hover:bg-border'
        ]"
      >
        Todos ({{ filteredParticipants.length }})
      </button>
      <button
        @click="activeFilter = 'voted'"
        :class="[
          'px-4 py-2 rounded-lg font-medium transition-colors duration-200',
          activeFilter === 'voted' 
            ? 'bg-green-600 text-white' 
            : 'bg-card-bg text-text-secondary hover:bg-border'
        ]"
      >
        Ya Votados ({{ votedCount }})
      </button>
      <button
        @click="activeFilter = 'closed'"
        :class="[
          'px-4 py-2 rounded-lg font-medium transition-colors duration-200',
          activeFilter === 'closed' 
            ? 'bg-red-600 text-white' 
            : 'bg-card-bg text-text-secondary hover:bg-border'
        ]"
      >
        Cerrados ({{ closedCount }})
      </button>
    </div>

    <div v-if="isLoading" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-accent-start"></div>
      <p class="text-text-secondary mt-4">Cargando historial...</p>
    </div>

    <div
      v-else-if="filteredParticipants.length > 0"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <div
        v-for="participant in filteredParticipants"
        :key="participant.id"
        class="bg-card-bg p-6 rounded-lg shadow-xl backdrop-blur-sm border border-border flex flex-col justify-between hover:shadow-2xl transition-shadow duration-300"
      >
        <div>
          <div class="flex justify-between items-start mb-3">
            <h2 class="text-xl font-semibold text-text-main">{{ participant.votingTitle }}</h2>
            <span
              :class="[
                'px-2 py-1 rounded-full text-xs font-bold',
                getStatusBadgeClass(participant)
              ]"
            >
              {{ getStatusText(participant) }}
            </span>
          </div>
          
          <p class="text-sm text-text-secondary mb-3 line-clamp-2">
            {{ participant.eventDescription }}
          </p>
          
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="text-text-secondary">Estado del evento:</span>
              <span 
                :class="[
                  'font-medium',
                  participant.votingEventStatus === 'OPENED' ? 'text-green-500' : 'text-red-500'
                ]"
              >
                {{ participant.votingEventStatus === 'OPENED' ? 'Abierto' : 'Cerrado' }}
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-text-secondary">Tu participación:</span>
              <span 
                :class="[
                  'font-medium',
                  getParticipationStatusClass(participant.status)
                ]"
              >
                {{ getParticipationStatusText(participant.status) }}
              </span>
            </div>
          </div>
        </div>
        
        <div class="mt-4 pt-4 border-t border-border">
          <div class="flex gap-2">
            <RouterLink
              :to="`/dashboard/vote/${participant.votingId}`"
              class="flex-1 text-center bg-accent-start hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 text-sm"
            >
              {{ participant.status === 'VOTED' ? 'Ver Resultados' : 'Ver Detalles' }}
            </RouterLink>
            <button
              @click="showDetails(participant)"
              class="px-3 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors duration-200"
              title="Más información"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="bg-card-bg p-8 rounded-lg text-center text-text-secondary">
      <svg class="w-16 h-16 mx-auto mb-4 text-text-secondary opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
      </svg>
      <p class="text-xl mb-4">No hay historial de votaciones</p>
      <p class="mb-6">
        {{ activeFilter === 'all' 
           ? 'Aún no has participado en ninguna votación.' 
           : `No tienes votaciones con el filtro "${getFilterName()}".` 
        }}
      </p>
      <RouterLink
        to="/dashboard/vote"
        class="inline-block bg-accent-start hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-200"
      >
        Explorar Votaciones
      </RouterLink>
    </div>

    <!-- Modal de detalles -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade-in"
    >
      <div
        class="bg-card-bg p-8 rounded-lg shadow-2xl border border-border max-w-md w-full text-center animate-zoom-in"
      >
        <h2 class="text-2xl font-bold text-text-main mb-4">{{ selectedParticipant?.votingTitle }}</h2>
        <p class="text-text-secondary mb-4">{{ selectedParticipant?.eventDescription }}</p>
        
        <div class="space-y-3 text-left">
          <div class="flex justify-between">
            <span class="text-text-secondary">ID del evento:</span>
            <span class="text-text-main font-mono text-sm">{{ selectedParticipant?.votingId }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-text-secondary">Estado del evento:</span>
            <span :class="[
              'font-medium',
              selectedParticipant?.votingEventStatus === 'OPENED' ? 'text-green-500' : 'text-red-500'
            ]">
              {{ selectedParticipant?.votingEventStatus === 'OPENED' ? 'Abierto' : 'Cerrado' }}
            </span>
          </div>
          <div class="flex justify-between">
            <span class="text-text-secondary">Tu estado:</span>
            <span :class="[
              'font-medium',
              getParticipationStatusClass(selectedParticipant?.status || 'PENDING')
            ]">
              {{ getParticipationStatusText(selectedParticipant?.status || 'PENDING') }}
            </span>
          </div>
        </div>
        
        <div class="flex gap-4 mt-6">
          <button
            @click="closeModal"
            class="flex-1 bg-gray-700 hover:bg-gray-600 text-text-main font-bold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Cerrar
          </button>
          <RouterLink
            :to="`/dashboard/vote/${selectedParticipant?.votingId}`"
            @click="closeModal"
            class="flex-1 bg-accent-start hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 text-center"
          >
            Ver Completo
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import { getParticipantsForUser } from '@/features/vote/services/participantController';
import type { Participant, ParticipantStatusValue } from '@/shared/interfaces/participant.interface';

// Reactive data
const participants = ref<Participant[]>([]);
const activeFilter = ref<'all' | 'voted' | 'closed'>('all');
const isLoading = ref(false);
const showModal = ref(false);
const selectedParticipant = ref<Participant | null>(null);

// Computed properties
const filteredParticipants = computed(() => {
  return participants.value.filter(participant => {
    const isVoted = participant.status === 'VOTED';
    const isClosed = participant.votingEventStatus === 'CLOSED';
    const isHistorical = isVoted || isClosed;

    if (activeFilter.value === 'all') {
      return isHistorical;
    } else if (activeFilter.value === 'voted') {
      return isVoted;
    } else if (activeFilter.value === 'closed') {
      return isClosed;
    }
    return false;
  });
});

const votedCount = computed(() => {
  return participants.value.filter(p => p.status === 'VOTED').length;
});

const closedCount = computed(() => {
  return participants.value.filter(p => p.votingEventStatus === 'CLOSED').length;
});

// Methods
const loadParticipants = async () => {
  isLoading.value = true;
  try {
    participants.value = await getParticipantsForUser();
  } catch (error) {
    console.error('Error loading participants:', error);
  } finally {
    isLoading.value = false;
  }
};

const getStatusBadgeClass = (participant: Participant): string => {
  if (participant.status === 'VOTED') {
    return 'bg-green-100 text-green-800';
  } else if (participant.votingEventStatus === 'CLOSED') {
    return 'bg-red-100 text-red-800';
  } else if (participant.status === 'BANNED') {
    return 'bg-gray-100 text-gray-800';
  }
  return 'bg-blue-100 text-blue-800';
};

const getStatusText = (participant: Participant): string => {
  if (participant.status === 'VOTED') {
    return 'Votado';
  } else if (participant.votingEventStatus === 'CLOSED') {
    return 'Cerrado';
  } else if (participant.status === 'BANNED') {
    return 'Bloqueado';
  }
  return 'Pendiente';
};

const getParticipationStatusClass = (status: ParticipantStatusValue): string => {
  switch (status) {
    case 'VOTED':
      return 'text-green-500';
    case 'BANNED':
      return 'text-red-500';
    case 'PENDING':
      return 'text-yellow-500';
    default:
      return 'text-gray-500';
  }
};

const getParticipationStatusText = (status: ParticipantStatusValue): string => {
  switch (status) {
    case 'VOTED':
      return 'Ya votaste';
    case 'BANNED':
      return 'Bloqueado';
    case 'PENDING':
      return 'Pendiente';
    default:
      return 'Desconocido';
  }
};

const getFilterName = (): string => {
  switch (activeFilter.value) {
    case 'voted':
      return 'Ya Votados';
    case 'closed':
      return 'Cerrados';
    default:
      return 'Todos';
  }
};

const showDetails = (participant: Participant) => {
  selectedParticipant.value = participant;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  selectedParticipant.value = null;
};

// Lifecycle
onMounted(() => {
  loadParticipants();
});
</script>

<style scoped>
/* Truncate text with ellipsis */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Animations */
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

.animate-fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}

.animate-zoom-in {
  animation: zoomIn 0.3s ease-out forwards;
}

/* Hover effects */
.hover\:shadow-2xl:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}
</style>
