import { createRouter, createWebHashHistory } from 'vue-router';
import type { CreateWindowOptions } from '@packages/types/layout';
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
    redirect: '/dashboard/individuation/theme',
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
  b: number;
  readonly c: string;
};

export default router;

// function f<T>(a: Partial<T>) {}
// f<A>({});

type B = Pick<A, 'a' | 'b'>;

// function f(a: B) {}
// f({ a: '', b: '' });

type C = Record<'id', string>;

export const cc: C = { id: '' };

type D = Exclude<A, C>;

type E = keyof A;

type F = {
  [K in keyof A]: A[K];
};

const ff: F = { a: '', b: 0, c: '' };
// Cannot assign to c because it is a read-only property
// ff.c = '';

type G = {
  [K in 'a' | 'b' | 'c']: string;
};

const gg: G = { a: '', b: '', c: '' };

function g1<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
function g2<T>(obj: T, key: keyof T) {
  return obj[key];
}
g1({ name: '', age: '' }, 'name');
g2({ name: '', age: '' }, 'name');

type GetType<T> = T extends { b: infer R } ? R : T;
type GetTypeA = GetType<A>;

const typeofTest = { name: '', age: '' };
export const typeofUse: typeof typeofTest = { name: '', age: '' };

interface HH {
  name: string;
  age: number;
  sex: number;
}

const hh: Pick<HH, 'name' | 'age'> = { name: '', age: 0 };
const hhh: Omit<HH, 'name' | 'age'> = { sex: 66 };
const hhhh: Partial<HH> = { name: '' };

type GetTypeBase = {
  position: 'left' | 'top';
  size: 'big' | 'small' | 'middle';
};

// [P in K]: T[P];
type getType<T, K extends keyof T> = T extends { [P in K]: infer R } ? R : T;
type AAA = getType<GetTypeBase, 'position'>;
type BBB = getType<GetTypeBase, 'size'>;
const aaa: AAA = 'left';
const bbb: BBB = 'small';
