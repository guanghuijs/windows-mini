import type { CreateWindowOptions } from '@packages/types/layout';
import { TableDemo } from '@packages/static/modules/demo';

import { ModuleOrderNo } from '@app/router/constants';
import { renderIcon } from '@packages/utils';
import { IosImages } from '@vicons/ionicons4';

const demoRouter: CreateWindowOptions = {
  path: 'demo',
  meta: {
    title: 'demo',
    way: 'component',
    icon: renderIcon(IosImages),
    orderNumber: ModuleOrderNo.DEMO,
  },
  children: [
    {
      path: 'table',
      name: 'table',
      component: TableDemo,
      meta: {
        title: '表格',
      },
    },
  ],
};
export default demoRouter;
