import { defineComponent, h } from 'vue';

import type { CreateWindowOptions } from '@packages/types/layout';
import { renderIcon } from '@packages/utils';
import { ModuleOrderNo } from '../constants';

import { IosBookmarks } from '@vicons/ionicons4';

const plugInTestingRouter: CreateWindowOptions = {
  path: 'blog',
  name: 'blog',
  meta: {
    title: '博客',
    way: 'component',
    icon: renderIcon(IosBookmarks),
    orderNumber: ModuleOrderNo.BLOGS,
  },
  component: defineComponent({
    render: () =>
      h('iframe', {
        width: '100%',
        height: '100%',
        style: {
          border: 'none',
        },
        src: 'https://guanghuijs.gitee.io/gh-blogs/',
      }),
  }),
};
export default plugInTestingRouter;
