<script setup lang="ts">
  import { NCollapse, NCollapseItem } from 'naive-ui';
  import {
    useDesktopStore,
    useDesktopStoreRefs,
  } from '@packages/layout/desktop/store';
  const { taskBarPosition } = useDesktopStoreRefs();
  const { setTaskBarPosition } = useDesktopStore();
</script>

<template>
  <n-collapse arrow-placement="left">
    <template #header-extra> </template>
    <n-collapse-item :title="`任务栏位置${taskBarPosition}`" name="1">
      <div @click="setTaskBarPosition('top')">top</div>
      <div @click="setTaskBarPosition('bottom')">bottom</div>
    </n-collapse-item>
    <n-collapse-item title="任务栏对齐方式" name="2">
      <div>很好</div>
    </n-collapse-item>
    <n-collapse-item title="任务栏快捷图标设置" name="3">
      <div>真棒</div>
    </n-collapse-item>
    <n-collapse-item title="隐藏win图标" name="3">
      <div>真棒</div>
    </n-collapse-item>
    <n-collapse-item title="快捷切换背景" name="3">
      <div>真棒</div>
    </n-collapse-item>
  </n-collapse>
</template>

<style scoped lang="less"></style>
