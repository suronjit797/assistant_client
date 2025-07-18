import PageHeader from "@/components/PageHeader";

import { todosPriorities } from "@/constant/constants";
import { useQueryParams } from "@/hooks/useQueryParams";
import { ITodos } from "@/interfaces/todosInterface";
import {
  useDeleteManyTodosMutation,
  useDeleteTodosMutation,
  useGetAllTodosQuery,
  useUpdateTodosMutation,
} from "@/redux/api/todoApi";
import { Button, Input, Spin, TableProps } from "antd";
import dayjs from "dayjs";
import React, { Key, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { IoMdStar, IoMdStarOutline } from "react-icons/io";
import { MdOutlineFilterAltOff } from "react-icons/md";
import { RiDeleteBin7Line } from "react-icons/ri";
import { TfiReload } from "react-icons/tfi";
import Swal from "sweetalert2";
import CustomTable from "../../components/CustomTable";
import TodosForm from "./TodosFrom";
const { Search } = Input;

const Todos: React.FC = () => {
  // hooks
  const { queryParams, setQueryParams, getNonEmptyQueryParams, clearQueryParams } = useQueryParams({
    page: 1,
    limit: 10,
  });

  // constants
  const page = Number(queryParams.page);
  const limit = Number(queryParams.limit);
  // const year = Number(queryParams.year) || dayjs().year();
  // const month = Number(queryParams.month) || dayjs().month() + 1;
  // const pickerValue = dayjs(`${year}-${month.toString().padStart(2, "0")}`, "YYYY-MM");

  // states
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<Partial<ITodos>>();

  // rtk queries
  const { data, isFetching, refetch } = useGetAllTodosQuery(getNonEmptyQueryParams);
  const [update, { isLoading: updateLoading }] = useUpdateTodosMutation();
  const [deleteData, { isLoading: deleteLoading }] = useDeleteTodosMutation();
  const [deleteManyData, { isLoading: deleteManyLoading }] = useDeleteManyTodosMutation();

  // handler
  const onSearch = (value: string) => {
    setQueryParams({ search: value });
  };

  const handleRefresh = () => {
    refetch();
  };

  // rowSelection object indicates the need for row selection
  const rowSelection: TableProps<ITodos>["rowSelection"] = {
    selectedRowKeys,
    onChange: (keys) => {
      setSelectedRowKeys(keys);
    },
    getCheckboxProps: (record: ITodos) => ({
      disabled: false,
      name: record._id,
    }),
  };

  const handleDelete = async (id: string) => {
    const confirmResult = await Swal.fire({
      title: "Deleted this todo?",
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
      title: "Deleted all this todo?",
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

  const columns: TableProps<ITodos>["columns"] = [
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
      title: "Description",
      ellipsis: true,
      dataIndex: "description",
      key: "description",
      sorter: true,
    },

    {
      title: "Priority",
      ellipsis: true,
      dataIndex: "priority",
      key: "priority",
      width: 140,
      align: "center",
      sorter: true,
      filters: todosPriorities.map((priority) => ({
        text: <span className="capitalize">{priority}</span>,
        value: priority,
      })),
      // filteredValue: typeof queryParams.type === "string" ? queryParams.type.split(",") : undefined,
      render: (_text, record) => {
        const type = record?.priority;
        // Color map
        const colorMap: Record<string, string> = {
          high: "bg-red-500",
          medium: "bg-green-500",
          low: "bg-blue-300",
        };

        return (
          <div className="flex items-center capitalize">
            <span className={`h-2 w-2 rounded-full mr-2 ${colorMap[type] || "bg-gray-400"}`} />
            {type}
          </div>
        );
      },
    },
    // {
    //   title: "Amount",
    //   ellipsis: true,
    //   dataIndex: "amount",
    //   key: "amount",
    //   width: 200,
    //   align: "center",
    //   sorter: true,
    // },
    {
      title: "Status",
      ellipsis: true,
      dataIndex: "isCompleted",
      key: "isCompleted",
      render: (_text, record) => (
        <div
          className="text-center cursor-pointer"
          onClick={() => update({ id: record._id, body: { isCompleted: !record.isCompleted } })}
        >
          {record.isCompleted ? (
            <div className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-blue-300 mr-2" /> Completed
            </div>
          ) : (
            <div className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-red-500 mr-2" /> Pending
            </div>
          )}
        </div>
      ),
      width: 120,
      align: "center",
      sorter: true,
    },

    {
      title: "Completed In",
      ellipsis: true,
      dataIndex: "dueDate",
      key: "dueDate",
      render: (_text, record) =>
        record.dueDate ? (
          <div className="text-center">
            <div className="text-center">{dayjs(record.dueDate).format("HH:mm:ss A")}</div>
            <div className="text-center">{dayjs(record.dueDate).format("DD-MMM-YYYY")}</div>
          </div>
        ) : (
          "--"
        ),
      width: 200,
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
          <Button
            icon={<FiEdit />}
            type="primary"
            className="!bg-gray-300 !text-black hover:!bg-gray-400"
            onClick={() => {
              setEditData(record);
              setOpen(true);
            }}
            title="Edit Todos"
          />

          <Button
            icon={<RiDeleteBin7Line />}
            type="primary"
            danger
            onClick={() => handleDelete(record?._id)}
            title="Delete Todos"
          />
        </div>
      ),
      width: 200,
      align: "center",
    },
  ];

  const isLoading = isFetching || updateLoading || deleteLoading || deleteManyLoading;

  return (
    <Spin spinning={isLoading}>
      <div>
        <div>
          <PageHeader {...{ title: "Todos", subTitle: "All Todos" }} />

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
              {/* <DatePicker
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
              /> */}
            </div>
            <div className="ms-auto flex gap-2">
              <Button type="primary" title="Add Todo" onClick={() => setOpen(true)} icon={<AiOutlinePlus />} />
              <Button
                type="primary"
                danger
                title="Remove MUlti Todos"
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

        {/* main table */}
        <div className="mt-4" key={isLoading.toString()}>
          <CustomTable
            data={Array.isArray(data?.data) ? data?.data?.map((d) => ({ ...d, key: d?._id })) : []}
            columns={columns}
            total={data?.meta?.total || 0}
            query={queryParams}
            setQuery={setQueryParams}
            rowSelection={rowSelection}
            rowClassName={(record) => (record.isCompleted ? "line-through text-gray-400" : "")}
          />
        </div>

        <TodosForm {...{ open, setOpen, mode: editData ? "edit" : "create", data: editData, setData: setEditData }} />
      </div>
    </Spin>
  );
};

export default Todos;
