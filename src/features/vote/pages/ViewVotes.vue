<template>
  <div class="ml-8 top-[48px] fixed z-10 w-[calc(100%-240px-2rem)]">
    <h1 class="text-3xl font-bold text-text-main mb-6">Elecciones Disponibles 🗳️</h1>
    <p class="text-lg text-text-secondary mb-8">
      Descubre las votaciones activas y haz tu elección. ¡Tu voz es importante!
    </p>

    <div
      v-if="activeElections.length > 0"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <div
        v-for="election in activeElections"
        :key="election.id"
        class="bg-card-bg p-6 rounded-lg shadow-xl backdrop-blur-sm border border-border flex flex-col justify-between"
      >
        <div>
          <h2 class="text-xl font-semibold text-text-main mb-2">{{ election.title }}</h2>
          <p class="text-text-secondary mb-4 line-clamp-3">{{ election.question }}</p>
        </div>
        <div class="mt-4">
          <p class="text-sm text-text-secondary mb-2">Opciones: {{ election.options.length }}</p>
          <RouterLink
            :to="`vote/${election.id}`"
            class="block w-full text-center bg-accent-start hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Ver Detalles y Votar
          </RouterLink>
        </div>
      </div>
    </div>
    <div v-else class="bg-card-bg p-8 rounded-lg text-center text-text-secondary">
      <p class="text-xl mb-4">¡Parece que no hay elecciones activas en este momento!</p>
      <p class="mb-6">¿Por qué no creas una nueva para empezar?</p>
      <RouterLink
        to="/create-votes"
        class="inline-block bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-200"
      >
        Crear Nueva Elección
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'; // Make sure to import RouterLink
import { activeElections } from '@/shared/data/no.api.elections';

// You would likely fetch these from an API:
// onMounted(async () => {
//   const response = await fetch('/api/elections/active');
//   activeElections.value = await response.json();
// });
</script>

<style scoped>
/* Any specific styles not handled by Tailwind can go here */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
