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

type A = {
  a: string;
  b: string;
  readonly c: string;
};

// function f<T>(a: Partial<T>) {}
// f<A>({});

type B = Pick<A, 'a' | 'b'>;

// function f(a: B) {}
// f({ a: '', b: '' });

type C = Record<'id', A>;
function f(a: C) {}
f({ id: undefined, a: '', b: '' });

type D = Exclude<A, C>;

export default router;
