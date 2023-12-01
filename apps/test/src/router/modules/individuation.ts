import type { CreateWindowOptions } from '@packages/layout';

const individuationRouter: CreateWindowOptions = {
  path: '/individuation',
  component: () => import('@packages/static/modules/individuation/index.vue'),
  meta: {
    title: '个性化',
    way: 'component',
  },
  children: [
    {
      path: 'tackBar',
      component: () =>
        import('@packages/static/modules/individuation/index.vue'),
    },
  ],
};
export default individuationRouter;
