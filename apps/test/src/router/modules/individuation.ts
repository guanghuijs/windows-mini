import type { CreateWindowOptions } from '@packages/layout';
import {
  TaskBar,
  Desktop,
  Echarts,
  BMap,
} from '@packages/static/modules/individuation';
import { renderIcon } from '@packages/utils';

import { MdSubway, MdStar, MdPhotos, MdRainy } from '@vicons/ionicons4';

const individuationRouter: CreateWindowOptions = {
  path: 'individuation',
  meta: {
    title: '个性化',
    way: 'component',
    icon: renderIcon(MdSubway),
  },
  children: [
    {
      path: 'taskbar',
      component: TaskBar,
      meta: {
        title: '任务栏设置',
        icon: renderIcon(MdSubway),
      },
    },
    {
      path: 'desktop',
      component: Desktop,
      meta: {
        title: '桌面设置',
        icon: renderIcon(MdStar),
      },
    },
    {
      path: 'e-chart',
      component: Echarts,
      meta: {
        title: 'e-chart',
        icon: renderIcon(MdPhotos),
      },
    },
    {
      path: 'bMap',
      component: BMap,
      meta: {
        title: 'bMap',
        icon: renderIcon(MdRainy),
      },
    },
  ],
};
export default individuationRouter;
