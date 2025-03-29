/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { userRole } from "@/constant/userRole";
import { useAppSelector } from "@/redux/store";
import { useState } from "react";
import { Link } from "react-router-dom";
import { DashboardCount } from "./DashboardCount";
import HomeTable from "./HomeTable";

const Home:React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);

  // states
  const [dashboardCounter, setDashboardCounter] = useState<Record<string, any>>({});
  const [alarmCounter, setAlarmCounter] = useState<Record<string, any>>({
    totalAcknowledged: 0,
    totalAlarm: 0,
    totalTriggeredAlarm: 0,
  });
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  return (
    <>
      <div className="grid grid-cols-10 gap-4">
        {mainCounters?.map(({ entryName, url, roles, ...rest }, idx) => {
          return (
            roles.includes(user?.role) && (
              <div className="col-span-5 sm:col-span-3 md:col-span-2" key={idx}>
                <div>
                  <Link to={url as string}>
                    <DashboardCount
                      {...rest}
                      bg="bg-blue-50 dark:bg-slate-900"
                      count={dashboardCounter?.[entryName] || 0}
                    />
                  </Link>
                </div>
              </div>
            )
          );
        })}
      </div>

      <div>
        {user?.role !== userRole?.installer && (
          <div className="">
            <div className="flex items-center justify-between my-5">
              <h5 style={{ marginBottom: "-8px" }}>Alarm Summary</h5>
            </div>
            <div className="grid grid-cols-12 gap-4">
              {alarmSummaryCounters?.map(({ entryName, url, ...rest }) => {
                let params = url;
                if (startDate) {
                  params = `${url}&startDate=${startDate}&endDate=${endDate}`;
                }
                return (
                  <div className="col-span-6 md:col-span-4" key={entryName}>
                    {alarmCounter?.[entryName] === 0 ? (
                      <DashboardCount {...rest} count={alarmCounter?.[entryName]} bg="bg-gray-200 dark:bg-slate-900" />
                    ) : (
                      <Link to={params}>
                        <DashboardCount
                          {...rest}
                          count={alarmCounter?.[entryName]}
                          bg="bg-gray-200 dark:bg-slate-900"
                        />
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="mt-8">
        <HomeTable />
      </div>
    </>
  );
};

export default Home;

const mainCounters: { title: string; bg: string; entryName: string; roles: string[]; url: string }[] = [
  {
    title: "Site Locations",
    bg: "var(--dashboard-layout)",
    entryName: "locationCount",
    roles: ["user", "public", "superAdmin", "businessAdmin", "admin"],
    url: "/site-locations",
  },
  {
    title: "All Site Admins",
    bg: "var(--dashboard-layout)",
    entryName: "adminCount",
    roles: ["businessAdmin", "superAdmin"],
    url: "/users?role=admin",
  },
  {
    title: "All Site Users",
    bg: "var(--dashboard-layout)",
    entryName: "userCount",
    roles: ["superAdmin", "businessAdmin", "admin"],
    url: "/users?role=user",
  },
  {
    title: "Devices",
    bg: "var(--dashboard-layout)",
    entryName: "deviceCount",
    roles: ["user", "public", "superAdmin", "businessAdmin", "admin"],
    url: "/devices",
  },
  {
    title: "Offline Devices",
    bg: "var(--dashboard-layout)",
    entryName: "inactiveSensors",
    roles: ["user", "public", "superAdmin", "businessAdmin", "admin"],
    url: "/devices?status=inactive",
  },
];

const alarmSummaryCounters = [
  {
    title: "Total Alarms",
    entryName: "totalAlarm",
    url: "/alarm-summary?",
  },
  {
    title: "Total Triggered Alarms",
    entryName: "totalTriggeredAlarm",
    url: "/alarm-history?",
  },
  {
    title: "Total Alarms Acknowledged",
    entryName: "totalAcknowledged",
    url: "/alarm-history?acknowledged=true",
  },
];
