/* eslint-disable react-hooks/exhaustive-deps */
import envConfig from "@/config/envConfig";
import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setAuth, setUser } from "../../redux/features/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";

interface AuthProps {
  children: ReactNode;
  roles?: string[];
}

const Auth: React.FC<AuthProps> = ({ children, roles = [] }) => {
  // redux
  const dispatch = useAppDispatch();
  const { isLogin, token, user } = useAppSelector((state) => state.auth);

  const [isLoading, setIsLoading] = useState(false);

  const getProfile = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(envConfig.BASED_API_URL + "/api/v1/users/profile", {
        headers: { Authorization: token },
      });

      const { data } = await res.json();
      if (data && Object.keys(data)) {
        dispatch(setUser(data));
      } else if (isLogin) {
        console.log(isLogin);
        dispatch(setAuth({ token: undefined, user: {} }));
      }
    } catch {
      console.log("error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isLogin) {
      navigate("/login");
    }
  }, [isLogin, isLoading]);

  useEffect(() => {
    if (isLogin && Array.isArray(roles) && roles.length) {
      const hasAccess = [...roles, "superAdmin"];
      if (!hasAccess.includes(user?.role)) {
        navigate(-1);
      }
    }
  }, [roles, isLogin]);

  return <>{children}</>;
};

export default Auth;
