/* eslint-disable react-hooks/exhaustive-deps */
import { useLazyGetProfileQuery } from "@/redux/api/usersApi";
import { ReactNode, useEffect } from "react";
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
  const navigate = useNavigate();
  const { isLogin, token, user } = useAppSelector((state) => state.auth);
  const [getProfileData, { isLoading, isFetching }] = useLazyGetProfileQuery();

  const getProfile = async () => {
    try {
      const user = await getProfileData({ token });
      const data = user?.data?.data;
      if (data && Object.keys(data)) {
        dispatch(setUser(data));
      } else if (isLogin) {
        dispatch(setAuth({ token: undefined, user: {} }));
        navigate("/login");
      }
    } catch {
      console.log("error");
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    if (!(isFetching || isLoading) && !isLogin) {
      navigate("/login");
    }
  }, [isLogin, isFetching, isLoading]);

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
