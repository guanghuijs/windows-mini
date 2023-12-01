<script setup lang="ts">
  import { onMounted, onUnmounted, ref } from 'vue';
  import { useDateFormat, useNow } from '@vueuse/core';
  import { getBattery } from '../../utils';
  import { useDesktopStoreRefs } from '../../store';

  const battery = ref<any>(0);
  const timer = ref<Interval | null>(null);

  const { taskBarPosition } = useDesktopStoreRefs();
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

  onUnmounted(() => {
    clearInterval(timer.value);
    timer.value = null;
  });
</script>

<template>
  <div class="task-bar flex-star" :class="`task-bar-${taskBarPosition}`">
    <i class="win iconfont icon-win" @click="$emit('systemMenuToggle')"></i>
    <div class="main"></div>
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
    i.win {
      font-size: 20px;
      cursor: pointer;
      &:hover {
        color: red;
      }
    }
    .main {
      flex: 1;
    }
    .right {
      > div {
        margin-left: 10px;
      }
      .battery {
        height: 10px;
        width: 16px;
        padding: 1px;
        border: 1px solid var(--theme);
        position: relative;
        cursor: pointer;
        .battery-inner {
          height: 100%;
          background: var(--theme);
        }
        &::after {
          content: '';
          width: 3px;
          height: 6px;
          background: var(--theme);
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
          color: var(--theme);
        }
      }
      .time {
        font-size: 12px;
        color: var(--theme);
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
