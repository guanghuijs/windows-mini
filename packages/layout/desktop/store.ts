import { computed, ref } from 'vue';
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

  return {
    taskBarPosition,
    setTaskBarPosition,
    systemMenuDirection,
    zIndex,
    addZIndex,
  };
});

export function useDesktopStoreRefs() {
  return storeToRefs(useDesktopStore());
}
