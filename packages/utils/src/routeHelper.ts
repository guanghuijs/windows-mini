import { h } from 'vue';
import { RouteRecordRaw } from 'vue-router';
import { MenuOption, NIcon } from 'naive-ui';

export function mapRouter(routes: RouteRecordRaw[]): MenuOption[] {
  return routes?.map((router: RouteRecordRaw) => ({
    key: router.path,
    label: router.meta?.title,
    icon: router.meta?.icon,
    name: router.name,
    children: mapRouter(router.children),
  }));
}

export function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

export function renderIconfont(iconName: string) {
  return () => h('i', { class: `iconfont ${iconName}` });
}
