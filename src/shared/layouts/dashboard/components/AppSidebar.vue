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
          <div v-for="(menuGroup, gIndex) in menuGroups" :key="gIndex">
            <h2 class="mb-4 flex leading-[20px] text-text-secondary">
              {{ menuGroup.title }}
            </h2>
            <ul class="flex flex-col gap-4 text-text-main">
              <li v-for="(item, iIndex) in menuGroup.items" :key="iIndex">
                <RouterLink
                  v-if="item.path && !item.items"
                  :to="item.path"
                  :class="{
                    'bg-accent-start text-white': isActive(item.path),
                    'hover:bg-border text-text-main': !isActive(item.path),
                  }"
                  class="relative flex items-center w-full gap-3 px-3 py-2 font-medium rounded-lg transition-colors duration-200"
                  aria-current="page"
                  exact-active-class="bg-accent-start text-white"
                >
                  {{ item.name }}
                </RouterLink>
                <div v-if="item.items">
                  <h3 class="px-3 mb-2 font-semibold text-text-secondary">{{ item.name }}</h3>
                  <ul class="flex flex-col gap-2">
                    <li v-for="(subItem, sIndex) in item.items" :key="sIndex">
                      <RouterLink
                        :to="subItem.path"
                        :class="{
                          'bg-accent-start text-white': isActive(subItem.path),
                          'hover:bg-border text-text-main': !isActive(subItem.path),
                        }"
                        class="relative flex items-center w-full gap-3 pl-6 pr-3 py-2 font-medium rounded-lg transition-colors duration-200"
                        aria-current="page"
                        exact-active-class="bg-accent-start text-white"
                      >
                        {{ subItem.name }}
                      </RouterLink>
                    </li>
                  </ul>
                </div>
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
import { ref, onMounted, computed, reactive, watch } from 'vue';
import JustVote from '@/shared/components/JustVote.vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
const currentPath = ref(route.path);

watch(
  () => route.path,
  (newPath) => {
    currentPath.value = newPath;
  },
);

const menuGroups = reactive([
  {
    title: 'Menu',
    items: [
      {
        name: 'Dashboard',
        path: '/dashboard',
      },
      {
        name: 'Creaciones',
        items: [
          {
            name: 'Crear Votación',
            path: '/dashboard/create',
          },
          {
            name: 'Mis Votaciones',
            path: '/dashboard/creations',
          },
        ],
      },
      {
        name: 'Votaciones',
        items: [
          {
            name: 'Eventos Actuales',
            path: '/dashboard/vote',
          },
          {
            name: 'Eventos Pasados',
            path: '/dashboard/history',
          },
        ],
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
