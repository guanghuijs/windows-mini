import type { AppStore } from '@packages/types';

export function getAppStore(): AppStore {
  return JSON.parse(localStorage.getItem('WIN_MINI_0.0.1_app_store'));
}

export function getAccessToken() {
  return getAppStore()?.accessToken;
}
