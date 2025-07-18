import { IRoutines } from "@/interfaces/routinesInterface";
import { useCreateRoutinesMutation, useUpdateRoutinesMutation } from "@/redux/api/routineApi";
import { Button, DatePicker, Drawer, Form, Input } from "antd";
import dayjs from "dayjs";
import React from "react";
import Swal from "sweetalert2";

const RoutinesForm: React.FC<{
  mode?: "create" | "edit";
  data?: Partial<IRoutines>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setData: React.Dispatch<React.SetStateAction<IRoutines>>;
  loading?: boolean;
}> = ({ mode = "create", data = {}, open, setOpen, loading, setData }) => {
  // hooks
  const [form] = Form.useForm();

  //   states

  //   rtk query
  const [create, { isLoading }] = useCreateRoutinesMutation();
  const [update, { isLoading: updateLoading }] = useUpdateRoutinesMutation();

  //   useEffect
  React.useEffect(() => {
    form.resetFields();
    if (mode === "edit" && data) {
      form.setFieldsValue(data);
    }
  }, [data, form, mode]);

  const handleSubmit = async (values: Partial<IRoutines>) => {
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
      const body: Partial<IRoutines> = { ...values };

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
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: mode === "create", message: "Please enter a title" }]}
        >
          <Input placeholder="Enter routine title" className="w-full" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: mode === "create", message: "Please enter a description" }]}
        >
          <Input placeholder="Enter routine description" className="w-full" />
        </Form.Item>

        <Form.Item
          name="dueDate"
          getValueProps={(value) => ({ value: value ? dayjs(value) : undefined })}
          label="Due Date"
          // rules={[{ required: true, message: "Please enter an dueDate" }]}
        >
          <DatePicker className="w-full" />
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

export default RoutinesForm;
