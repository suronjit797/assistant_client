import PageHeader from "@/components/PageHeader";
import { useGetUserByIdQuery } from "@/redux/api/usersApi";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Descriptions, Spin, Tag, Typography } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";

const { Text } = Typography;

const UserView = () => {
  // hooks
  const { id } = useParams();
  const navigate = useNavigate();

  //   rtk query
  const { data, isLoading } = useGetUserByIdQuery(id);

  return (
    <Spin spinning={isLoading}>
      <div className="mb-5">
        <PageHeader title="Manage Users" subTitle={`View User Profile`} />
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-grow md:w-2/3">
          <Descriptions bordered column={1} size="middle">
            <Descriptions.Item label={<Text strong>Full Name</Text>}>{data?.data?.name}</Descriptions.Item>
            <Descriptions.Item label={<Text strong>Email Address</Text>}>{data?.data?.email}</Descriptions.Item>
            <Descriptions.Item label={<Text strong>Phone Number</Text>}>{data?.data?.phone}</Descriptions.Item>
            <Descriptions.Item label={<Text strong>Status</Text>}>
              <Tag color={data?.data?.isActive ? "success" : "error"} className="font-semibold">
                {data?.data?.isActive ? "Active" : "Inactive"}
              </Tag>
            </Descriptions.Item>
          </Descriptions>
        </div>

        <div className="flex flex-col items-center md:w-1/3 mt-4 md:mt-0">
          <Avatar
            size={150}
            src={data?.data?.avatar?.url}
            icon={!data?.data?.avatar?.url ? <UserOutlined /> : undefined}
            className="shadow-md border-2 border-gray-200"
          />
          <Text className="mt-3 text-gray-600 text-sm">Profile Photo</Text>
        </div>
      </div>

      <div className="flex justify-end space-x-3 mt-6">
        <Link to={`/users/edit/${id}`}>
          <Button type="primary" htmlType="submit" className="bg-blue-600 hover:bg-blue-700 px-6">
            Edit
          </Button>
        </Link>
        <Button
          htmlType="button"
          type="primary"
          className="!bg-gray-300 !text-black hover:!bg-gray-400 px-6"
          onClick={() => navigate(-1)}
        >
          Cancel
        </Button>
      </div>
    </Spin>
  );
};

export default UserView;
