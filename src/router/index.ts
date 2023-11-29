import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordSortRaw } from '@/router/type';
const modules = import.meta.globEager('./modules/**/*.ts');

const routes: Array<RouteRecordSortRaw> = [
  {
    path: '/',
    component: () => import('@/layout/desktop/index.vue'),
  },
];

Object.keys(modules).forEach((key) => {
  routes.push((modules[key] as any).default);
});

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
