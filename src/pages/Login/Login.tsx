import appConfig from "@/config/appConfig";
import { useLoginUserMutation } from "@/redux/api/usersApi";
import { setAuth } from "@/redux/features/authSlice";
import { Button, Form, Image, Input, Spin } from "antd";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import LoginFooter from "./LoginFooter";

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

  if (error) {
    Swal.fire({
      title: "Error!",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      text: (error as any)?.data?.message || "Login Failed",
      icon: "error",
      confirmButtonText: "OK",
      timer: 3000,
    });
  }

  useEffect(() => {
    document.title = `${appConfig.name} - Login`;
  }, []);

  return (
    <Spin spinning={isLoading}>
      <div className=" min-h-screen bg-[url('/photos/login_bg.webp')] bg-cover flex flex-col justify-center items-center ">
        <div className="glass-card flex items-center flex-col my-auto p-8 max-w-[345px] w-full">
          <div className="text-center pb-2 text-sm">
            <Image preview={false} width={80} src="/photos/logo.webp" alt="logo" />
            <div className="text-white"> {appConfig.name} </div>
          </div>
          <hr className="border-gray-300 pb-2 w-full dark:border-slate-600 my-3" />
          <Form name="register" className="w-full" onFinish={handleLogin} layout="vertical">
            <Form.Item
              name="email"
              label={<div className="text-white"> Email/Login ID </div>}
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
              label={<div className="text-white"> Password </div>}
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
              <Link to="/forgot-password" className="!text-gray-200">
                Forgot Password?
              </Link>
            </div>

            {/* <Form.Item name="terms" valuePropName="checked">
              <Checkbox className="!text-white">
                You agree to our
                <a href="#" rel="noreferrer" target="_blank" className="!text-gray-200 d-inline-block ms-1">
                  Terms & Conditions
                </a>
              </Checkbox>
            </Form.Item> */}
            <Form.Item shouldUpdate>
              {/* {({ getFieldValue }) => ( */}
              {/* <Button className="w-full mb-2 " type="primary" htmlType="submit" disabled={!getFieldValue("terms")}> */}
              <Button className="w-full my-2 " type="primary" htmlType="submit">
                Sign In
              </Button>
              {/* )} */}
            </Form.Item>
            <div className="text-center text-white"> Version {appConfig.version} </div>
          </Form>
        </div>

        <LoginFooter />
      </div>
    </Spin>
  );
};

export default Login;
