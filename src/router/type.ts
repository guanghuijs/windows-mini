import type { RouteRecordRaw } from 'vue-router';

export type RouteRecordSortRaw = RouteRecordRaw & {
  meta?: { title?: string; icon?: string; sortIndex?: number };
};
