import { useDesktopStore } from '@/store/desktop';

// 边缘检测
export const edgeDetection = (
  target: any,
  temp = 150
): {
  minLeft: number;
  maxLeft: number;
  minTop: number;
  maxTop: number;
} => {
  const { taskBarPosition } = useDesktopStore();
  const w = target.offsetWidth;

  const bodyW = document.body.offsetWidth;
  const bodyY = document.body.offsetHeight;

  return {
    minLeft: -w + temp,
    minTop: taskBarPosition === 'top' ? 30 : 0,
    maxLeft: bodyW - temp,
    maxTop: bodyY - temp + (taskBarPosition === 'top' ? 0 : -30),
  };
};
