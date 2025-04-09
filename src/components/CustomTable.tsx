import { Empty, Table } from "antd";
import type { TableProps } from "antd";

interface Props<T> extends Omit<TableProps<T>, "columns" | "dataSource"> {
  columns: TableProps<T>["columns"];
  data: T[];
}

const CustomTable = <T extends object>({ columns, data, ...props }: Props<T>) => {
  return data?.length ? (
    <Table<T> columns={columns} dataSource={data} scroll={{ x: true }} {...{ props }} />
  ) : (
    <Empty />
  );
};

export default CustomTable;
