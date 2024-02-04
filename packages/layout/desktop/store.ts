import { ref, unref } from 'vue';
import { defineStore, storeToRefs } from 'pinia';
import { Random } from 'mockjs';

import { PickProp } from '@packages/types';
import { DesktopStore, CreateWindowOptions } from '@packages/types/layout';
import { bgs } from '@packages/static/background';
import { winStoreWithLocal } from './utils';

export const useDesktopStore = defineStore('desktop', () => {
  const primaryColor = winStoreWithLocal<
    PickProp<DesktopStore, 'primaryColor'>
  >('primaryColor', '#008000');

  const desktopBg = winStoreWithLocal<PickProp<DesktopStore, 'desktopBg'>>(
    'desktopBg',
    `url(${bgs[0]})`
  );

  const desktopBgNext = () => {
    desktopBg.value = `url(${bgs[Random.integer(0, bgs.length - 1)]})`;
  };

  const isQuickToggleBg = winStoreWithLocal<
    PickProp<DesktopStore, 'isQuickToggleBg'>
  >('isQuickToggleBg', false);

  const taskBarPosition = winStoreWithLocal<
    PickProp<DesktopStore, 'taskBarPosition'>
  >('taskBarPosition', 'bottom');

  const compTransitionMode = winStoreWithLocal<
    PickProp<DesktopStore, 'compTransitionMode'>
  >('compTransitionMode', 'opacity');

  const theme = winStoreWithLocal<PickProp<DesktopStore, 'theme'>>(
    'theme',
    'light'
  );

  const taskBarIconAlign = winStoreWithLocal<
    PickProp<DesktopStore, 'taskBarIconAlign'>
  >('taskBarIconAlign', 'center');

  const windowTransparency = winStoreWithLocal<
    PickProp<DesktopStore, 'windowTransparency'>
  >('windowTransparency', 100);

  /**
   * 窗口最高层级
   */
  const zIndex = ref(20);

  // 窗口打开偏移坐标
  const windowPoint = ref({
    x: 130,
    y: 80,
  });

  /**
   * 偏移后打开窗口起始坐标
   * @param flag
   * @param point
   */
  const excursionWindowPoint = (
    flag: 'new' | 'drag',
    point: { x: number; y: number }
  ) => {
    const { x: starX, y: starY } = unref(windowPoint);
    if (flag === 'new') {
      windowPoint.value = {
        x: starX + 20,
        y: starY + 20,
      };
    }

    if (flag === 'drag') {
      windowPoint.value = point;
    }
  };

  // 最小化
  const minimizeList = ref<CreateWindowOptions[][]>([]);

  /**
   * 桌面任务栏图标
   * @param minimizeMenu
   */
  const addMinimizeList = (minimizeMenu: CreateWindowOptions) => {
    // const { path } = minimizeMenu;
    // const index = minimizeList.value.findIndex(
    //   (item) => item.length && item[0]?.path === path
    // );
    // if (index === -1) minimizeList.value.push([minimizeMenu]);
    // else minimizeList.value[index].push(minimizeMenu);
    minimizeList.value.push(minimizeMenu);
  };

  return {
    taskBarPosition,
    zIndex,
    windowPoint,
    excursionWindowPoint,
    minimizeList,
    addMinimizeList,
    desktopBg,
    primaryColor,
    desktopBgNext,
    isQuickToggleBg,
    compTransitionMode,
    theme,
    taskBarIconAlign,
    windowTransparency,
  };
});

export function useDesktopStoreRefs() {
  return storeToRefs(useDesktopStore());
}
