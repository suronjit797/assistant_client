import PageHeader from "@/components/PageHeader";
import { useQueryParams } from "@/hooks/useQueryParams";
import { IContacts } from "@/interfaces/contactsInterface";
import { useDeleteContactMutation, useDeleteManyContactMutation, useGetAllContactQuery } from "@/redux/api/contactsApi";
import { copyHandler } from "@/utils/copyHandler";
import { Button, Input, Spin, TableProps } from "antd";
import React, { Key, useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { MdOutlineFilterAltOff } from "react-icons/md";
import { RiDeleteBin7Line } from "react-icons/ri";
import { TfiReload } from "react-icons/tfi";
import Swal from "sweetalert2";
import CustomTable from "../../components/CustomTable";
import ContactsForm from "./ContactsForm";

const { Search } = Input;

const Contacts: React.FC = () => {
  const { queryParams, setQueryParams, getNonEmptyQueryParams, clearQueryParams } = useQueryParams({
    page: 1,
    limit: 10,
  });

  const page = Number(queryParams.page) || 1;
  const limit = Number(queryParams.limit) || 10;

  // RTK Queries
  const {
    data: contactsData,
    isFetching,
    refetch,
  } = useGetAllContactQuery({ ...getNonEmptyQueryParams, sortBy: "date" });
  const [deleteContacts, { isLoading: deleteLoading }] = useDeleteContactMutation();
  const [deleteManyDiaries, { isLoading: deleteManyLoading }] = useDeleteManyContactMutation();

  // States
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<Partial<IContacts>>();
  const [data, setData] = useState<IContacts[]>(contactsData?.data || []);

  // Effects
  useEffect(() => {
    if (contactsData?.data) setData(contactsData?.data);
  }, [isFetching, contactsData?.data]);

  // Handlers
  const onSearch = (value: string) => {
    setQueryParams({ search: value });
  };

  const handleRefresh = () => {
    refetch();
  };

  const rowSelection: TableProps<IContacts>["rowSelection"] = {
    selectedRowKeys,
    onChange: (keys) => {
      setSelectedRowKeys(keys);
    },
    getCheckboxProps: (record: IContacts) => ({
      disabled: false,
      name: record._id,
    }),
  };

  const handleDelete = async (id: string) => {
    const confirmResult = await Swal.fire({
      title: "Delete this contacts entry?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete",
    });

    if (!confirmResult.isConfirmed) return;

    try {
      await deleteContacts(id).unwrap();
      Swal.fire({ title: "Success", text: "Contacts Deleted Successfully.", icon: "success" });
    } catch (error) {
      Swal.fire({ title: "Failed", text: error.message || "Contacts Deletion Failed.", icon: "error" });
    }
  };

  const handleDeleteMany = async (ids: string[] | Key[]) => {
    const confirmResult = await Swal.fire({
      title: "Delete selected contacts entries?",
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

  const handleEdit = (record: IContacts) => {
    setEditData({ ...record });
    setOpen(true);
  };

  // Table columns
  const columns: TableProps<IContacts>["columns"] = [
    {
      title: "No.",
      ellipsis: true,
      render: (_text, _record, index) => <div>{(page - 1) * limit + (index + 1)}</div>,
      align: "center",
      width: 60,
    },

    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => (
        <div className="cursor-pointer line-clamp-1" onClick={() => copyHandler(text, "Email")}>
          {text}
        </div>
      ),
    },

    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      render: (text) => (
        <div className="cursor-pointer line-clamp-1" onClick={() => copyHandler(text, "Phone")}>
          {text}
        </div>
      ),
    },

    // {
    //   title: "Others",
    //   dataIndex: "others",
    //   key: "others",
    //   render: (_, record) => (
    //     <div className="">{record.others?.map((ot, index) => <div key={index}> {ot} </div>)}</div>
    //   ),
    // },

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
            title="Edit Contacts"
          />
          <Button
            icon={<RiDeleteBin7Line />}
            type="primary"
            danger
            onClick={() => handleDelete(record?._id)}
            title="Delete Contacts"
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
        <PageHeader title="Daily Contacts" subTitle="All Contacts Entries" />

        {/* Filter */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="flex gap-2">
            <Search
              placeholder="Search contacts..."
              onSearch={onSearch}
              enterButton
              value={queryParams.search as string}
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
            total={contactsData?.meta?.total || 0}
            query={queryParams}
            setQuery={setQueryParams}
            rowSelection={rowSelection}
          />
        </div>

        <ContactsForm
          {...{ open, setOpen, mode: editData ? "edit" : "create", data: editData, setData: setEditData }}
        />
      </div>
    </Spin>
  );
};

export default Contacts;
