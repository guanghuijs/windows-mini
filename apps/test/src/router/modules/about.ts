import { defineComponent, h } from 'vue';
import type { CreateWindowOptions } from '@packages/types/layout';
import { renderIcon } from '@packages/utils';
import { ModuleOrderNo } from '../constants';

import { IosLeaf } from '@vicons/ionicons4';

const plugInTestingRouter: CreateWindowOptions = {
  path: 'about',
  name: 'about',
  meta: {
    title: '关于',
    way: 'component',
    icon: renderIcon(IosLeaf),
    orderNumber: ModuleOrderNo.ABOUT,
  },
  // component: defineComponent({
  //   render: () =>
  //     h('iframe', {
  //       width: '100%',
  //       height: '100%',
  //       style: {
  //         border: 'none',
  //       },
  //       src: 'https://guanghuijs.gitee.io/gh-blogs/uiIntro.html',
  //     }),
  // }),
  component: defineComponent(() => {
    return () => h('div', '插件测试');
  }, {}),
};
export default plugInTestingRouter;
