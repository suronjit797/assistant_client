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
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-500 relative overflow-hidden flex flex-col justify-center items-center">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-400/15 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>
        
        <div className="py-8 max-w-md w-full mx-4 relative z-10 animate-fadeIn">
          <div className="glass-card flex items-center flex-col p-8 transform hover:scale-105 transition-all duration-300">
            {/* Logo Section */}
            <div className="text-center mb-6 animate-scaleIn">
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
              <h1 className="text-white text-2xl font-bold mt-4 tracking-wide"> {appConfig.name} </h1>
              <p className="text-slate-300 text-sm mt-2">Welcome back! Please sign in to continue.</p>
            </div>
            <Form name="register" className="w-full space-y-4" onFinish={handleLogin} layout="vertical">
              <Form.Item
                name="email"
                label={<div className="text-white font-medium mb-2"> Email/Login ID </div>}
                rules={[
                  {
                    required: true,
                    message: "Please Input Your E-mail/Login ID!",
                  },
                ]}
                className="mb-6"
              >
                <Input 
                  className="!bg-white/10 !border-white/20 !text-white placeholder:!text-white/60 hover:!border-white/40 focus:!border-white/60 backdrop-blur-sm" 
                  placeholder="Enter your email or login ID" 
                  size="large"
                />
              </Form.Item>

              <Form.Item
                label={<div className="text-white font-medium mb-2"> Password </div>}
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
                className="mb-6"
              >
                <Input.Password 
                  className="!bg-white/10 !border-white/20 !text-white placeholder:!text-white/60 hover:!border-white/40 focus:!border-white/60 backdrop-blur-sm" 
                  placeholder="Enter your password" 
                  size="large"
                />
              </Form.Item>

              <div className="flex justify-between mb-6 mt-2">
                <Link 
                  to="/register" 
                  className="!text-slate-300 hover:!text-white transition-colors duration-200 font-medium text-sm"
                >
                  Create Account
                </Link>
                <Link 
                  to="/forgot-password" 
                  className="!text-slate-300 hover:!text-white transition-colors duration-200 font-medium text-sm"
                >
                  Forgot Password?
                </Link>
              </div>

              <Form.Item className="mb-0">
                <Button 
                  className="w-full h-12 !bg-gradient-to-r !from-blue-600 !to-blue-700 hover:!from-blue-700 hover:!to-blue-800 !border-0 !text-white !font-semibold !text-base tracking-wide transform transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl" 
                  type="primary" 
                  htmlType="submit"
                  size="large"
                >
                  Sign In
                </Button>
              </Form.Item>
              
              <div className="text-center text-white/60 text-xs mt-6 font-medium"> 
                Version {appConfig.version} 
              </div>
            </Form>
          </div>
        </div>

        <LoginFooter />
      </div>
    </Spin>
  );
};

export default Login;
