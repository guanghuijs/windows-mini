<script setup lang="ts">
  import { NCard, NSpace, NColorPicker } from 'naive-ui';
  import { useDesktopStoreRefs } from '@packages/layout/desktop/store';
  const { themeColor } = useDesktopStoreRefs();
</script>

<template>
  <n-space vertical>
    <n-card title="主题色设置" size="small">
      <template #header-extra>
        <div style="width: 200px">
          <n-color-picker
            :modes="['hex']"
            :swatches="['#FFFFFF', '#18A058', '#2080F0', '#F0A020', '#FFC0CB']"
            :show-alpha="false"
            width="100"
            v-model:value="themeColor"
          />
        </div>
      </template>
    </n-card>
  </n-space>
</template>
