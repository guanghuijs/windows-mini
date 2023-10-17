export async function getBattery() {
  return await (navigator as any)?.getBattery();
}
