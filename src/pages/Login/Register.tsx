import appConfig from "@/config/appConfig";
import { useRegisterUserMutation } from "@/redux/api/usersApi";
import { Button, Form, Image, Input, Spin, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useEffect } from "react";
import LoginFooter from "./LoginFooter";

const { Title } = Typography;

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
      <div className="min-h-screen bg-[url('/photos/login_bg.webp')] bg-cover flex flex-col justify-center items-center">
        <div className="py-8 max-w-md w-full my-auto rounded-lg  backdrop-blur-sm bg-opacity-70">
          <div className="glass-card flex items-center flex-col p-8 transform transition-all duration-300 w-full">
            <div className="text-center mb-2 animate-scaleIn">
              <div className="relative">
                <Image
                  preview={false}
                  width={90}
                  src="/photos/logo.webp"
                  alt="Personal Assistant Logo"
                  className="drop-shadow-lg"
                />
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 to-slate-500/20 rounded-full blur-xl -z-10"></div>
              </div>
              <Title level={3} className="text-white  tracking-wide">
                {appConfig.name}
              </Title>
            </div>
            {/* <hr className="border-gray-300 pb-2 w-full dark:border-slate-600 my-3 " /> */}
            <Form name="register" onFinish={handleRegister} layout="vertical" className="w-full">
              <Form.Item
                name="name"
                label={<div className="">Full Name</div>}
                rules={[{ required: true, message: "Please input your name!" }]}
                className="w-full "
              >
                <Input placeholder="Enter your name" />
              </Form.Item>

              <Form.Item
                name="email"
                label={<div className="">Email</div>}
                rules={[{ required: true, message: "Please input your email!" }]}
              >
                <Input placeholder="Enter your email" />
              </Form.Item>

              <Form.Item
                name="loginId"
                label={<div className="">Login ID</div>}
                rules={[{ required: true, message: "Please input your Login ID!" }]}
              >
                <Input placeholder="Enter your Login ID" />
              </Form.Item>

              <Form.Item
                name="phone"
                label={<div className="">Phone Number</div>}
                rules={[{ required: true, message: "Please input your phone number!" }]}
              >
                <Input placeholder="Enter your phone number" />
              </Form.Item>

              <Form.Item
                name="password"
                label={<div className="">Password</div>}
                rules={[
                  { required: true, message: "Please input your password!" },
                  { min: 6, message: "Password must be at least 6 characters" },
                ]}
              >
                <Input.Password placeholder="Enter your password" />
              </Form.Item>

              <Form.Item
                name="secret"
                label={<div className="">Secret Code</div>}
                rules={[
                  { required: true, message: "Please input your secret code!" },
                  { min: 4, max: 16, message: "Secret must be 4–16 characters" },
                ]}
              >
                <Input.Password placeholder="Enter your secret code" />
              </Form.Item>

              <div className="flex justify-between mb-4">
                <Link to="/login"  className="!text-slate-500 hover:!text-slate-700 transition-colors duration-200 font-medium text-sm">
                  Already have an account? Login
                </Link>
              </div>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                >
                  Register
                </Button>
              </Form.Item>

              <div className="text-center  mt-4">Version {appConfig.version}</div>
            </Form>
          </div>
        </div>
        <LoginFooter />
      </div>
    </Spin>
  );
};

export default Register;
