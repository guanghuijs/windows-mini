<script setup lang="ts">
  import { NCard, NSpace, NSelect, NCheckbox } from 'naive-ui';
  import {
    useDesktopStore,
    useDesktopStoreRefs,
  } from '@packages/layout/desktop/store';
  import { taskBarPositionOptions, taskBarAlignment } from './data';
  import { reactive, watch } from 'vue';
  const { taskBarPosition, taskBarIconAlign } = useDesktopStoreRefs();
  const { setTaskBarPosition } = useDesktopStore();

  const value = reactive({
    position: taskBarPosition.value,
    alignment: 'left',
    hiddenWin: false,
  });

  watch(
    () => value.position,
    (value) => {
      setTaskBarPosition(value);
    }
  );

  const taskBarIconAlignChange = (res) => {
    taskBarIconAlign.value = res;
  };
</script>

<template>
  <n-space vertical>
    <n-card title="任务栏位置" size="small">
      <template #header-extra>
        <n-select
          v-model:value="value.position"
          :options="taskBarPositionOptions"
        />
      </template>
    </n-card>
    <n-card title="任务栏对齐方式" size="small">
      <template #header-extra>
        <n-select
          v-model:value="value.alignment"
          :options="taskBarAlignment"
          @change="taskBarIconAlignChange"
        />
      </template>
    </n-card>
    <n-card size="small">
      <NCheckbox v-model:checked="value.hiddenWin">隐藏win图标</NCheckbox>
    </n-card>
    <n-card title="任务栏快捷图标设置" size="small"> </n-card>
  </n-space>
</template>

<style scoped lang="less"></style>
