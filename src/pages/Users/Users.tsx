import CustomTable from "@/components/CustomTable";
import PageHeader from "@/components/PageHeader";
import appConfig from "@/config/appConfig";
import { useQueryParams } from "@/hooks/useQueryParams";
import { TUser } from "@/interfaces/userInterface";
import { useDeleteUserMutation, useGetAllUsersQuery, useUpdateUserMutation } from "@/redux/api/usersApi";
import { Button, Spin, TableProps, Tag } from "antd";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import { FaRegEye } from "react-icons/fa6";
import { FiEdit, FiUserCheck, FiUserPlus, FiUserX } from "react-icons/fi";
import { RiDeleteBin7Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const Users = () => {
  // hooks
  const { queryParams, setQueryParams, getNonEmptyQueryParams } = useQueryParams({ page: 1, limit: 10 });
  const navigate = useNavigate();

  // states

  // rtk query
  const { data, isFetching } = useGetAllUsersQuery(getNonEmptyQueryParams);
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const [deleteUser, { isLoading: deleteLoading }] = useDeleteUserMutation();
  const page = Number(queryParams.page);
  const limit = Number(queryParams.limit);
  const { role } = queryParams;

  // effects
  useEffect(() => {
    document.title = `${appConfig.name} - All Users`;
  }, []);

  const columns: TableProps<TUser>["columns"] = [
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
      title: "Name",
      ellipsis: true,
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Login Id",
      ellipsis: true,
      dataIndex: "loginId",
      key: "loginId",
    },
    {
      title: "User Type",
      ellipsis: true,
      dataIndex: "role",
      key: "role",
      align: "center",
    },
    {
      title: "Date Created",
      ellipsis: true,
      dataIndex: "createdAt",
      key: "createdAt",
      render: (_text, record) => <div> {dayjs(record.createdAt).format("DD/MM/YYYY")} </div>,
      align: "center",
    },
    {
      title: "Last Login",
      ellipsis: true,
      dataIndex: "lastLogin",
      key: "lastLogin",
      render: (_text, record) => (
        <div>
          {record.lastLogin ? (
            <>
              <div> {dayjs(record.lastLogin).format("DD/MM/YYYY ")}</div>
              <div> {dayjs(record.lastLogin).format("hh:mm:ss:a")}</div>
            </>
          ) : (
            "--"
          )}
        </div>
      ),
      align: "center",
    },
    {
      title: "Status",
      ellipsis: true,
      dataIndex: "isActive",
      key: "isActive",
      render: (_text, record) => (
        <div>
          <Tag color={record?.isActive ? "success" : "error"} className="font-semibold">
            {record?.isActive ? "Active" : "Inactive"}
          </Tag>
        </div>
      ),
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
            onClick={() => navigate(`edit/${record._id}`)}
            title="Edit User"
          />
          <div onClick={() => updateUser({ id: record._id, body: { isActive: !record.isActive } })}>
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
          </div>

          <Button
            icon={<RiDeleteBin7Line />}
            type="primary"
            danger
            onClick={() => deleteUser(record._id)}
            title="Delete User"
          />
        </div>
      ),
      width: 200,
      align: "center",
    },
  ];
  return (
    <Spin spinning={isFetching || isLoading || deleteLoading}>
      <PageHeader title="Manage Users" subTitle="All Users">
        {Boolean(role) && (
          <Button
            type="primary"
            icon={<FiUserPlus />}
            onClick={() => navigate(`create?role=${role}`)}
            className="ms-auto"
          >
            Create User
          </Button>
        )}
      </PageHeader>

      <CustomTable
        data={Array.isArray(data?.data) ? data?.data?.map((d) => ({ ...d, key: d?._id })) : []}
        columns={columns}
        total={data?.meta?.total || 0}
        query={queryParams}
        setQuery={setQueryParams}
      />
    </Spin>
  );
};

export default Users;
