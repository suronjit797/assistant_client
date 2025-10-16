import { todosPriorities } from "@/constant/constants";
import { ITodos } from "@/interfaces/todosInterface";
import { useCreateTodosMutation, useUpdateTodosMutation } from "@/redux/api/todoApi";
import { Button, DatePicker, Form, Input, Select, Card } from "antd";
import dayjs from "dayjs";
import React from "react";
import Swal from "sweetalert2";
import SlidePanel from "@/components/SlidePanel";
import { FiCalendar, FiFlag, FiFileText, FiEdit3 } from "react-icons/fi";

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

  const footerContent = (
    <div className="flex justify-end space-x-3">
      <Button onClick={onCancel} size="large">
        Cancel
      </Button>
      <Button
        type="primary"
        htmlType="submit"
        form="todo-form"
        loading={loading || updateLoading || isLoading}
        size="large"
        className="min-w-[120px]"
      >
        {mode === "create" ? "Create Todo" : "Update Todo"}
      </Button>
    </div>
  );

  return (
    <SlidePanel
      title={mode === "edit" ? "Edit Todo" : "Create New Todo"}
      open={open}
      onClose={onCancel}
      width={500}
      footer={footerContent}
    >
      <div className="space-y-6">
        {/* Header Card */}
        <Card className="border-0 shadow-sm bg-gradient-to-r from-blue-50 to-cyan-50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              {mode === "edit" ? (
                <FiEdit3 className="text-blue-600 text-xl" />
              ) : (
                <FiFileText className="text-blue-600 text-xl" />
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {mode === "edit" ? "Update Task" : "New Task"}
              </h3>
              <p className="text-sm text-gray-600">
                {mode === "edit" 
                  ? "Modify the details of your existing task" 
                  : "Add a new task to your todo list"}
              </p>
            </div>
          </div>
        </Card>

        {/* Form */}
        <Form 
          form={form} 
          id="todo-form"
          layout="vertical" 
          initialValues={data} 
          onFinish={handleSubmit}
          className="space-y-4"
        >
          {/* Title */}
          <Form.Item
            name="title"
            label={<span className="text-gray-700 font-medium">Task Title</span>}
            rules={[{ required: mode === "create", message: "Please enter a task title" }]}
          >
            <Input 
              placeholder="Enter a descriptive title for your task"
              prefix={<FiFileText className="text-gray-400" />}
              size="large"
              className="rounded-lg"
            />
          </Form.Item>

          {/* Description */}
          <Form.Item
            name="description"
            label={<span className="text-gray-700 font-medium">Description</span>}
            rules={[{ required: mode === "create", message: "Please enter a description" }]}
          >
            <Input.TextArea 
              placeholder="Provide additional details about this task"
              rows={3}
              className="rounded-lg"
            />
          </Form.Item>

          {/* Priority and Due Date Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="priority"
              label={<span className="text-gray-700 font-medium">Priority Level</span>}
              rules={[{ required: mode === "create", message: "Please select a priority" }]}
            >
              <Select
                placeholder="Choose priority"
                size="large"
                className="w-full"
                suffixIcon={<FiFlag className="text-gray-400" />}
                options={todosPriorities.map((type) => ({
                  value: type,
                  label: (
                    <div className="flex items-center gap-2 capitalize">
                      <span className={`h-2 w-2 rounded-full ${
                        type === 'high' ? 'bg-red-500' : 
                        type === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                      }`} />
                      {type}
                    </div>
                  ),
                }))}
              />
            </Form.Item>

            <Form.Item
              name="dueDate"
              getValueProps={(value) => ({ value: value ? dayjs(value) : undefined })}
              label={<span className="text-gray-700 font-medium">Due Date</span>}
            >
              <DatePicker 
                className="w-full" 
                size="large"
                suffixIcon={<FiCalendar className="text-gray-400" />}
                placeholder="Select due date"
                showTime
                format="YYYY-MM-DD HH:mm"
              />
            </Form.Item>
          </div>
        </Form>
      </div>
    </SlidePanel>
  );
};

export default TodosForm;
