import { passwordManagerTypes } from "@/constant/constants";
import { IPassword } from "@/interfaces/passwordManagerInterface";
import { useCreatePasswordManagerMutation, useUpdatePasswordManagerMutation } from "@/redux/api/passwordManagerApi";
import { Button, Drawer, Form, Input, Select } from "antd";
import React from "react";
import Swal from "sweetalert2";

const PasswordManagerForm: React.FC<{
  mode?: "create" | "edit";
  data?: Partial<IPassword>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setData: React.Dispatch<React.SetStateAction<IPassword>>;
  loading?: boolean;
}> = ({ mode = "create", data = {}, open, setOpen, loading, setData }) => {
  // hooks
  const [form] = Form.useForm();

  //   states

  //   rtk query
  const [create, { isLoading }] = useCreatePasswordManagerMutation();
  const [update, { isLoading: updateLoading }] = useUpdatePasswordManagerMutation();

  //   useEffect
  React.useEffect(() => {
    form.resetFields();
    if (mode === "edit" && data) {
      form.setFieldsValue(data);
    }
  }, [data, form, mode]);

  const handleSubmit = async (values: Partial<IPassword>) => {
    const confirmResult = await Swal.fire({
      title: mode === "create" ? "Create this routine?" : "Update this routine?",
      text: "Please confirm your action.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: mode === "create" ? "Yes, Create" : "Yes, Update",
    });

    if (!confirmResult.isConfirmed) return;

    try {
      const body: Partial<IPassword> = { ...values };

      if (mode === "create") {
        await create(body).unwrap();
      } else {
        await update({ id: data._id, body }).unwrap();
      }

      Swal.fire({
        title: "Success!",
        text: `Routine ${mode === "create" ? "created" : "updated"} successfully.`,
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Validation failed:", error);
      Swal.fire({
        title: "Error",
        text: "Something went wrong. Please try again.",
        icon: "error",
      });
    } finally {
      onCancel();
    }
  };

  const onCancel = () => {
    setOpen(false);
    setData(null);
    form.resetFields();
  };

  return (
    <Drawer
      title={mode === "edit" ? "Edit Routine" : "Add Routine"}
      closable={{ "aria-label": "Close Button" }}
      onClose={onCancel}
      open={open}
    >
      <Form form={form} layout="vertical" className="p-4" initialValues={data} onFinish={handleSubmit}>
        <Form.Item label="Website" name="website" rules={[{ required: true, message: "Please input the website!" }]}>
          <Input placeholder="Input the website URL" />
        </Form.Item>

        <Form.Item label="Username" name="username" rules={[{ required: true, message: "Please input the username!" }]}>
          <Input placeholder="Input the user name / email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="encryptedPassword"
          rules={[{ required: true, message: "Please input the password!" }]}
        >
          <Input.Password placeholder="Input Your password" />
        </Form.Item>

        <Form.Item label="Category" name="category">
          <Select
            allowClear
            placeholder="Input your website type"
            options={passwordManagerTypes?.map((item) => ({
              label: <div className="capitalize"> {item} </div>,
              value: item,
            }))}
          />
        </Form.Item>

        <Form.Item label="Notes" name="notes">
          <Input.TextArea placeholder="Any extra notes" />
        </Form.Item>

        <div className="flex justify-end space-x-4 mt-6">
          <Button onClick={onCancel} className="mr-2">
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading || updateLoading || isLoading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {mode === "create" ? "Create" : "Update"}
          </Button>
        </div>
      </Form>
    </Drawer>
  );
};

export default PasswordManagerForm;
