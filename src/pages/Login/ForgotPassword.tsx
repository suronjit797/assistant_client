import appConfig from "@/config/appConfig";
import { useForgotPasswordMutation } from "@/redux/api/usersApi";
import { Button, Form, Input, Spin } from "antd";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ForgotPassword = () => {
  const [forgotPassword, { data, error, isLoading }] = useForgotPasswordMutation();

  useEffect(() => {
    document.title = `${appConfig.name} - Forgot Password`;
  }, []);

  const handleLogin = async ({ email }: { email: string }) => {
    await forgotPassword({ email: email?.toLocaleLowerCase() });
  };

  useEffect(() => {
    document.title = `${appConfig.name} - Login`;
  }, []);

  if (data) {
    Swal.fire({
      title: "Success",
      text: "Password reset link sent in your email",
      icon: "success",
      confirmButtonText: "OK",
      timer: 3000,
    });
  }

  if (error) {
    Swal.fire({
      title: "Error!",
      text: "Password reset failed",
      icon: "error",
      confirmButtonText: "OK",
      timer: 3000,
    });
  }

  return (
    <Spin spinning={isLoading}>
      <div className=" min-h-screen flex flex-col md:grid grid-cols-10 grid-rows-1 items-center ">
        {/* left side */}
        <div className="col-span-4 p-8 lg:px-20 bg-slate-100  h-full shadow-lg flex items-center justify-center flex-col">
          <div className="pb-6">
            <img src="/photos/logo_light.webp" className="w-28 h-16" alt="logo" />
          </div>
          <div className="text-center pb-2 text-lg">Customer Management Portal</div>
          <hr className="border-gray-300 pb-2 w-full dark:border-slate-600 my-3" />

          <h5 className="font-bold text-start w-full">Forgot Password?</h5>
          <p style={{ fontSize: "13px" }} className="my-4">
            Please contact support at{" "}
            <a href="mailto:support@support.com">
              <b className="text-gray-800">support@support.com </b>
            </a>
            to request for a password reset if you have not registered your account with an email or Login ID.
          </p>
          <Form name="register" className="w-full" onFinish={handleLogin} layout="vertical">
            <Form.Item
              name="email"
              label="Email/Login ID"
              rules={[
                {
                  required: true,
                  message: "Please Input Your E-mail/Login ID!",
                },
              ]}
            >
              <Input className="" placeholder="Input E-mail/Login ID" />
            </Form.Item>

            <Form.Item className="!mb-2">
              <Button className="w-full mb-2" type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>

            <div>
              <div className="flex items-center mb-4">
                <hr className="w-full border-gray-300 dark:border-slate-600" />
                <div className="px-3 fw-semibold">or</div>
                <hr className="w-full border-gray-300 dark:border-slate-600" />
              </div>
              <Link to="/login" className="d-block my-3">
                <Button block>Back To Login</Button>
              </Link>
            </div>

            <div className="text-center text-gray-500 mt-5"> Version {appConfig.version} </div>
          </Form>
        </div>
        {/* right side */}
        <div className=" bg-[url('/photos/login_bg.webp')] h-full col-span-6 bg-cover"> </div>
        <footer className=" col-span-full bg-black text-white py-2 text-sm px-5 mt-auto w-full">
          <div className="text-center"> {appConfig.copyright} </div>
          <div className="text-end mt-[-20px]">Terms of Use | Privacy Policy</div>
        </footer>
      </div>
    </Spin>
  );
};

export default ForgotPassword;
