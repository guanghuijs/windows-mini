import { RouteRecordSortRaw } from '@/router/type';
const modules = import.meta.globEager('./modules/**/*.ts');
const menus: Array<RouteRecordSortRaw> = [];

Object.keys(modules).forEach((key) => {
  menus.push((modules[key] as any).default);
});

export { menus };
