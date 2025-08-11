import { IBlog } from "@/interfaces/blogInterface";
import { useCreateBlogMutation, useUpdateBlogMutation } from "@/redux/api/blogApi";
import { Button, DatePicker, Drawer, Form, Input, Select } from "antd";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import Swal from "sweetalert2";

interface BlogFormProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  mode: "create" | "edit";
  data?: Partial<IBlog>;
  setData: (data: Partial<IBlog> | undefined) => void;
}

const BlogForm: React.FC<BlogFormProps> = ({ open, setOpen, mode, data, setData }) => {
  const [form] = Form.useForm();
  const [createBlog, { isLoading: createLoading }] = useCreateBlogMutation();
  const [updateBlog, { isLoading: updateLoading }] = useUpdateBlogMutation();

  useEffect(() => {
    if (data && mode === "edit") {
      form.setFieldsValue({
        ...data,
        scheduledAt: data.scheduledAt ? dayjs(data.scheduledAt) : undefined,
      });
    } else {
      form.resetFields();
    }
  }, [data, mode, form]);

  const handleSubmit = async (values: Partial<IBlog>) => {
    try {
      const body = { ...values };
      if (mode === "create") {
        await createBlog(body).unwrap();
        Swal.fire("Success", "Blog created successfully", "success");
      } else {
        await updateBlog({ id: data?._id, body }).unwrap();
        Swal.fire("Success", "Blog updated successfully", "success");
      }
      setOpen(false);
      setData(undefined);
      form.resetFields();
    } catch {
      Swal.fire("Error", "Something went wrong", "error");
    }
  };
  const onCancel = () => {
    setOpen(false);
    setData(null);
    form.resetFields();
  };

  const status = Form.useWatch("status", form);

  return (
    <Drawer title={mode === "edit" ? "Edit Diary Entry" : "Add Diary Entry"} onClose={onCancel} open={open}>
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input placeholder="Enter Title" />
        </Form.Item>
        <Form.Item name="slug" label="Slug" rules={[{ required: true }]}>
          <Input placeholder="Enter Slug" />
        </Form.Item>
        <Form.Item name="content" label="Content" rules={[{ required: true }]}>
          <Input.TextArea rows={4} placeholder="Enter Content" />
        </Form.Item>
        <Form.Item name="category" label="Category" rules={[{ required: true }]}>
          <Select placeholder="Select Category" options={[{ value: "tech" }, { value: "life" }, { value: "news" }]} />
        </Form.Item>
        <Form.Item name="tags" label="Tags">
          <Select mode="tags" placeholder="Enter tags" />
        </Form.Item>
        <Form.Item name="status" label="Status" rules={[{ required: true }]}>
          <Select
            options={[
              { value: "draft", label: "Draft" },
              { value: "published", label: "Published" },
              { value: "scheduled", label: "Scheduled" },
            ]}
          />
        </Form.Item>
        {status === "scheduled" && (
          <Form.Item name="scheduledAt" label="Scheduled At">
            <DatePicker showTime className="w-full" />
          </Form.Item>
        )}
        <div className="flex justify-end gap-2">
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button type="primary" htmlType="submit" loading={createLoading || updateLoading}>
            {mode === "create" ? "Create" : "Update"}
          </Button>
        </div>
      </Form>
    </Drawer>
  );
};

export default BlogForm;
