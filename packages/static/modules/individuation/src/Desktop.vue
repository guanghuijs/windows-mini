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
  import { ref } from 'vue';
  import { NCard, NSpace, NRadio, NImage, NSwitch } from 'naive-ui';
  import { bgs } from '@packages/static';
  import { useDesktopStoreRefs } from '@packages/layout/desktop/store';
  const { desktopBg, isQuickToggleBg, compTransitionMode } =
    useDesktopStoreRefs();

  const tranFlag = ref(true);

  const desktopChange = (src: string) => {
    desktopBg.value = `url(${src})`;
  };

  const toggleMode = (m) => {
    compTransitionMode.value = m;
    tranFlag.value = !tranFlag.value;
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
            <img style="width: 100%; height: 100%" src="logo.webp" />
          </template>
        </n-switch>
      </template>
    </n-card>
    <n-card title="组件过渡动画切换" size="small">
      <transition :name="compTransitionMode" mode="out-in">
        <div
          style="height: 100px; width: 100px; background: green"
          v-if="tranFlag"
        ></div>
        <div
          style="height: 100px; width: 100px; background: #e81123"
          v-else
        ></div>
      </transition>
      <n-space>
        <n-radio
          v-for="mode in ['opacity', 'rotate', 'fade', 'bounce']"
          :key="mode"
          :checked="compTransitionMode === mode"
          value="Definitely Maybe"
          name="basic-demo"
          @change="toggleMode(mode)"
        >
          {{ mode }}
        </n-radio>
      </n-space>
    </n-card>
  </n-space>
</template>

<style scoped lang="less"></style>
