import CustomTable from "@/components/CustomTable";
import PageHeader from "@/components/PageHeader";
import appConfig from "@/config/appConfig";
import { useQueryParams } from "@/hooks/useQueryParams";
import { TUser } from "@/interfaces/userInterface";
import { useGetAllUsersQuery } from "@/redux/api/usersApi";
import { Button, Spin, TableProps } from "antd";
import { useEffect } from "react";
import { FiUserPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Users = () => {
  // hooks
  const { queryParams, setQueryParams, getNonEmptyQueryParams } = useQueryParams({ page: 1, limit: 10 });
  const navigate = useNavigate();

  // states

  // rtk query
  const { data, isFetching } = useGetAllUsersQuery(getNonEmptyQueryParams);
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
      title: "Role",
      ellipsis: true,
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Action",
      ellipsis: true,
      dataIndex: "",
      key: "role",
      width: 220,
      align: "center",
    },
  ];
  return (
    <Spin spinning={isFetching}>
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
