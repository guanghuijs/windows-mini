import { computed, ref, unref } from 'vue';
import { defineStore, storeToRefs } from 'pinia';

export const useDesktopStore = defineStore('desktop', () => {
  const taskBarPosition = ref<'top' | 'bottom'>('bottom');

  const systemMenuDirection = computed(() => {
    return taskBarPosition.value === 'bottom'
      ? 'translateY(30px)'
      : 'translateY(-30px)';
  });

  const setTaskBarPosition = (position: 'top' | 'bottom') => {
    taskBarPosition.value = position;
  };

  const zIndex = ref(20);
  const addZIndex = () => {
    zIndex.value++;
  };

  const windowPoint = ref({
    x: 130,
    y: 80,
  });

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

  return {
    taskBarPosition,
    setTaskBarPosition,
    systemMenuDirection,
    zIndex,
    addZIndex,
    windowPoint,
    excursionWindowPoint,
  };
});

export function useDesktopStoreRefs() {
  return storeToRefs(useDesktopStore());
}
