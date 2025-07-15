import type { TableProps } from "antd";
import { Empty, Table } from "antd";

interface Props<T> extends Omit<TableProps<T>, "dataSource" | "pagination"> {
  columns: TableProps<T>["columns"];
  data: T[];
  total?: number;
  query?: Record<string, unknown>;
  setQuery?: React.Dispatch<React.SetStateAction<Record<string, unknown>>>;
}

const CustomTable = <T extends object>({
  columns,
  data,
  total,
  query,
  setQuery = () => {},

  ...props
}: Props<T>) => {
  const changeHandler: TableProps<T>["onChange"] = (pagination, filter, sorter, extra) => {
    console.log({ filter, extra });
    const { current, pageSize } = pagination;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { field, order } = sorter as any;

    // const cleanedFilter: Record<string, any> = {};

    // Object.entries(filter).forEach(([key, value]) => {
    //   if (value) {
    //     cleanedFilter[key] = value;
    //   }
    // });
    // console.log({ page: current, limit: pageSize, ...filter });

    setQuery({
      page: current,
      limit: pageSize,
      sortBy: field,
      sortOrder: order ? (order === "ascend" ? "asc" : "desc") : undefined,
      ...filter,
    });
  };

  const mappedColumns: TableProps<T>["columns"] = columns.map((col) => {
    const colKey = col.key?.toString();

    const updatedCol = { ...col };

    // set sort for column
    if (query.sortBy && query.sortOrder && colKey === query.sortBy) {
      updatedCol.sortOrder = query.sortOrder === "asc" ? "ascend" : "descend";
    } else {
      updatedCol.sortOrder = undefined;
    }

    // Set filteredValue for column
    if (query && colKey && query[colKey]) {
      updatedCol.filteredValue = Array.isArray(query[colKey]) ? query[colKey] : String(query[colKey]).split(",");
    } else {
      updatedCol.filteredValue = [];
    }

    return updatedCol;
  });

  return (
    <>
      <Table<T>
        columns={mappedColumns}
        pagination={{
          defaultPageSize: query?.limit ? Number(query?.limit) : 10,
          current: query?.page ? Number(query?.page) : 1,
          total,
          showSizeChanger: true,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
          pageSizeOptions: [10, 20, 50],
          responsive: true,
        }}
        dataSource={data}
        scroll={{ x: true }}
        onChange={changeHandler}
        locale={{
          emptyText: (
            <div style={{ minHeight: "calc( 100vh - 300px )" }} className="flex items-center justify-center">
              <Empty />
            </div>
          ),
        }}
        sortDirections={["ascend", "descend"]}
        {...props}
      />
    </>
  );
};

export default CustomTable;
