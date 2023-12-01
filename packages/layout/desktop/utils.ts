export async function getBattery() {
  // @ts-ignore
  return await (navigator as any)?.getBattery();
}
