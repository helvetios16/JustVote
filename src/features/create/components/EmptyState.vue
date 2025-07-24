<template>
  <div class="bg-card-bg p-8 rounded-lg text-center text-text-secondary">
    <p class="text-xl mb-4">¡Aún no has creado ninguna votación!</p>
    <p class="mb-6">¿Por qué no creas una ahora?</p>
    <RouterLink
      to="/dashboard/create"
      class="inline-block bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-200"
    >
      Crear Nueva Elección
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>
