import { createRouter, createWebHistory } from 'vue-router';
import type { CreateWindowOptions } from '@packages/layout';
import { menus } from '@app/router/layout';
import { Desktop, Dashboard } from '@packages/layout';

const routes: Array<CreateWindowOptions> = [
  {
    path: '/',
    redirect: 'dashboard',
    children: [
      {
        path: 'desktop',
        component: Desktop,
        meta: {
          menus,
        },
      },
      {
        path: 'dashboard',
        component: Dashboard,
        meta: {
          menus,
        },
        children: [
          {
            path: 'individuation',
            meta: {
              title: '个性化',
              way: 'component',
            },
            children: [
              {
                path: 'taskbar',
                component: () =>
                  import('@packages/static/modules/individuation/TaskBar.vue'),
                meta: {
                  title: '任务栏设置',
                },
              },
              {
                path: 'desktop',
                component: () =>
                  import('@packages/static/modules/individuation/Desktop.vue'),
                meta: {
                  title: '桌面设置',
                },
              },
            ],
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
