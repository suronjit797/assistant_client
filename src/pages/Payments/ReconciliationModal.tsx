import { Button, Form, Input, Modal, UploadFile } from "antd";
import React, { useState } from "react";

interface Props {
  buttonText?: string;
  ids?: string[]; //!need to change during api integration
}
const ReconciliationModal: React.FC<Props> = ({ buttonText }) => {
  // states
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [modal, setModal] = useState(false);

  const handleSubmit = async (values) => {
    if (!values.upload.file) return;

    const formData = new FormData();
    formData.append("file", values.upload.file);

    try {
      setModal(false);
      setFileList([]);
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  const handleCancel = () => {
    setModal(false);
    setFileList([]);
  };

  return (
    <>
      <Button
        className="!bg-green-600 hover:!bg-green-700"
        type="primary"
        onClick={() => setModal(true)}
      >
        {buttonText ?? "Start Reconciliation"}
      </Button>
      <Modal
        title="Are you sure want to start reconciliation?"
        open={modal}
        footer={null}
        onCancel={handleCancel}
        centered={true}
      >
        <Form
          onFinish={handleSubmit}
          layout="vertical"
          name="upload_csv_form"
          className="!py-4"
        >
          {/* <Form.Item label="Title"> */}
          <Form.Item
            rules={[{ required: true, message: "Please input title!" }]}
          >
            <Input placeholder="Title" />
          </Form.Item>
          <Form.Item>
            <div className="justify-end flex gap-2">
              <Button
                type="primary"
                htmlType="submit"
                disabled={fileList.length === 0}
              >
                Start Reconciliation
              </Button>
              <Button type="primary" danger onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ReconciliationModal;
