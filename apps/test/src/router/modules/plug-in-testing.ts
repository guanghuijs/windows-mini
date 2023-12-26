import type { CreateWindowOptions } from '@packages/types/layout';
import { Echarts, BMap } from '@packages/static/modules/individuation';
import { renderIcon } from '@packages/utils';

import { MdSubway, MdPhotos, MdRainy } from '@vicons/ionicons4';

const plugInTestingRouter: CreateWindowOptions = {
  path: 'plug-in-testing',
  meta: {
    title: '插件测试',
    way: 'component',
    icon: renderIcon(MdSubway),
  },
  children: [
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
export default plugInTestingRouter;
