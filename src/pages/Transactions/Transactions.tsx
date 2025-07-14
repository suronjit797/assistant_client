import React, { Key, useState } from "react";
import { Button, Input, Spin, TableProps, Tag } from "antd";
import PageHeader from "@/components/PageHeader";
import CustomTable from "../../components/CustomTable";
import { useGetAllTransactionsQuery, useUpdateTransactionsMutation } from "@/redux/api/transactionApi";
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
import { transactionsTypes } from "@/constant/constants";
const { Search } = Input;

const Transactions: React.FC = () => {
  // hooks
  const { queryParams, setQueryParams, getNonEmptyQueryParams, clearQueryParams } = useQueryParams({
    page: 1,
    limit: 10,
  });
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
  const [update, { isLoading: updateLoading }] = useUpdateTransactionsMutation();

  // handler
  const onSearch = (value: string) => {
    console.log(value);
    setQueryParams({ search: value });
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
      dataIndex: "isImportant",
      key: "isImportant",
      render: (_text, record) => (
        <div
          className="text-xl cursor-pointer"
          onClick={() => update({ id: record._id, body: { isImportant: !record.isImportant } })}
        >
          {record.isImportant ? <IoMdStar className="text-yellow-500" /> : <IoMdStarOutline />}
        </div>
      ),
      width: 60,
      align: "center",
      sorter: true,
      sortDirections: ["ascend", "descend"],
    },

    {
      title: "Title",
      ellipsis: true,
      dataIndex: "title",
      key: "title",
      sorter: true,
      sortDirections: ["ascend", "descend"],
    },

    {
      title: "Type",
      ellipsis: true,
      dataIndex: "type",
      key: "type",
      width: 100,
      align: "center",
      render: (_text, record) => <div className="text-center capitalize"> {record?.type} </div>,
      sorter: true,
      sortDirections: ["ascend", "descend"],
      filters: transactionsTypes.map((type) => ({ text: <span className="capitalize"> {type} </span>, value: type })),
    },
    {
      title: "Amount",
      ellipsis: true,
      dataIndex: "amount",
      key: "amount",
      width: 200,
      align: "center",
      sorter: true,
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Status",
      ellipsis: true,
      dataIndex: "isPending",
      key: "isPending",
      render: (_text, record) => (
        <div
          className="text-center cursor-pointer"
          onClick={() => update({ id: record._id, body: { isPending: !record.isPending } })}
        >
          {record.isPending ? <Tag color="red">Pending</Tag> : <Tag color="green"> Completed </Tag>}
        </div>
      ),
      width: 120,
      align: "center",
      sorter: true,
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Created At",
      ellipsis: true,
      dataIndex: "createdAt",
      key: "createdAt",
      render: (_text, record) => (
        <div className="text-center"> {dayjs(record.createdAt).format("DD-MM-YYYY HH:mm:ss")} </div>
      ),
      width: 200,
      align: "center",
      sorter: true,
      sortDirections: ["ascend", "descend"],
    },

    {
      title: "Action",
      ellipsis: true,
      render: (_text, record) => (
        <div className="flex gap-2 justify-center">
          <Button icon={<FaRegEye />} type="primary" onClick={() => navigate(`${record._id}`)} title="View User" />
          <Button
            icon={<FiEdit />}
            type="primary"
            className="!bg-gray-300 !text-black hover:!bg-gray-400"
            onClick={() => {
              setEditData(record);
              setOpen(true);
            }}
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
    <Spin spinning={isFetching || updateLoading}>
      <div>
        <div className="">
          <PageHeader {...{ title: "Transactions", subTitle: "All Transactions" }} />
          <div className="flex">
            <div>
              <Search
                placeholder="input search text"
                onSearch={onSearch}
                enterButton
                value={queryParams.search as string}
                allowClear
              />
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
                onClick={() => clearQueryParams()}
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

        <TransactionsForm
          {...{ open, setOpen, mode: editData ? "edit" : "create", data: editData, setData: setEditData }}
        />
      </div>
    </Spin>
  );
};

export default Transactions;
