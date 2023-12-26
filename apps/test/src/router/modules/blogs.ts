import { h } from 'vue';

import type { CreateWindowOptions } from '@packages/types/layout';
import { renderIcon } from '@packages/utils';
import { ModuleOrderNo } from '../constants';

import { MdSubway } from '@vicons/ionicons4';

const plugInTestingRouter: CreateWindowOptions = {
  path: 'blog',
  meta: {
    title: '博客',
    way: 'component',
    icon: renderIcon(MdSubway),
    orderNumber: ModuleOrderNo.BLOGS,
  },
  component: h('iframe', {
    width: '100%',
    height: '100%',
    style: {
      border: 'none',
    },
    src: 'https://guanghuijs.gitee.io/gh-blogs/',
  }),
};
export default plugInTestingRouter;
