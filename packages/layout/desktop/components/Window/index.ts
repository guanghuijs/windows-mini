import { render, h } from 'vue';
import type { CreateWindowOptions } from '@/layout/desktop/components/typing';
import Window from './index.vue';

export function createWindow(options: CreateWindowOptions) {
  if (options.meta?.openByTab) {
    window.open(options.path, '_blank');
    return;
  }
  const winId = 'winid' + new Date().getTime();
  const div = document.createElement('div');
  div.setAttribute('winId', winId);
  document.querySelector('.desktop')!.appendChild(div);
  render(
    h(Window, { options }),
    document.querySelector(`div[winid=${winId}]`)!
  );
  div.classList.add('window-id');
}
