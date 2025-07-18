<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
  >
    <div
      class="bg-card-bg p-8 rounded-xl shadow-2xl border border-border w-full max-w-md animate-fade-in-up"
    >
      <h2 class="text-2xl font-bold text-text-main mb-6">Editar Detalles del Evento</h2>

      <div class="mb-4">
        <label for="editTitle" class="block text-text-secondary text-sm font-bold mb-2"
          >Título:</label
        >
        <input
          type="text"
          id="editTitle"
          v-model="editedTitle"
          class="shadow appearance-none border border-border rounded w-full py-2 px-3 text-text-main leading-tight focus:outline-none focus:shadow-outline bg-bg-main-alt"
        />
      </div>

      <div class="mb-6">
        <label for="editDescription" class="block text-text-secondary text-sm font-bold mb-2"
          >Descripción:</label
        >
        <textarea
          id="editDescription"
          v-model="editedDescription"
          rows="4"
          class="shadow appearance-none border border-border rounded w-full py-2 px-3 text-text-main leading-tight focus:outline-none focus:shadow-outline bg-bg-main-alt"
        ></textarea>
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

const props = defineProps<{
  isVisible: boolean;
  currentTitle: string;
  currentDescription: string;
}>();

const emit = defineEmits(['close', 'save']);

const editedTitle = ref(props.currentTitle);
const editedDescription = ref(props.currentDescription);

watch(
  () => props.isVisible,
  (newVal) => {
    if (newVal) {
      editedTitle.value = props.currentTitle;
      editedDescription.value = props.currentDescription;
    }
  },
);

const handleSave = () => {
  emit('save', editedTitle.value, editedDescription.value);
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

.animate-fade-in-down {
  animation: fadeInDown 0.6s ease-out forwards;
}

.animate-slide-in-left {
  animation: slideInLeft 0.7s ease-out forwards 0.2s;
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}

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
