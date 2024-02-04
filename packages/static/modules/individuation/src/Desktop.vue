<!--<script setup lang="ts">-->
<!--  import { createWindow } from '@packages/layout';-->
<!--  import individuationRouter from '@app/router/modules/individuation';-->

<!--  const fn = () => {-->
<!--    createWindow(individuationRouter, 'bMap');-->
<!--  };-->
<!--</script>-->

<!--<template>-->
<!--  <div>-->
<!--    桌面-->
<!--    <div @click="fn">打开个性化地图</div>-->
<!--  </div>-->
<!--</template>-->

<!--<style scoped lang="less"></style>-->

<script setup lang="ts">
  import { NCard, NSpace, NRadio, NImage, NSwitch } from 'naive-ui';
  import { bgs } from '@packages/static';
  import { useDesktopStoreRefs } from '@packages/layout/desktop/store';
  const { desktopBg, isQuickToggleBg } = useDesktopStoreRefs();

  const desktopChange = (src: string) => {
    desktopBg.value = `url(${src})`;
  };
</script>

<template>
  <n-space vertical>
    <n-card title="桌面背景设置" size="small">
      <n-space>
        <n-radio
          v-for="src in bgs"
          :key="src"
          :checked="desktopBg === `url(${src})`"
          value="Definitely Maybe"
          name="basic-demo"
          @change="desktopChange(src)"
        >
          <n-image :src="src" width="100"></n-image>
        </n-radio>
      </n-space>
    </n-card>
    <n-card title="开启桌面快捷切换背景按钮" size="small">
      <template #header-extra>
        <n-switch size="medium" v-model:value="isQuickToggleBg">
          <template #icon>
            <img style="width: 100%; height: 100%" src="/public/logo.webp" />
          </template>
        </n-switch>
      </template>
    </n-card>
  </n-space>
</template>

<style scoped lang="less"></style>
