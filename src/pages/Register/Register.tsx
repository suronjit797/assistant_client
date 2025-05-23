
import { Button, Form, Input } from "antd";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/store";

const Register = () => {
  const navigate = useNavigate();

  // redux
  const { isLogin } = useAppSelector((state) => state.auth);

  // navigate to home if login
  useEffect(() => {
    if (isLogin) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin]);

  const handleSubmit = async (values: { email: string; password: string }) => {
    console.log({ values });
  };

  return (
    <div className=" bg-[url('/photos/login_bg.webp')] h-screen bg-contain bg-opacity-50 backdrop-blur-xl bg-center md:grid md:grid-cols-7 overflow-y-auto items-center ">
      <div className=" md:col-span-3 flex flex-col justify-center gap-4 p-14 h-full  bg-[royalblue] text-white shadow-lg">
        <div className="text-4xl  items-center  font-semibold text-center mb-4">Register</div>
        <Form
          className=" text-white"
          name="register"
          onFinish={handleSubmit}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label={<span style={{ fontSize: "16px", color: "white" }}>Name</span>}
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <Input placeholder="Input name" />
          </Form.Item>

          <Form.Item
            name="email"
            label={<span style={{ fontSize: "16px", color: "white" }}>E-mail</span>}
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input placeholder="Input Email" />
          </Form.Item>

          <Form.Item
            label={<span style={{ fontSize: "16px", color: "white" }}>Password</span>}
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
            label={<span style={{ fontSize: "16px", color: "white" }}>Confirm Password</span>}
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

          <Form.Item>
            <Button color="green" variant="solid" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        <div className=" flex justify-around mt-2 mb-0 align-middle">
          <h1 className=" h-[2px] my-auto rounded w-[40%] bg-white" /> or
          <h1 className=" h-[2px] rounded my-auto w-[40%] bg-white" />
        </div>
        <div className="text-xl mt-0 text-center font-semibold">
          Already have an account?{" "}
          <Link to="/login" className=" text-xl text-slate-800 font-semibold">
            Log In
          </Link>
        </div>
      </div>
      <div className=" col-span-4"></div>
    </div>
  );
};

export default Register;
