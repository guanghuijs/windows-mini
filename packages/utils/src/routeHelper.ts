import { RouteRecordRaw } from 'vue-router';
import { MenuOption } from 'naive-ui';
export function mapRouter(
  routes: RouteRecordRaw[],
  fullPath: string
): MenuOption[] {
  return routes?.map((router: RouteRecordRaw) => ({
    key: router.path,
    label: router.meta?.title,
    path: !router.children?.length ? fullPath + '/' + router.path : undefined,
    children: mapRouter(router.children, fullPath),
  }));
}
