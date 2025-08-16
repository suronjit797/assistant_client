import { userRoleFormate } from "@/constant/userRole";
import useLogout from "@/hooks/useLogout";
import { NavConfig } from "@/interfaces/interfaces";
import { changeNavOpen, changeTheme } from "@/redux/features/themeSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Avatar, Button, Popover } from "antd";
import { FiMaximize } from "react-icons/fi";
import { HiBars3CenterLeft } from "react-icons/hi2";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoMoon, IoSunnySharp } from "react-icons/io5";
import { TiCogOutline, TiPower } from "react-icons/ti";
import { NavLink } from "react-router-dom";

const Header = () => {
  const { isDark, isNavOpen } = useAppSelector((state) => state.theme);
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const logOut = useLogout();

  return (
    <div className={`px-4 py-2 select-none ${!isDark && "bg-gray-100"} sticky top-0 `}>
      <div className="flex items-center">
        <Button
          type="text"
          shape="circle"
          icon={<HiBars3CenterLeft className="text-xl" />}
          onClick={() => dispatch(changeNavOpen(!isNavOpen))}
          title="Toggle Navigation"
        />

        <div className="ms-auto flex items-center gap-2 ">
          <Button type="text" shape="circle" className="cursor-pointer" title="Maximize">
            <FiMaximize className="text-md" />
          </Button>
          <Button
            type="text"
            shape="circle"
            className="cursor-pointer text-lg"
            onClick={() => dispatch(changeTheme(!isDark))}
            title="Toggle Theme"
          >
            {" "}
            {isDark ? <IoSunnySharp className="text-md" /> : <IoMoon className="text-md" />}{" "}
          </Button>
          <Button type="text" shape="circle" className="cursor-pointer" title="Notification">
            <IoMdNotificationsOutline className="text-lg" />
          </Button>

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
                    {navigationConfig(logOut).map((item, ind) => {
                      if (item.path) {
                        return (
                          <NavLink
                            to={item.path || "#"}
                            className={({ isActive, isPending }) =>
                              ` ${isDark ? "!text-gray-200" : "!text-gray-500"} block font-semibold  py-2 px-4 my-1 w-full rounded-md ${isActive && "!bg-[#4FC3F7] !text-white"} ${isPending && "!bg-blue-200"} hover:backdrop-brightness-90 transition-all active:backdrop-brightness-80`
                            }
                            key={ind}
                          >
                            {item.name}
                          </NavLink>
                        );
                      } else {
                        return (
                          <div
                            className={`font-semibold text-red-500 block py-2 px-4 my-1 w-full rounded-md hover:backdrop-brightness-90 transition-all active:backdrop-brightness-80`}
                            key={ind}
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            onClick={item.onClick as any}
                          >
                            {item.name}
                          </div>
                        );
                      }
                    })}
                  </div>
                </div>
              }
              trigger="click"
            >
              <Avatar src={user?.avatar?.url} alt="" size="default" />
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

const navigationConfig = (logOut: () => void): NavConfig[] => [
  {
    name: "Settings",
    path: "/settings",
    icon: <TiCogOutline />,
    authorizedRoles: ["superAdmin", "businessAdmin", "installer", "admin", "user", "public"],
  },
  {
    name: "Profile",
    path: "/profile",
    icon: <TiCogOutline />,
    authorizedRoles: ["superAdmin", "businessAdmin", "installer", "admin", "user", "public"],
  },

  {
    name: "Logout",
    path: null,
    icon: <TiPower />,
    authorizedRoles: ["superAdmin", "businessAdmin", "installer", "admin", "user", "public"],
    onClick: () => logOut(),
  },
];
