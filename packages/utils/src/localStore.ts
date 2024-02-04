import type { Ref } from 'vue';
import { ref, watch } from 'vue';

import type { DesktopStore } from '@packages/types/layout';

export function setLocalStore(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getLocalStore<T>(key): T {
  return JSON.parse(localStorage.getItem(key) || '{}');
}

export function setLocalPropStore<T>(
  prop: keyof T,
  value: string,
  key: string
) {
  if (key) {
    const store = getLocalStore<DesktopStore>('desktopStore');
    store[prop] = value;
    localStorage.setItem(key, JSON.stringify(store));
  } else {
    console.error('key is required');
  }
}
