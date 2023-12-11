import { createRouter, createWebHashHistory } from 'vue-router';
import type { CreateWindowOptions } from '@packages/layout';
import { menus } from '@app/router/layout';
import { Desktop, Dashboard, Login } from '@packages/layout';

const routes: Array<CreateWindowOptions> = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/desktop',
    component: Desktop,
    meta: {
      menus,
    },
  },
  {
    path: '/dashboard',
    component: Dashboard,
    redirect: '/dashboard/individuation/taskbar',
    meta: {
      menus,
    },
    children: menus,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
