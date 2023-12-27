<script setup lang="ts">
  import { onMounted, onUnmounted, ref } from 'vue';
  import { useDateFormat, useNow } from '@vueuse/core';
  import { getBattery } from '../../utils';
  import { useDesktopStoreRefs } from '../../store';

  const battery = ref<any>(0);
  const timer = ref<Interval | null>(null);

  const { taskBarPosition, minimizeList, primaryColor, taskBarIconAlign } =
    useDesktopStoreRefs();
  const formatted = useDateFormat(useNow(), 'HH:mm:ss');

  onMounted(() => {
    battery.value = getBattery().then((Battery) => {
      battery.value = Battery;
    });
    timer.value = setInterval(() => {
      battery.value = getBattery().then((Battery) => {
        battery.value = Battery;
      });
    }, 1000);
  });

  const minimizeOpen = (item) => {
    console.log(item);
  };

  onUnmounted(() => {
    clearInterval(timer.value);
    timer.value = null;
  });
</script>

<template>
  <div class="task-bar flex-star" :class="`task-bar-${taskBarPosition}`">
    <div class="main" :class="taskBarIconAlign">
      <i class="win iconfont icon-win" @click="$emit('systemMenuToggle')"></i>
      <div
        class="minimize-item"
        @click="minimizeOpen(item)"
        v-for="item in minimizeList"
        :key="item[0].path"
        :title="item[0]?.meta.title"
      >
        <component :is="item[0]?.meta.icon"></component>
        <div class="minimize-content" style="font-size: 10px">
          <div v-for="win in item" :key="win.path">
            <component :is="win.comp"></component>
          </div>
        </div>
      </div>
    </div>
    <div class="right flex-star">
      <div class="battery" :title="`${battery.level * 100}%`">
        <div
          class="battery-inner"
          :style="{ width: `${battery.level * 100}%` }"
        ></div>
        <i v-show="battery.charging" class="iconfont icon-charging"></i>
      </div>
      <div class="time">{{ formatted }}</div>
    </div>
  </div>
</template>

<style scoped lang="less">
  .task-bar {
    z-index: calc(infinity);
    padding: 0 10px;
    position: fixed;
    width: 100%;
    height: 30px;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    transition: top 0.25s;
    font-size: 0;

    .main {
      flex: 1;
      height: 30px;
      text-align: left;
      display: flex;
      align-items: center;
      i.win {
        font-size: 20px;
        cursor: pointer;
        color: v-bind(primaryColor);
        opacity: 1;
        &:hover {
          opacity: 0.7;
        }
      }
      .minimize-item {
        cursor: pointer;
        color: v-bind(primaryColor);
        margin-left: 5px;
        height: 30px;
        display: flex;
        align-items: center;
        position: relative;
        i {
          font-size: 20px;
        }
        .minimize-content {
          width: 100%;
          background: red;
          height: 140px;
          position: absolute;
          bottom: -140px;
          left: calc(50% - 40px);
          opacity: 0;
          transition: all 0.25s;
          transform: scale(0);
          :deep(.viewport) {
            left: 0 !important;
            top: 0 !important;
            width: 1000% !important;
            height: 1000% !important;
            transform: scale(0.1);
            transform-origin: 0 0;
          }
        }
        &:hover .minimize-content {
          z-index: initial;
          opacity: 1;
          transform: scale(1);
        }
      }
      &.center {
        justify-content: center;
      }
      &.right {
        justify-content: flex-end;
      }
    }
    .right {
      > div {
        margin-left: 10px;
      }
      .battery {
        height: 10px;
        width: 16px;
        padding: 1px;
        border: 1px solid v-bind(primaryColor);
        position: relative;
        cursor: pointer;
        .battery-inner {
          height: 100%;
          background: v-bind(primaryColor);
        }
        &::after {
          content: '';
          width: 3px;
          height: 6px;
          background: v-bind(primaryColor);
          position: absolute;
          top: 1px;
          right: -3px;
        }
        .icon-charging {
          font-size: 14px;
          position: absolute;
          z-index: 1;
          left: -11px;
          top: -2px;
          color: v-bind(primaryColor);
        }
      }
      .time {
        font-size: 12px;
        color: v-bind(primaryColor);
      }
    }
  }
  .task-bar-bottom {
    inset: auto 0 0 0;
  }
  .task-bar-top {
    inset: 0 0 auto 0;
  }
</style>
