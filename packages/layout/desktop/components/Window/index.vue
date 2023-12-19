<script setup lang="ts">
  import { computed, onMounted, ref, unref, watch } from 'vue';
  // https://github.com/a7650/vue3-draggable-resizable
  import Vue3DraggableResizable from 'vue3-draggable-resizable';
  import { edgeDetection, getParentTarget } from './helper';
  import type { CreateWindowOptions } from '../typing';
  import { useDesktopStoreRefs, useDesktopStore } from '../../store';
  import Main from './Main.vue';
  import { useWindowSize, useDebounceFn } from '@vueuse/core';

  const { zIndex, taskBarPosition } = useDesktopStoreRefs();
  const { addZIndex, excursionWindowPoint } = useDesktopStore();

  watch(taskBarPosition, () => {
    edgeDetectionRef();
  });

  const windowRef = ref<HTMLElement>();
  let topRef = ref<HTMLElement>();
  const props = withDefaults(
    defineProps<{
      options?: CreateWindowOptions;
      defaultView?: string;
      windowPoint?: { x: number; y: number };
    }>(),
    {
      windowPoint: () => ({ x: 150, y: 100 }),
    }
  );

  const x = ref(props.windowPoint.x);
  const y = ref(props.windowPoint.y);
  const active = ref(false);

  const { width, height } = useWindowSize();

  const w = ref(0);
  const h = ref(0);

  const minW = ref(0);
  const minH = ref(0);

  watch(
    () => [width.value, height.value],
    useDebounceFn(([newW, newH]) => {
      w.value = width.value - 300;
      h.value = height.value - 200;
      if (newW <= 1000 && newH <= 800) {
        isMax.value = true;
      }
    }, 500),
    {
      immediate: true,
    }
  );

  watch(
    () => active.value,
    (value) => {
      if (value) {
        excursionWindowPoint('drag', {
          x: unref(x),
          y: unref(y),
        });
      }
    }
  );

  const visible = ref(false);
  const isMax = ref(false);

  const draggable = ref(true);

  const resizeable = computed<boolean>(() => {
    return !unref(isMax);
  });

  const isIframeDisabled = ref(false);
  onMounted(() => {
    visible.value = true;
    const desktopDom = document.querySelector('.desktop')!;
    desktopDom.addEventListener('mouseover', (e) => {
      topRef.value = e.target as HTMLElement;
      draggable.value =
        e.target!.classList.contains('drag-handle') && !unref(isMax);
    });
    w.value = width.value - 300;
    h.value = height.value - 200;
    minW.value = desktopDom.clientWidth - 300;
    minH.value = desktopDom.clientHeight - 200;
  });

  // 进入激活状态
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
    excursionWindowPoint('drag', { x: unref(x), y: unref(y) });
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
    if (unref(x) <= minLeft) x.value = minLeft;
    if (unref(x) >= maxLeft) x.value = maxLeft;
    if (unref(y) <= minTop) y.value = minTop;
    if (unref(y) >= maxTop) y.value = maxTop;
  }

  const clickFn = (e: MouseEvent) => {
    const dom = getParentTarget(e.target as HTMLElement);
    addZIndex();
    dom.style.zIndex = zIndex.value;
  };

  const dbClickFn = () => {
    isMax.value = !isMax.value;
  };

  const onAfterEnter = () => {
    minW.value = 700;
    minH.value = 500;
  };
</script>

<template>
  <Transition @after-enter="onAfterEnter">
    <Vue3DraggableResizable
      v-if="visible"
      ref="windowRef"
      class="viewport"
      :class="isMax ? `max ${taskBarPosition}` : ''"
      v-model:active="active"
      v-model:x="x"
      v-model:y="y"
      v-model:w="w"
      v-model:h="h"
      :minW="minW"
      :minH="minH"
      :draggable="draggable"
      :resizable="resizeable"
      @activated="activatedHandle"
      @drag-start="dragStartHandle"
      @dragging="draggingHandle"
      @drag-end="dragEndHandle"
      @resize-start="resizeStartHandle"
      @resize-end="resizeEndHandle"
      @mousedown="clickFn"
    >
      <div class="top drag-handle flex-between" @dblclick.self="dbClickFn">
        <div class="title flex-star">
          {{ options?.meta?.title }}
        </div>
        <div class="winOpt flex-star">
          <div class="drag-cancel" @click="visible = false">
            <i class="iconfont icon-winmin"></i>
          </div>
          <div class="drag-cancel" @click="isMax = !isMax">
            <i class="iconfont" :class="isMax ? 'icon-inmax' : 'icon-max'"></i>
          </div>
          <div class="drag-cancel">
            <i class="iconfont icon-guanbi"></i>
          </div>
        </div>
      </div>
      <div class="window-content drag-cancel">
        <template v-if="options?.meta?.way === 'component'">
          <Main :options="options" :default-view="defaultView"></Main>
        </template>
        <iframe
          v-else
          :class="isIframeDisabled ? 'disabled' : ''"
          ref="iframeRef"
          :src="options?.path"
        ></iframe>
      </div>
    </Vue3DraggableResizable>
  </Transition>
</template>

<style scoped lang="less">
  .viewport {
    width: calc(100% - 300px);
    height: calc(100% - 200px);
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
    border: none;
    display: flex;
    flex-direction: column;
    transition: transform 0.25s, opacity 0.25s, width 0.25s, height 0.25s,
      left 0.25s, top 0.25s;

    .top {
      height: 34px;
      background: white;
      border-radius: 8px 8px 0 0;
      user-select: none;
      font-size: 15px;
      overflow: hidden;
      border-bottom: 1px solid #eee;
      .title {
        padding-left: 10px;
      }
      .winOpt {
        height: 100%;
        > div {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 50px;
          height: 100%;
          &:hover {
            background: #d0d2d5;
          }
        }
        > div:last-child {
          &:hover {
            color: white;
            background: #e81123;
            i {
              color: white;
            }
          }
        }
      }
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

    .window-content {
      flex: 1;
      border-radius: 0 0 8px 8px;
      overflow: hidden;
    }
  }

  .max {
    width: 100vw !important;
    height: calc(100vh - 30px) !important;
    .top {
      border-radius: initial;
    }
    iframe {
      border-radius: initial;
    }
    .window-content {
      border-radius: initial;
    }
  }

  .max.bottom {
    left: 0 !important;
    top: 0 !important;
  }

  .max.top {
    left: 0 !important;
    bottom: 0 !important;
    top: 30px !important;
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
