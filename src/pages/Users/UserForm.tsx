/* eslint-disable @typescript-eslint/no-unused-vars */
import PageHeader from "@/components/PageHeader";
import { userRoleFormate } from "@/constant/userRole";
import { TUser } from "@/interfaces/userInterface";
import { useLazyGetUserByIdQuery, useRegisterUserMutation, useUpdateUserMutation } from "@/redux/api/usersApi";
import { MailOutlined, UserOutlined } from "@ant-design/icons"; // Import icons
import { Button, Form, Input, Select, Spin, Upload } from "antd";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const { Option } = Select;

interface Props {
  mode?: "create" | "edit";
}

const UserForm: React.FC<Props> = ({ mode = "create" }) => {
  // hooks
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();

  // states
  //   const [formData, setFromData] = useState({});

  // rtk query
  const [registerUser, { error, isLoading }] = useRegisterUserMutation();
  const [updateUser, { error: updateUserError, isLoading: updateUserIsLoading }] = useUpdateUserMutation();
  const [getUserData, { isLoading: getUserLoading }] = useLazyGetUserByIdQuery();

  const userData = async (id: string) => {
    const { data } = await getUserData(id);
    form.setFieldsValue({ ...(data?.data || {}) });
  };

  useEffect(() => {
    if (id && mode === "edit") {
      userData(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, mode]);

  // handler
  const onFinish = async (values: Partial<TUser>) => {
    console.log("Received values of form: ", values);
    const body = { ...values };
    if (mode === "edit") {
      await updateUser({ id, body });
    } else {
      body.isActive = body.isActive ?? true;
      await registerUser(body);
    }
  };

  return (
    <Spin spinning={isLoading || updateUserIsLoading}>
      <div className="mb-5">
        <PageHeader title="Manage Users" subTitle={mode === "edit" ? "Edit User" : "Add New User"} />
      </div>

      <Form
        form={form}
        name="userForm"
        layout="vertical"
        onFinish={onFinish}
        className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4"
        scrollToFirstError={true}
        //   onValuesChange={(values) => {
        //     console.log({ values });
        //     setFromData(values);
        //   }}
      >
        <Form.Item
          name="userRole"
          label="User Role"
          rules={[{ required: true, message: "Please select a user role!" }]}
          className="col-span-1"
        >
          <Select
            placeholder="Select User Role"
            className="w-full"
            options={Object.entries(userRoleFormate).map(([key, value]) => ({ value: key, label: value })) || []}
          />
        </Form.Item>

        <Form.Item name="loginId" label="Login ID" rules={[{ required: true, message: "Please input your Login ID!" }]}>
          <Input placeholder="Enter Login ID (Lowercase Only)" className="w-full" />
        </Form.Item>

        <Form.Item
          name="name"
          label="Full Name"
          rules={[{ required: true, message: "Please input your full name!" }]}
          className="col-span-1"
        >
          <Input placeholder="Enter Full Name" className="w-full" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email Address"
          rules={[
            { required: true, message: "Please input your email address!" },
            { type: "email", message: "The input is not valid E-mail!" },
          ]}
          className="col-span-1"
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon text-gray-400" />}
            placeholder="Enter Email Address"
            className="w-full"
          />
        </Form.Item>

        {mode === "create" && (
          <>
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: "Please input your password!" }]}
              // hasFeedback
              className="col-span-1"
            >
              <Input.Password placeholder="........" className="w-full" />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="Reenter Password"
              dependencies={["password"]}
              // hasFeedback
              rules={[
                { required: true, message: "Please confirm your password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("The two passwords that you entered do not match!"));
                  },
                }),
              ]}
              className="col-span-1"
            >
              <Input.Password placeholder="........" className="w-full" />
            </Form.Item>
          </>
        )}

        <Form.Item name="phone" label="Phone Number" className="col-span-1">
          <Input addonBefore="+6" placeholder="Enter Phone Number" className="w-full" />
        </Form.Item>

        {/* <div className="col-span-1 flex flex-col justify-start space-y-2 pt-4 md:pt-8">
        <Form.Item name="timeoutIdle" valuePropName="checked" noStyle>
          <Checkbox>30-minute time-out when idle:</Checkbox>
        </Form.Item>
        <Form.Item name="multipleSessions" valuePropName="checked" noStyle>
          <Checkbox>Multiple active login sessions for single account:</Checkbox>
        </Form.Item>
        <Form.Item name="enableUrlLogin" valuePropName="checked" noStyle>
          <Checkbox>Enable URL login (replaces password):</Checkbox>
        </Form.Item>
      </div> */}

        <div className="col-span-1 md:col-span-2 flex flex-col items-start">
          <label className="block text-sm font-medium text-gray-700 mb-1">Profile Photo</label>

          <Upload
            name="avatar"
            listType="picture-circle"
            className="avatar-uploader"
            showUploadList={false}
            //   action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            disabled={true}
          >
            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
              <UserOutlined style={{ fontSize: "32px", color: "#555" }} />
            </div>
          </Upload>
        </div>

        <div className="col-span-1 md:col-span-2 flex justify-end space-x-3 mt-6">
          <Button type="primary" htmlType="submit" className="bg-blue-600 hover:bg-blue-700 px-6">
            {mode === "edit" ? "Update" : "Create"} User
          </Button>
          <Button htmlType="button" className="px-6" onClick={() => navigate(-1)}>
            Cancel
          </Button>
        </div>
      </Form>
    </Spin>
  );
};

export default UserForm;
