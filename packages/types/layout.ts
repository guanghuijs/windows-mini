import type { RouteRecordRaw } from 'vue-router';

export type CreateWindowOptions = RouteRecordRaw & {
  meta?: {
    title?: string;
    icon?: string;
    openByTab?: boolean;
    menuState?: 'destroy' | 'hidden';
    way?: 'component';
  };
  el?: HTMLDivElement;
  winId?: string;
};

// export namespace DesktopStore {
//   export type config = {
//     taskBarPosition: 'top' | 'bottom';
//     theme: 'light' | 'dark';
//   };
//   export type taskBarPosition = 'top' | 'bottom';
//   export type theme = 'light' | 'dark';
// }

export type DesktopStore = {
  taskBarPosition: 'top' | 'bottom';
  theme: 'light' | 'dark';
  isShowWin: boolean;
  taskBarIconAlign: 'left' | 'center' | 'right';
  desktopBg: string;
};
