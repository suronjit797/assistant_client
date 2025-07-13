import React, { Key, useState } from "react";
import { Button, Drawer, Input, Spin, TableProps, Tag } from "antd";
import PageHeader from "@/components/PageHeader";
import CustomTable from "../../components/CustomTable";
import { useGetAllTransactionsQuery } from "@/redux/api/transactionApi";
import { TTransactions } from "@/interfaces/transactionsInterface";
import { useQueryParams } from "@/hooks/useQueryParams";
import { FaRegEye } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { RiDeleteBin7Line } from "react-icons/ri";
import { AiOutlinePlus } from "react-icons/ai";
import { MdOutlineFilterAltOff } from "react-icons/md";
import { TfiReload } from "react-icons/tfi";
import TransactionsForm from "./TransactionsFrom";
import { IoMdStar, IoMdStarOutline } from "react-icons/io";
const { Search } = Input;

const Transactions: React.FC = () => {
  // hooks
  const { queryParams, setQueryParams, getNonEmptyQueryParams } = useQueryParams({ page: 1, limit: 10 });
  const navigate = useNavigate();

  // constants
  const page = Number(queryParams.page);
  const limit = Number(queryParams.limit);

  // states
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<Partial<TTransactions>>();

  // rtk queries
  const { data, isFetching, refetch } = useGetAllTransactionsQuery(getNonEmptyQueryParams);

  // handler
  const onSearch = (value: string) => {
    console.log(value);
  };

  // rowSelection object indicates the need for row selection
  const rowSelection: TableProps<TTransactions>["rowSelection"] = {
    selectedRowKeys,
    onChange: (keys) => {
      setSelectedRowKeys(keys);
    },
    getCheckboxProps: (record: TTransactions) => ({
      disabled: false,
      name: record._id,
    }),
  };

  const columns: TableProps<TTransactions>["columns"] = [
    {
      title: <div>No.</div>,
      ellipsis: true,
      dataIndex: "no",
      key: "no",
      render: (_text, _record, index) => <div> {(page - 1) * limit + (index + 1)} </div>,
      align: "center",
      width: 60,
    },

    {
      title: "",
      ellipsis: true,
      dataIndex: "title",
      key: "title",
      render: (_text, record) => (record.isImportant ? <IoMdStar /> : <IoMdStarOutline />),
      width: 60,
      align: "center",
    },

    {
      title: "Title",
      ellipsis: true,
      dataIndex: "title",
      key: "title",
    },

    {
      title: "Type",
      ellipsis: true,
      dataIndex: "type",
      key: "type",
      width: 100,
      align: "center",
    },
    {
      title: "Amount",
      ellipsis: true,
      dataIndex: "amount",
      key: "amount",
      width: 200,
      align: "center",
    },
    {
      title: "Status",
      ellipsis: true,
      dataIndex: "title",
      key: "title",
      render: (_text, record) =>
        record.isPending ? <Tag color="red">Pending</Tag> : <Tag color="green"> Completed </Tag>,
      width: 100,
      align: "center",
    },
    {
      title: "Created At",
      ellipsis: true,
      dataIndex: "createdAt",
      key: "createdAt",
      render: (_text, record) => dayjs(record.createdAt).format("DD-MM-YYYY HH:mm:ss"),
      width: 100,
      align: "center",
    },

    {
      title: "Action",
      ellipsis: true,
      render: (_text, record) => (
        <div className="flex gap-2">
          <Button icon={<FaRegEye />} type="primary" onClick={() => navigate(`${record._id}`)} title="View User" />
          <Button
            icon={<FiEdit />}
            type="primary"
            className="!bg-gray-300 !text-black hover:!bg-gray-400"
            onClick={() => setEditData(record)}
            title="Edit User"
          />
          {/* <div onClick={() => updateUser({ id: record._id, body: { isActive: !record.isActive } })}>
            {!record.isActive ? (
              <Button
                icon={<FiUserCheck />}
                type="primary"
                className="!bg-green-700  hover:!bg-green-600"
                title="Activate User"
              />
            ) : (
              <Button
                icon={<FiUserX />}
                type="primary"
                className="!bg-yellow-500  hover:!bg-yellow-600"
                title="Deactivate User"
              />
            )}
          </div> */}

          <Button
            icon={<RiDeleteBin7Line />}
            type="primary"
            danger
            // onClick={() => deleteUser(record._id)}
            title="Delete User"
          />
        </div>
      ),
      width: 200,
      align: "center",
    },
  ];

  return (
    <Spin spinning={isFetching}>
      <div>
        <div className="">
          <PageHeader {...{ title: "Transactions", subTitle: "All Transactions" }} />
          <div className="flex">
            <div>
              <Search placeholder="input search text" onSearch={onSearch} enterButton />
            </div>
            <div className="ms-auto flex gap-2">
              <Button type="primary" title="Add Transaction" onClick={() => setOpen(true)} icon={<AiOutlinePlus />} />
              <Button
                type="primary"
                danger
                title="Remove Transactions"
                // onClick={() => setOpen(true)}
                icon={<RiDeleteBin7Line />}
              />
              <Button
                type="default"
                title="Clear Filter"
                onClick={() => navigate("add")}
                icon={<MdOutlineFilterAltOff />}
              />
              <Button
                color="purple"
                variant="solid"
                title="Reload Data"
                onClick={() => refetch()}
                icon={<TfiReload />}
              />
            </div>
          </div>
        </div>
        <div className="mt-4">
          <CustomTable
            data={Array.isArray(data?.data) ? data?.data?.map((d) => ({ ...d, key: d?._id })) : []}
            columns={columns}
            total={data?.meta?.total || 0}
            query={queryParams}
            setQuery={setQueryParams}
            rowSelection={rowSelection}
          />
        </div>

        <Drawer
          title={editData ? "Edit Transaction" : "Add Transaction"}
          closable={{ "aria-label": "Close Button" }}
          onClose={() => setOpen(false)}
          open={open}
        >
          <TransactionsForm {...{ open, setOpen, mode: editData ? "edit" : "create", data: editData }} />
        </Drawer>
      </div>
    </Spin>
  );
};

export default Transactions;
