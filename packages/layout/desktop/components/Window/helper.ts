import { useDesktopStore } from '../../store';
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

export function getParentTarget(target?: HTMLElement | ParentNode | null) {
  if (target?.parentNode?.classList.contains('window-id')) {
    return target.parentNode;
  } else {
    return getParentTarget(target?.parentNode as HTMLElement);
  }
}
