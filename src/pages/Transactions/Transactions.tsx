import PageHeader from "@/components/PageHeader";
import { transactionsTypes } from "@/constant/constants";
import { useQueryParams } from "@/hooks/useQueryParams";
import { TTransactions } from "@/interfaces/transactionsInterface";
import {
  useGetAllTransactionsQuery,
  useGetSummaryQuery,
  useUpdateTransactionsMutation,
} from "@/redux/api/transactionApi";
import { Button, DatePicker, Input, Spin, TableProps } from "antd";
import dayjs from "dayjs";
import React, { Key, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FaRegEye } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { IoMdStar, IoMdStarOutline } from "react-icons/io";
import { MdOutlineFilterAltOff } from "react-icons/md";
import { RiDeleteBin7Line } from "react-icons/ri";
import { TfiReload } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";
import CustomTable from "../../components/CustomTable";
import TransactionsForm from "./TransactionsFrom";
import TransactionSummaryCards from "./TransactionsSummary";
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
  const year = Number(queryParams.year) || dayjs().year();
  const month = Number(queryParams.month) || dayjs().month() + 1;
  const pickerValue = dayjs(`${year}-${month.toString().padStart(2, "0")}`, "YYYY-MM");

  // states
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<Partial<TTransactions>>();

  // rtk queries
  const { data, isFetching, refetch } = useGetAllTransactionsQuery(getNonEmptyQueryParams);
  const {
    data: summaryData,
    isFetching: isSummaryFetching,
    refetch: summaryRefetch,
  } = useGetSummaryQuery({ month, year });
  const [update, { isLoading: updateLoading }] = useUpdateTransactionsMutation();

  // handler
  const onSearch = (value: string) => {
    setQueryParams({ search: value });
  };

  const handleRefresh = () => {
    refetch();
    summaryRefetch();
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
    },

    {
      title: "Title",
      ellipsis: true,
      dataIndex: "title",
      key: "title",
      sorter: true,
    },

    {
      title: "Type",
      ellipsis: true,
      dataIndex: "type",
      key: "type",
      width: 140,
      align: "center",
      sorter: true,
      filters: transactionsTypes.map((type) => ({
        text: <span className="capitalize">{type}</span>,
        value: type,
      })),
      // filteredValue: typeof queryParams.type === "string" ? queryParams.type.split(",") : undefined,
      render: (_text, record) => {
        const type = record?.type;
        // Color map
        const colorMap: Record<string, string> = {
          income: "bg-green-500",
          expense: "bg-red-500",
          give: "bg-yellow-500",
          take: "bg-purple-500",
          withdraw: "bg-pink-500",
          save: "bg-blue-300",
        };

        return (
          <div className="flex items-center capitalize">
            <span className={`h-2 w-2 rounded-full mr-2 ${colorMap[type] || "bg-gray-400"}`} />
            {type}
          </div>
        );
      },
    },
    {
      title: "Amount",
      ellipsis: true,
      dataIndex: "amount",
      key: "amount",
      width: 200,
      align: "center",
      sorter: true,
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
          {record.isPending ? (
            <div className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-red-500 mr-2" /> Pending
            </div>
          ) : (
            <div className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-blue-300 mr-2" /> Completed
            </div>
          )}
        </div>
      ),
      width: 120,
      align: "center",
      sorter: true,
    },
    {
      title: "Created At",
      ellipsis: true,
      dataIndex: "createdAt",
      key: "createdAt",
      render: (_text, record) => (
        <div className="text-center">
          <div className="text-center">{dayjs(record.createdAt).format("HH:mm:ss A")}</div>
          <div className="text-center">{dayjs(record.createdAt).format("DD-MMM-YYYY")}</div>
        </div>
      ),
      width: 200,
      align: "center",
      sorter: true,
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

  const isLoading = isFetching || updateLoading || isSummaryFetching;

  return (
    <Spin spinning={isLoading}>
      <div>
        <div>
          <PageHeader {...{ title: "Transactions", subTitle: "All Transactions" }} />

          {/* filter */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="flex gap-2">
              <Search
                placeholder="input search text"
                onSearch={onSearch}
                enterButton
                value={queryParams.search as string}
                allowClear
                className="w-full !max-w-60 "
              />
              <DatePicker
                picker="month"
                value={pickerValue}
                className="w-full !max-w-60"
                onChange={(value) => {
                  if (value) {
                    const selectedMonth = value.month() + 1;
                    const selectedYear = value.year();
                    setQueryParams({ month: selectedMonth, year: selectedYear, page: 1 });
                  } else {
                    setQueryParams({ month: undefined, year: undefined, page: 1 });
                  }
                }}
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
              <Button color="purple" variant="solid" title="Reload Data" onClick={handleRefresh} icon={<TfiReload />} />
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="my-4">
          <TransactionSummaryCards
            allTime={summaryData?.data?.allTime || {}}
            monthly={summaryData?.data?.monthly || {}}
            month={Number(summaryData?.data?.month)}
            year={summaryData?.data?.year}
          />
        </div>

        {/* main table */}
        <div className="mt-4" key={isLoading.toString()}>
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
