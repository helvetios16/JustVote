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
          path: 'sign-in',
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
          path: 'create',
          name: 'dashboard-create-vote',
          component: () => import('@/features/create/pages/ViewCreate.vue'),
        },
        {
          path: 'create/:id',
          name: 'dashboard-create-singular',
          component: () => import('@/features/create/pages/ViewCreation.vue'),
          props: true,
        },
        {
          path: 'vote',
          name: 'dashboard-vote',
          component: () => import('@/features/vote/pages/ViewVotes.vue'),
          children: [],
        },
        {
          path: 'vote/:id',
          name: 'create-id',
          component: () => import('@/features/vote/pages/ViewVoting.vue'),
          props: true,
        },
        {
          path: 'creations',
          name: 'dashboard-creations',
          component: () => import('@/features/create/pages/ViewMyCreations.vue'),
        },
        {
          path: 'history',
          name: 'dashboard-history',
          component: () => import('@/features/vote/pages/ViewVoteHistory.vue'),
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = getToken();
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && !isAuthenticated) {
    next({ name: 'sign-in' });
  } else {
    next();
  }
});
