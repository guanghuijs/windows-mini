export type TableProps = {
  api?: Function;
  params?: Object;
  title?: string;
  pagination?: boolean | VxeGridPropTypes.PagerConfig;
  afterFetch?: Function;
};

export interface tableMethod {
  reload: () => void;
  setProps: (props: VbenTableProps) => void;
}
