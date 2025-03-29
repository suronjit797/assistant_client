/* eslint-disable @typescript-eslint/no-explicit-any */
import appConfig from "@/config/appConfig";
import { useLoginUserMutation } from "@/redux/api/usersApi";
import { setAuth } from "@/redux/features/authSlice";
import { Button, Checkbox, Form, Input, Spin } from "antd";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAppDispatch, useAppSelector } from "../../redux/store";

const Login = () => {
  const navigate = useNavigate();
  const [loginUser, { error, isLoading }] = useLoginUserMutation();

  // redux
  const dispatch = useAppDispatch();
  const { isLogin } = useAppSelector((state) => state.auth);

  // navigate to home if login
  useEffect(() => {
    if (isLogin) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin]);

  const handleLogin = async ({ email, password }: { email: string; password: string }) => {
    try {
      const data = await loginUser({ password, email: email?.toLocaleLowerCase() });
      if (data?.data) {
        const token = "Bearer " + data.data.token;
        dispatch(setAuth({ token }));
        navigate("/");
      }
    } catch {
      Swal.fire({
        title: "Error!",
        text: "Login Failed",
        icon: "error",
        confirmButtonText: "OK",
        timer: 3000,
      });
    }
  };

  if (error ) {
    Swal.fire({
      title: "Error!",
      text: (error as any)?.data?.message || "Login Failed",
      icon: "error",
      confirmButtonText: "OK",
      timer: 3000,
    });
  }

  return (
    <Spin spinning={isLoading}>
      <div className=" min-h-screen md:grid grid-cols-10 grid-rows-1 items-center ">
        {/* left side */}
        <div className="col-span-4 p-8 lg:px-20 bg-slate-100  h-full shadow-lg flex items-center justify-center flex-col">
          <div className="pb-5">
            <img src="/photos/logo_dark.webp" className="w-28" alt="logo" />
          </div>
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

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please Input Your Password!",
                },
                {
                  min: 6,
                  message: "Min Length 6",
                },
              ]}
            >
              <Input.Password placeholder="Input Password" />
            </Form.Item>

            <div className="text-end">
              <Link to="/forgot-password" className="text-primary">
                Forgot Password?
              </Link>
            </div>

            <Form.Item name="terms" valuePropName="checked">
              <Checkbox>
                You agree to our
                <a href="#" rel="noreferrer" target="_blank" className="text-primary d-inline-block ms-1">
                  Terms & Conditions
                </a>
              </Checkbox>
            </Form.Item>
            <Form.Item shouldUpdate>
              {({ getFieldValue }) => (
                <Button className="w-full mb-2" type="primary" htmlType="submit" disabled={!getFieldValue("terms")}>
                  Sign In
                </Button>
              )}
            </Form.Item>
            <div className="text-center text-gray-500"> Version {appConfig.version} </div>
          </Form>
        </div>
        {/* right side */}
        <div className=" bg-[url('/photos/login_bg.webp')] h-full col-span-6 bg-cover"> </div>
        <footer className=" col-span-full bg-black text-white py-2 text-sm px-5">
          <div className="text-center"> {appConfig.copyright} </div>
          <div className="text-end mt-[-20px]">Terms of Use | Privacy Policy</div>
        </footer>
      </div>
    </Spin>
  );
};

export default Login;
