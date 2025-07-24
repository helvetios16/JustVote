<template>
  <div class="bg-card-bg p-6 rounded-lg shadow-xl backdrop-blur-sm border border-border flex flex-col justify-between">
    <div>
      <h2 class="text-xl font-semibold text-text-main mb-2">{{ election.title }}</h2>
      <p class="text-text-secondary mb-4 line-clamp-3">{{ election.description }}</p>
      <p class="text-sm text-text-secondary">
        Inicio: {{ formatDate(election.startTime) }}
      </p>
      <p class="text-sm text-text-secondary mb-2">
        Fin: {{ formatDate(election.endTime) }}
      </p>
    </div>
    <div class="mt-4 flex flex-col gap-2">
      <button
        @click="handleCopyId"
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
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import type { VotingEvent } from '@/shared/interfaces/votingEvent.interface';

interface Props {
  election: VotingEvent;
}

interface Emits {
  (e: 'copy-id', id: string): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString();
};

const handleCopyId = () => {
  emit('copy-id', props.election.id);
};
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
