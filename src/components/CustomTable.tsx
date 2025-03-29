import { Table } from "antd";
import type { TableProps } from "antd";

interface Props<T> {
  columns: TableProps<T>["columns"];
  data: T[];
}

const CustomTable = <T extends object>({ columns, data }: Props<T>) => {
  return <Table<T> columns={columns} dataSource={data} scroll={{x:true}} />;
};

export default CustomTable;
