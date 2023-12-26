import type { CreateWindowOptions } from '@packages/types/layout';
import {
  Theme,
  TaskBar,
  Desktop,
  Window,
} from '@packages/static/modules/individuation';
import { renderIcon } from '@packages/utils';

import { MdSubway, MdStar } from '@vicons/ionicons4';
import { ModuleOrderNo } from '@app/router/constants';

const individuationRouter: CreateWindowOptions = {
  path: 'individuation',
  meta: {
    title: '个性化',
    way: 'component',
    icon: renderIcon(MdSubway),
    orderNumber: ModuleOrderNo.INDIVIDUATION,
  },
  children: [
    {
      path: 'theme',
      component: Theme,
      meta: {
        title: '主题设置',
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
      path: 'taskbar',
      component: TaskBar,
      meta: {
        title: '任务栏设置',
        icon: renderIcon(MdSubway),
      },
    },
    {
      path: 'window',
      component: Window,
      meta: {
        title: '窗口设置',
        icon: renderIcon(MdSubway),
      },
    },
  ],
};
export default individuationRouter;
