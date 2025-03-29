import React, { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload, UploadProps } from "antd";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile } from "antd/es/upload/interface";

interface ImgUploadProps {
  url?: string;
  image: File | null;
  setImage: (file: File | null) => void;
}

const getBase64 = (img: RcFile, callback: (url: string) => void): void => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile): boolean => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG files!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must be smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const ImgUpload: React.FC<ImgUploadProps> = ({ url,  setImage }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

  const handleChange: UploadProps["onChange"] = (info: UploadChangeParam) => {
    if (info.file.originFileObj) {
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
        setImage(info?.file?.originFileObj ?? null);
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <Upload
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      beforeUpload={beforeUpload}
      onChange={handleChange}
      accept=".jpeg, .png"
    >
      {loading ? (
        <LoadingOutlined />
      ) : imageUrl || url ? (
        <img
          src={imageUrl || url}
          alt="avatar"
          style={{ width: "100%" }}
        />
      ) : (
        uploadButton
      )}
    </Upload>
  );
};

export default ImgUpload;
