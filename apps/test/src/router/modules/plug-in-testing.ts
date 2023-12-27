import type { CreateWindowOptions } from '@packages/types/layout';
import { Echarts, BMap } from '@packages/static/modules/individuation';
import { renderIcon } from '@packages/utils';
import { MdBoat, MdPhotos, MdRainy } from '@vicons/ionicons4';
import { ModuleOrderNo } from '../constants';

const plugInTestingRouter: CreateWindowOptions = {
  path: 'plug-in-testing',
  meta: {
    title: '插件测试',
    way: 'component',
    icon: renderIcon(MdBoat),
    orderNumber: ModuleOrderNo.PLUGIN,
  },
  children: [
    {
      path: 'e-chart',
      name: 'e-chart',
      component: Echarts,
      meta: {
        title: 'e-chart',
        icon: renderIcon(MdPhotos),
      },
    },
    {
      path: 'bMap',
      name: 'bMap',
      component: BMap,
      meta: {
        title: 'bMap',
        icon: renderIcon(MdRainy),
      },
    },
  ],
};
export default plugInTestingRouter;
