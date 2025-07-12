import { createRouter, createWebHistory } from 'vue-router';
import { getToken } from '@/features/auth/services/authService';

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
          path: 'signin',
          name: 'sign-in',
          component: () => import('@/features/auth/pages/ViewSignIn.vue'),
        },
        {
          path: 'google-callback',
          name: 'google-callback',
          component: () => import('@/features/auth/pages/ViewGoogleCallback.vue'),
        },
      ],
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/shared/layouts/dashboard/LayoutDashboard.vue'),
      meta: { requiresAuth: true },
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
          children: [],
        },
        {
          path: 'vote/:id',
          name: 'votes',
          component: () => import('@/features/vote/pages/ViewVotingWithCamera.vue'),
          props: true,
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = getToken();
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && !isAuthenticated) {
    next({ name: 'signin' });
  } else {
    next();
  }
});
