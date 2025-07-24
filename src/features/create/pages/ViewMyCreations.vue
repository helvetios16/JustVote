<template>
  <div class="ml-8 top-[48px] fixed z-10 w-[calc(100%-240px-2rem)] pr-8">
    <h1 class="text-3xl font-bold text-text-main mb-6">Mis Votaciones Creadas 📝</h1>
    <p class="text-lg text-text-secondary mb-8">
      Aquí puedes gestionar las votaciones que has creado.
    </p>

    <div v-if="myCreations.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <VotingEventCard
        v-for="election in myCreations"
        :key="election.id"
        :election="election"
        @copy-id="copyToClipboard"
      />
    </div>
    
    <EmptyState v-else />

    <NotificationToast
      :show="showNotification"
      :message="notificationMessage"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getVotingEvents } from '@/features/create/services/eventController';
import type { VotingEvent } from '@/shared/interfaces/votingEvent.interface';
import { useNotification } from '@/features/create/composables/useNotification';
import VotingEventCard from '@/features/create/components/VotingEventCard.vue';
import EmptyState from '@/features/create/components/EmptyState.vue';
import NotificationToast from '@/features/create/components/NotificationToast.vue';

const myCreations = ref<VotingEvent[]>([]);
const { showNotification, notificationMessage, copyToClipboard } = useNotification();

onMounted(async () => {
  try {
    myCreations.value = await getVotingEvents();
  } catch (error) {
    console.error("Error fetching user's voting events:", error);
  }
});
</script>