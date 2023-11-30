<script setup lang="ts">
  import { useDesktopStore, useDesktopStoreRefs } from '@/store/desktop';
  const { taskBarPosition } = useDesktopStoreRefs();
  const { setTaskBarPosition } = useDesktopStore();
</script>

<template>
  <div class="content">
    <div>menu</div>
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
