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
  const w = target.width;
  const h = target.height;

  const bodyW = document.body.offsetWidth;
  const bodyY = document.body.offsetHeight;

  console.log(bodyW, bodyY + h - temp - 30);

  return {
    minLeft: -w + temp,
    minTop: 0,
    maxLeft: bodyW - temp,
    maxTop: bodyY - temp + 30,
  };
};
