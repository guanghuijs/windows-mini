import type { CreateWindowOptions } from '@packages/types/layout';
import { renderIcon } from '@packages/utils';
import { About } from '@packages/static/modules/individuation';

import { MdSubway } from '@vicons/ionicons4';

const plugInTestingRouter: CreateWindowOptions = {
  path: 'plug-in-testing',
  meta: {
    title: '关于',
    way: 'component',
    icon: renderIcon(MdSubway),
  },
  component: About,
};
export default plugInTestingRouter;
