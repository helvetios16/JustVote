<template>
  <div class="form-container p-8 md:p-12 rounded-xl shadow-2xl w-full max-w-md text-white">
    <button
      class="w-full button-gradient-logo text-white font-medium py-3 px-4 rounded-lg hover:opacity-90 transition duration-200 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500"
      type="button"
    >
      <img alt="Google logo" class="w-5 h-5 mr-3" :src="logoGoogle" />

      Sign in with Google
    </button>

    <!-- GitHub -->
    <button
      class="mt-4 w-full button-gradient-logo text-white font-medium py-3 px-4 rounded-lg hover:opacity-90 transition duration-200 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-gray-500"
      type="button"
    >
      <img alt="GitHub logo" class="w-5 h-5 mr-3" :src="logoGithub" />
      Sign in with GitHub
    </button>

    <!-- Microsoft -->
    <button
      class="mt-4 w-full button-gradient-logo text-white font-medium py-3 px-4 rounded-lg hover:opacity-90 transition duration-200 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500"
      type="button"
    >
      <img alt="Microsoft logo" class="w-5 h-5 mr-3" :src="logoMicrosoft" />
      Sign in with Microsoft
    </button>
  </div>
</template>

<script setup lang="ts">
import logoGoogle from '@/shared/assets/icon/logo_google.svg';
import logoGithub from '@/shared/assets/icon/logo_github.svg';
import logoMicrosoft from '@/shared/assets/icon/logo_microsoft.svg';
</script>

<style scoped>
.form-container {
  background-color: var(--form-bg);
  backdrop-filter: blur(10px);
}

.button-gradient-logo {
  background: linear-gradient(to right, #4f46e5, #d946ef);
}
</style>
