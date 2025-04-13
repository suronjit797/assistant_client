/* eslint-disable @typescript-eslint/no-explicit-any */
import { SearchOutlined } from "@ant-design/icons";
import { Input, TableColumnType } from "antd";

const { Search } = Input;

const tableSearchFilter: TableColumnType<any> = {
  filterDropdown: ({ selectedKeys, setSelectedKeys, confirm, filters }) => {
    console.log({ selectedKeys, d: selectedKeys["donorName"], filters });
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
          value={selectedKeys as any}
        />
      </div>
    );
  },
  filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />,
  filterResetToDefaultFilteredValue: true,
};

export default tableSearchFilter;
