export const modules: any = import.meta.globEager('./src/*.webp');
const bgs: any[] = [];
console.log(modules);
Object.keys(modules).forEach((key) => {
  const mod = modules[key].default;
  bgs.push(mod);
});

export { bgs };
