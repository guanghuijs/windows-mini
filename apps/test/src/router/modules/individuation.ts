import type { CreateWindowOptions } from '@packages/layout';

const individuationRouter: CreateWindowOptions = {
  path: '/individuation',
  meta: {
    title: '个性化',
    way: 'component',
  },
  children: [
    {
      path: '/tackBar',
      component: () =>
        import('@packages/static/modules/individuation/TaskBar.vue'),
      meta: {
        title: '任务栏设置',
      },
    },
    {
      path: '/desktop',
      component: () =>
        import('@packages/static/modules/individuation/Desktop.vue'),
      meta: {
        title: '桌面设置',
      },
    },
  ],
};
export default individuationRouter;
