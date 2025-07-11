<template>
  <aside
    class="fixed flex flex-col top-0 left-0 h-screen z-99 text-text-main px-8 border-1 rounded-xl border-card-bg w-[240px] bg-bg-main"
  >
    <div class="flex py-8 items-center">
      <h1 class="text-2xl font-bold"><JustVote /></h1>
    </div>
    <div class="flex flex-col overflow-y-auto no-scrollbar">
      <nav class="mb-6">
        <div class="flex flex-col gap-4 text-[12px] capitalize">
          <div v-for="(menuGroups, index) in menuGroups" :key="index">
            <h2 class="mb-4 flex leading-[20px] text-text-secondary">
              {{ menuGroups.title }}
            </h2>
            <ul class="flex flex-col gap-4 text-text-main">
              <li v-for="(item, itemIndex) in menuGroups.items" :key="itemIndex">
                <RouterLink
                  :to="menuGroups.path + item.path"
                  :class="{
                    'bg-accent-start ': isActive(item.path),
                    'hover:bg-border ': !isActive(item.path),
                  }"
                  class="relative flex items-center w-full gap-3 px-3 py-2 font-medium rounded-lg transition-colors duration-200"
                  @click="navigate(item.path)"
                >
                  {{ item.name }}
                </RouterLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import JustVote from '@/shared/components/JustVote.vue';
import { RouterLink } from 'vue-router';

const currentPath = ref('/'); // Initialize with a default active path

const menuGroups = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    items: [
      {
        name: 'Principal',
        path: '/',
      },
      {
        name: 'Crear',
        path: '/create-vote',
      },
      {
        name: 'Votar',
        path: '/vote',
      },
    ],
  },
  // {
  //   title: 'Account',
  //   items: [
  //     {
  //       name: 'Profile',
  //       path: '/profile',
  //     },
  //     {
  //       name: 'Settings',
  //       path: '/settings',
  //     },
  //   ],
  // },
];

// Function to check if a path is active
const isActive = (path: string) => {
  return currentPath.value === path;
};

// Function to simulate navigation (in a real app, this would use router.push)
const navigate = (path: string) => {
  currentPath.value = path;
  // In a real application, you would use:
  // router.push(path);
};
</script>

<style scoped>
/* You can add custom styles here if needed, but Tailwind handles most of it. */
</style>
