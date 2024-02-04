import { DesktopStore } from '@packages/types/layout';
import { ref, Ref, watch } from 'vue';
import { getLocalStore, setLocalPropStore } from '@packages/utils';

export async function getBattery() {
  // @ts-ignore
  return await (navigator as any)?.getBattery();
}

export function winStoreWithLocal<T>(
  prop: keyof DesktopStore,
  defaultValue: T
): Ref<T> {
  const variable = ref<T>(
    getLocalStore<DesktopStore>('desktopStore')[prop] || defaultValue
  );
  watch(variable, (newValue) => {
    setLocalPropStore<DesktopStore>(prop, newValue, 'desktopStore');
  });
  return variable;
}
