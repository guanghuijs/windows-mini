<script setup lang="ts">
  import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css';
  import { useRoute } from 'vue-router';
  import { ref } from 'vue';
  import { TaskBar, SystemMenu } from './components';
  import { createWindow } from './components/Window';
  import type { CreateWindowOptions } from '@packages/types/layout';
  import { useDesktopStore, useDesktopStoreRefs } from './store';

  const { desktopBgNext } = useDesktopStore();
  const { taskBarPosition, desktopBg, isQuickToggleBg } = useDesktopStoreRefs();
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
    <i
      v-show="isQuickToggleBg"
      class="toggle-bg iconfont icon-fengling"
      @click="desktopBgNext"
      title="随机切换背景"
      :style="{ top: taskBarPosition === 'top' ? '30px' : '0px' }"
    ></i>
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
    background: v-bind(desktopBg) no-repeat center / cover;
    transition: background 0.5s;
    .toggle-bg {
      position: fixed;
      right: 5px;
      top: 50px;
      color: var(--theme);
      font-size: 32px;
      cursor: pointer;
    }
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
