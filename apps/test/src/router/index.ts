import { createRouter, createWebHistory } from 'vue-router';
import type { CreateWindowOptions } from '@packages/layout';
const modules = import.meta.globEager('./modules/**/*.ts');
import { menus } from '@app/router/layout';

const routes: Array<CreateWindowOptions> = [
  {
    path: '/',
    component: () => import('@packages/layout'),
    meta: {
      menus,
    },
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
