<script setup lang="ts">
import AppSidebar from './components/AppSidebar.vue';
</script>

<template>
  <div class="gradient-bg min-h-screen text-text-main">
    <AppSidebar />
    <main class="flex flex-col ml-[240px]">
      <transition name="fade" mode="out-in">
        <RouterView />
      </transition>
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
