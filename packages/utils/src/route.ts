import { type Component, h } from 'vue';
import { RouteRecordRaw } from 'vue-router';
import { MenuOption, NIcon } from 'naive-ui';
import { CreateWindowOptions } from '@packages/types/layout';
import { getAccessToken } from './token';

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

/**
 * 添加路由权限
 * @param routes
 */
export function authRoutes(
  routes: array<RouteRecordRaw | CreateWindowOptions>
): array<RouteRecordRaw | CreateWindowOptions> {
  deepAuth(routes);
  return routes;
}

function deepAuth(routes: array<RouteRecordRaw | CreateWindowOptions>) {
  routes.forEach((item) => {
    if (item.children?.length) {
      deepAuth(item.children);
    } else {
      item.beforeEnter = (to, from, next) => {
        if (routeWhiteList.includes(to.path) || getAccessToken()) {
          next();
        } else {
          next('/login');
        }
      };
    }
  });
}

const routeWhiteList: string[] = ['/login'];
