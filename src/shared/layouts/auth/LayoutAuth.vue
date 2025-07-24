<script setup lang="ts">
import HeaderAuth from '@/shared/layouts/auth/components/HeaderAuth.vue';
</script>

<template>
  <div
    class="gradient-bg min-h-screen flex flex-col items-center justify-center text-text-main overflow-hidden"
  >
    <div
      class="subtle-glow w-[400px] h-[400px] bg-purple-600 top-[-100px] right-[-80px] animate-pulse"
    ></div>
    <div
      class="subtle-glow w-[300px] h-[300px] bg-indigo-600 bottom-[-80px] left-[-100px] animate-pulse animation-delay-2000"
    ></div>
    <div
      class="subtle-glow w-[250px] h-[250px] bg-pink-500 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] animate-pulse animation-delay-4000 opacity-20"
    ></div>

    <header class="fixed left-0 top-0 z-50 p-6">
      <HeaderAuth />
    </header>
    <main class="flex flex-col items-center justify-center w-full">
      <div class="w-full max-w-md items-center">
        <transition name="fade" mode="out-in">
          <RouterView />
        </transition>
      </div>
    </main>
  </div>
</template>

<style scoped>
.gradient-bg {
  background: linear-gradient(to right, #0f172a, #1e1b4b);
  position: relative;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.subtle-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.3;
  pointer-events: none;
}

html,
body {
  overflow-x: hidden;
}
</style>
