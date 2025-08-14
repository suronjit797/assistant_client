import PageHeader from "@/components/PageHeader";
import SearchItem from "@/components/SearchItem/SearchItem";
import { useQueryParams } from "@/hooks/useQueryParams";
import { IDiary } from "@/interfaces/diaryInterface";
import { useDeleteDiaryMutation, useDeleteManyDiaryMutation, useGetAllDiaryQuery } from "@/redux/api/diaryApi";
import { Button, Spin, TableProps } from "antd";
import dayjs from "dayjs";
import React, { Key, useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { MdOutlineFilterAltOff } from "react-icons/md";
import { RiDeleteBin7Line } from "react-icons/ri";
import { TfiReload } from "react-icons/tfi";
import Swal from "sweetalert2";
import CustomTable from "../../components/CustomTable";
import DiaryForm from "./DiaryForm";

const Diary: React.FC = () => {
  const { queryParams, setQueryParams, getNonEmptyQueryParams, clearQueryParams } = useQueryParams({
    page: 1,
    limit: 10,
  });

  const page = Number(queryParams.page) || 1;
  const limit = Number(queryParams.limit) || 10;

  // RTK Queries
  const { data: diaryData, isFetching, refetch } = useGetAllDiaryQuery({ ...getNonEmptyQueryParams, sortBy: "date" });
  const [deleteDiary, { isLoading: deleteLoading }] = useDeleteDiaryMutation();
  const [deleteManyDiaries, { isLoading: deleteManyLoading }] = useDeleteManyDiaryMutation();

  // States
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<Partial<IDiary>>();
  const [data, setData] = useState<IDiary[]>(diaryData?.data || []);

  // Effects
  useEffect(() => {
    if (diaryData?.data) setData(diaryData?.data);
  }, [isFetching, diaryData?.data]);

  const handleRefresh = () => {
    refetch();
  };

  const rowSelection: TableProps<IDiary>["rowSelection"] = {
    selectedRowKeys,
    onChange: (keys) => {
      setSelectedRowKeys(keys);
    },
    getCheckboxProps: (record: IDiary) => ({
      disabled: false,
      name: record._id,
    }),
  };

  const handleDelete = async (id: string) => {
    const confirmResult = await Swal.fire({
      title: "Delete this diary entry?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete",
    });

    if (!confirmResult.isConfirmed) return;

    try {
      await deleteDiary(id).unwrap();
      Swal.fire({ title: "Success", text: "Diary Deleted Successfully.", icon: "success" });
    } catch (error) {
      Swal.fire({ title: "Failed", text: error.message || "Diary Deletion Failed.", icon: "error" });
    }
  };

  const handleDeleteMany = async (ids: string[] | Key[]) => {
    const confirmResult = await Swal.fire({
      title: "Delete selected diary entries?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete",
    });

    if (!confirmResult.isConfirmed) return;

    try {
      await deleteManyDiaries(ids).unwrap();
      Swal.fire({ title: "Success", text: "Selected Diaries Deleted Successfully.", icon: "success" });
    } catch (error) {
      Swal.fire({ title: "Failed", text: error.message || "Deletion Failed.", icon: "error" });
    }
  };

  const handleEdit = (record: IDiary) => {
    setEditData({ ...record });
    setOpen(true);
  };

  // Table columns
  const columns: TableProps<IDiary>["columns"] = [
    {
      title: "No.",
      ellipsis: true,
      render: (_text, _record, index) => <div>{(page - 1) * limit + (index + 1)}</div>,
      align: "center",
      width: 60,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (_text, record) => <div>{record.content ? dayjs(record.date).format("DD/MM/YYYY") : "--"}</div>,
      width: 150,
      align: "center",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },

    {
      title: "Content",
      dataIndex: "content",
      key: "content",
      render: (_text, record) => (
        <div className="line-clamp-2">
          {record.content?.length > 10 ? record.content.slice(0, 10) + "..." : record.content || "--"}
        </div>
      ),
    },
    {
      title: "Public",
      dataIndex: "public",
      key: "public",
      render: (_text, record) => <div>{record.isPublic ? "Public" : "Private"}</div>,
      width: 150,
      align: "center",
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
            onClick={() => handleEdit(record)}
            title="Edit Diary"
          />
          <Button
            icon={<RiDeleteBin7Line />}
            type="primary"
            danger
            onClick={() => handleDelete(record?._id)}
            title="Delete Diary"
          />
        </div>
      ),
      width: 160,
      align: "center",
    },
  ];

  const isLoading = isFetching || deleteLoading || deleteManyLoading;

  return (
    <Spin spinning={isLoading}>
      <div>
        <PageHeader title="Daily Diary" subTitle="All Diary Entries" />

        {/* Filter */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="flex gap-2">
            <SearchItem name="todos" />
          </div>
          <div className="ms-auto flex gap-2">
            <Button type="primary" onClick={() => setOpen(true)} icon={<AiOutlinePlus />} />
            <Button
              type="primary"
              danger
              onClick={() => handleDeleteMany(selectedRowKeys)}
              icon={<RiDeleteBin7Line />}
            />
            <Button type="default" onClick={() => clearQueryParams()} icon={<MdOutlineFilterAltOff />} />
            <Button color="purple" variant="solid" onClick={handleRefresh} icon={<TfiReload />} />
          </div>
        </div>

        {/* Main Table */}
        <div className="mt-4" key={isLoading.toString()}>
          <CustomTable
            data={Array.isArray(data) ? data.map((d) => ({ ...d, key: d?._id })) : []}
            columns={columns}
            total={diaryData?.meta?.total || 0}
            query={queryParams}
            setQuery={setQueryParams}
            rowSelection={rowSelection}
          />
        </div>

        <DiaryForm {...{ open, setOpen, mode: editData ? "edit" : "create", data: editData, setData: setEditData }} />
      </div>
    </Spin>
  );
};

export default Diary;
