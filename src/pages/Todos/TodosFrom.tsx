import { todosPriorities } from "@/constant/constants";
import { ITodos } from "@/interfaces/todosInterface";
import { useCreateTodosMutation, useUpdateTodosMutation } from "@/redux/api/todoApi";
import { Button, DatePicker, Drawer, Form, Input, Select } from "antd";
import dayjs from "dayjs";
import React from "react";
import Swal from "sweetalert2";

const TodosForm: React.FC<{
  mode?: "create" | "edit";
  data?: Partial<ITodos>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setData: React.Dispatch<React.SetStateAction<ITodos>>;
  loading?: boolean;
}> = ({ mode = "create", data = {}, open, setOpen, loading, setData }) => {
  // hooks
  const [form] = Form.useForm();

  //   states

  //   rtk query
  const [create, { isLoading }] = useCreateTodosMutation();
  const [update, { isLoading: updateLoading }] = useUpdateTodosMutation();

  //   useEffect
  React.useEffect(() => {
    form.resetFields();
    if (mode === "edit" && data) {
      form.setFieldsValue(data);
    }
  }, [data, form, mode]);

  const handleSubmit = async (values: Partial<ITodos>) => {
    const confirmResult = await Swal.fire({
      title: mode === "create" ? "Create this todo?" : "Update this todo?",
      text: "Please confirm your action.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: mode === "create" ? "Yes, Create" : "Yes, Update",
    });

    if (!confirmResult.isConfirmed) return;

    try {
      const body: Partial<ITodos> = { ...values, isCompleted: Boolean(values.isCompleted) };

      if (mode === "create") {
        await create(body).unwrap();
      } else {
        await update({ id: data._id, body }).unwrap();
      }

      Swal.fire({
        title: "Success!",
        text: `Todo ${mode === "create" ? "created" : "updated"} successfully.`,
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
      title={mode === "edit" ? "Edit Todo" : "Add Todo"}
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
          <Input placeholder="Enter todo title" className="w-full" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: mode === "create", message: "Please enter a description" }]}
        >
          <Input placeholder="Enter todo description" className="w-full" />
        </Form.Item>

        <Form.Item
          name="priority"
          label="Priority"
          rules={[{ required: mode === "create", message: "Please select a priority" }]}
        >
          <Select
            placeholder="Select todo priority"
            className="w-full"
            options={todosPriorities.map((type) => ({
              value: type,
              label: <div className="capitalize"> {type} </div>,
            }))}
          />
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

export default TodosForm;
