import { userRoleFormate } from "@/constant/userRole";
import useLogout from "@/hooks/useLogout";
import { changeNavOpen, changeTheme } from "@/redux/features/themeSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Avatar, Menu, MenuProps, Popover } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { FiMaximize } from "react-icons/fi";
import { HiBars3CenterLeft } from "react-icons/hi2";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoMoon, IoSunnySharp } from "react-icons/io5";
import { Link } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

const items = (logout: () => void): MenuItem[] => [
  {
    key: "sub1",
    label: <Link to="/settings"> Settings </Link>,
  },

  {
    key: "sub2",
    label: <Link to="/profile"> Profile </Link>,
  },
  {
    key: "sub3",
    label: "Logout",
    onClick: logout,
    danger: true,
  },
];

const Header = () => {
  const { isDark, isNavOpen } = useAppSelector((state) => state.theme);
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const logOut = useLogout();

  // state
  const [today, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className=" p-4 select-none">
      <div className="flex items-center mt-6">
        <span className="cursor-pointer text-2xl" onClick={() => dispatch(changeNavOpen(!isNavOpen))}>
          <HiBars3CenterLeft />
        </span>

        <div className="ms-auto flex items-center gap-4 ">
          <span className="cursor-pointer">
            <FiMaximize />
          </span>
          <span className="cursor-pointer text-lg" onClick={() => dispatch(changeTheme(!isDark))}>
            {" "}
            {isDark ? <IoSunnySharp /> : <IoMoon />}{" "}
          </span>
          <span className="cursor-pointer text-xl">
            <IoMdNotificationsOutline />
          </span>

          <div className="cursor-pointer ms-3">
            <Popover
              content={
                <div className="w-3xs">
                  {/* logo */}

                  <div className="text-center mb-4">
                    <div className="mb-4">
                      <Avatar src={user?.avatar?.url} className="w-30! h-30!" />
                    </div>
                    <div className="font-bold text-xl"> {user?.name} </div>
                    <div className=" text-sm text-gray-500"> {userRoleFormate[user?.role] || "Site User"} </div>
                  </div>

                  <div>
                    <Menu mode="inline" items={items(logOut)} />
                  </div>
                </div>
              }
              trigger="click"
            >
              <Avatar src={user?.avatar?.url} alt="" size="large" />
            </Popover>
          </div>
        </div>
      </div>

      {/* timer  */}
      <div className="flex mt-3 text-[13px]">
        <label className="ms-auto">
          {dayjs(today).format("hh:mm A | DD MMMM YYYY")} | {/*  */}
          <span className="text-capitalize">
            {userRoleFormate[user?.role] || "Site User "} {/*  */}
          </span>
          Account
        </label>
      </div>
    </div>
  );
};

export default Header;
