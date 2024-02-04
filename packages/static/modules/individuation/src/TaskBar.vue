<script setup lang="ts">
  import { NCard, NSpace, NSelect, NSwitch } from 'naive-ui';
  import { useDesktopStoreRefs } from '@packages/layout/desktop/store';
  import { taskBarPositionOptions, taskBarAlignment } from './data';
  import { reactive, watch } from 'vue';
  const { taskBarPosition, taskBarIconAlign } = useDesktopStoreRefs();

  const taskBarInfo = reactive({
    position: taskBarPosition.value,
    alignment: 'left',
    hiddenWin: false,
  });

  watch(
    () => taskBarInfo.position,
    (position) => {
      taskBarPosition.value = position;
      // setLocalPropStore<DesktopStore>(
      //   'taskBarPosition',
      //   position,
      //   'desktopStore'
      // );
    }
  );

  const taskBarIconAlignChange = (res) => {
    taskBarIconAlign.value = res;
  };
</script>

<template>
  <n-space vertical>
    <n-card title="任务栏位置" size="small">
      <template #header-extra>
        <n-select
          v-model:value="taskBarInfo.position"
          :options="taskBarPositionOptions"
        />
      </template>
    </n-card>
    <n-card title="任务栏图标对齐方式" size="small">
      <template #header-extra>
        <n-select
          v-model:value="taskBarInfo.alignment"
          :options="taskBarAlignment"
          @change="taskBarIconAlignChange"
        />
      </template>
    </n-card>
    <n-card title="隐藏win图标" size="small">
      <template #header-extra>
        <n-switch size="medium">
          <template #icon>
            <img style="width: 100%; height: 100%" src="logo.webp" />
          </template>
        </n-switch>
      </template>
    </n-card>
    <n-card title="任务栏快捷图标设置" size="small"> </n-card>
  </n-space>
</template>

<style scoped lang="less"></style>
