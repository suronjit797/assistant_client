import { Button, Form, Modal, UploadFile, UploadProps } from "antd";
import Dragger from "antd/es/upload/Dragger";
import React, { useState } from "react";
import { FiUploadCloud } from "react-icons/fi";

interface Props {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  uploadCsv: any;
}

const ManualReconciliationCvsModal: React.FC<Props> = ({ modal, setModal, uploadCsv }) => {
  // states
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleSubmit = async (values) => {
    if (!values.upload.file) return;

    const formData = new FormData();
    formData.append("file", values.upload.file);

    try {
      await uploadCsv(formData);

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

  const uploadProps: UploadProps = {
    name: "file",
    multiple: false,
    accept: ".csv,.xlsx,.xls",
    fileList,
    beforeUpload: (file) => {
      setFileList([file]); // Replace existing file
      return false; // Prevent automatic upload
    },
    onRemove: () => {
      setFileList([]);
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <Modal title="Upload CSV File" open={modal} footer={null} onCancel={handleCancel}>
      <Form onFinish={handleSubmit} layout="vertical" name="upload_csv_form">
        <Form.Item name="upload">
          <Dragger {...uploadProps}>
            <p className="ant-upload-drag-icon text-2xl text-center">
              <FiUploadCloud className="mx-auto" />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
          </Dragger>
        </Form.Item>

        <Form.Item>
          <div className="justify-end flex gap-2">
            <Button type="primary" htmlType="submit" disabled={fileList.length === 0}>
              Upload
            </Button>
            <Button type="primary" danger onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ManualReconciliationCvsModal;
