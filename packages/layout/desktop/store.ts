import { computed, ref, unref } from 'vue';
import { defineStore, storeToRefs } from 'pinia';
import { Random } from 'mockjs';

import { getLocalStore, setLocalStore } from '@packages/utils';
import { GetPropType } from '@packages/types';
import { DesktopStore, CreateWindowOptions } from '@packages/types/layout';
import { bgs } from '@packages/static/background';

export const useDesktopStore = defineStore('desktop', () => {
  const taskBarPosition = ref(
    getLocalStore<DesktopStore>('desktopStore').taskBarPosition || 'bottom'
  );

  const systemMenuDirection = computed(() => {
    return taskBarPosition.value === 'bottom'
      ? 'translateY(30px)'
      : 'translateY(-30px)';
  });

  const setTaskBarPosition = (
    position: GetPropType<DesktopStore, 'taskBarPosition'>
  ) => {
    const store = getLocalStore<DesktopStore>('desktopStore');
    store.taskBarPosition = position;
    setLocalStore('desktopStore', store);
    taskBarPosition.value = position;
  };

  const zIndex = ref(20);
  const addZIndex = () => {
    zIndex.value++;
  };

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
    const { path } = minimizeMenu;
    const index = minimizeList.value.findIndex(
      (item) => item.length && item[0]?.path === path
    );
    if (index === -1) minimizeList.value.push([minimizeMenu]);
    else minimizeList.value[index].push(minimizeMenu);
  };

  // 主题颜色
  const primaryColor = ref('#008000');

  //桌面背景
  const desktopBg = ref(`url(${bgs[Random.integer(0, bgs.length - 1)]})`);

  // 随机背景
  const desktopBgNext = () => {
    desktopBg.value = `url(${bgs[Random.integer(0, bgs.length - 1)]})`;
  };

  // 开启桌面快捷切换背景快捷键
  const isQuickToggleBg = ref(true);

  const compTransitionMode = ref('opacity');

  // 桌面主题
  const theme = ref<GetPropType<DesktopStore, 'theme'>>('light');

  // 任务栏图标对齐方式
  const taskBarIconAlign =
    ref<GetPropType<DesktopStore, 'taskBarIconAlign'>>('left');

  // 窗口透明度
  const windowTransparency =
    ref<GetPropType<DesktopStore, 'WindowTransparency'>>(100);

  return {
    taskBarPosition,
    setTaskBarPosition,
    systemMenuDirection,
    zIndex,
    addZIndex,
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
