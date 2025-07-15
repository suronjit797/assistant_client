import { transactionsTypes } from "@/constant/constants";
import { TTransactions } from "@/interfaces/transactionsInterface";
import { useCreateTransactionsMutation, useUpdateTransactionsMutation } from "@/redux/api/transactionApi";
import { Button, Drawer, Form, Input, Select, Switch } from "antd";
import React from "react";

const { Option } = Select;

const TransactionsForm: React.FC<{
  mode?: "create" | "edit";
  data?: Partial<TTransactions>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setData: React.Dispatch<React.SetStateAction<TTransactions>>;
  loading?: boolean;
}> = ({ mode = "create", data = {}, open, setOpen, loading, setData }) => {
  // hooks
  const [form] = Form.useForm();

  //   states

  //   rtk query
  const [create, { isLoading }] = useCreateTransactionsMutation();
  const [update, { isLoading: updateLoading }] = useUpdateTransactionsMutation();

  //   useEffect
  React.useEffect(() => {
    form.resetFields();
    if (mode === "edit" && data) {
      form.setFieldsValue(data);
    }
  }, [data, form, mode]);

  const handleSubmit = async (values: Partial<TTransactions>) => {
    try {
      const body = { ...values, isPending: Boolean(values.isPending), amount: Number(values.amount) };
      if (mode === "create") {
        await create(body);
      } else {
        await update({ id: data._id, body });
      }
    } catch (error) {
      console.error("Validation failed:", error);
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
      title={mode === "edit" ? "Edit Transaction" : "Add Transaction"}
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
          <Input placeholder="Enter transaction title" className="w-full" />
        </Form.Item>

        <Form.Item name="type" label="Type" rules={[{ required: mode === "create", message: "Please select a type" }]}>
          <Select placeholder="Select transaction type" className="w-full">
            {transactionsTypes.map((type) => (
              <Option key={type} value={type} className="capitalize">
                {type}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="amount" label="Amount" rules={[{ required: true, message: "Please enter an amount" }]}>
          <Input type="number" placeholder="Enter amount" className="w-full" min={0} step={0.01} />
        </Form.Item>

        <Form.Item name="isPending" label="Pending" valuePropName="checked">
          <Switch className="bg-gray-300" />
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

export default TransactionsForm;
