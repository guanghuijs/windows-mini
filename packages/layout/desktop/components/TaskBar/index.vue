<script setup lang="ts">
  import { onMounted, onUnmounted, ref } from 'vue';
  import { useDateFormat, useNow } from '@vueuse/core';
  import { getBattery } from '../../utils';
  import { useDesktopStoreRefs } from '../../store';
  import html2canvas from 'html2canvas';

  const formatted = useDateFormat(useNow(), 'HH:mm:ss');
  const { taskBarPosition, primaryColor, minimizeList, taskBarIconAlign } =
    useDesktopStoreRefs();

  const timer = ref<Interval | null>(null);
  const battery = ref<any>(0);
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

  const thumbnail = ref<string[]>([]);
  const currentIndex = ref(-1);
  const isHover = ref(false);
  const hoverTimerOut = ref();

  const minimizeHover = (minimize, index: number) => {
    currentIndex.value = index;
    thumbnail.value = [];
    clearTimeout(hoverOutTimeout);
    hoverTimerOut.value = setTimeout(() => {
      minimize.forEach(async (item) => {
        console.log(item);
        const canvas = await html2canvas(
          item.el.querySelector('.vdr-container')
        );
        thumbnail.value.push(canvas.toDataURL('image/jpeg', 1.0));
      });
    }, 500);
  };

  const hoverOutTimeout = ref();
  const minimizeHoverOut = () => {
    clearTimeout(hoverOutTimeout.value);
    hoverOutTimeout.value = setTimeout(() => {
      thumbnail.value = [];
    }, 10000);
  };
  onUnmounted(() => {
    clearTimeout(hoverOutTimeout.value);
    clearTimeout(hoverTimerOut.value);
    hoverTimerOut.value = null;
  });

  const minimizeOpen = (item) => {
    item.comp.component.exposed.minimizeToggle(item);
  };

  const minimizeClose = (item) => {
    item.comp.component.exposed.close(item);
  };
</script>

<template>
  <div class="task-bar flex-star" :class="`task-bar-${taskBarPosition}`">
    <div class="main" :class="taskBarIconAlign">
      <i class="win iconfont icon-win" @click="$emit('systemMenuToggle')"></i>
      <transition-group name="opacity">
        <div
          class="minimize-item"
          v-for="(item, index) in minimizeList"
          @mouseenter="minimizeHover(item, index)"
          @mouseleave="minimizeHoverOut"
          :key="item[0]?.path"
        >
          <component :is="item[0]?.meta.icon"></component>
          <div class="item-num">{{ item.length }}</div>
          <transition name="opacity">
            <template
              v-if="thumbnail.length === item.length && currentIndex === index"
            >
              <div class="thumbnail">
                <div
                  class="thumbnail-item"
                  v-for="(url, index) in thumbnail"
                  :key="url"
                  @click="minimizeOpen(item[index])"
                >
                  <div class="thumbnail-item-title flex-between">
                    <div>{{ item[0].meta?.title }}</div>
                    <span
                      @click.stop="minimizeClose(item[index])"
                      title="关闭窗口"
                    >
                      ×
                    </span>
                  </div>
                  <img :src="url" />
                </div>
              </div>
            </template>
          </transition>
        </div>
      </transition-group>
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
    z-index: 1000000;
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
        .thumbnail {
          width: 210px;
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          padding-top: 10px;
          bottom: -100px;
          left: -95px;
          .thumbnail-item {
            padding: 0 5px 5px;
            position: relative;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            background: white;
            border-radius: 4px;
            .thumbnail-item-title {
              font-size: 12px;
              color: #333;
              line-height: 20px;
              border-bottom: 1px solid #eee;
              span {
                font-size: 16px;
                &:hover {
                  color: red;
                }
              }
            }

            img {
              width: 100px;
              height: 70px;
              border-radius: 4px;
            }
          }
          & .thumbnail-item:nth-child(2) {
            margin-left: 10px;
          }
        }
        i {
          font-size: 20px;
        }
        .item-num {
          width: 20px;
          background: v-bind(primaryColor);
          color: white;
          font-size: 14px;
          text-align: center;
          line-height: 20px;
          border-radius: 50%;
          transform: scale(0.5);
          position: absolute;
          bottom: -2px;
          right: -5px;
        }
        .minimize-content {
          width: 150px;
          height: 100px;
          position: absolute;
          left: calc(50% - 75px);
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
    .minimize-item {
      .minimize-content {
        bottom: initial;
        top: -100px;
      }
    }
  }
  .task-bar-top {
    inset: 0 0 auto 0;
    .minimize-item {
      .minimize-content {
        top: initial;
        bottom: -100px;
      }
    }
  }
</style>
