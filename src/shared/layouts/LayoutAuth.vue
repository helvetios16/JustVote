<script setup lang="ts">
import HeaderAuth from '../components/HeaderAuth.vue';
</script>

<template>
  <div class="gradient-bg min-h-screen flex flex-col items-center justify-center">
    <header class="fixed top-0 left-0 right-0 z-50 p-6">
      <HeaderAuth />
    </header>
    <main class="flex flex-col items-center justify-center w-full mt-20">
      <div class="w-full max-w-md items-center">
        <RouterView />
      </div>
    </main>
  </div>
</template>

<style scoped>
.gradient-bg {
  background-image: linear-gradient(
    to right,
    var(--gradient-start),
    var(--gradient-mid),
    var(--gradient-end)
  );
}
</style>
