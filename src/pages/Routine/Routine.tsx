import PageHeader from "@/components/PageHeader";

import { useQueryParams } from "@/hooks/useQueryParams";
import { IRoutines } from "@/interfaces/routinesInterface";
import {
  useDeleteManyRoutinesMutation,
  useDeleteRoutinesMutation,
  useGetAllRoutinesQuery,
  useUpdateRoutinesMutation,
} from "@/redux/api/routineApi";
import { Button, Input, Spin, TableProps } from "antd";
// import dayjs from "dayjs";
import React, { Key, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
// import { FiEdit } from "react-icons/fi";
// import { IoMdStar, IoMdStarOutline } from "react-icons/io";
import { dayConstants } from "@/constant/constants";
import { MdOutlineFilterAltOff } from "react-icons/md";
import { RiDeleteBin7Line } from "react-icons/ri";
import { TfiReload } from "react-icons/tfi";
import Swal from "sweetalert2";
import CustomTable from "../../components/CustomTable";
import RoutinesForm from "./RoutineFrom";
const { Search } = Input;

const Routines: React.FC = () => {
  // hooks
  const { queryParams, setQueryParams, getNonEmptyQueryParams, clearQueryParams } = useQueryParams({
    page: 1,
    limit: 10,
  });

  // constants
  // const page = Number(queryParams.page);
  // const limit = Number(queryParams.limit);
  // const year = Number(queryParams.year) || dayjs().year();
  // const month = Number(queryParams.month) || dayjs().month() + 1;
  // const pickerValue = dayjs(`${year}-${month.toString().padStart(2, "0")}`, "YYYY-MM");

  // states
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<Partial<IRoutines>>();

  // rtk queries
  const { data, isFetching, refetch } = useGetAllRoutinesQuery(getNonEmptyQueryParams);
  const [update, { isLoading: updateLoading }] = useUpdateRoutinesMutation();
  const [deleteData, { isLoading: deleteLoading }] = useDeleteRoutinesMutation();
  const [deleteManyData, { isLoading: deleteManyLoading }] = useDeleteManyRoutinesMutation();

  // handler
  const onSearch = (value: string) => {
    setQueryParams({ search: value });
  };

  const handleRefresh = () => {
    refetch();
  };

  // rowSelection object indicates the need for row selection
  const rowSelection: TableProps<IRoutines>["rowSelection"] = {
    selectedRowKeys,
    onChange: (keys) => {
      setSelectedRowKeys(keys);
    },
    getCheckboxProps: (record: IRoutines) => ({
      disabled: false,
      name: record._id,
    }),
  };

  const handleDelete = async (id: string) => {
    const confirmResult = await Swal.fire({
      title: "Deleted this routine?",
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
      title: "Deleted all this routine?",
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

  const columns: TableProps<IRoutines>["columns"] = [
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      fixed: "left",
      width: 100,
    },
    ...dayConstants.map((day) => ({
      title: day.charAt(0).toUpperCase() + day.slice(1),
      dataIndex: day,
      key: day,
      render: (item: IRoutines) => (item ? item.title : ""),
    })),
  ];

  const isLoading = isFetching || updateLoading || deleteLoading || deleteManyLoading;

  return (
    <Spin spinning={isLoading}>
      <div>
        <div>
          <PageHeader {...{ title: "Routines", subTitle: "All Routines" }} />

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
              <Button type="primary" title="Add Routine" onClick={() => setOpen(true)} icon={<AiOutlinePlus />} />
              <Button
                type="primary"
                danger
                title="Remove MUlti Routines"
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
            // rowClassName={(record) => (record.isCompleted ? "line-through text-gray-400" : "")}
          />
        </div>

        <RoutinesForm
          {...{ open, setOpen, mode: editData ? "edit" : "create", data: editData, setData: setEditData }}
        />
      </div>
    </Spin>
  );
};

export default Routines;
