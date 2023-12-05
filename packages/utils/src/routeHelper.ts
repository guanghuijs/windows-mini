import { h } from 'vue';
import { RouteRecordRaw } from 'vue-router';
import { MenuOption, NIcon } from 'naive-ui';

export function mapRouter(
  routes: RouteRecordRaw[],
  fullPath: string
): MenuOption[] {
  return routes?.map((router: RouteRecordRaw) => ({
    key: router.path,
    label: router.meta?.title,
    icon: router.meta?.icon,
    path: !router.children?.length ? fullPath + '/' + router.path : undefined,
    children: mapRouter(router.children, fullPath),
  }));
}

export function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) });
}
