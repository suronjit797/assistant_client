import appConfig from "@/config/appConfig";
import { useRegisterUserMutation } from "@/redux/api/usersApi";
import { Button, Form, Image, Input, Spin } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useEffect } from "react";
import LoginFooter from "./LoginFooter";

const Register = () => {
  const navigate = useNavigate();
  const [registerUser, { isLoading, error }] = useRegisterUserMutation();

  const handleRegister = async (values: {
    name: string;
    email: string;
    password: string;
    phone: string;
    loginId: string;
    secret: string;
  }) => {
    try {
      const payload = {
        ...values,
        email: values.email.toLowerCase(),
      };
      const response = await registerUser(payload);
      if (response?.data) {
        Swal.fire({
          title: "Success!",
          text: "Registration Successful",
          icon: "success",
          confirmButtonText: "OK",
          timer: 3000,
        });
        navigate("/login");
      }
    } catch {
      Swal.fire({
        title: "Error!",
        text: "Registration Failed",
        icon: "error",
        confirmButtonText: "OK",
        timer: 3000,
      });
    }
  };

  useEffect(() => {
    document.title = `${appConfig.name} - Register`;
  }, []);

  if (error) {
    Swal.fire({
      title: "Error!",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      text: (error as any)?.data?.message || "Registration Failed",
      icon: "error",
      confirmButtonText: "OK",
      timer: 3000,
    });
  }

  return (
    <Spin spinning={isLoading}>
      <div className="min-h-screen bg-[url('/photos/login_bg.webp')] bg-cover flex  flex-col justify-center items-center">
        <div className="py-4 max-w-[350px] w-full  my-auto">
          <div className="glass-card flex items-center flex-col p-8 ">
            <div className="text-center pb-2 text-sm">
              <Image preview={false} width={80} src="/photos/logo.webp"alt="Personal Assistant Logo" />
              <div className="text-white">{appConfig.name}</div>
            </div>
            <hr className="border-gray-300 pb-2 w-full dark:border-slate-600 my-3" />
            <Form name="register" className="w-full" onFinish={handleRegister} layout="vertical">
              <Form.Item
                name="name"
                label={<div className="text-white">Full Name</div>}
                rules={[{ required: true, message: "Please input your name!" }]}
              >
                <Input placeholder="Enter your name" />
              </Form.Item>

              <Form.Item
                name="email"
                label={<div className="text-white">Email</div>}
                rules={[{ required: true, message: "Please input your email!" }]}
              >
                <Input placeholder="Enter your email" />
              </Form.Item>

              <Form.Item
                name="loginId"
                label={<div className="text-white">Login ID</div>}
                rules={[{ required: true, message: "Please input your Login ID!" }]}
              >
                <Input placeholder="Enter your Login ID" />
              </Form.Item>

              <Form.Item
                name="phone"
                label={<div className="text-white">Phone Number</div>}
                rules={[{ required: true, message: "Please input your phone number!" }]}
              >
                <Input placeholder="Enter your phone number" />
              </Form.Item>

              <Form.Item
                name="password"
                label={<div className="text-white">Password</div>}
                rules={[
                  { required: true, message: "Please input your password!" },
                  { min: 6, message: "Password must be at least 6 characters" },
                ]}
              >
                <Input.Password placeholder="Enter your password" />
              </Form.Item>

              <Form.Item
                name="secret"
                label={<div className="text-white">Secret Code</div>}
                rules={[
                  { required: true, message: "Please input your secret code!" },
                  { min: 4, max: 16, message: "Secret must be 4–16 characters" },
                ]}
              >
                <Input.Password placeholder="Enter your secret code" />
              </Form.Item>
              <div className="flex justify-betweeen mb-2">
                <Link to="/login" className="!text-gray-200">
                  Login
                </Link>
              </div>
              <Form.Item>
                <Button className="w-full my-2" type="primary" htmlType="submit">
                  Register
                </Button>
              </Form.Item>

              <div className="text-center text-white">Version {appConfig.version}</div>
            </Form>
          </div>
        </div>
        <LoginFooter />
      </div>
    </Spin>
  );
};

export default Register;
