import { createRouter, createWebHashHistory } from 'vue-router';

import { menus } from '@app/router/layout';
import { Desktop, Dashboard, Login } from '@packages/layout';
import type { CreateWindowOptions } from '@packages/types/layout';

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
    redirect: '/dashboard/individuation/theme',
    meta: {
      menus,
    },
    children: menus,
  },
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
});
