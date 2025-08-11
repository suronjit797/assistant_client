import { IDiary } from "@/interfaces/diaryInterface";
import { useCreateDiaryMutation, useUpdateDiaryMutation } from "@/redux/api/diaryApi";
import { Button, DatePicker, Drawer, Form, Input, Select, Switch } from "antd";
import dayjs from "dayjs";
import React from "react";
import Swal from "sweetalert2";

const moods = ["happy", "sad", "angry", "excited", "neutral", "anxious"];
const { TextArea } = Input;

const DiaryForm: React.FC<{
  mode?: "create" | "edit";
  data?: Partial<IDiary>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setData: React.Dispatch<React.SetStateAction<IDiary | null>>;
  loading?: boolean;
}> = ({ mode = "create", data = {}, open, setOpen, loading, setData }) => {
  const [form] = Form.useForm();

  const [create, { isLoading }] = useCreateDiaryMutation();
  const [update, { isLoading: updateLoading }] = useUpdateDiaryMutation();

  React.useEffect(() => {
    form.resetFields();
    if (mode === "edit" && data) {
      form.setFieldsValue({
        ...data,
        date: data.date ? dayjs(data.date) : null,
      });
    }
  }, [data, form, mode]);

  const handleSubmit = async (values: Partial<IDiary>) => {
    const confirmResult = await Swal.fire({
      title: mode === "create" ? "Create this diary entry?" : "Update this diary entry?",
      text: "Please confirm your action.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: mode === "create" ? "Yes, Create" : "Yes, Update",
    });

    if (!confirmResult.isConfirmed) return;

    try {
      const body: Partial<IDiary> = {
        ...values,
        // date: values.date ? values.date.toISOString() : undefined,
      };

      if (mode === "create") {
        await create(body).unwrap();
      } else {
        await update({ id: data._id, body }).unwrap();
      }

      Swal.fire({
        title: "Success!",
        text: `Diary entry ${mode === "create" ? "created" : "updated"} successfully.`,
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
    <Drawer title={mode === "edit" ? "Edit Diary Entry" : "Add Diary Entry"} onClose={onCancel} open={open}>
      <Form form={form} layout="vertical" className="p-4" initialValues={data} onFinish={handleSubmit}>
        <Form.Item label="Title" name="title" rules={[{ required: true, message: "Please input the diary title!" }]}>
          <Input placeholder="Enter diary title" />
        </Form.Item>

        <Form.Item
          label="Date"
          name="date"
          getValueProps={(value) => ({ value: value ? dayjs(value) : undefined })}
          rules={[{ required: true, message: "Please select the date!" }]}
        >
          <DatePicker className="w-full" />
        </Form.Item>

        <Form.Item
          label="Content"
          name="content"
          rules={[{ required: true, message: "Please write your diary content!" }]}
        >
          <TextArea placeholder="Write your thoughts..." rows={6} />
        </Form.Item>

        <Form.Item label="Mood" name="mood">
          <Select allowClear placeholder="Select your mood" options={moods.map((m) => ({ label: m, value: m }))} />
        </Form.Item>

        <Form.Item label="Tags" name="tags">
          <Select mode="tags" placeholder="Add tags" />
        </Form.Item>

        <Form.Item label="Public" name="isPublic" valuePropName="checked">
          <Switch />
        </Form.Item>

        {/* <Form.Item label="Attachments" name="attachments">
          <Upload multiple listType="picture">
            <Button>Upload</Button>
          </Upload>
        </Form.Item> */}

        <div className="flex justify-end space-x-4 mt-6">
          <Button onClick={onCancel}>Cancel</Button>
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

export default DiaryForm;
