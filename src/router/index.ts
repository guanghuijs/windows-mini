import { createRouter, createWebHashHistory } from 'vue-router';
import type { RouteRecordSortRaw } from '@/router/type';

const routes: Array<RouteRecordSortRaw> = [
  {
    path: '/',
    component: () => import('@/layout/desktop/index.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
