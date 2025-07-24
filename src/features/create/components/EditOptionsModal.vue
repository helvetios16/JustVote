<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
  >
    <div
      class="bg-card-bg p-8 rounded-xl shadow-2xl border border-border w-full max-w-md animate-fade-in-up"
    >
      <h2 class="text-2xl font-bold text-text-main mb-6">Cambiar/Agregar Opciones</h2>

      <div class="mb-4">
        <h3 class="text-xl font-bold text-text-main mb-2">Opciones:</h3>
        <div
          v-for="(option, index) in editableOptions"
          :key="option.id || `new-${index}`"
          class="flex gap-3 mb-3 items-center"
        >
          <input
            type="text"
            v-model="option.label"
            :placeholder="`Opción ${index + 1}`"
            class="flex-grow p-3 rounded-md bg-bg-main-alt text-text-main border border-border focus:outline-none focus:ring-2 focus:ring-accent-start"
            required
          />
          <button
            @click="removeOption(index)"
            type="button"
            class="text-text-secondary hover:text-red-500 transition-colors duration-200 p-2"
            title="Eliminar opción"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
        <button
          @click="addOption"
          type="button"
          class="flex items-center gap-2 text-accent-start hover:text-fuchsia-500 transition-colors duration-200 mt-2 px-3 py-2 rounded-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Agregar Opción
        </button>
      </div>

      <div class="flex justify-end space-x-4">
        <button
          @click="$emit('close')"
          class="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
        >
          Cancelar
        </button>
        <button
          @click="handleSave"
          class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
        >
          Guardar Cambios
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { Option } from '@/shared/interfaces/option.interface';

const props = defineProps<{
  isVisible: boolean;
  currentOptions: Option[];
  votingEventId: string;
}>();

const emit = defineEmits(['close', 'save']);

const editableOptions = ref<Option[]>([]);

watch(
  () => props.isVisible,
  (newVal) => {
    if (newVal) {
      editableOptions.value = JSON.parse(JSON.stringify(props.currentOptions));
    }
  },
);

const addOption = () => {
  editableOptions.value.push({ id: 0, label: '', votingEventId: props.votingEventId, votingEventTitle: '' });
};

const removeOption = (index: number) => {
  editableOptions.value.splice(index, 1);
};

const handleSave = () => {
  emit('save', editableOptions.value);
};
</script>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.3s ease-out forwards;
}
</style>
