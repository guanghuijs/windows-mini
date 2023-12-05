<template>
  <div ref="helloChartRef" class="chart"></div>
  <div @click="num++">{{ num }}</div>
</template>
<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { useECharts } from '@packages/utils';

  const num = ref(0);

  let chart;
  const helloChartRef = ref();

  onMounted(() => {
    chart = useECharts(helloChartRef.value, {
      title: {
        text: '自定义主题 JS版',
      },
      xAxis: {
        // x轴
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
      },
      yAxis: {
        // y轴
      },
      series: {
        // 图表类型
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20],
      },
    });
  });
</script>

<style lang="less" scoped>
  .chart {
    height: 300px;
  }
</style>
