import type { CreateWindowOptions } from '@/router/type';

const individuationRouter: CreateWindowOptions = {
  path: '/individuation',
  component: () => import('@/layout/individuation/index.vue'),
  meta: {
    title: '个性化',
    way: 'component',
  },
  children: [
    {
      path: 'tackBar',
      component: () => import('@/layout/individuation/src/TaskBar.vue'),
    },
  ],
};
export default individuationRouter;
