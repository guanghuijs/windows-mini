<script setup lang="ts">
  import { ref } from 'vue';
  import { Random } from 'mockjs';
  import { bgs } from '@/layout/desktop/assets/image/background';
  import { TaskBar } from './components/TaskBar';
  import { SystemMenu } from './components/SystemMenu';

  const bg = ref(`url(${bgs[Random.integer(0, bgs.length - 1)]})`);
  const systemMenuVisible = ref<boolean>(false);

  const systemMenuToggle = () => {
    systemMenuVisible.value = !systemMenuVisible.value;
  };
</script>

<template>
  <div class="desktop">
    <SystemMenu
      :show="systemMenuVisible"
      @systemMenuToggle="systemMenuToggle"
    />
    <TaskBar @systemMenuToggle="systemMenuToggle" />
  </div>
</template>

<style scoped lang="less">
  .desktop {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    position: relative;
    background: v-bind(bg) no-repeat center / cover;
  }
</style>
