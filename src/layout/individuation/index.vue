<script setup lang="ts">
  import { useDesktopStore, useDesktopStoreRefs } from '@/store/desktop';
  const { taskBarPosition } = useDesktopStoreRefs();
  const { setTaskBarPosition } = useDesktopStore();
</script>

<template>
  <div class="window-content">
    <div>menu</div>
    <div>
      <div @click="alert('11111')">任务栏位置{{ taskBarPosition }}</div>
      <div @click="setTaskBarPosition('top')">top</div>
      <div @click="setTaskBarPosition('bottom')">bottom</div>
    </div>
  </div>
</template>

<style scoped lang="less">
  .window-content {
    height: calc(100% - 50px);
    background: #f2f2f2;
  }
</style>
