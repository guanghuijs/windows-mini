<script setup lang="ts">
  import { onMounted, ref, unref } from 'vue';
  import { useRoute } from 'vue-router';

  import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css';
  import type { CreateWindowOptions } from '@packages/types/layout';

  import { TaskBar, SystemMenu } from './components';
  import { createWindow } from './components/Window';
  import { useDesktopStore, useDesktopStoreRefs } from './store';

  const { taskBarPosition, desktopBg, isQuickToggleBg, primaryColor, theme } =
    useDesktopStoreRefs();
  const { desktopBgNext } = useDesktopStore();
  const { meta } = useRoute();

  const systemMenuVisible = ref<boolean>(false);

  const systemMenuToggle = () => {
    systemMenuVisible.value = !systemMenuVisible.value;
  };

  const open = (options: CreateWindowOptions) => {
    createWindow(options);
  };

  onMounted(() => {
    if (unref(theme) === 'dark') {
      document.querySelector('body')?.classList.add('dark');
    }
  });
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
        v-for="item in meta.menus.sort(
          (a, b) => a.meta.orderNumber - b.meta.orderNumber
        )"
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
      color: v-bind(primaryColor);
      font-size: 32px;
      cursor: pointer;
    }
    .desktop-cont {
      display: flex;
      padding: 10px;
      flex-direction: column;
      flex-wrap: wrap;
      .item {
        width: 60px;
        height: 60px;
        user-select: none;
        font-size: 12px;
        text-align: center;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        color: v-bind(primaryColor);
        cursor: pointer;
        i {
          font-size: 30px;
        }
        div {
          margin-top: 3px;
        }
      }
    }
    .desktop-cont-taskbar-top {
      padding-top: 40px;
    }

    .desktop-cont-taskbar-bottom {
      padding-bottom: 40px;
    }
  }
</style>
