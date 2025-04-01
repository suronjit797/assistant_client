import appConfig from "@/config/appConfig";
import { useResetPasswordMutation } from "@/redux/api/usersApi";
import { setAuth } from "@/redux/features/authSlice";
import { useAppSelector } from "@/redux/store";
import { Button, Form, Input, Spin } from "antd";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import LoginFooter from "./LoginFooter";

type ResetPasswordParams = {
  token?: string;
};

export const ResetPassword = () => {
  const { token } = useParams<ResetPasswordParams>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLogin } = useAppSelector((state) => state.auth);

  const [resetPassword, { error, isLoading }] = useResetPasswordMutation();

  useEffect(() => {
    document.title = `${appConfig.name} – Reset Password`;
    if (isLogin) {
      localStorage.clear();
      dispatch(setAuth({ token: undefined, user: {} }));
    }
  }, [isLogin, dispatch]);

  const SubmitHandler = async ({ password }: { password: string }) => {
    const data = await resetPassword({ token: `Bearer ${token}`, password }).unwrap();
    if (data.success) {
      await Swal.fire({
        title: "Success",
        text: "Password reset successfully",
        icon: "success",
        confirmButtonText: "OK",
        timer: 3000,
      });
      navigate("/login");
    }
  };

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
        <div className="col-span-4 p-8 flex-1 w-full lg:px-20 bg-slate-100  h-full shadow-lg flex items-center justify-center flex-col">
          <div className="pb-6">
            <img src="/photos/logo_light.webp" className="w-28 h-16" alt="logo" />
          </div>
          <div className="text-center pb-2 text-lg">Customer Management Portal</div>
          <hr className="border-gray-300 pb-2 w-full dark:border-slate-600 my-3" />

          <h5 className="font-bold text-start w-full mb-5">Reset Password?</h5>

          <Form name="register" className="w-full" onFinish={SubmitHandler} layout="vertical">
            <Form.Item
              label="New Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
                {
                  min: 6,
                  message: "min length 6",
                },
              ]}
            >
              <Input.Password placeholder="Input password" />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={["password"]}
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error(" Password does not match!"));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirm password" />
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
        <LoginFooter />
      </div>
    </Spin>
  );
};
