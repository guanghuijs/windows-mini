import type { RouteRecordRaw } from 'vue-router';

export type CreateWindowOptions = RouteRecordRaw & {
  meta?: {
    title?: string;
    icon?: string;
    orderNumber?: number;
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
  /**
   * 主题颜色
   */
  primaryColor: string;
  /**
   * 桌面背景
   */
  desktopBg: string;
  /**
   开启桌面快捷切换背景快捷键
    */
  isQuickToggleBg: boolean;
  /**
   * 任务栏位置
   * top 顶部
   * bottom 底部
   */
  taskBarPosition: 'top' | 'bottom';
  /**
   * 组件过渡动画切换 'opacity'  'rotate'  'fade'  'bounce'
   */
  compTransitionMode: 'opacity' | 'rotate' | 'fade' | 'bounce';
  /**
   * 桌面主题 light亮色 dark暗黑
   */
  theme: 'light' | 'dark';
  /**
   * 任务栏图标对齐方式 'left' 'center' 'right'
   */
  taskBarIconAlign: 'left' | 'center' | 'right';
  /**
   * 窗口组件透明度
   */
  windowTransparency: number;
  isShowWin: boolean;
};
