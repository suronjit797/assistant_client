import { userRoleFormate } from "@/constant/userRole";
import { changeNavOpen } from "@/redux/features/themeSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { CloseOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import React, { useState } from "react";
import { BiBuildingHouse } from "react-icons/bi";
import { FaLocationDot, FaUsersGear } from "react-icons/fa6";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { MdOutlineDashboardCustomize, MdOutlineSensors } from "react-icons/md";
import { TbReportMoney } from "react-icons/tb";
import { TiBell, TiChartLine, TiCogOutline, TiHomeOutline, TiPower, TiUser } from "react-icons/ti";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Sidebar = React.memo(() => {
  // hooks
  const { isNavOpen } = useAppSelector((state) => state.theme);
  const { user } = useAppSelector((state) => state.auth || {});
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // states
  const [showSubNv, setShowSubNv] = useState("");

  const logOut = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to logout.",
      dangerMode: true,
      showCancelButton: true,
      confirmButtonText: "Confirm",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // localStorage.setItem("isLoggedIn", "no");
          // dispatch(setActiveDashboard(""));
          // dispatch(setIsLogged(false));
          // dispatch(changeTheme(false));
          // dispatch(setUserDetails({}));
          navigate("/");
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log(error.message);
        }
      }
    });
  };

  const renderChild = (children) => {
    const renderChildItem = children
      .map((child, ind) => {
        if (child.authorizedRoles.includes(user?.role)) {
          return (
            <Link key={ind} to={child?.path} className="nav-sub-link">
              {child.name}
            </Link>
          );
        } else {
          return;
        }
      })
      .filter((item) => item);
    if (renderChildItem?.length) {
      return <nav className="nav-sub">{renderChildItem}</nav>;
    } else {
      return;
    }
  };

  const renderNavItem = (item) => {
    if (!user?.role || !item.authorizedRoles.includes(user?.role)) return null;
    const chields = Array.isArray(item.children) && item.children.length && renderChild(item.children);

    if (user?.role !== "superAdmin") {
      if (item.name === "Business") item.name = "My Business";
    }

    return (
      <li
        className={`${showSubNv === item.name ? `nav-item active ${chields ? "show" : ""}` : "nav-item"}`}
        onClick={() => {
          if (item.onClick) item.onClick();
          else if (showSubNv !== item.name) navigate(item?.path);
        }}
      >
        <span
          className="nav-link with-sub"
          onClick={() => (showSubNv === item.name ? setShowSubNv("") : setShowSubNv(item.name))}
        >
          <i>{item.icon}</i>
          {item.name}
        </span>

        {chields}
      </li>
    );
  };
  return (
    <div className="border-e border-e-gray-300 p-6">
      <div
        className={`navbar-overlay ${isNavOpen ? "active" : ""}`}
        onClick={() => dispatch(changeNavOpen(false))}
      ></div>
      <div className={`az-sidebar ${isNavOpen ? "active" : ""}`}>
        <div className="close-container">
          <div className="close" onClick={() => dispatch(changeNavOpen(false))}>
            <IoClose />
          </div>
        </div>
        <div className="az-sidebar-header my-3 mx-3">
          <Link to="/" className="az-logo" onClick={() => dispatch(setActiveDashboard(""))}>
            <img src="/photos/logo.webp" alt="logo" />
          </Link>
        </div>
        <div className="az-sidebar-loggedin">
          <div className="az-img-user online" style={{ minWidth: 36 }}>
            <img src={user?.avatar} alt="" />
          </div>
          <div className="media-body">
            <h6 title={user?.name}>
              {(user?.name?.length ?? 0) > 23
                ? `${user.name.slice(0, 21)}...`
                : user?.name || "John Doe"}
            </h6>
            <span className="text-capitalize">{userRoleFormate[user?.role]}</span>
          </div>
        </div>
        <div className="az-sidebar-body">
          <ul className="nav ps-3">
            <li className="nav-label">Main Menu</li>
            {/* {navigationConfig(logOut)?.map((item) => renderNavItem(item))} */}
            {navigationConfig(logOut)?.map((item, ind) => (
              <React.Fragment key={ind}>{renderNavItem(item)}</React.Fragment>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
});

export default Sidebar;

Sidebar.displayName = "Navbar";
const navigationConfig = (logOut) => [
  {
    name: "Home",
    path: "/",
    icon: <TiHomeOutline />,
    authorizedRoles: ["superAdmin", "businessAdmin", "installer", "admin", "user", "public"],
  },
  {
    name: "Business",
    path: "/business",
    icon: <BiBuildingHouse />,
    authorizedRoles: ["superAdmin", "businessAdmin", "installer", "admin", "user", "public"],
    children: [
      {
        name: "All Businesses",
        path: "/business",
        authorizedRoles: ["superAdmin"],
      },
    ],
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
    name: "Site Locations",
    path: "/site-locations",
    icon: <FaLocationDot style={{ fontSize: "20px" }} />,
    authorizedRoles: ["superAdmin", "businessAdmin", "installer", "admin", "user", "public"],
    children: [
      {
        name: "All Site Locations",
        path: "/site-locations",
        authorizedRoles: ["superAdmin", "businessAdmin", "installer", "admin", "user", "public"],
      },
    ],
  },
  {
    name: "Devices",
    path: "/devices",
    icon: <MdOutlineSensors />,
    authorizedRoles: ["superAdmin", "businessAdmin", "installer", "admin", "user", "public"],
    children: [
      {
        name: "All Devices",
        path: "/devices",
        authorizedRoles: ["superAdmin", "businessAdmin", "installer", "admin", "user", "public"],
      },
      {
        name: "Manage Device Types",
        path: "/device-types",
        authorizedRoles: ["superAdmin", "businessAdmin", "installer", "admin", "user"],
      },
    ],
  },
  {
    name: "Analysis & Reporting",
    path: "/data-analysis",
    icon: <TiChartLine />,
    authorizedRoles: ["superAdmin", "businessAdmin", "installer", "admin", "user", "public"],
    children: [
      {
        name: "Data Analysis",
        path: "/data-analysis",
        authorizedRoles: ["superAdmin", "businessAdmin", "installer", "admin", "user", "public"],
      },
      {
        name: "Billing Report",
        path: "/billing-report",
        authorizedRoles: ["superAdmin", "businessAdmin", "admin"],
      },
    ],
  },
  {
    name: "Notification",
    path: "/alarm-summary",
    icon: <TiBell />,
    authorizedRoles: ["superAdmin", "businessAdmin", "admin", "user", "public"],
    children: [
      {
        name: "System Alarm Summary",
        path: "/alarm-summary",
        authorizedRoles: ["superAdmin", "businessAdmin", "admin", "user", "public"],
      },
      {
        name: "Notification Recipient List",
        path: "/recipient-list",
        authorizedRoles: ["superAdmin", "businessAdmin", "admin", "user"],
      },
      {
        name: "Alarm Trigger History",
        path: "/alarm-history",
        authorizedRoles: ["superAdmin", "businessAdmin", "admin", "user", "public"],
      },
    ],
  },
  {
    name: "Settings",
    path: "/settings",
    icon: <TiCogOutline />,
    authorizedRoles: ["superAdmin", "businessAdmin", "installer", "admin", "user", "public"],
    children: [
      {
        name: "Change Password",
        path: "/settings",
        authorizedRoles: ["superAdmin", "businessAdmin", "installer", "admin", "user", "public"],
      },
      {
        name: "Activity Log",
        path: "/activity-log",
        authorizedRoles: ["superAdmin", "businessAdmin", "installer", "admin", "user", "public"],
      },
      {
        name: "Electricity Tariff",
        path: "/electricity-tariff",
        authorizedRoles: ["superAdmin", "businessAdmin", "installer", "admin", "user", "public"],
      },
      {
        name: "Manage System Parameters",
        path: "/parameters",
        authorizedRoles: ["superAdmin", "businessAdmin", "installer", "admin"],
      },
      {
        name: "Manage Formulas",
        path: "/formulas",
        authorizedRoles: ["superAdmin", "businessAdmin", "installer", "admin"],
      },
    ],
  },
  {
    name: "Dashboard",
    path: "/dashboard-list",
    icon: <MdOutlineDashboardCustomize />,
    authorizedRoles: ["superAdmin", "businessAdmin", "admin", "user", "public"],
    children: [
      {
        name: "Dashboard List",
        path: "/dashboard-list",
        authorizedRoles: ["superAdmin", "businessAdmin", "admin", "user", "public"],
      },
      {
        name: "Assign Dashboard",
        path: "/assign-dashboard",
        authorizedRoles: ["superAdmin", "businessAdmin", "admin"],
      },
    ],
  },
  {
    name: "Custom Reports",
    path: "/report-template-list",
    icon: <HiOutlineDocumentReport />,
    authorizedRoles: ["superAdmin", "businessAdmin", "admin"],
    children: [
      {
        name: "Report Template List",
        path: "/report-template-list",
        authorizedRoles: ["superAdmin", "businessAdmin", "admin"],
      },
      {
        name: "Assign Report Template",
        path: "/assign-report-template",
        authorizedRoles: ["superAdmin", "businessAdmin"],
      },
      {
        name: "Generate Report",
        path: "/generate-report",
        authorizedRoles: ["superAdmin", "businessAdmin", "admin"],
      },
      {
        name: "Report List",
        path: "/report-list",
        authorizedRoles: ["superAdmin", "businessAdmin", "admin"],
      },
    ],
  },
  {
    name: "Subscription",
    path: "/plan-list",
    icon: <TbReportMoney />,
    authorizedRoles: ["superAdmin"],
    children: [
      {
        name: "Plan List",
        path: "/plan-list",
        authorizedRoles: ["superAdmin"],
      },
      {
        name: "Assign Plan to Business",
        path: "/assign-plan",
        authorizedRoles: ["superAdmin"],
      },
      {
        name: "Subscription Summary",
        path: "/subscription-summary",
        authorizedRoles: ["superAdmin"],
      },
    ],
  },
  {
    name: "My Subscription",
    path: "/my-subscription",
    icon: <TbReportMoney />,
    authorizedRoles: ["businessAdmin"],
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
