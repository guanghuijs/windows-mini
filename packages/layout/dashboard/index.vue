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

  const activeKey = ref(
    fullPath.substring(fullPath.lastIndexOf('/') + 1),
    fullPath.length
  );
  const collapsed = ref(false);

  const menuOptions: MenuOption[] = computed(() => {
    return mapRouter(
      meta?.menus,
      fullPath.substring(0, fullPath.lastIndexOf('/'))
    );
  });

  const handleUpdateValue = (_, item: MenuOption) => {
    console.log(item.key);
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
        <div class="project-info flex-star" @click="router.push('/desktop')">
          <img src="logo.webp" />
          <div v-show="!collapsed">GH Admin</div>
        </div>
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
    .project-info {
      height: 43px;
      border-bottom: 1px solid #f2f2f2;
      padding: 0 10px;
      cursor: pointer;
      img {
        width: 30px;
        height: 30px;
      }
      div {
        padding-top: 6px;
        font-size: 14px;
        font-weight: bold;
        margin-left: 10px;
      }
    }
    :deep(.n-layout-sider-scroll-container)::-webkit-scrollbar {
      display: none;
    }
    .right-container {
      padding: 20px;
    }
  }
</style>
