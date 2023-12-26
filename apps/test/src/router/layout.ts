import type { CreateWindowOptions } from '@packages/types/layout';
const modules = import.meta.globEager('./modules/**/*.ts');
const menus: Array<CreateWindowOptions> = [];

Object.keys(modules).forEach((key) => {
  menus.push((modules[key] as any).default);
});

export { menus };
