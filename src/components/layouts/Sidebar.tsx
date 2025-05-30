import useLogout from "@/hooks/useLogout";
import { changeNavOpen } from "@/redux/features/themeSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import React from "react";
import { FaLocationDot, FaUsersGear } from "react-icons/fa6";
import { GrMoney } from "react-icons/gr";
import { IoClose } from "react-icons/io5";
// import { RiBankFill } from "react-icons/ri";
import { TbReportMoney } from "react-icons/tb";
import { TiBell, TiChartLine, TiCogOutline, TiHomeOutline, TiPower, TiUser } from "react-icons/ti";
import { Link, NavLink } from "react-router-dom";

interface NavConfig {
  name: string;
  path: string | null;
  authorizedRoles: string[];
  icon?: React.ReactNode;
  children?: NavConfig[];
  onClick?: (logOut?: () => void) => void;
}

const Sidebar = React.memo(() => {
  // hooks
  const { isNavOpen } = useAppSelector((state) => state.theme);

  const dispatch = useAppDispatch();

  const logOut = useLogout();

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
          <div className="py-6">
            <Link to="/" className="logo block text-center">
              {/* <img src={isDark ? "/photos/logo_dark.webp" : "/photos/logo_light.webp"} alt="logo" className="w-full" /> */}
              <h1 className="font-bold text-4xl">P.A.</h1>
            </Link>
          </div>
        </div>

        {/* menu */}
        <div className="px-3">
          <div>
            {navigationConfig(logOut).map((item, ind) => {
              if (item.path) {
                return (
                  <NavLink
                    to={item.path || "#"}
                    className={({ isActive, isPending }) =>
                      `flex items-center text-gray-500 font-semibold gap-2 py-2 px-4 my-1 w-full rounded-md ${isActive && "bg-[#4FC3F7] text-white"} ${isPending && "bg-blue-200"} hover:backdrop-brightness-90 transition-all active:hover:backdrop-brightness-80`
                    }
                    key={ind}
                  >
                    {item.icon} {item.name}
                  </NavLink>
                );
              } else {
                return (
                  <div
                    className={`flex items-center font-semibold text-red-500 gap-2 py-2 px-4 my-1 w-full rounded-md hover:backdrop-brightness-90 transition-all active:hover:backdrop-brightness-80`}
                    key={ind}
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
    icon: <TiHomeOutline />,
    authorizedRoles: ["superAdmin", "businessAdmin", "installer", "admin", "user", "public"],
  },
  {
    name: "Investment Products",
    path: "/products",
    icon: <GrMoney />,
    authorizedRoles: ["superAdmin", "businessAdmin", "installer", "admin", "user", "public"],
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
  },
  {
    name: "Manage Locations",
    path: "/locations",
    icon: <FaLocationDot style={{ fontSize: "20px" }} />,
    authorizedRoles: ["superAdmin", "businessAdmin", "installer", "admin", "user", "public"],
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
    authorizedRoles: ["superAdmin", "businessAdmin", "installer", "admin", "user", "public"],
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
    authorizedRoles: ["superAdmin", "businessAdmin", "installer", "admin", "user", "public"],
    // children: [
    //   {
    //     name: "Change Password",
    //     path: "/settings",
    //     authorizedRoles: ["superAdmin", "businessAdmin", "installer", "admin", "user", "public"],
    //   },
    //   {
    //     name: "Activity Log",
    //     path: "/activity-log",
    //     authorizedRoles: ["superAdmin", "businessAdmin", "installer", "admin", "user", "public"],
    //   },
    //   // {
    //   //   name: "Electricity Tariff",
    //   //   path: "/electricity-tariff",
    //   //   authorizedRoles: ["superAdmin", "businessAdmin", "installer", "admin", "user", "public"],
    //   // },
    //   // {
    //   //   name: "Manage System Parameters",
    //   //   path: "/parameters",
    //   //   authorizedRoles: ["superAdmin", "businessAdmin", "installer", "admin"],
    //   // },
    //   // {
    //   //   name: "Manage Formulas",
    //   //   path: "/formulas",
    //   //   authorizedRoles: ["superAdmin", "businessAdmin", "installer", "admin"],
    //   // },
    // ],
  },

  {
    name: "Payments",
    path: "/manual-reconciliation",
    icon: <TbReportMoney />,
    authorizedRoles: ["superAdmin", "businessAdmin"],
    // children: [
    //   {
    //     name: "Manual Reconciliation",
    //     path: "/manual-reconciliation",
    //     authorizedRoles: [
    //       "superAdmin",
    //       "businessAdmin",
    //       "installer",
    //       "admin",
    //       "user",
    //       "public",
    //     ],
    //   },
    //   {
    //     name: "Payment Summary",
    //     path: "/payment-summary",
    //     authorizedRoles: [
    //       "superAdmin",
    //       "businessAdmin",
    //       "installer",
    //       "admin",
    //       "user",
    //       "public",
    //     ],
    //   },
    //   {
    //     name: "Reconciliation Summary",
    //     path: "/reconciliation-summary",
    //     authorizedRoles: [
    //       "superAdmin",
    //       "businessAdmin",
    //       "installer",
    //       "admin",
    //       "user",
    //       "public",
    //     ],
    //   },
    // ],
  },
  {
    name: "Profile",
    path: "/profile",
    icon: <TiUser />,
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

// const disabledList = [
//   // "Investment Products",
//   // "Manage Locations",
//   // "Banking Settings",
//   // "Reporting",
//   // "Notification",
//   // "Settings",
//   // // "Manage Users",
//   // "Reports",
//   // "Support",
// ];
