<template>
  <div class="ml-8 top-[48px] fixed z-10 w-[calc(100%-240px-2rem)]">
    <h1 class="text-3xl font-bold text-text-main mb-6">Crea Tu Nueva Elección 🎉</h1>
    <p class="text-lg text-text-secondary mb-8">
      Define los detalles clave de tu votación para que otros puedan participar.
    </p>

    <div class="bg-card-bg p-8 rounded-lg shadow-xl backdrop-blur-sm border border-border">
      <form @submit.prevent="submitElection">
        <div class="mb-6">
          <label for="electionTitle" class="block text-text-main text-sm font-medium mb-2">
            Título de la Elección
          </label>
          <input
            type="text"
            id="electionTitle"
            v-model="election.title"
            placeholder="Ej: ¿Mejor color para el nuevo logo?"
            class="w-full p-3 rounded-md bg-bg-main-alt text-text-main border border-border focus:outline-none focus:ring-2 focus:ring-accent-start"
            required
          />
        </div>

        <div class="mb-6">
          <label for="electionQuestion" class="block text-text-main text-sm font-medium mb-2">
            Pregunta Principal
          </label>
          <textarea
            id="electionQuestion"
            v-model="election.question"
            rows="3"
            placeholder="Ej: ¿Cuál de las siguientes opciones representa mejor nuestra visión?"
            class="w-full p-3 rounded-md bg-bg-main-alt text-text-main border border-border focus:outline-none focus:ring-2 focus:ring-accent-start"
            required
          ></textarea>
        </div>

        <div class="mb-6">
          <label class="block text-text-main text-sm font-medium mb-3">
            Opciones para la Votación
          </label>
          <div
            v-for="(option, index) in election.options"
            :key="index"
            class="flex gap-3 mb-3 items-center"
          >
            <input
              type="text"
              v-model="election.options[index]"
              :placeholder="`Opción ${index + 1}`"
              class="flex-grow p-3 rounded-md bg-bg-main-alt text-text-main border border-border focus:outline-none focus:ring-2 focus:ring-accent-start"
              required
            />
            <button
              v-if="election.options.length > 2"
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

        <div class="mt-8">
          <button
            type="submit"
            class="w-full bg-accent-start hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 text-lg"
          >
            Crear Elección
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const election = reactive({
  title: '',
  question: '',
  options: ['', ''], // Start with two default empty options
});

const addOption = () => {
  election.options.push('');
};

const removeOption = (index: number) => {
  if (election.options.length > 2) {
    // Ensure at least two options remain
    election.options.splice(index, 1);
  }
};

const submitElection = () => {
  // Here you would typically send `election` data to your backend
  console.log('Election Data Submitted:', election);
  alert('¡Elección creada exitosamente! (Simulado)');
  // Optionally, redirect the user after submission
  // For example, using Vue Router: router.push('/dashboard');
};
</script>

<style scoped>
/* Any specific styles not handled by Tailwind can go here */
</style>
