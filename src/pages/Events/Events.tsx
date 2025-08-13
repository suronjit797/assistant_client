import PageHeader from "@/components/PageHeader";
import { useQueryParams } from "@/hooks/useQueryParams";
import { IEvent } from "@/interfaces/eventInterface";
import { useDeleteEventMutation, useDeleteManyEventMutation, useGetAllEventQuery } from "@/redux/api/eventApi";
import { Button, Input, Spin, TableProps } from "antd";
import dayjs from "dayjs";
import React, { Key, useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { MdOutlineFilterAltOff } from "react-icons/md";
import { RiDeleteBin7Line } from "react-icons/ri";
import { TfiReload } from "react-icons/tfi";
import Swal from "sweetalert2";
import CustomTable from "../../components/CustomTable";
import EventsForm from "./EventsForm";

const { Search } = Input;

const Events: React.FC = () => {
  const { queryParams, setQueryParams, getNonEmptyQueryParams, clearQueryParams } = useQueryParams({
    page: 1,
    limit: 10,
  });

  const page = Number(queryParams.page) || 1;
  const limit = Number(queryParams.limit) || 10;

  // RTK Queries
  const { data: eventsData, isFetching, refetch } = useGetAllEventQuery({ ...getNonEmptyQueryParams, sortBy: "date" });
  const [deleteEvents, { isLoading: deleteLoading }] = useDeleteEventMutation();
  const [deleteManyDiaries, { isLoading: deleteManyLoading }] = useDeleteManyEventMutation();

  // States
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<Partial<IEvent>>();
  const [data, setData] = useState<IEvent[]>(eventsData?.data || []);
  const [search, setSearch] = useState("");

  // Effects
  useEffect(() => {
    if (eventsData?.data) setData(eventsData?.data);
  }, [isFetching, eventsData?.data]);

  // Handlers
  const onSearch = () => {
    setQueryParams({ search });
  };

  const handleRefresh = () => {
    refetch();
  };

  const rowSelection: TableProps<IEvent>["rowSelection"] = {
    selectedRowKeys,
    onChange: (keys) => {
      setSelectedRowKeys(keys);
    },
    getCheckboxProps: (record: IEvent) => ({
      disabled: false,
      name: record._id,
    }),
  };

  const handleDelete = async (id: string) => {
    const confirmResult = await Swal.fire({
      title: "Delete this events entry?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete",
    });

    if (!confirmResult.isConfirmed) return;

    try {
      await deleteEvents(id).unwrap();
      Swal.fire({ title: "Success", text: "Events Deleted Successfully.", icon: "success" });
    } catch (error) {
      Swal.fire({ title: "Failed", text: error.message || "Events Deletion Failed.", icon: "error" });
    }
  };

  const handleDeleteMany = async (ids: string[] | Key[]) => {
    const confirmResult = await Swal.fire({
      title: "Delete selected events entries?",
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

  const handleEdit = (record: IEvent) => {
    setEditData({ ...record });
    setOpen(true);
  };

  // Table columns
  const columns: TableProps<IEvent>["columns"] = [
    {
      title: "No.",
      ellipsis: true,
      render: (_text, _record, index) => <div>{(page - 1) * limit + (index + 1)}</div>,
      align: "center",
      width: 60,
    },

    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },

    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (text) => <div className="cursor-pointer capitalize line-clamp-1">{text}</div>,
    },

    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (text) => (
        <div className="cursor-pointer line-clamp-1">{dayjs(text).format("DD-MM-YYYY hh:mm:ss A")}</div>
      ),
    },

    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (text) => (
        <div className="cursor-pointer line-clamp-1">{dayjs(text).format("DD-MM-YYYY hh:mm:ss A")}</div>
      ),
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
            title="Edit Events"
          />
          <Button
            icon={<RiDeleteBin7Line />}
            type="primary"
            danger
            onClick={() => handleDelete(record?._id)}
            title="Delete Events"
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
        <PageHeader title="Daily Events" subTitle="All Events Entries" />

        {/* Filter */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="flex gap-2">
            <Search
              placeholder="Search events..."
              onSearch={onSearch}
              onChange={(e) => setSearch(e.target.value)}
              enterButton
              value={search}
              allowClear
              className="w-full !max-w-60"
            />
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
            total={eventsData?.meta?.total || 0}
            query={queryParams}
            setQuery={setQueryParams}
            rowSelection={rowSelection}
          />
        </div>

        <EventsForm {...{ open, setOpen, mode: editData ? "edit" : "create", data: editData, setData: setEditData }} />
      </div>
    </Spin>
  );
};

export default Events;
