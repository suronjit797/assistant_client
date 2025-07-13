import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <div className="flex gap-3 items-center justify-center">
          <Button type="primary" onClick={() => navigate("/")}>
            Back to Home
          </Button>
          <Button type="default" onClick={() => navigate(-1)}>
            Back to Previous
          </Button>
        </div>
      }
    />
  );
};

export default NotFound;
