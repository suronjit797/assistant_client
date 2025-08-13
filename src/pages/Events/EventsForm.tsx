import React from "react";
import { Button, Drawer, Form, Input, DatePicker, Switch, Select, InputNumber } from "antd";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import { IEvent } from "@/interfaces/eventInterface";
import { useCreateEventMutation, useUpdateEventMutation } from "@/redux/api/eventApi";

const { TextArea } = Input;
const { RangePicker } = DatePicker;

interface IFormData extends Partial<IEvent> {
  dateRange?: [dayjs.Dayjs, dayjs.Dayjs];
}

const EventForm: React.FC<{
  mode?: "create" | "edit";
  data?: Partial<IEvent>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setData: React.Dispatch<React.SetStateAction<IEvent | null>>;
}> = ({ mode = "create", data = {}, open, setOpen, setData }) => {
  const [form] = Form.useForm<IEvent>();

  const [create, { isLoading }] = useCreateEventMutation();
  const [update, { isLoading: updateLoading }] = useUpdateEventMutation();

  React.useEffect(() => {
    form.resetFields();
    if (mode === "edit" && data) {
      const initialValues = {
        ...data,
        dateRange: data.startDate && data.endDate ? [dayjs(data.startDate), dayjs(data.endDate)] : undefined,
      };
      form.setFieldsValue(initialValues);
    }
  }, [data, form, mode]);

  const handleSubmit = async (values: IFormData) => {
    const confirmResult = await Swal.fire({
      title: mode === "create" ? "Create this event?" : "Update this event?",
      text: "Please confirm your action.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: mode === "create" ? "Yes, Create" : "Yes, Update",
    });

    if (!confirmResult.isConfirmed) return;

    const payload: Partial<IFormData> = {
      ...values,
      startDate: values?.dateRange ? values?.dateRange[0].toISOString() : undefined,
      endDate: values?.dateRange ? values?.dateRange[1].toISOString() : undefined,
    };
    delete payload?.dateRange;

    try {
      if (mode === "create") {
        await create(payload).unwrap();
      } else if (data._id) {
        await update({ id: data._id, body: payload }).unwrap();
      }

      Swal.fire({
        title: "Success!",
        text: `Event ${mode === "create" ? "created" : "updated"} successfully.`,
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
    <Drawer title={mode === "edit" ? "Edit Event" : "Add Event"} onClose={onCancel} open={open} width={500}>
      <Form form={form} layout="vertical" className="p-4" initialValues={data} onFinish={handleSubmit}>
        <Form.Item label="Title" name="title" rules={[{ required: true, message: "Please enter the event title!" }]}>
          <Input placeholder="Event title" />
        </Form.Item>
        <Form.Item
          label="Date & Time"
          name="dateRange"
          rules={[{ required: true, message: "Please select start and end date!" }]}
        >
          <RangePicker showTime format="YYYY-MM-DD HH:mm" style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <TextArea placeholder="Event description (optional)" rows={4} />
        </Form.Item>

        <Form.Item label="Location" name="location">
          <Input placeholder="Event location (optional)" />
        </Form.Item>

        <Form.Item label="Is All Day?" name="allDay" valuePropName="checked">
          <Switch />
        </Form.Item>

        <Form.Item label="Is Online?" name="isOnline" valuePropName="checked">
          <Switch />
        </Form.Item>

        <Form.Item label="Is Public?" name="isPublic" valuePropName="checked">
          <Switch />
        </Form.Item>

        <Form.Item label="Online Link" name="onlineLink">
          <Input placeholder="https://example.com" />
        </Form.Item>

        <Form.Item label="Category" name="category">
          <Select
            placeholder="Select event category"
            options={[
              { label: "Conference", value: "conference" },
              { label: "Workshop", value: "workshop" },
              { label: "Webinar", value: "webinar" },
              { label: "Meetup", value: "meetup" },
              { label: "Festival", value: "festival" },
              { label: "Other", value: "other" },
            ]}
          />
        </Form.Item>

        <Form.Item label="Tags" name="tags">
          <Select mode="tags" placeholder="Tags (optional)" />
        </Form.Item>

        <Form.Item name="organizer">
          <Form.Item label="Organizer name" name={["organizer", "name"]}>
            <Input placeholder="Event organizer name" />
          </Form.Item>
          <Form.Item
            label="Organizer email"
            rules={[{ type: "email", message: "Invalid email!" }]}
            name={["organizer", "email"]}
          >
            <Input placeholder="Event organizer name" />
          </Form.Item>
          <Form.Item label="Organizer phone" name={["organizer", "phone"]}>
            <Input placeholder="Event organizer phone" />
          </Form.Item>
        </Form.Item>

        <Form.Item label="Max Attendees" name="attendees">
          <InputNumber min={1} style={{ width: "100%" }} placeholder="Max attendees (optional)" />
        </Form.Item>

        {/* 
        <Form.Item label="Ticket Price" name="ticketPrice">
          <InputNumber min={0} style={{ width: "100%" }} placeholder="Ticket price (optional)" />
        </Form.Item>
 */}

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

export default EventForm;
