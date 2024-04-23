import { ref, unref } from 'vue';
import { TableProps, tableMethod } from '../type';

export function useTable(props: TableProps): [Function, tableMethod] {
  const tableRef = ref(null);

  function register(instance) {
    tableRef.value = instance;
    props && instance.setProps(props);
  }
  function getInstance(): tableMethod {
    const table = unref(tableRef);
    if (!table) {
      console.error('表格实例不存在');
    }
    return table as tableMethod;
  }
  const methods: tableMethod = {
    reload: () => getInstance().reload(),
    setProps: (props: TableProps) => getInstance().setProps(props),
  };
  return [register, methods];
}
