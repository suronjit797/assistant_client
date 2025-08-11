import React from "react";
import { Button, Drawer, Form, Input, Select } from "antd";
import Swal from "sweetalert2";
import { IContacts } from "@/interfaces/contactsInterface";
import { useCreateContactMutation, useUpdateContactMutation } from "@/redux/api/contactsApi";

const { TextArea } = Input;

const ContactForm: React.FC<{
  mode?: "create" | "edit";
  data?: Partial<IContacts>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setData: React.Dispatch<React.SetStateAction<IContacts | null>>;
}> = ({ mode = "create", data = {}, open, setOpen, setData }) => {
  const [form] = Form.useForm();

  const [create, { isLoading }] = useCreateContactMutation();
  const [update, { isLoading: updateLoading }] = useUpdateContactMutation();

  React.useEffect(() => {
    form.resetFields();
    if (mode === "edit" && data) {
      form.setFieldsValue(data);
    }
  }, [data, form, mode]);

  const handleSubmit = async (values: Partial<IContacts>) => {
    const confirmResult = await Swal.fire({
      title: mode === "create" ? "Create this contact?" : "Update this contact?",
      text: "Please confirm your action.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: mode === "create" ? "Yes, Create" : "Yes, Update",
    });

    if (!confirmResult.isConfirmed) return;

    try {
      if (mode === "create") {
        await create(values);
      } else if (data._id) {
        await update({ id: data._id, body: values });
      }

      Swal.fire({
        title: "Success!",
        text: `Contact ${mode === "create" ? "created" : "updated"} successfully.`,
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error:", error);
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

  const loading = isLoading || updateLoading;

  return (
    <Drawer title={mode === "edit" ? "Edit Contact" : "Add Contact"} onClose={onCancel} open={open} width={400}>
      <Form form={form} layout="vertical" className="p-4" initialValues={data} onFinish={handleSubmit}>
        <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please enter the name!" }]}>
          <Input placeholder="Full name" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter the email!" },
            { type: "email", message: "Invalid email address!" },
          ]}
        >
          <Input placeholder="Email address" />
        </Form.Item>

        <Form.Item
          label="Phone"
          name="phone"
          rules={[
            {
              pattern: /^\+?[0-9]\d{1,14}$/,
              message: "Invalid phone number format (E.164)",
              whitespace: true,
            },
          ]}
        >
          <Input placeholder="Phone number (optional)" />
        </Form.Item>

        <Form.Item label="Others" name="others">
          <Select mode="tags" placeholder="Other info tags (optional)" />
        </Form.Item>

        <Form.Item label="Company" name="company">
          <Input placeholder="Company (optional)" />
        </Form.Item>

        <Form.Item label="Job Title" name="jobTitle">
          <Input placeholder="Job title (optional)" />
        </Form.Item>

        <Form.Item label="Notes" name="notes">
          <TextArea placeholder="Additional notes (optional)" rows={4} />
        </Form.Item>

        <Form.Item label="Tags" name="tags">
          <Select mode="tags" placeholder="Tags (optional)" />
        </Form.Item>

        <div className="flex justify-end space-x-4 mt-6">
          <Button disabled={loading} onClick={onCancel}>
            Cancel
          </Button>
          <Button
            disabled={loading}
            type="primary"
            htmlType="submit"
            loading={loading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {mode === "create" ? "Create" : "Update"}
          </Button>
        </div>
      </Form>
    </Drawer>
  );
};

export default ContactForm;
