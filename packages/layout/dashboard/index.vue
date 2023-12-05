<script setup lang="ts">
  import {
    NMenu,
    NLayout,
    NLayoutSider,
    MenuOption,
    NLayoutHeader,
  } from 'naive-ui';
  import { computed, ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { mapRouter } from '@packages/utils';
  const [{ meta, fullPath }, router] = [useRoute(), useRouter()];

  const activeKey = ref(meta?.menus[0].path as string);
  const collapsed = ref(false);

  const menuOptions: MenuOption[] = computed(() => {
    return mapRouter(
      meta?.menus,
      fullPath.substring(0, fullPath.lastIndexOf('/'))
    );
  });

  const handleUpdateValue = (_, item: MenuOption) => {
    router.push(item.key);
    activeKey.value = item.key;
  };
</script>

<template>
  <n-layout class="window-container">
    <n-layout has-sider>
      <n-layout-sider
        :width="200"
        show-trigger
        :collapsed="collapsed"
        @collapse="collapsed = true"
        @expand="collapsed = false"
        collapse-mode="width"
        bordered
      >
        <div @click="router.push('/desktop')">哈哈</div>
        <n-menu
          :options="menuOptions"
          :inverted="false"
          @update:value="handleUpdateValue"
          v-model:value="activeKey"
        />
      </n-layout-sider>
      <n-layout>
        <n-layout-header bordered>
          <div class="header flex-star">
            <n-menu mode="horizontal" :options="menuOptions" />
          </div>
        </n-layout-header>
        <div class="right-container">
          <router-view></router-view>
        </div>
      </n-layout>
    </n-layout>
  </n-layout>
</template>

<style scoped lang="less">
  .window-container {
    height: 100%;
    > :deep(.n-layout-scroll-container) {
      display: flex;
      flex-direction: column;
    }
    :deep(.n-layout-sider-scroll-container)::-webkit-scrollbar {
      display: none;
    }
    .right-container {
      padding: 20px;
    }
  }
</style>
