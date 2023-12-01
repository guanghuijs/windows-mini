<script setup lang="ts">
  import {
    useDesktopStore,
    useDesktopStoreRefs,
  } from '@packages/layout/desktop/store';
  import { NMenu } from 'naive-ui';
  import { menuOptions } from './data';

  const { taskBarPosition } = useDesktopStoreRefs();
  const { setTaskBarPosition } = useDesktopStore();

  const handleUpdateValue = () => {
    console.log(e);
  };
</script>

<template>
  <div class="content">
    <div>
      <n-menu :options="menuOptions" @update:value="handleUpdateValue" />
    </div>
    <div>
      <div>任务栏位置{{ taskBarPosition }}</div>
      <div @click="setTaskBarPosition('top')">top</div>
      <div @click="setTaskBarPosition('bottom')">bottom</div>
    </div>
  </div>
</template>

<style scoped lang="less">
  .content {
    height: 100%;
    background: #f2f2f2;
  }
</style>
