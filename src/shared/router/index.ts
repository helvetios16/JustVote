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
      component: () => import('@/shared/layouts/auth/LayoutAuth.vue'),
      children: [
        {
          path: 'sign-in',
          name: 'sign-in',
          component: () => import('@/features/auth/pages/ViewSignIn.vue'),
        },
      ],
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/shared/layouts/dashboard/LayoutDashboard.vue'),
      children: [
        {
          path: '',
          name: 'dashboard-home',
          component: () => import('@/features/dashboard/pages/ViewDashboardHome.vue'),
        },
        {
          path: 'create-vote',
          name: 'dashboard-create-vote',
          component: () => import('@/features/dashboard/pages/ViewDashboardCreate.vue'),
        },
        {
          path: 'vote',
          name: 'dashboard-vote',
          component: () => import('@/features/dashboard/pages/ViewDashboardVote.vue'),
        },
      ],
    },
  ],
});
