import type { TableProps } from "antd";
import { Empty, Table } from "antd";

interface Props<T> extends Omit<TableProps<T>, "dataSource" | "pagination"> {
  columns: TableProps<T>["columns"];
  data: T[];
  total?: number;
  query?: Record<string, unknown>;
  setQuery?: React.Dispatch<React.SetStateAction<Record<string, unknown>>>;
}

const CustomTable = <T extends object>({ columns, data, total, query, setQuery = () => {}, ...props }: Props<T>) => {
  return data?.length ? (
    <>
      <Table<T>
        columns={columns}
        pagination={{
          defaultPageSize: query?.limit ? Number(query?.limit) : 10,
          current: query?.page ? Number(query?.page) : 1,
          total,
          showSizeChanger: true,
          onChange: (page, limit) => {
            setQuery({ page, limit });
          },
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
          pageSizeOptions: [10, 20, 50],
          responsive: true,
        }}
        dataSource={data}
        scroll={{ x: true }}
        {...{ props }}
      />
    </>
  ) : (
    <Empty />
  );
};

export default CustomTable;
