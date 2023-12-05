import type { CreateWindowOptions } from '@packages/layout';
import {
  TaskBar,
  Desktop,
  Echarts,
  BMap,
} from '@packages/static/modules/individuation';

const individuationRouter: CreateWindowOptions = {
  path: 'individuation',
  meta: {
    title: '个性化',
    way: 'component',
  },
  children: [
    {
      path: 'taskbar',
      component: TaskBar,
      meta: {
        title: '任务栏设置',
      },
    },
    {
      path: 'desktop',
      component: Desktop,
      meta: {
        title: '桌面设置',
      },
    },
    {
      path: 'e-chart',
      component: Echarts,
      meta: {
        title: 'e-chart',
      },
    },
    {
      path: 'bMap',
      component: BMap,
      meta: {
        title: 'bMap',
      },
    },
  ],
};
export default individuationRouter;
