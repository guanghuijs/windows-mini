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
  console.log(meta);

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
        <component :is="item.meta.icon"></component>
        <div>{{ item.meta.title }}</div>
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
      display: flex;
      padding: 20px;
      .item {
        user-select: none;
        font-size: 12px;
        text-align: center;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        color: var(--theme);
        i {
          font-size: 30px;
        }
      }
    }
    .desktop-cont-taskbar-top {
      padding-top: 50px;
    }

    .desktop-cont-taskbar-bottom {
      padding-bottom: 50px;
    }
  }
</style>
