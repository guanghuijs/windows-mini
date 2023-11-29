import { createVNode, render } from 'vue';
import type { CreateWindowOptions } from '@/layout/desktop/components/typing';
// import { useDesktopStore } from '@/store/desktop';
import Window from './index.vue';

export function createWindow(options: CreateWindowOptions) {
  if (options.meta?.openByTab) {
    window.open(options.path, '_blank');
    return;
  }
  const box = document.createElement('div');
  const instance = createVNode(Window, { options });
  render(instance, box);
  document.querySelector('.desktop')!.appendChild(box);
}
