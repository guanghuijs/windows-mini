<script setup lang="ts">
  import { NMenu, NLayout, NLayoutSider, MenuOption } from 'naive-ui';
  import { computed, ref } from 'vue';
  import { CreateWindowOptions } from '@packages/types/layout';
  import { mapRouter } from '@packages/utils';
  import { useDesktopStoreRefs } from '../../store';
  const { compTransitionMode } = useDesktopStoreRefs();

  const props = defineProps<{
    options: CreateWindowOptions;
    defaultView?: string;
  }>();
  const activeKey = ref<string>(
    props.defaultView ? props.defaultView : props.options.children[0].path
  );
  const component = computed(() => {
    const current = props.options.children?.find(
      (r) => r.path === activeKey.value
    );
    return current.component;
  });
  const collapsed = ref(false);
  const menuOptions = computed<MenuOption[]>(() => {
    return mapRouter(props.options?.children);
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
          <Transition :name="compTransitionMode" mode="out-in">
            <keep-alive>
              <component :is="component" />
            </keep-alive>
          </Transition>
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
