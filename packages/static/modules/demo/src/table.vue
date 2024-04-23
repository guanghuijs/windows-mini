<script setup lang="ts">
  import { useTable, table as HTable } from '@packages/components';
  import { NButton } from 'naive-ui';
  const [register, { reload }] = useTable({});
</script>

<template>
  <div>
    <NButton @click="reload">reload</NButton>
    <h-table @register="register"></h-table>
  </div>
</template>

<style scoped lang="less"></style>
