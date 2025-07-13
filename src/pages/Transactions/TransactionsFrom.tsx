import React from "react";
import { Button, Form, Input, Select, Switch, message } from "antd";
import { TTransactions } from "@/interfaces/transactionsInterface";

const transactionsTypes = [];

const { Option } = Select;

const TransactionsForm: React.FC<{
  mode?: "create" | "edit";
  data?: Partial<TTransactions>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  loading?: boolean;
}> = ({ mode = "create", data = {}, setOpen, loading }) => {
  const [form] = Form.useForm();

  React.useEffect(() => {
    form.resetFields();
    if (data) {
      form.setFieldsValue(data);
    }
  }, [data, form]);

  const handleSubmit = async (values: Partial<TTransactions>) => {
    try {
      console.log({ values });
      //   const values = await form.validateFields();
      // Validate based on mode
      //   if (mode === "create") {
      //     await transactionCreateValidate.parseAsync({ body: values });
      //   } else {
      //     await transactionUpdateValidate.parseAsync({ body: values });
      //   }
      //   await onSubmit(values);
    } catch (error) {
      message.error("Please fill all required fields correctly");
      console.error("Validation failed:", error);
    }
  };

  const onCancel = () => {
    setOpen(false);
  };

  return (
    <Form form={form} layout="vertical" className="p-4" initialValues={data} onFinish={handleSubmit}>
      <Form.Item name="title" label="Title" rules={[{ required: mode === "create", message: "Please enter a title" }]}>
        <Input placeholder="Enter transaction title" className="w-full" />
      </Form.Item>

      <Form.Item name="type" label="Type" rules={[{ required: mode === "create", message: "Please select a type" }]}>
        <Select placeholder="Select transaction type" className="w-full">
          {transactionsTypes.map((type) => (
            <Option key={type} value={type}>
              {type}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="amount"
        label="Amount"
        rules={[
          { required: mode === "create", message: "Please enter an amount" },
          { type: "number", min: 0, message: "Amount must be positive" },
        ]}
      >
        <Input type="number" placeholder="Enter amount" className="w-full" min={0} step={0.01} />
      </Form.Item>

      <Form.Item name="isPending" label="Pending" valuePropName="checked">
        <Switch className="bg-gray-300" />
      </Form.Item>

      <div className="flex justify-end space-x-4 mt-6">
        <Button onClick={onCancel} className="mr-2">
          Cancel
        </Button>
        <Button type="primary" htmlType="submit" loading={loading} className="bg-blue-600 hover:bg-blue-700">
          {mode === "create" ? "Create" : "Update"}
        </Button>
      </div>
    </Form>
  );
};

export default TransactionsForm;
