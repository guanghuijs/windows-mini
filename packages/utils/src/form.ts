export function textField(field: string, label: string) {
  return {
    field,
    label,
  };
}

export function selectField(
  field: string,
  label: string,
  options: { label: string; value: any }[]
) {
  return {
    field,
    label,
    options,
  };
}

export function customRender() {}
