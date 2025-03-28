import appConfig from "@/config/appConfig";
import { useAppSelector } from "@/redux/store";
import { Button, Checkbox, Col, Form, Input, Row, Spin } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

type BusinessFormProps = {
  mode: "create" | "edit";
  data?: FormValues;
};

type FormValues = {
  name: string;
  id: string;
  companyName: string;
  registrationNumber?: string;
  address1: string;
  address2?: string;
  postcode?: string;
  city?: string;
  state?: string;
  country?: string;
  email?: string;
  phoneNumber?: string;
  logo?: string;
  customerSince?: string;
  personName?: string;
  personTitle?: string;
  personEmail?: string;
  personPhone?: string;
  personNotes?: string;
  isLimitedHosting?: boolean;
  idleLogoutFot30Min?: boolean;
  multipleDeviceLogin?: boolean;
  urlLogin?: boolean;
};

const BusinessForm: React.FC<BusinessFormProps> = ({ mode, data }) => {
  const navigate = useNavigate();
  const [form] = Form.useForm<FormValues>();
  const { user } = useAppSelector((state) => state.auth);

  // state
  const [isLoading, setIsLoading] = useState(false);
  const [businessId, setBusinessId] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (mode === "create") {
      (async () => {
        try {
          setIsLoading(true);
          const { data } = {};
          setBusinessId(data);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, [mode]);

  useEffect(() => {
    document.title = `${appConfig.name} - ${mode === "edit" ? "Update Business" : "Create Business"}`;
  }, [mode]);

  const handleCreate = async (body: FormData) => {
    await api.post(endpoint.business, body);
  };
  
  const handleUpdate = async (body: FormData) => {
    await api.put(`${endpoint.business}${data?._id}`, body);
  };

  const onFinish = async (values: FormValues) => {
    setIsLoading(true);
    try {
      const body: any = {
        ...values,
        customerSince: values.customerSince ? dayjs(values.customerSince).format("DD/MM/YYYY") : "",
      };
      if (mode === "edit") {
        body.logo = data?.logo;
      }
      if (image) {
        body.logo = image;
      }
      if (!data?.logo && !image) {
        delete body.logo;
      }

      const formData = new FormData();
      Object.keys(body).forEach((key) => {
        formData.append(key, body[key] || "");
      });

      mode === "edit" ? await handleUpdate(formData) : await handleCreate(formData);

      await Swal.fire({
        icon: "success",
        text: mode === "edit" ? "Business Successfully Updated" : "Business Successfully Created",
        timer: 1000,
      });
      navigate("/business");
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.response?.data?.message || "An error occurred",
        timer: 1000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isSuperAdmin = user?.role === userRole.superAdmin;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">{mode === "edit" ? "Edit Business Profile" : "Create New Business"}</h2>
      {isLoading && <Spin spinning={isLoading} className="flex justify-center" />}
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          ...data,
          customerSince: data?.customerSince ? dayjs(data.customerSince, "DD/MM/YYYY") : "",
        }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="name" label="Business Name" rules={[{ required: true, message: "Please enter business name" }]}>
              <Input placeholder="Enter Business Name" disabled={!isSuperAdmin} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="id" label="Business ID" rules={[{ required: true, message: "Please enter Business ID" }]}>
              <Input placeholder="Enter Business ID" value={businessId} disabled />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="logo" label="Company Logo">
          <ImgUpload url={data?.logo} image={image} setImage={setImage} />
        </Form.Item>
        {isSuperAdmin && (
          <Form.Item name="isLimitedHosting" valuePropName="checked">
            <Checkbox>Limited Hosting (2 Years)</Checkbox>
          </Form.Item>
        )}
        <div className="flex justify-end space-x-2">
          <Button type="primary" htmlType="submit">
            {mode === "edit" ? "Update Business" : "Create New Business"}
          </Button>
          <Button onClick={() => navigate(-1)}>Cancel</Button>
        </div>
      </Form>
    </div>
  );
};

export default BusinessForm;
