<script setup lang="ts">
  import { NDataTable } from 'naive-ui';
  import { onMounted, ref } from 'vue';
  const emit = defineEmits(['register']);
  const tableRef = ref();

  onMounted(() => {
    emit('register', {
      reload: () => {
        console.log(tableRef.value.onload());
      },
      setProps: () => {
        console.log('reload');
      },
    });
  });
</script>

<template>
  <n-data-table ref="tableRef"></n-data-table>
</template>

<style scoped lang="less"></style>
