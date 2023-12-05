import * as echarts from 'echarts';
import { useResizeObserver, useDebounceFn } from '@vueuse/core';
import { merge } from 'lodash-es';

export function useECharts(el: HTMLElement, options: echarts.EChartsOption) {
  let chart: any;
  if (!chart) {
    chart = echarts.init(el);
    chart.setOption(options);
  }
  useResizeObserver(
    el,
    useDebounceFn(() => {
      chart.resize();
    }, 50)
  );

  function setData(dataset: any) {
    chart.setOption(merge(options, { dataset }));
  }

  return [chart, { setData, resize: chart.resize() }];
}
