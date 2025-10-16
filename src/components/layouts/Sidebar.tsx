import useLogout from "@/hooks/useLogout";
import { NavConfig } from "@/interfaces/interfaces";
import { changeNavOpen } from "@/redux/features/themeSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Image } from "antd";
import React from "react";
import { GiPayMoney } from "react-icons/gi";
import { GoHome } from "react-icons/go";
import { ImBlog } from "react-icons/im";
import { IoClose } from "react-icons/io5";
import { LuListTodo } from "react-icons/lu";
import { MdOutlineConnectWithoutContact } from "react-icons/md";
import { PiNotebookLight } from "react-icons/pi";
import { RiLockPasswordLine } from "react-icons/ri";
import { SlEvent } from "react-icons/sl";
import { TiPower } from "react-icons/ti";
import { Link, NavLink } from "react-router-dom";

const Sidebar = React.memo(() => {
  const { isNavOpen, isDark } = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();
  const logOut = useLogout();
  const navItems = React.useMemo(() => navigationConfig(logOut), [logOut]);

  return (
    <div className="select-none h-full bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 border-r border-blue-200 dark:border-gray-700">
      <div className={`navbar-overlay ${isNavOpen ? "active" : ""}`} onClick={() => dispatch(changeNavOpen(false))} />
      <div className={`h-full ${isNavOpen ? "active" : ""}`}>
        {/* Header Section */}
        <div className="px-6 py-6 border-b border-blue-200 dark:border-gray-700">
          <div className="close-container hidden">
            <div className="close" onClick={() => dispatch(changeNavOpen(false))}>
              <IoClose />
            </div>
          </div>
          <div className="flex flex-col items-center animate-fadeIn">
            <Link to="/" className="group">
              <div className="relative">
                <Image 
                  preview={false} 
                  width={64} 
                  src="/photos/logo.webp" 
                  alt="Personal Assistant Logo" 
                  className="transition-transform duration-300 group-hover:scale-110 drop-shadow-lg"
                />
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/25 to-cyan-400/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </div>
            </Link>
            <h2 className="mt-3 text-lg font-bold text-blue-800 dark:text-white">Personal Assistant</h2>
            <div className="mt-1 px-3 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-medium rounded-full">
              Dashboard
            </div>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="flex-1 px-4 py-6 space-y-2 modern-scrollbar overflow-y-auto">
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 px-3">
              Navigation
            </h3>
            {navItems?.map((item, ind) => {
              if (item.path) {
                return (
                  <NavLink
                    to={item.path || "#"}
                    className={({ isActive, isPending }) =>
                      `nav-item group flex items-center gap-3 py-3 px-4 my-1 w-full rounded-xl transition-all duration-200 
                      ${
                        isActive 
                          ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25 scale-105" 
                          : "text-blue-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700/50 hover:text-blue-800 dark:hover:text-white hover:scale-105"
                      } 
                      ${isPending && "bg-blue-50 dark:bg-gray-700 animate-pulse"}`
                    }
                    key={ind}
                    onClick={() => dispatch(changeNavOpen(false))}
                  >
                    <span className={`text-lg transition-transform duration-200 group-hover:scale-110`}>
                      {item.icon}
                    </span>
                    <span className="font-medium text-sm">{item.name}</span>
                  </NavLink>
                );
              } else {
                return (
                  <button
                    className="nav-item group flex items-center gap-3 py-3 px-4 my-1 w-full rounded-xl transition-all duration-200 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 hover:scale-105 font-medium text-sm"
                    key={ind}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onClick={item.onClick as any}
                  >
                    <span className="text-lg transition-transform duration-200 group-hover:scale-110">
                      {item.icon}
                    </span>
                    <span>{item.name}</span>
                  </button>
                );
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
});

export default Sidebar;

Sidebar.displayName = "Sidebar";

const navigationConfig = (logOut: () => void): NavConfig[] => [
  {
    name: "Home",
    path: "/",
    icon: <GoHome />,
    authorizedRoles: ["user"],
  },
  // {
  //   name: "Calendar",
  //   path: "/calender",
  //   icon: <SlCalender />,
  //   authorizedRoles: ["user"],
  // },
  // {
  //   name: "Daily Routine",
  //   path: "/routine",
  //   icon: <MdAltRoute />,
  //   authorizedRoles: ["user"],
  // },
  {
    name: "Transaction",
    path: "/transaction",
    icon: <GiPayMoney />,
    authorizedRoles: ["user"],
  },
  {
    name: "Todo",
    path: "/todo",
    icon: <LuListTodo />,
    authorizedRoles: ["user"],
  },
  // {
  //   name: "Goals & Milestones",
  //   path: "/goals",
  //   icon: <GiStairsGoal />,
  //   authorizedRoles: ["user"],
  // },
  {
    name: "Blog",
    path: "/blog",
    icon: <ImBlog />,
    authorizedRoles: ["user"],
  },
  {
    name: "Diary",
    path: "/diary",
    icon: <PiNotebookLight />,
    authorizedRoles: ["user"],
  },
  {
    name: "Contact",
    path: "/contact",
    icon: <MdOutlineConnectWithoutContact />,
    authorizedRoles: ["user"],
  },
  {
    name: "Password Manager",
    path: "/password-manager",
    icon: <RiLockPasswordLine />,
    authorizedRoles: ["user"],
  },
  {
    name: "Events",
    path: "/event",
    icon: <SlEvent />,
    authorizedRoles: ["user"],
  },
  {
    name: "Logout",
    path: null,
    icon: <TiPower />,
    authorizedRoles: ["user"],
    onClick: () => logOut(),
  },
];
