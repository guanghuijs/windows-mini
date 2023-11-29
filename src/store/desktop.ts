import { defineStore, storeToRefs } from 'pinia';
import { computed, ref } from 'vue';

export const useDesktopStore = defineStore('desktop', () => {
  const taskBarPosition = ref<'top' | 'bottom'>('bottom');

  const systemMenuDirection = computed(() => {
    return taskBarPosition.value === 'bottom'
      ? 'translateY(30px)'
      : 'translateY(-30px)';
  });

  const setTaskBarPosition = (position: 'top' | 'bottom') => {
    taskBarPosition.value = position;
    console.log(systemMenuDirection.value);
  };

  return {
    taskBarPosition,
    setTaskBarPosition,
    systemMenuDirection,
  };
});

export function useDesktopStoreRefs() {
  return storeToRefs(useDesktopStore());
}
