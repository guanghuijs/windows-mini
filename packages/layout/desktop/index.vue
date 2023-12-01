<script setup lang="ts">
  import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css';
  import { useRoute } from 'vue-router';
  import { ref } from 'vue';
  import { Random } from 'mockjs';
  import { bgs } from '@packages/static';
  import { TaskBar, SystemMenu } from './components';
  import { createWindow } from './components/Window';

  import type { CreateWindowOptions } from './components/typing';
  import { useDesktopStoreRefs } from './store';

  const { taskBarPosition } = useDesktopStoreRefs();
  const bg = ref(`url(${bgs[Random.integer(0, bgs.length - 1)]})`);
  const systemMenuVisible = ref<boolean>(false);

  const { meta } = useRoute();

  const systemMenuToggle = () => {
    systemMenuVisible.value = !systemMenuVisible.value;
  };

  const open = (options: CreateWindowOptions) => {
    createWindow(options);
  };
</script>

<template>
  <div class="desktop">
    <SystemMenu
      :show="systemMenuVisible"
      @systemMenuToggle="systemMenuToggle"
    />
    <TaskBar @systemMenuToggle="systemMenuToggle" />
    <div
      class="desktop-cont"
      :class="`desktop-cont-taskbar-${taskBarPosition}`"
    >
      <div
        class="item"
        v-for="item in meta.menus"
        :key="item.path"
        @click="open(item)"
      >
        {{ item.meta.title }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
  .desktop {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    position: relative;
    background: v-bind(bg) no-repeat center / cover;
    .desktop-cont {
      .item {
        width: 50px;
        height: 50px;
        background: red;
        user-select: none;
      }
    }
  }

  .desktop-cont-taskbar-top {
    padding-top: 30px;
  }

  .desktop-cont-taskbar-bottom {
    padding-bottom: 30px;
  }
</style>
