import type { RouteRecordRaw } from 'vue-router';

export type CreateWindowOptions = RouteRecordRaw & {
  meta?: {
    title?: string;
    icon?: string;
    openByTab?: boolean;
    menuState?: 'destroy' | 'hidden';
    way?: 'component';
  };
};
