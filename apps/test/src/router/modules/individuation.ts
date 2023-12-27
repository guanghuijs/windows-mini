import type { CreateWindowOptions } from '@packages/types/layout';
import {
  Theme,
  TaskBar,
  Desktop,
  Window,
} from '@packages/static/modules/individuation';
import { renderIcon } from '@packages/utils';

import {
  IosImages,
  LogoWindows,
  IosDesktop,
  IosColorPalette,
  MdLaptop,
} from '@vicons/ionicons4';
import { ModuleOrderNo } from '@app/router/constants';

const individuationRouter: CreateWindowOptions = {
  path: 'individuation',
  meta: {
    title: '个性化',
    way: 'component',
    icon: renderIcon(IosImages),
    orderNumber: ModuleOrderNo.INDIVIDUATION,
  },
  children: [
    {
      path: 'theme',
      name: 'theme',
      component: Theme,
      meta: {
        title: '主题设置',
        icon: renderIcon(IosColorPalette),
      },
    },
    {
      path: 'desktop',
      name: 'desktop',
      component: Desktop,
      meta: {
        title: '桌面设置',
        icon: renderIcon(IosDesktop),
      },
    },
    {
      path: 'taskbar',
      name: 'taskbar',
      component: TaskBar,
      meta: {
        title: '任务栏设置',
        icon: renderIcon(LogoWindows),
      },
    },
    {
      path: 'window',
      name: 'window',
      component: Window,
      meta: {
        title: '窗口设置',
        icon: renderIcon(MdLaptop),
      },
    },
  ],
};
export default individuationRouter;
