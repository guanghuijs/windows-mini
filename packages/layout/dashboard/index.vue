<script setup lang="ts">
  import { NMenu, NLayout, NLayoutSider, MenuOption } from 'naive-ui';
  import { computed, ref, defineAsyncComponent } from 'vue';
  import type { RouteRecordRaw } from 'vue-router';
  import type { CreateWindowOptions } from '../desktop/components/typing';
  import { useRoute } from 'vue-router';

  const menus = useRoute().meta?.menus;
  console.log(useRoute());

  const activeKey = computed<string>(() => {
    return menus && menus[0].path;
  });

  const component = computed(() => {
    // return defineAsyncComponent(props.options.children[0].component);
  });

  const collapsed = ref(false);

  const menuOptions: MenuOption[] = computed(() => {
    return menus.map((router: RouteRecordRaw) => {
      return {
        key: router.path,
        label: router.meta?.title,
      };
    });
  });

  const handleUpdateValue = (e) => {
    console.log(e);
  };
</script>

<template>
  <n-layout class="window-container">
    <n-layout has-sider>
      <n-layout-sider
        :width="240"
        show-trigger
        :collapsed="collapsed"
        @collapse="collapsed = true"
        @expand="collapsed = false"
        collapse-mode="width"
        bordered
      >
        <n-menu
          :options="menuOptions"
          :inverted="false"
          @update:value="handleUpdateValue"
          v-model:value="activeKey"
        />
      </n-layout-sider>
      <n-layout>
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
