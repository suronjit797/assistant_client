import { userRoleFormate } from "@/constant/userRole";
import useLogout from "@/hooks/useLogout";
import { changeNavOpen } from "@/redux/features/themeSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Avatar, Menu, MenuProps } from "antd";
import React, { useState } from "react";
import { FaLocationDot, FaUsersGear } from "react-icons/fa6";
import { GrMoney } from "react-icons/gr";
import { IoClose } from "react-icons/io5";
// import { RiBankFill } from "react-icons/ri";
import { TbReportMoney } from "react-icons/tb";
import {
  TiBell,
  TiChartLine,
  TiCogOutline,
  TiHomeOutline,
  TiPower,
  TiUser,
} from "react-icons/ti";
import { Link, useLocation } from "react-router-dom";

interface NavConfig {
  name: string;
  path: string | null;
  authorizedRoles: string[];
  icon?: React.ReactNode;
  children?: NavConfig[];
  onClick?: (logOut?: () => void) => void;
}

interface NavItems {
  key: string;
  icon: React.ReactNode;
  label: React.ReactNode | string;
  onClick?: () => void;
  children?: NavItems[];
}

interface LevelKeysProps {
  key?: string;
  children?: LevelKeysProps[];
}

const Sidebar = React.memo(() => {
  // hooks
  const { isNavOpen, isDark } = useAppSelector((state) => state.theme);
  const { user } = useAppSelector((state) => state.auth || {});
  const dispatch = useAppDispatch();
  const location = useLocation();
  const logOut = useLogout();

  // states
  const [stateOpenKeys, setStateOpenKeys] = useState(["2"]);

  // handler
  const onOpenChange: MenuProps["onOpenChange"] = (openKeys) => {
    const currentOpenKey = openKeys.find(
      (key) => stateOpenKeys.indexOf(key) === -1
    );
    // open
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);

      setStateOpenKeys(
        openKeys
          .filter((_, index) => index !== repeatIndex)
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey])
      );
    } else {
      // close
      setStateOpenKeys(openKeys);
    }
  };

  // options

  const items = generateMenuItems(
    navigationConfig(logOut),
    "superAdmin",
    logOut,
    location,
    isDark
  );

  const getLevelKeys = (items1: LevelKeysProps[]) => {
    const key: Record<string, number> = {};
    const func = (items2: LevelKeysProps[], level = 1) => {
      items2.forEach((item) => {
        if (item.key) {
          key[item.key] = level;
        }
        if (item.children) {
          func(item.children, level + 1);
        }
      });
    };
    func(items1);
    return key;
  };

  const levelKeys = getLevelKeys(items as LevelKeysProps[]);

  return (
    <div className="border-e border-e-gray-300 dark:border-e-slate-600 h-full">
      <div
        className={`navbar-overlay ${isNavOpen ? "active" : ""}`}
        onClick={() => dispatch(changeNavOpen(false))}
      />
      <div className={` ${isNavOpen ? "active" : ""}`}>
        <div className="px-4">
          <div className="close-container hidden">
            <div
              className="close"
              onClick={() => dispatch(changeNavOpen(false))}
            >
              <IoClose />
            </div>
          </div>
          <div className="w-35 pt-4 mb-8 mx-3">
            <Link to="/" className="logo">
              <img
                src={
                  isDark ? "/photos/logo_dark.webp" : "/photos/logo_light.webp"
                }
                alt="logo"
                className="w-full"
              />
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Avatar
              size="large"
              src={user?.avatar?.url}
              className=""
              style={{ minWidth: 36 }}
            ></Avatar>
            <div className="text-sm">
              <h6 title={user?.name} className="font-bold">
                {(user?.name?.length ?? 0) > 23
                  ? `${user.name.slice(0, 21)}...`
                  : user?.name || "John Doe"}
              </h6>
              <span className="text-capitalize text-gray-500">
                {userRoleFormate[user?.role]}
              </span>
            </div>
          </div>

          <div className="ps-1">
            <div className="text-xs mt-5 mb-1"> MAIN MENU </div>
            <hr className="border-gray-300 dark:border-slate-600  mb-2" />
          </div>
        </div>

        {/* menu */}
        <div className="px-3">
          <Menu
            defaultSelectedKeys={["/"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            inlineIndent={12}
            openKeys={stateOpenKeys}
            onOpenChange={onOpenChange}
            // inlineCollapsed={collapsed}
            items={items}
            onClick={(item) => {
              if (item.keyPath?.length <= 1) {
                setStateOpenKeys([]);
              }
            }}
          />
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
    icon: <TiHomeOutline />,
    authorizedRoles: [
      "superAdmin",
      "businessAdmin",
      "installer",
      "admin",
      "user",
      "public",
    ],
  },
  {
    name: "Investment Products",
    path: "/products",
    icon: <GrMoney />,
    authorizedRoles: [
      "superAdmin",
      "businessAdmin",
      "installer",
      "admin",
      "user",
      "public",
    ],
    // children: [
    //   {
    //     name: "All Products",
    //     path: "/products",
    //     authorizedRoles: ["superAdmin"],
    //   },
    // ],
  },
  {
    name: "Manage Users",
    path: "/users",
    icon: <FaUsersGear />,
    authorizedRoles: ["superAdmin", "businessAdmin", "admin"],
    children: [
      {
        name: "All Users",
        path: "/users",
        authorizedRoles: ["superAdmin", "businessAdmin", "admin"],
      },
      {
        name: "Manage Business Admins",
        path: "/users?role=businessAdmin",
        authorizedRoles: ["superAdmin"],
      },
      {
        name: "Manage Installers",
        path: "/users?role=installer",
        authorizedRoles: ["superAdmin", "businessAdmin"],
      },
      {
        name: "Manage Site Admins",
        path: "/users?role=admin",
        authorizedRoles: ["superAdmin", "businessAdmin"],
      },
      {
        name: "Manage Site Users",
        path: "/users?role=user",
        authorizedRoles: ["superAdmin", "businessAdmin", "admin"],
      },
      {
        name: "Manage Public Users",
        path: "/users?role=public",
        authorizedRoles: ["superAdmin", "businessAdmin", "admin"],
      },
    ],
  },
  {
    name: "Manage Locations",
    path: "/locations",
    icon: <FaLocationDot style={{ fontSize: "20px" }} />,
    authorizedRoles: [
      "superAdmin",
      "businessAdmin",
      "installer",
      "admin",
      "user",
      "public",
    ],
  },
  // {
  //   name: "Banking Settings",
  //   path: "/banking-settings",
  //   icon: <RiBankFill />,
  //   authorizedRoles: ["superAdmin", "businessAdmin", "installer", "admin", "user", "public"],
  // children: [
  //   {
  //     name: "All Devices",
  //     path: "/devices",
  //     authorizedRoles: ["superAdmin", "businessAdmin", "installer", "admin", "user", "public"],
  //   },
  //   {
  //     name: "Manage Device Types",
  //     path: "/device-types",
  //     authorizedRoles: ["superAdmin", "businessAdmin", "installer", "admin", "user"],
  //   },
  // ],
  // },
  {
    name: "Reports",
    path: "/reporting",
    icon: <TiChartLine />,
    authorizedRoles: [
      "superAdmin",
      "businessAdmin",
      "installer",
      "admin",
      "user",
      "public",
    ],
    // children: [
    //   {
    //     name: "Data Analysis",
    //     path: "/data-analysis",
    //     authorizedRoles: ["superAdmin", "businessAdmin", "installer", "admin", "user", "public"],
    //   },
    //   {
    //     name: "Billing Report",
    //     path: "/billing-report",
    //     authorizedRoles: ["superAdmin", "businessAdmin", "admin"],
    //   },
    // ],
  },
  {
    name: "Support",
    path: "/notification",
    icon: <TiBell />,
    authorizedRoles: ["superAdmin", "businessAdmin", "admin", "user", "public"],
    // children: [
    //   {
    //     name: "System Alarm Summary",
    //     path: "/alarm-summary",
    //     authorizedRoles: ["superAdmin", "businessAdmin", "admin", "user", "public"],
    //   },
    //   {
    //     name: "Notification Recipient List",
    //     path: "/recipient-list",
    //     authorizedRoles: ["superAdmin", "businessAdmin", "admin", "user"],
    //   },
    //   {
    //     name: "Alarm Trigger History",
    //     path: "/alarm-history",
    //     authorizedRoles: ["superAdmin", "businessAdmin", "admin", "user", "public"],
    //   },
    // ],
  },
  {
    name: "Settings",
    path: "/settings",
    icon: <TiCogOutline />,
    authorizedRoles: [
      "superAdmin",
      "businessAdmin",
      "installer",
      "admin",
      "user",
      "public",
    ],
    children: [
      {
        name: "Change Password",
        path: "/settings",
        authorizedRoles: [
          "superAdmin",
          "businessAdmin",
          "installer",
          "admin",
          "user",
          "public",
        ],
      },
      {
        name: "Activity Log",
        path: "/activity-log",
        authorizedRoles: [
          "superAdmin",
          "businessAdmin",
          "installer",
          "admin",
          "user",
          "public",
        ],
      },
      // {
      //   name: "Electricity Tariff",
      //   path: "/electricity-tariff",
      //   authorizedRoles: ["superAdmin", "businessAdmin", "installer", "admin", "user", "public"],
      // },
      // {
      //   name: "Manage System Parameters",
      //   path: "/parameters",
      //   authorizedRoles: ["superAdmin", "businessAdmin", "installer", "admin"],
      // },
      // {
      //   name: "Manage Formulas",
      //   path: "/formulas",
      //   authorizedRoles: ["superAdmin", "businessAdmin", "installer", "admin"],
      // },
    ],
  },

  {
    name: "Payments",
    path: "/manual-reconciliation",
    icon: <TbReportMoney />,
    authorizedRoles: ["superAdmin", "businessAdmin"],
    children: [
      {
        name: "Manual Reconciliation",
        path: "/manual-reconciliation",
        authorizedRoles: [
          "superAdmin",
          "businessAdmin",
          "installer",
          "admin",
          "user",
          "public",
        ],
      },
      {
        name: "Payment Summary",
        path: "/payment-summary",
        authorizedRoles: [
          "superAdmin",
          "businessAdmin",
          "installer",
          "admin",
          "user",
          "public",
        ],
      },
      {
        name: "Reconciliation Summary",
        path: "/reconciliation-summary",
        authorizedRoles: [
          "superAdmin",
          "businessAdmin",
          "installer",
          "admin",
          "user",
          "public",
        ],
      },
    ],
  },
  {
    name: "Profile",
    path: "/profile",
    icon: <TiUser />,
    authorizedRoles: [
      "superAdmin",
      "businessAdmin",
      "installer",
      "admin",
      "user",
      "public",
    ],
  },
  {
    name: "Logout",
    path: null,
    icon: <TiPower />,
    authorizedRoles: [
      "superAdmin",
      "businessAdmin",
      "installer",
      "admin",
      "user",
      "public",
    ],
    onClick: () => logOut(),
  },
];

const generateMenuItems = (
  config: NavConfig[],
  role: string,
  logout: () => void,
  location: { pathname: string },
  isDark: boolean
): NavItems[] => {
  return config
    .filter((item) => item.authorizedRoles.includes(role))
    .map((item) => {
      const isActive = item.path && location?.pathname === item.path;
      return {
        key: item.name || item.path,
        icon: <span className="text-xl!"> {item.icon} </span>,
        label: (
          <Link
            to={item.path || "#"}
            style={{
              color: isActive
                ? isDark
                  ? "white"
                  : "blue"
                : isDark
                  ? "lightgray"
                  : "black",
              textDecoration: "none",
            }}
          >
            {item.name}
          </Link>
        ),
        onClick: item.onClick ? () => item.onClick?.(logout) : undefined,
        children: item.children
          ? generateMenuItems(item.children, role, logout, location, isDark)
          : undefined,
        disabled: disabledList.includes(item.name),
      };
    });
};

const disabledList = [
  "Investment Products",
  "Manage Locations",
  "Banking Settings",
  "Reporting",
  "Notification",
  "Settings",
  // "Manage Users",
  "Reports",
  "Support",
];
