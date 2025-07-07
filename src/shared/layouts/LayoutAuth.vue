<script setup lang="ts">
import HeaderAuth from '../components/HeaderAuth.vue';
</script>

<template>
  <div class="gradient-bg min-h-screen flex flex-col items-center justify-center text-text-main">
    <header class="fixed top-0 left-0 right-0 z-50 p-6">
      <HeaderAuth />
    </header>
    <main class="flex flex-col items-center justify-center w-full mt-20">
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
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
