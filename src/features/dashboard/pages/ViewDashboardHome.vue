<template>
  <div class="ml-8 top-[48px] fixed z-10 w-[calc(100%-240px-2rem)]">
    <div class="flex flex-col items-center justify-center h-full text-center py-12">
      <h1 class="text-5xl font-extrabold text-text-main animate-fade-in-down mb-4">
        ¡Bienvenido a JustVote!
      </h1>
      <p class="text-xl text-text-secondary animate-fade-in-up mb-8 max-w-2xl">
        Tu plataforma intuitiva para crear y participar en elecciones democráticas. Haz que cada voz
        cuente.
      </p>

      <div class="flex gap-6 animate-zoom-in">
        <RouterLink
          to="/dashboard/create"
          class="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
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
          Crear Nueva Elección
        </RouterLink>
        <RouterLink
          to="/dashboard/vote"
          class="flex items-center gap-2 bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
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
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Participar en una Votación
        </RouterLink>
      </div>

      <div class="mt-16 text-text-secondary animate-fade-in-up-delay">
        <p class="text-md mb-2">¿Listo para empezar?</p>
        <p class="text-sm">
          Explora tus opciones en el menú lateral o haz clic en los botones de arriba.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'; // Ensure RouterLink is imported
</script>

<style scoped>
/* Animations for the welcome page */
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

@keyframes zoomIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fade-in-down {
  animation: fadeInDown 1s ease-out forwards;
}

.animate-fade-in-up {
  animation: fadeInUp 1s ease-out forwards 0.3s; /* Delay for sequential animation */
}

.animate-zoom-in {
  animation: zoomIn 1s ease-out forwards 0.6s; /* Delay for sequential animation */
}

.animate-fade-in-up-delay {
  animation: fadeInUp 1s ease-out forwards 0.9s; /* Further delay */
}
</style>
