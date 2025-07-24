<template>
  <div class="pl-8 pt-[48px] pb-12 pr-8">
    <div v-if="selectedEventDetails" class="animate-fade-in-down">
      <div
        class="relative bg-card-bg p-8 rounded-xl shadow-2xl backdrop-blur-md border border-border animate-slide-in-left overflow-hidden mb-8"
      >
        <h1 class="text-4xl font-extrabold text-text-main mb-3 leading-tight">
          {{ selectedEventDetails.title }}
        </h1>
        <p class="text-xl text-text-secondary mb-1">{{ selectedEventDetails.description }}</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <!-- Columna de Detalles del Evento y Opciones -->
        <div
          class="relative bg-card-bg p-8 rounded-xl shadow-2xl backdrop-blur-md border border-border animate-slide-in-left overflow-hidden"
        >
          <h2 class="text-2xl font-bold text-text-main mb-8">Detalles del Evento</h2>
          <div class="space-y-2 mb-6">
            <p class="text-text-secondary">
              <span class="font-semibold text-text-main">ID del Evento:</span>
              {{ selectedEventDetails.id }}
            </p>
            <p class="text-text-secondary">
              <span class="font-semibold text-text-main">Estado:</span>
              {{ selectedEventDetails.status }}
            </p>
            <p class="text-text-secondary">
              <span class="font-semibold text-text-main">Inicio:</span>
              {{ new Date(selectedEventDetails.startTime).toLocaleString() }}
            </p>
            <p class="text-text-secondary">
              <span class="font-semibold text-text-main">Fin:</span>
              {{ new Date(selectedEventDetails.endTime).toLocaleString() }}
            </p>
          </div>

          <h3 class="text-xl font-bold text-text-main mb-4">Opciones:</h3>
          <ul class="list-disc list-inside text-text-secondary mb-6">
            <li v-for="option in selectedEventOptions" :key="option.id" class="mb-1">
              {{ option.label }}
            </li>
          </ul>
        </div>

        <!-- Columna de Acciones del Evento -->
        <div
          class="relative bg-card-bg p-8 rounded-xl shadow-2xl backdrop-blur-md border border-border animate-slide-in-left overflow-hidden flex flex-col"
        >
          <h2 class="text-2xl font-bold text-text-main mb-8">Acciones del Evento</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <button
              @click="handleOpenEvent"
              :disabled="selectedEventDetails?.status === 'OPENED'"
              class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Abrir Votación
            </button>
            <button
              @click="handleCloseEvent"
              :disabled="selectedEventDetails?.status === 'CLOSED'"
              class="w-full bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cerrar Votación
            </button>
            <button
              @click="
                () => {
                  /* Implement PDF generation logic here */
                }
              "
              class="w-full bg-gray-700 hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 text-lg"
            >
              Generar PDF
            </button>
            <button
              @click="handleDeleteEvent"
              class="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 text-lg"
            >
              Eliminar Evento
            </button>
          </div>

          <h3 class="text-xl font-bold text-text-main mb-4">Opciones de Edición</h3>
          <div class="space-y-4">
            <button
              @click="isEditModalVisible = true"
              class="w-full bg-purple-700 hover:bg-purple-800 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 text-lg"
            >
              Cambiar Título/Descripción
            </button>
            <button
              @click="isEditOptionsModalVisible = true"
              class="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 text-lg"
            >
              Cambiar/Agregar Opciones
            </button>
          </div>
        </div>
      </div>

      <!-- Sección de Participantes (ancho completo) -->
      <div
        class="relative bg-card-bg p-8 rounded-xl shadow-2xl backdrop-blur-md border border-border animate-slide-in-left overflow-hidden"
      >
        <h2 class="text-2xl font-bold text-text-main mb-8">Participantes</h2>
        <div v-if="participants.length > 0" class="overflow-x-auto">
          <table class="min-w-full bg-bg-main-alt rounded-lg overflow-hidden">
            <thead class="bg-border">
              <tr>
                <th class="py-3 px-4 text-left text-sm font-semibold text-text-main">Nombre</th>
                <th class="py-3 px-4 text-left text-sm font-semibold text-text-main">Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="participant in participants"
                :key="participant.id"
                class="border-b border-border last:border-b-0"
              >
                <td class="py-3 px-4 text-text-secondary">{{ participant.name }}</td>
                <td class="py-3 px-4 text-text-secondary">{{ participant.status }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p v-else class="text-text-secondary">No hay participantes aún.</p>
      </div>
    </div>
    <div v-else class="text-center text-text-secondary animate-fade-in mt-20">
      <p class="text-2xl font-semibold mb-4">¡Oops! Evento no encontrado.</p>
      <p class="text-lg mb-8">Parece que el enlace es incorrecto o el evento no existe.</p>
      <RouterLink
        to="/dashboard/creations"
        class="inline-block bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200 shadow-md"
      >
        Volver a Mis Creaciones
      </RouterLink>
    </div>

    <!-- Notification -->
    <div
      v-if="showNotification"
      class="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg transition-opacity duration-300 z-20"
      :class="{ 'opacity-100': showNotification, 'opacity-0': !showNotification }"
    >
      {{ notificationMessage }}
    </div>

    <EditEventDetailsModal
      :is-visible="isEditModalVisible"
      :current-title="selectedEventDetails?.title || ''"
      :current-description="selectedEventDetails?.description || ''"
      :current-start-time="selectedEventDetails?.startTime || ''"
      :current-end-time="selectedEventDetails?.endTime || ''"
      @close="isEditModalVisible = false"
      @save="handleUpdateEventDetails"
    />

    <EditOptionsModal
      :is-visible="isEditOptionsModalVisible"
      :current-options="selectedEventOptions"
      :voting-event-id="props.id"
      @close="isEditOptionsModalVisible = false"
      @save="handleUpdateOptions"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { RouterLink } from 'vue-router';
import {
  openVotingEvent,
  closeVotingEvent,
  deleteVotingEvent,
  updateVotingEvent,
} from '@/features/create/services/eventController';
import { getVotingEventById } from '@/features/vote/services/voteEvent';
import { getOptionsByVotingEventId } from '@/features/vote/services/voteEvent';
import { getParticipantsByVotingEventId } from '@/features/create/services/participantController';
import {
  createOption,
  updateOption,
  deleteOption,
} from '@/features/create/services/optionController';
import type { VotingEvent } from '@/shared/interfaces/votingEvent.interface';
import type { Option } from '@/shared/interfaces/option.interface';
import type { ParticipantResult } from '@/shared/interfaces/participantResult.interface';
import EditEventDetailsModal from '@/features/create/components/EditEventDetailsModal.vue';
import EditOptionsModal from '@/features/create/components/EditOptionsModal.vue';

const props = defineProps<{ id: string }>();

const selectedEventDetails = ref<VotingEvent | null>(null);
const selectedEventOptions = ref<Option[]>([]);
const participants = ref<ParticipantResult[]>([]);
const showNotification = ref(false);
const notificationMessage = ref('');
const isEditModalVisible = ref(false);
const isEditOptionsModalVisible = ref(false);

const handleOpenEvent = async () => {
  if (!props.id) return;
  try {
    await openVotingEvent(props.id);
    notificationMessage.value = 'Votación abierta con éxito!';
    showNotification.value = true;
    // Refresh event details to show updated status
    selectedEventDetails.value = await getVotingEventById(props.id);
  } catch (error) {
    console.error('Error al abrir la votación:', error);
    notificationMessage.value = 'Error al abrir la votación.';
    showNotification.value = true;
  } finally {
    setTimeout(() => {
      showNotification.value = false;
    }, 3000);
  }
};

const handleCloseEvent = async () => {
  if (!props.id) return;
  try {
    await closeVotingEvent(props.id);
    notificationMessage.value = 'Votación cerrada con éxito!';
    showNotification.value = true;
    // Refresh event details to show updated status
    selectedEventDetails.value = await getVotingEventById(props.id);
  } catch (error) {
    console.error('Error al abrir la votacion:', error);
    notificationMessage.value = 'Error al abrir la votacion';
    showNotification.value = true;
  } finally {
    setTimeout(() => {
      showNotification.value = false;
    }, 3000);
  }
};

const handleDeleteEvent = async () => {
  if (!props.id) return;
  if (
    confirm('¿Estás seguro de que quieres eliminar este evento? Esta acción no se puede deshacer.')
  ) {
    try {
      await deleteVotingEvent(props.id);
      notificationMessage.value = 'Evento eliminado con éxito!';
      showNotification.value = true;
      setTimeout(() => {
        showNotification.value = false;
        // Redirect to my creations page after successful deletion
        window.location.href = '/dashboard/creations';
      }, 3000);
    } catch (error) {
      console.error('Error al eliminar el evento:', error);
      notificationMessage.value = 'Error al eliminar el evento.';
      showNotification.value = true;
      setTimeout(() => {
        showNotification.value = false;
      }, 3000);
    }
  }
};

const handleUpdateOptions = async (updatedOptions: Option[]) => {
  if (!props.id) return;
  try {
    const existingOptionIds = new Set(selectedEventOptions.value.map((opt) => opt.id));
    const updatedOptionIds = new Set(updatedOptions.map((opt) => opt.id).filter((id) => id !== 0));

    // Identify options to delete
    const optionsToDelete = selectedEventOptions.value.filter(
      (opt) => !updatedOptionIds.has(opt.id),
    );

    // Identify options to create or update
    const optionsToProcess = updatedOptions.filter((opt) => opt.label.trim() !== '');

    const promises: Promise<any>[] = [];

    for (const option of optionsToDelete) {
      if (option.id) {
        promises.push(deleteOption(option.id));
      }
    }

    for (const option of optionsToProcess) {
      if (option.id && existingOptionIds.has(option.id)) {
        // Update existing option
        const originalOption = selectedEventOptions.value.find((opt) => opt.id === option.id);
        if (originalOption && originalOption.label !== option.label) {
          promises.push(updateOption(option.id, { eventId: props.id, label: option.label }));
        }
      } else if (!option.id) {
        // Create new option
        promises.push(createOption({ eventId: props.id, label: option.label }));
      }
    }

    await Promise.all(promises);

    notificationMessage.value = 'Opciones actualizadas con éxito!';
    showNotification.value = true;
    isEditOptionsModalVisible.value = false;
    // Refresh options to show updated status
    selectedEventOptions.value = await getOptionsByVotingEventId(props.id);
  } catch (error) {
    console.error('Error al actualizar las opciones:', error);
    notificationMessage.value = 'Error al actualizar las opciones.';
    showNotification.value = true;
  } finally {
    setTimeout(() => {
      showNotification.value = false;
    }, 3000);
  }
};

watchEffect(async () => {
  if (props.id) {
    try {
      selectedEventDetails.value = await getVotingEventById(props.id);
      selectedEventOptions.value = await getOptionsByVotingEventId(props.id);
      participants.value = await getParticipantsByVotingEventId(props.id);
    } catch (error) {
      console.error('Error fetching event details:', error);
      selectedEventDetails.value = null;
      selectedEventOptions.value = [];
    }
  }
});
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

.animate-fade-in-down {
  animation: fadeInDown 0.6s ease-out forwards;
}

.animate-slide-in-left {
  animation: slideInLeft 0.7s ease-out forwards 0.2s;
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}
</style>
