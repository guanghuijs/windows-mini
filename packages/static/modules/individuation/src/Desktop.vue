<script setup lang="ts">
  import { createWindow } from '@packages/layout';
  import individuationRouter from '@app/router/modules/individuation';

  const fn = () => {
    createWindow(individuationRouter, 'bMap');
  };
</script>

<template>
  <div>
    桌面
    <div @click="fn">打开个性化地图</div>
  </div>
</template>

<style scoped lang="less"></style>
