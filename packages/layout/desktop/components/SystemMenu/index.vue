<script setup lang="ts">
  import { computed } from 'vue';
  import { useDesktopStoreRefs } from '../../store';
  const { taskBarPosition, theme, taskBarIconAlign, primaryColor } =
    useDesktopStoreRefs();

  const systemMenuDirection = computed(() => {
    return taskBarPosition.value === 'bottom'
      ? 'translateY(30px)'
      : 'translateY(-30px)';
  });

  withDefaults(
    defineProps<{
      show: boolean;
    }>(),
    {
      show: false,
    }
  );
</script>

<template>
  <div
    v-show="show"
    class="system-menu-outer"
    @click.self="$emit('systemMenuToggle')"
  >
    <Transition>
      <div
        v-show="show"
        class="system-menu"
        :class="`system-menu-${taskBarPosition} ${theme} ${taskBarIconAlign}`"
      >
        {{ taskBarPosition }}
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="less">
  .system-menu-outer {
    position: fixed;
    width: 100vw;
    height: calc(100vh - 30px);
    top: 0;
    z-index: calc(infinity);
  }
  .system-menu {
    width: 40vw;
    height: 60vh;
    filter: blur(-20px);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    position: fixed;
    color: v-bind(primaryColor);
    &.light {
      background: rgba(255, 255, 255, 0.8);
    }
    &.dark {
      background: rgba(0, 0, 0, 0.5);
    }
    &.left {
      left: 0;
    }
    &.center {
      left: calc(50% - 20vw);
    }
    &.right {
      left: initial;
      right: 0;
    }
  }

  .system-menu-top {
    inset: 30px auto auto 0;
  }

  .system-menu-bottom {
    inset: auto auto 30px 0;
  }

  .v-enter-active,
  .v-leave-active {
    transition: all 0.25s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
    transform: v-bind(systemMenuDirection);
  }
</style>
