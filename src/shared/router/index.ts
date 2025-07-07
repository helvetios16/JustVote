import { createRouter, createWebHistory } from 'vue-router';

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/shared/pages/HomeView.vue'),
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('@/shared/layouts/LayoutAuth.vue'),
      children: [
        {
          path: 'sign-in',
          name: 'sign-in',
          component: () => import('@/features/auth/pages/ViewSignIn.vue'),
        },
      ],
    },
  ],
});
