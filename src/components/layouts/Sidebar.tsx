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
    <div className="select-none">
      <div className={`navbar-overlay ${isNavOpen ? "active" : ""}`} onClick={() => dispatch(changeNavOpen(false))} />
      <div className={` ${isNavOpen ? "active" : ""}`}>
        <div className="px-4">
          <div className="close-container hidden">
            <div className="close" onClick={() => dispatch(changeNavOpen(false))}>
              <IoClose />
            </div>
          </div>
          <div className="pt-3">
            <Link to="/" className="logo block text-center">
                <Image preview={false} width={80} src="/photos/logo.webp" />
            </Link>
          </div>
        </div>

        <div className="px-3">
          <div>
            {navItems?.map((item, ind) => {
              if (item.path) {
                return (
                  <NavLink
                    to={item.path || "#"}
                    className={({ isActive, isPending }) =>
                      `flex items-center ${isDark ? "text-gray-200" : "text-gray-500"} font-semibold gap-2 py-2 px-4 my-1 w-full rounded-md ${isActive && "bg-[#4FC3F7] text-white"} ${isPending && "bg-blue-200"} hover:backdrop-brightness-90 transition-all active:backdrop-brightness-80`
                    }
                    key={ind}
                  >
                    {item.icon} {item.name}
                  </NavLink>
                );
              } else {
                return (
                  <div
                    className={`flex items-center font-semibold text-red-500 gap-2 py-2 px-4 my-1 w-full rounded-md hover:backdrop-brightness-90 transition-all active:backdrop-brightness-80`}
                    key={ind}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onClick={item.onClick as any}
                  >
                    {item.icon} {item.name}
                  </div>
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
