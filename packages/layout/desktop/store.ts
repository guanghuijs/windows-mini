import { computed, ref, unref } from 'vue';
import { defineStore, storeToRefs } from 'pinia';
import { getLocalStore, setLocalStore } from '@packages/utils';
import { DesktopStore } from '@packages/types/layout';

export const useDesktopStore = defineStore('desktop', () => {
  const taskBarPosition = ref(
    getLocalStore<DesktopStore<config>>('desktopStore').taskBarPosition ||
      'bottom'
  );

  const systemMenuDirection = computed(() => {
    return taskBarPosition.value === 'bottom'
      ? 'translateY(30px)'
      : 'translateY(-30px)';
  });

  const setTaskBarPosition = (position: DesktopStore.taskBarPosition) => {
    const store = getLocalStore<DesktopStore.config>('desktopStore');
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
  const minimizeList = ref<MinimizeMenu[]>([]);

  /**
   * 桌面任务栏图标
   * @param minimizeMenu
   */
  const addMinimizeList = (minimizeMenu: MinimizeMenu) => {
    minimizeList.value.push(minimizeMenu);
  };

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
  };
});

export function useDesktopStoreRefs() {
  return storeToRefs(useDesktopStore());
}
