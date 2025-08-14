import PageHeader from "@/components/PageHeader";
import SearchItem from "@/components/SearchItem/SearchItem";
import { useQueryParams } from "@/hooks/useQueryParams";
import { IPassword } from "@/interfaces/passwordManagerInterface";
import {
  useDecryptPasswordMutation,
  useDeleteManyPasswordManagerMutation,
  useDeletePasswordManagerMutation,
  useGetAllPasswordManagerQuery,
} from "@/redux/api/passwordManagerApi";
import { copyHandler } from "@/utils/copyHandler";
import { Button, Spin, TableProps } from "antd";
import React, { Key, useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { IoCopyOutline } from "react-icons/io5";
import { MdOutlineFilterAltOff } from "react-icons/md";
import { RiDeleteBin7Line } from "react-icons/ri";
import { TfiReload } from "react-icons/tfi";
import Swal from "sweetalert2";
import CustomTable from "../../components/CustomTable";
import PasswordManagerForm from "./PasswordManagerFrom";

const getUserPassword = async (): Promise<string | null> => {
  let userPassword = sessionStorage.getItem("userPassword");

  if (!userPassword) {
    const { value: inputPassword, isConfirmed } = await Swal.fire({
      title: "Enter your master password",
      input: "password",
      inputLabel: "This is required to decrypt your saved passwords.",
      inputPlaceholder: "Enter your password",
      inputAttributes: {
        autocapitalize: "off",
        autocorrect: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Decrypt",
      cancelButtonText: "Cancel",
    });

    if (!isConfirmed || !inputPassword) return null;

    sessionStorage.setItem("userPassword", inputPassword);
    userPassword = inputPassword;
  }

  return userPassword;
};

const PasswordManager: React.FC = () => {
  // const userPassword = sessionStorage.getItem("userPassword");
  // hooks
  const { queryParams, setQueryParams, getNonEmptyQueryParams, clearQueryParams } = useQueryParams({
    page: 1,
    limit: 10,
  });

  // constants
  const page = Number(queryParams.page) || 1;
  const limit = Number(queryParams.limit) || 10;

  // rtk queries
  const { data: passwordData, isFetching, refetch } = useGetAllPasswordManagerQuery(getNonEmptyQueryParams);
  // const [update, { isLoading: updateLoading }] = useUpdatePasswordManagerMutation();
  const [deleteData, { isLoading: deleteLoading }] = useDeletePasswordManagerMutation();
  const [deleteManyData, { isLoading: deleteManyLoading }] = useDeleteManyPasswordManagerMutation();
  const [decryptPassword, { isLoading: decryptLoading }] = useDecryptPasswordMutation();

  // states
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<Partial<IPassword>>();
  const [data, setData] = useState<IPassword[]>(passwordData?.data || []);

  // effects
  useEffect(() => {
    if (passwordData?.data) setData(passwordData?.data);
  }, [isFetching, passwordData?.data]);

  const handleRefresh = () => {
    refetch();
  };

  // rowSelection object indicates the need for row selection
  const rowSelection: TableProps<IPassword>["rowSelection"] = {
    selectedRowKeys,
    onChange: (keys) => {
      setSelectedRowKeys(keys);
    },
    getCheckboxProps: (record: IPassword) => ({
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

  const handleEdit = async (record: IPassword) => {
    try {
      const userPassword = await getUserPassword();
      if (!userPassword) return;

      const data = await decryptPassword({ id: record._id, password: userPassword }).unwrap();

      if (data.data?.decryptedPassword) {
        setEditData({ ...data.data, encryptedPassword: data?.data?.decryptedPassword });
        setOpen(true);
      } else {
        Swal.fire({ title: "Failed", text: "Decryption failed.", icon: "error" });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({ title: "Error", text: "Something went wrong.", icon: "error" });
    }
  };

  const handleCopyPassword = async (record: IPassword) => {
    try {
      const userPassword = await getUserPassword();
      if (!userPassword) return;

      let decryptedPassword = record.decryptedPassword;

      if (!decryptedPassword) {
        const { data } = await decryptPassword({ id: record._id, password: userPassword }).unwrap();
        decryptedPassword = data?.decryptedPassword;

        // update state
        setData((prev) =>
          prev.map((item) => (item._id === record._id ? { ...item, decryptedPassword: data.decryptedPassword } : item)),
        );
      }
      await copyHandler(decryptedPassword, "Password");
    } catch (error) {
      console.log(error);
      Swal.fire({ title: "Error", text: "Something went wrong.", icon: "error" });
    }
  };

  const handleShowPassword = async (record: IPassword) => {
    try {
      const userPassword = await getUserPassword();
      if (!userPassword) return;

      let decryptedPassword = record.decryptedPassword;

      if (!record.show && !decryptedPassword) {
        const { data } = await decryptPassword({ id: record._id, password: userPassword }).unwrap();

        if (data?.decryptedPassword) {
          decryptedPassword = data?.decryptedPassword;
          setData((prev) =>
            prev.map((item) =>
              item._id === record._id ? { ...item, decryptedPassword: data.decryptedPassword, show: !item.show } : item,
            ),
          );
        } else {
          Swal.fire({ title: "Failed", text: "Decryption failed.", icon: "error" });
        }
      } else {
        setData((prev) => prev.map((item) => (item._id === record._id ? { ...item, show: !item.show } : item)));
      }
    } catch (error) {
      console.log(error);
      Swal.fire({ title: "Error", text: "Something went wrong.", icon: "error" });
    }
  };

  // columns
  const columns: TableProps<IPassword>["columns"] = [
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
      title: "Website",
      dataIndex: "website",
      key: "website",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      render: (_text, record) => (
        <div
          title="Click to copy"
          className="cursor-pointer"
          onClick={async () => await copyHandler(record.username, "Username")}
        >
          {record.username}
        </div>
      ),
    },
    {
      title: "Password",
      dataIndex: "encryptedPassword",
      key: "encryptedPassword",
      render: (_text, record) => (
        <div className="flex items-center" onClick={() => handleShowPassword(record)}>
          <div className="cursor-pointer">
            {record?.show && record.decryptedPassword ? record.decryptedPassword : "******"}
          </div>
        </div>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (_text, record) => <div className="capitalize">{record.category}</div>,
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
      render: (_text, record) => <div className="capitalize">{record.notes || "--"}</div>,
    },
    {
      title: "Action",
      ellipsis: true,
      render: (_text, record) => (
        <div className="flex gap-2 justify-center">
          <Button
            icon={<IoCopyOutline />}
            type="primary"
            color="cyan"
            variant="solid"
            onClick={() => handleCopyPassword(record)}
            title="Copy password"
            loading={decryptLoading}
          />
          <Button
            icon={<FiEdit />}
            type="primary"
            className="!bg-gray-300 !text-black hover:!bg-gray-400"
            loading={decryptLoading}
            onClick={() => handleEdit(record)}
            title="Edit Transactions"
          />

          <Button
            icon={<RiDeleteBin7Line />}
            type="primary"
            danger
            onClick={() => handleDelete(record?._id)}
            title="Delete Transactions"
          />
        </div>
      ),
      width: 200,
      align: "center",
    },
  ];

  const isLoading = isFetching || deleteLoading || deleteManyLoading || decryptLoading;

  return (
    <Spin spinning={isLoading}>
      <div>
        <div>
          <PageHeader {...{ title: "PasswordManager", subTitle: "All PasswordManager" }} />

          {/* filter */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="flex gap-2">
              <SearchItem name="todos" />
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
                title="Remove MUlti PasswordManager"
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
            data={Array.isArray(data) ? data?.map((d) => ({ ...d, key: d?._id })) : []}
            columns={columns}
            total={passwordData?.meta?.total || 0}
            query={queryParams}
            setQuery={setQueryParams}
            rowSelection={rowSelection}
            // rowClassName={(record) => (record.isCompleted ? "line-through text-gray-400" : "")}
          />
        </div>

        <PasswordManagerForm
          {...{ open, setOpen, mode: editData ? "edit" : "create", data: editData, setData: setEditData }}
        />
      </div>
    </Spin>
  );
};

export default PasswordManager;
