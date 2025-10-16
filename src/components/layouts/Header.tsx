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
    <div className={`px-6 py-4 select-none backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-40 ${!isDark ? "bg-white/80" : "bg-gray-900/80"}`}>
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <Button
            type="text"
            shape="circle"
            icon={<HiBars3CenterLeft className="text-xl" />}
            onClick={() => dispatch(changeNavOpen(!isNavOpen))}
            title="Toggle Navigation"
            className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 !border-0 shadow-none"
          />
          
          {/* Breadcrumb or Page Title could go here */}
          <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
            <span className="font-medium">Dashboard</span>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-3">
          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <Button 
              type="text" 
              shape="circle" 
              className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 !border-0 shadow-none hover:scale-105" 
              title="Maximize"
            >
              <FiMaximize className="text-lg" />
            </Button>
            
            <Button
              type="text"
              shape="circle"
              className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 !border-0 shadow-none hover:scale-105"
              onClick={() => dispatch(changeTheme(!isDark))}
              title="Toggle Theme"
            >
              {isDark ? (
                <IoSunnySharp className="text-lg text-amber-500" />
              ) : (
                <IoMoon className="text-lg text-blue-600" />
              )}
            </Button>
            
            <Button 
              type="text" 
              shape="circle" 
              className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 !border-0 shadow-none hover:scale-105 relative" 
              title="Notifications"
            >
              <IoMdNotificationsOutline className="text-lg" />
              {/* Notification badge */}
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
          </div>
          
          {/* Divider */}
          <div className="w-px h-6 bg-gray-300 dark:bg-gray-600"></div>

          {/* User Profile */}
          <div className="cursor-pointer">
            <Popover
              content={
                <div className="w-72 p-4">
                  {/* User Profile Header */}
                  <div className="text-center mb-6">
                    <div className="relative mb-4 inline-block">
                      <Avatar 
                        src={user?.avatar?.url} 
                        size={80} 
                        className="border-4 border-white shadow-lg"
                      />
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-2 border-white rounded-full"></div>
                    </div>
                    <div className="font-bold text-lg text-gray-800 dark:text-white"> {user?.name} </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-2"> {userRoleFormate[user?.role] || "Site User"} </div>
                    <div className="inline-block px-3 py-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs font-medium rounded-full">
                      Online
                    </div>
                  </div>

                  {/* Navigation Menu */}
                  <div className="space-y-1">
                    {navigationConfig(logOut).map((item, ind) => {
                      if (item.path) {
                        return (
                          <NavLink
                            to={item.path || "#"}
                            className={({ isActive, isPending }) =>
                              `group flex items-center gap-3 py-3 px-4 rounded-xl transition-all duration-200 ${
                                isActive 
                                  ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg" 
                                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-white"
                              } ${isPending && "bg-gray-100 dark:bg-gray-700 animate-pulse"}`
                            }
                            key={ind}
                          >
                            <span className="text-lg group-hover:scale-110 transition-transform duration-200">{item.icon}</span>
                            <span className="font-medium text-sm">{item.name}</span>
                          </NavLink>
                        );
                      } else {
                        return (
                          <button
                            className="group flex items-center gap-3 py-3 px-4 rounded-xl transition-all duration-200 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 w-full font-medium text-sm"
                            key={ind}
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            onClick={item.onClick as any}
                          >
                            <span className="text-lg group-hover:scale-110 transition-transform duration-200">{item.icon}</span>
                            <span>{item.name}</span>
                          </button>
                        );
                      }
                    })}
                  </div>
                </div>
              }
              trigger="click"
              placement="bottomRight"
              overlayClassName="modern-popover"
            >
              <div className="flex items-center space-x-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl px-3 py-2 transition-all duration-200 cursor-pointer group">
                <div className="relative">
                  <Avatar 
                    src={user?.avatar?.url} 
                    alt="User Avatar" 
                    size={40} 
                    className="border-2 border-gray-200 dark:border-gray-600 group-hover:border-blue-400 transition-colors duration-200"
                  />
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
                </div>
                <div className="hidden md:block text-left">
                  <div className="font-medium text-sm text-gray-700 dark:text-gray-300">{user?.name}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{userRoleFormate[user?.role] || "User"}</div>
                </div>
              </div>
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
