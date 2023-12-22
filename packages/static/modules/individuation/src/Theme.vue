<script setup lang="ts">
  import { NCard, NSpace, NColorPicker, NRadio } from 'naive-ui';
  import { useDesktopStoreRefs } from '@packages/layout/desktop/store';
  const { primaryColor, theme } = useDesktopStoreRefs();

  const themeChange = (t) => {
    theme.value = t;
    if (t === 'dark') {
      document.querySelector('body')?.classList.add('dark');
    } else {
      document.querySelector('body')?.classList.remove('dark');
    }
  };
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
            v-model:value="primaryColor"
          />
        </div>
      </template>
    </n-card>
    <n-card title="主题选择">
      <n-space>
        <n-radio
          v-for="t in ['light', 'dark']"
          name="theme"
          :key="t"
          :checked="theme === t"
          @change="themeChange(t)"
        >
          <div :class="t">{{ t }}</div>
        </n-radio>
      </n-space>
    </n-card>
  </n-space>
</template>
<style scoped lang="less">
  .light,
  .dark {
    width: 200px;
    height: 120px;
    border-radius: 4px;
    background: white;
    color: #333;
    padding: 10px;
  }
  .dark {
    color: white;
    background: #101014;
  }
</style>
