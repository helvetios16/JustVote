<template>
  <aside
    class="fixed flex flex-col top-0 left-0 h-screen z-99 text-text-main px-8 border-card-bg w-[240px] bg-bg-main"
  >
    <div class="flex py-8 items-center">
      <RouterLink to="/" class="text-2xl font-bold"> <JustVote /> </RouterLink>
    </div>
    <div class="flex flex-col overflow-y-auto no-scrollbar">
      <nav class="mb-6">
        <div class="flex flex-col gap-4 text-[14px] capitalize">
          <div v-for="(menuGroups, index) in menuGroups" :key="index">
            <h2 class="mb-4 flex leading-[20px] text-text-secondary">
              {{ menuGroups.title }}
            </h2>
            <ul class="flex flex-col gap-4 text-text-main">
              <li v-for="(item, itemIndex) in menuGroups.items" :key="itemIndex">
                <RouterLink
                  :to="menuGroups.path + item.path"
                  :class="{
                    'bg-accent-start text-white': isActive(menuGroups.path + item.path),
                    'hover:bg-border text-text-main': !isActive(menuGroups.path + item.path),
                  }"
                  class="relative flex items-center w-full gap-3 px-3 py-2 font-medium rounded-lg transition-colors duration-200"
                  aria-current="page"
                  exact-active-class="bg-accent-start text-white"
                >
                  {{ item.name }}
                </RouterLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>

    <!-- User Profile Section -->
    <div class="mt-auto flex flex-col gap-4 p-4 border-t border-border">
      <div class="flex items-center gap-4">
        <div class="user-avatar bg-accent-start text-text-main">
          <img
            v-if="userPicture"
            :src="userPicture"
            alt="User profile picture"
            class="w-full h-full rounded-full object-cover"
          />
          <span v-else class="text-xl">{{ userInitial }}</span>
        </div>
        <span class="font-medium capitalize">{{ formattedUserName }}</span>
      </div>
      <button
        @click="logout"
        class="w-full py-2 px-4 bg-fuchsia-600 text-white rounded-lg hover:bg-fuchsia-900 transition-colors duration-200"
      >
        Cerrar Sesión
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, reactive } from 'vue';
import JustVote from '@/shared/components/JustVote.vue';
import { RouterLink, useRouter } from 'vue-router';

const router = useRouter();
const currentPath = ref('/'); // Initialize with a default active path

const menuGroups = reactive([
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
]);

const userName = ref('');
const userPicture = ref('');

onMounted(() => {
  const userData = sessionStorage.getItem('user');
  if (userData) {
    const user = JSON.parse(userData);
    userName.value = user.name || 'Anonymous';
    userPicture.value = user.picture || '';
  }
});

const userInitial = computed(() => {
  return userName.value ? userName.value.charAt(0).toUpperCase() : '';
});

const formattedUserName = computed(() => {
  if (!userName.value) return '';
  const lowerCaseUserName = userName.value.toLowerCase();
  const nameParts = lowerCaseUserName.split(' ');
  if (nameParts.length >= 3) {
    return `${nameParts[0]} ${nameParts[2]}`;
  }
  return userName.value;
});

// Function to check if a path is active
const isActive = (path: string) => {
  return currentPath.value === path;
};

const logout = () => {
  sessionStorage.clear();
  router.push('/auth/sign-in');
};
</script>

<style scoped>
.user-avatar {
  width: 75px;
  height: 42px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}
</style>
