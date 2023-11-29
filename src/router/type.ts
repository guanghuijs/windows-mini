import type { RouteRecordRaw } from 'vue-router';

export type RouteRecordSortRaw = RouteRecordRaw & {
  meta?: { title?: string; icon?: string; sortIndex?: number };
};

export type CreateWindowOptions = RouteRecordRaw & {
  meta?: {
    title?: string;
    icon?: string;
    openByTab?: boolean;
    menuState?: 'destroy' | 'hidden';
    way?: 'component';
  };
};
