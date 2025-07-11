import { defineStore } from 'pinia';
import { ref } from 'vue';

export const usePathStore = defineStore('path', () => {
  // State: The current active path
  const currentPath = ref<string>('/');

  // Action: To update the current path
  const setPath = (path: string) => {
    currentPath.value = path;
  };

  // No getters needed if we directly expose currentPath and use it in isActive.
  // If you needed a more complex active check, a getter could be:
  // const isActiveRoute = (pathToCheck: string) => currentPath.value === pathToCheck;

  return {
    currentPath,
    setPath,
  };
});
