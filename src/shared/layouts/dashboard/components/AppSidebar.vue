<template>
  <aside
    class="fixed flex flex-col top-0 left-4 h-screen z-99 text-text-main px-5 border-1 rounded-xl border-card-bg w-[240px] bg-bg-main"
  >
    <div class="flex py-8 items-center">
      <h1 class="text-2xl font-bold"><JustVote /></h1>
    </div>
    <div class="flex flex-col overflow-y-auto no-scrollbar">
      <nav class="mb-6">
        <div class="flex flex-col gap-4">
          <div v-for="(menuGroups, index) in menuGroups" :key="index">
            <h2 class="mb-4 text-xs uppercase flex leading-[20px]">
              {{ menuGroups.title }}
            </h2>
            <ul class="flex flex-col gap-4">
              <li v-for="(item, itemIndex) in menuGroups.items" :key="itemIndex">
                <button class="menu-item menu-item-active">{{ item.name }}</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </aside>
</template>

<script setup lang="ts">
import JustVote from '@/shared/components/JustVote.vue';

const menuGroups = [
  {
    title: 'Menu',
    items: [
      {
        name: 'Dashboard',
        path: '/',
      },
      {
        name: 'Crear',
        path: '/create-votes',
      },
      {
        name: 'Votar',
        path: '/vote',
      },
    ],
  },
];
</script>
