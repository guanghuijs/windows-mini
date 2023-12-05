import { render, h, unref } from 'vue';
import type { CreateWindowOptions } from '@/layout/desktop/components/typing';
import Window from './index.vue';
import { useDesktopStore, useDesktopStoreRefs } from '../../store';

export function createWindow(
  options: CreateWindowOptions,
  defaultView?: string
) {
  if (options.meta?.openByTab) {
    window.open(options.path, '_blank');
    return;
  }

  const { zIndex, windowPoint } = useDesktopStoreRefs();
  const { addZIndex, excursionWindowPoint } = useDesktopStore();
  addZIndex();
  excursionWindowPoint('new');
  const winId = 'winid' + new Date().getTime();
  const div = document.createElement('div');
  div.setAttribute('winId', winId);
  console.log(windowPoint.value);
  div.style.zIndex = zIndex.value;
  document.querySelector('.desktop')!.appendChild(div);
  render(
    h(Window, { options, defaultView, windowPoint: unref(windowPoint) }),
    document.querySelector(`div[winid=${winId}]`)!
  );
  div.classList.add('window-id');
}
