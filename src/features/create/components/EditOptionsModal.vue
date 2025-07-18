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
        <h3 class="text-xl font-bold text-text-main mb-2">Opciones Actuales:</h3>
        <ul v-if="currentOptions.length > 0" class="list-disc list-inside text-text-secondary mb-4">
          <li v-for="option in currentOptions" :key="option.id" class="mb-1">
            {{ option.label }}
          </li>
        </ul>
        <p v-else class="text-text-secondary mb-4">No hay opciones definidas aún.</p>
      </div>

      <div class="mb-6">
        <label for="newOption" class="block text-text-secondary text-sm font-bold mb-2"
          >Nueva Opción:</label
        >
        <input
          type="text"
          id="newOption"
          v-model="newOptionLabel"
          class="shadow appearance-none border border-border rounded w-full py-2 px-3 text-text-main leading-tight focus:outline-none focus:shadow-outline bg-bg-main-alt"
          placeholder="Escribe una nueva opción"
        />
      </div>

      <div class="flex justify-end space-x-4">
        <button
          @click="$emit('close')"
          class="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
        >
          Cancelar
        </button>
        <button
          @click="handleAddOption"
          :disabled="!newOptionLabel.trim()"
          class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Agregar Opción
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
}>();

const emit = defineEmits(['close', 'addOption']);

const newOptionLabel = ref('');

const handleAddOption = () => {
  if (newOptionLabel.value.trim()) {
    emit('addOption', newOptionLabel.value.trim());
    newOptionLabel.value = ''; // Clear input after adding
  }
};

// Reset newOptionLabel when modal opens
watch(
  () => props.isVisible,
  (newVal) => {
    if (newVal) {
      newOptionLabel.value = '';
    }
  },
);
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
