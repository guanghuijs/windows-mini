import { ref, unref } from 'vue';
import { defineStore, storeToRefs } from 'pinia';
import { Random } from 'mockjs';

import { CreateWindowOptions } from '@packages/types/layout';
import { bgs } from '@packages/static/background';

const { VITE_APP_NAME } = import.meta.env;
export const useDesktopStore = defineStore(
  'desktop',
  () => {
    // 主题颜色
    const primaryColor = ref('#008000');
    const desktopBg = ref(`url(${bgs[0]})`);
    const desktopBgNext = () => {
      desktopBg.value = `url(${bgs[Random.integer(0, bgs.length - 1)]})`;
    };
    // 桌面快捷切换背景按钮
    const isQuickToggleBg = ref(false);
    // 任务量位置
    const taskBarPosition = ref('bottom');
    // 窗口组件过渡方式
    const compTransitionMode = ref('opacity');
    // 主题
    const theme = ref('light');
    // 任务栏对其方式
    const taskBarIconAlign = ref('center');
    // 窗口偏移像素
    const windowTransparency = ref(100);

    /**
     * 窗口最高层级
     */
    const zIndex = ref<number>(20);

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
      flag: 'new' | 'drag' | 'close',
      point: { x: number; y: number }
    ) => {
      const { x: starX, y: starY } = unref(windowPoint);
      if (flag === 'new') {
        windowPoint.value = {
          x: starX + 20,
          y: starY + 20,
        };
        if (minimizeList.value.length === 0) {
          windowPoint.value = {
            x: 130,
            y: 80,
          };
        }
      }

      if (flag === 'drag') {
        windowPoint.value = point;
      }

      if (flag === 'close') {
        windowPoint.value = point;
      }
    };

    // 最小化
    const minimizeList = ref<Array<CreateWindowOptions>>([]);

    /**
     * 桌面任务栏图标
     * @param minimizeMenu
     */
    const addMinimizeList = (minimizeMenu: CreateWindowOptions) => {
      const { path } = minimizeMenu;
      const index = unref(minimizeList).findIndex(
        (item) => item.length && item[0]?.path === path
      );
      if (index === -1) {
        minimizeList.value.push([minimizeMenu]);
      } else {
        if (unref(minimizeList)[index].length < 2) {
          minimizeList.value[index].push(minimizeMenu);
        }
      }
      // minimizeList.value.push(minimizeMenu);
    };

    /**
     * 窗口关闭
     * @param minimizeMenu
     */
    const minimizeWithClose = (minimizeMenu: CreateWindowOptions) => {
      const moduleIndex = unref(minimizeList).findIndex(
        (item) => item.length && item[0]?.path === minimizeMenu.path
      );
      const winIndex = unref(minimizeList)[moduleIndex].findIndex(
        (item) => item.winId === minimizeMenu.winId
      );
      if (unref(minimizeList)[moduleIndex].length > 1) {
        minimizeList.value[moduleIndex].splice(winIndex, 1);
      } else {
        minimizeList.value.splice(moduleIndex, 1);
      }
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
      minimizeWithClose,
    };
  },
  {
    persist: {
      key: VITE_APP_NAME + '_desktop_store',
      storage: localStorage,
      pick: [
        'primaryColor',
        'desktopBg',
        'isQuickToggleBg',
        'taskBarPosition',
        'compTransitionMode',
        'theme',
        'taskBarIconAlign',
        'windowTransparency',
      ], // 仅持久化 count 字段
    },
  }
);

export function useDesktopStoreRefs() {
  return storeToRefs(useDesktopStore());
}
