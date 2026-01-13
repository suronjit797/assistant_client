import PageHeader from "@/components/PageHeader";
import SearchItem from "@/components/SearchItem/SearchItem";
import { transactionsTypes } from "@/constant/constants";
import { userRole } from "@/constant/userRole";
import { useQueryParams } from "@/hooks/useQueryParams";
import { TTransactions } from "@/interfaces/transactionsInterface";
import {
  useDeleteManyTransactionsMutation,
  useDeleteTransactionsMutation,
  useGetAllTransactionsQuery,
  useGetSummaryQuery,
  useUpdateTransactionsMutation,
} from "@/redux/api/transactionApi";
import { useAppSelector } from "@/redux/store";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, DatePicker, Spin, TableProps, Tag } from "antd";
import dayjs from "dayjs";
import React, { Key, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { IoMdStar, IoMdStarOutline } from "react-icons/io";
import { MdOutlineFilterAltOff } from "react-icons/md";
import { RiDeleteBin7Line } from "react-icons/ri";
import { TfiReload } from "react-icons/tfi";
import Swal from "sweetalert2";
import CustomTable from "../../components/CustomTable";
import TransactionsForm from "./TransactionsFrom";
import { TransactionsSummary } from "./TransactionsSummary";

const Transactions: React.FC = () => {
  // hooks
  const { queryParams, setQueryParams, getNonEmptyQueryParams, clearQueryParams } = useQueryParams({
    page: 1,
    limit: 10,
  });

  const { user = {} } = useAppSelector((state) => state.auth);

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
  const { data, isFetching, refetch } = useGetAllTransactionsQuery({
    ...getNonEmptyQueryParams,
    ...(user.role === "superAdmin" ? { populate: "user" } : {}),
    createdAt_gt: dayjs(`${year}-${month.toString().padStart(2, "0")}-01`, "YYYY-MM-DD").toISOString(),
    createdAt_lt: dayjs(`${year}-${month.toString().padStart(2, "0")}-31`, "YYYY-MM-DD").toISOString(),
  });
  const {
    data: summaryData,
    isFetching: isSummaryFetching,
    refetch: summaryRefetch,
  } = useGetSummaryQuery({ month, year });
  const [update, { isLoading: updateLoading }] = useUpdateTransactionsMutation();
  const [deleteData, { isLoading: deleteLoading }] = useDeleteTransactionsMutation();
  const [deleteManyData, { isLoading: deleteManyLoading }] = useDeleteManyTransactionsMutation();

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

  const handleDelete = async (id: string) => {
    const confirmResult = await Swal.fire({
      title: "Deleted this transaction?",
      text: "Please confirm your action.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete",
    });

    if (!confirmResult.isConfirmed) return;

    try {
      await deleteData(id).unwrap();
      Swal.fire({ title: "Success", text: "Data Deleted Successfully.", icon: "success" });
    } catch (error) {
      Swal.fire({ title: "Failed", text: "Data Deleted Failed.", icon: "error" });
      console.log(error);
    }
  };

  const handleDeleteMany = async (ids: string[] | Key[]) => {
    const confirmResult = await Swal.fire({
      title: "Deleted all this transaction?",
      text: "Please confirm your action.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete",
    });

    if (!confirmResult.isConfirmed) return;

    try {
      await deleteManyData(ids).unwrap();
      Swal.fire({ title: "Success", text: "Data Deleted Successfully.", icon: "success" });
    } catch (error) {
      Swal.fire({ title: "Failed", text: "Data Deleted Failed.", icon: "error" });
      console.log(error);
    }
  };

  // columns

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
          income: /* "bg-green-500", */ "green",
          expense: /* "bg-red-500", */ "green",
          give: /* "bg-yellow-500", */ "green",
          take: /* "bg-purple-500", */ "green",
          withdraw: /* "bg-pink-500", */ "green",
          save: /* "bg-blue-300", */ "green",
        };

        return (
          // <div className={`flex items-center capitalize ${colorMap[type] || "bg-gray-400"}`}>
          //   <span className={`h-2 w-2 rounded-full mr-2 ${colorMap[type] || "bg-gray-400"}`} />
          //   {type}
          // </div>
          <Tag color={colorMap[type]}>
            <span
              className={`h-2 w-2 rounded-full mr-2 inline-block`}
              style={{ background: colorMap[type] || "gray" }}
            />
            {type}
          </Tag>
        );
      },
    },
    ...(user?.role === userRole.superAdmin
      ? [
          {
            title: "User",
            ellipsis: true,
            dataIndex: "user",
            key: "user",
            render: (text, record) => record.user?.name,
            sorter: true,
          },
        ]
      : []),

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
            <Tag color="red">
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-red-500 mr-2" /> Pending
              </div>
            </Tag>
          ) : (
            <Tag color="geekblue">
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-blue-300 mr-2" /> Completed
              </div>
            </Tag>
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
        <div className="flex gap-2 justify-center ">
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => {
              setEditData(record);
              setOpen(true);
            }}
            className="text-info hover:bg-info/10 hover:text-info !shadow-none"
          />
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record?._id)}
            className="hover:bg-destructive/10 !shadow-none"
          />
        </div>
      ),
      width: 200,
      align: "center",
    },
  ];

  const isLoading = isFetching || updateLoading || isSummaryFetching || deleteLoading || deleteManyLoading;

  // All time summary data
  const allTimeSummary = {
    title: "All Time",
    subtitle: "Life Time",
    items: [
      { label: "Income", value: summaryData?.data?.allTime?.income, type: "credit" as const },
      { label: "Take (Debt)", value: summaryData?.data?.allTime?.take, type: "credit" as const },
      { label: "Withdraw", value: summaryData?.data?.allTime?.withdraw, type: "credit" as const },
      { label: "Expense", value: summaryData?.data?.allTime?.expense, type: "debit" as const },
      { label: "Give (Lending)", value: summaryData?.data?.allTime?.give, type: "debit" as const },
      { label: "Save", value: summaryData?.data?.allTime?.save, type: "debit" as const },
    ],
    totalCredit: 501010,
    totalDebit: 0,
    cash: 501010,
  };

  // Monthly summary data
  const monthlySummary = {
    title: "Monthly Summary",
    subtitle: "January, 2026",
    items: [
      { label: "Income", value: 0, type: "credit" as const },
      { label: "Take (Debt)", value: 0, type: "credit" as const },
      { label: "Withdraw", value: 0, type: "credit" as const },
      { label: "Expense", value: 0, type: "debit" as const },
      { label: "Give (Lending)", value: 0, type: "debit" as const },
      { label: "Save", value: 0, type: "debit" as const },
    ],
    totalCredit: 0,
    totalDebit: 0,
    cash: 0,
  };

  return (
    <Spin spinning={isLoading}>
      <div>
        <div>
          <PageHeader {...{ title: "Transactions", subTitle: "All Transactions" }} />

          {/* filter */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="flex gap-2">
              <SearchItem name="transaction" />
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
                title="Remove MUlti Transactions"
                onClick={() => handleDeleteMany(selectedRowKeys)}
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
        {/* <div className="my-4">
          <TransactionSummaryCards
            allTime={summaryData?.data?.allTime || {}}
            monthly={summaryData?.data?.monthly || {}}
            month={Number(summaryData?.data?.month)}
            year={summaryData?.data?.year}
          />
          
        </div> */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <TransactionsSummary {...allTimeSummary} />
          <TransactionsSummary {...monthlySummary} />
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
