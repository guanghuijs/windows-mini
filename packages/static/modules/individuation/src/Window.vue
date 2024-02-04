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
  import { NCard, NSpace, NRadio, NSlider } from 'naive-ui';
  import { useDesktopStoreRefs } from '@packages/layout/desktop/store';
  const { compTransitionMode, windowTransparency } = useDesktopStoreRefs();

  const tranFlag = ref(true);

  const toggleMode = (m) => {
    compTransitionMode.value = m;
    tranFlag.value = !tranFlag.value;
  };
</script>

<template>
  <n-space vertical>
    <n-card title="窗口透明度" size="small">
      <n-slider v-model:value="windowTransparency" :min="60" />
    </n-card>
    <n-card title="打开窗口默认全屏" size="small"> </n-card>
    <n-card title="窗口组件过渡动画" size="small">
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
