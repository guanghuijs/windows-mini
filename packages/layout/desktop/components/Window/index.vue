<script setup lang="ts">
  import { defineAsyncComponent, onMounted, ref, unref, watch } from 'vue';
  import Vue3DraggableResizable from 'vue3-draggable-resizable';
  import { edgeDetection, getParentTarget } from './helper';
  import type { CreateWindowOptions } from '../typing';
  import { useDesktopStoreRefs, useDesktopStore } from '../../store';

  const { zIndex, taskBarPosition } = useDesktopStoreRefs();
  const { addZIndex } = useDesktopStore();

  watch(taskBarPosition, () => {
    edgeDetectionRef();
  });

  const windowRef = ref<HTMLElement>();
  let topRef = ref<HTMLElement>();
  const props = defineProps<{ options?: CreateWindowOptions }>();

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
      draggable.value = e.target!.classList.contains('drag-handle');
    });
  });

  const component = props?.options
    ? defineAsyncComponent(props?.options?.component as any)
    : '';

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

  const clickFn = (e: MouseEvent) => {
    const dom = getParentTarget(e.target as HTMLElement);
    console.log(zIndex.value);
    dom.style.zIndex = zIndex.value;
    addZIndex();
  };

  const dbClickFn = () => {
    isMax.value = !isMax.value;
  };
</script>

<template>
  <Transition>
    <Vue3DraggableResizable
      v-show="visible"
      ref="windowRef"
      class="viewport"
      :class="isMax ? `max ${taskBarPosition}` : ''"
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
      @mousedown="clickFn"
    >
      <div class="top drag-handle flex-between" @dblclick.self="dbClickFn">
        <div class="title flex-star">
          {{ options?.meta?.title }}{{ draggable }}
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
          <Component :is="component"></Component>
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
