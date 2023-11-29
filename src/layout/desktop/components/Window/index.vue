<script setup lang="ts">
  import { defineAsyncComponent, onMounted, ref, unref } from 'vue';
  import Vue3DraggableResizable from 'vue3-draggable-resizable';
  import { edgeDetection } from './helper';
  import type { CreateWindowOptions } from '@/layout/desktop/components/typing';
  const windowRef = ref<HTMLElement>();
  let topRef = ref<HTMLElement>();
  const props = defineProps<{ options: CreateWindowOptions }>();

  const x = ref(150);
  const y = ref(100);
  const active = ref(false);

  const visible = ref(true);
  const isMax = ref(false);

  const draggable = ref(true);

  const isIframeDisabled = ref(false);
  onMounted(() => {
    document.querySelector('.desktop')?.addEventListener('mouseover', (e) => {
      topRef.value = e.target as HTMLElement;
      draggable.value = !e.target!.classList.contains('gran-cancel');
    });
  });

  const component = defineAsyncComponent(props.options.component as any);

  // 进入活跃状态
  const activatedHandle = () => {};

  // 开始拖拽
  const dragStartHandle = () => {
    isIframeDisabled.value = true;
  };

  // 拖拽ing
  const draggingHandle = () => {};

  // 拖拽结束
  const dragEndHandle = () => {
    isIframeDisabled.value = false;
    edgeDetectionRef();
  };

  // 开始缩放
  const resizeStartHandle = () => {
    isIframeDisabled.value = true;
  };

  // 缩放结束
  const resizeEndHandle = () => {
    isIframeDisabled.value = false;
    edgeDetectionRef();
  };

  function edgeDetectionRef() {
    const { minLeft, minTop, maxLeft, maxTop } = edgeDetection(topRef.value!);

    if (unref(x) <= minLeft) {
      x.value = minLeft;
    }

    if (unref(x) >= maxLeft) {
      x.value = maxLeft;
    }

    if (unref(y) <= minTop) {
      y.value = minTop;
    }

    if (unref(y) >= maxTop) {
      y.value = maxTop;
    }
  }
</script>

<template>
  <Transition>
    <Vue3DraggableResizable
      v-show="visible"
      ref="windowRef"
      class="viewport"
      :class="isMax ? 'max' : ''"
      v-model:active="active"
      v-model:x="x"
      v-model:y="y"
      :minW="500"
      :minH="400"
      :draggable="draggable"
      :resizable="true"
      @activated="activatedHandle"
      @drag-start="dragStartHandle"
      @dragging="draggingHandle"
      @drag-end="dragEndHandle"
      @resize-start="resizeStartHandle"
      @resize-end="resizeEndHandle"
    >
      <div class="top drag-handle flex-between" @dblclick.self="isMax = !isMax">
        <div class="gran-cancel">{{ options.meta.title }}</div>
        <div class="flex-star">
          <div class="gran-cancel" @click="visible = false">最小化</div>
          <div class="gran-cancel" @click="isMax = !isMax">最大化</div>
          <div class="gran-cancel">关闭</div>
        </div>
      </div>
      <template v-if="options.meta?.way === 'component'">
        <Component :is="component"></Component>
      </template>
      <iframe
        v-else
        :class="isIframeDisabled ? 'disabled' : ''"
        ref="iframeRef"
        :src="options.path"
      ></iframe>
    </Vue3DraggableResizable>
  </Transition>
</template>

<style scoped lang="less">
  .viewport {
    z-index: 10000;
    width: calc(100% - 300px);
    height: calc(100% - 200px);
    border: none;
    transition: transform 0.25s, opacity 0.25s, width 0.25s, height 0.25s,
      left 0.25s, top 0.25s;

    .top {
      height: 40px;
      background: white;
      border-radius: 8px 8px 0 0;
      user-select: none;
    }
    iframe {
      width: 100%;
      border: none;
      height: calc(100% - 40px);
      background: #555555;
      border-radius: 0 0 8px 8px;
    }
    .disabled {
      pointer-events: none;
      opacity: 0.9;
    }
  }

  .max {
    width: 100vw !important;
    height: 100vh !important;
    left: 0 !important;
    top: 0 !important;
    .top {
      border-radius: initial;
    }
    iframe {
      border-radius: initial;
    }
  }

  .v-enter-active,
  .v-leave-active {
    opacity: 1;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
    transform: scale(0);
  }
</style>
