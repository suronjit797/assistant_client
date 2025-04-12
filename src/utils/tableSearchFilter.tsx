/* eslint-disable @typescript-eslint/no-explicit-any */
import { SearchOutlined } from "@ant-design/icons";
import { Input, TableColumnType } from "antd";

const { Search } = Input;

const tableSearchFilter: TableColumnType<any> = {
  filterDropdown: ({ setSelectedKeys, confirm }) => {
    return (
      <div className="flex m-3">
        <Search
          placeholder="input search text"
          className="ms-auto max-w-64"
          onSearch={() => confirm()}
          onClear={() => confirm()}
          onChange={(e) => setSelectedKeys(e.target.value ? e.target?.value?.trim() : ("" as any))}
          enterButton
          allowClear
        />
      </div>
    );
  },
  filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />,
};

export default tableSearchFilter;
