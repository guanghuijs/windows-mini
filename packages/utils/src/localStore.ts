export function setLocalStore(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getLocalStore<T>(key: string): T {
  return JSON.parse(localStorage.getItem(key) || '{}');
}
