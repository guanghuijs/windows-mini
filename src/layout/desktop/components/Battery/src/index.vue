<script setup lang="ts">
  (navigator as any)?.getBattery().then((res: any) => {
    console.log(res);
  });
</script>

<template></template>

<style scoped lang="less"></style>
