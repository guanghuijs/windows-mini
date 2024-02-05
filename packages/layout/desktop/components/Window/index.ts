import { render, h, unref } from 'vue';
import type { CreateWindowOptions } from '@packages/types/layout';
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

  const { zIndex, windowPoint, minimizeList } = useDesktopStoreRefs();
  const { excursionWindowPoint, addMinimizeList } = useDesktopStore();

  const index = unref(minimizeList).findIndex(
    (item) => item.length && item[0]?.path === options.path
  );
  if (index !== -1 && unref(minimizeList)[index].length >= 2) {
    console.error('同一模块最多打开两个窗口');
    return;
  }

  zIndex.value++;
  excursionWindowPoint('new');
  const winId = 'winid' + new Date().getTime();
  const div = document.createElement('div');
  div.setAttribute('winId', winId);
  div.style.zIndex = zIndex.value;
  document.querySelector('.desktop')?.appendChild(div);
  const win = h(Window, {
    options,
    defaultView,
    windowPoint: unref(windowPoint),
  });
  render(win, document.querySelector(`div[winid=${winId}]`)!);
  div.classList.add('window-id');
  addMinimizeList(Object.assign(options, { el: div, winId, comp: win }));
}
