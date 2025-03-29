/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { userRole } from "@/constant/userRole";
import { useAppSelector } from "@/redux/store";
import { useState } from "react";
import { Link } from "react-router-dom";
import { DashboardCount } from "./DashboardCount";
import HomeTable from "./HomeTable";
import { DatePicker } from "antd";
import dayjs from "dayjs";

const Home: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);

  // states
  const [dashboardCounter, setDashboardCounter] = useState<Record<string, any>>({
    donors: 394,
    branches: 84,
    products: 12,
    banks: 23,
    agents: 84,
  });
  const [earningCounter, setEarningCounter] = useState<Record<string, any>>({
    totalTrustAmount: 204482203.03,
    totalPayout: 133324999.24,
    totalIncome: 71157203.79,
  });
  const [selectedMonth, setSelectedMonth] = useState(dayjs());
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
              <h5 style={{ marginBottom: "-8px" }}>
                <label htmlFor="date">Total Earnings ( {selectedMonth.format("MMM YYYY")} )</label>
                <DatePicker
                  id="date"
                  className="opacity-0 -z-10"
                  format="MMM YYYY"
                  onChange={(date) => setSelectedMonth(date)}
                  picker="month"
                />
              </h5>
            </div>
            <div className="grid grid-cols-12 gap-4">
              {earningSummaryCounters?.map(({ entryName, url, ...rest }) => {
                let params = url;
                if (startDate) {
                  params = `${url}&startDate=${startDate}&endDate=${endDate}`;
                }
                return (
                  <div className="col-span-6 md:col-span-4" key={entryName}>
                    {earningCounter?.[entryName] === 0 ? (
                      <DashboardCount
                        {...rest}
                        count={earningCounter?.[entryName]}
                        bg="bg-gray-200 dark:bg-slate-900"
                      />
                    ) : (
                      <Link to={params}>
                        <DashboardCount
                          {...rest}
                          count={earningCounter?.[entryName]}
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
    title: "Total Donors",
    bg: "var(--dashboard-layout)",
    entryName: "donors",
    roles: ["user", "public", "superAdmin", "businessAdmin", "admin"],
    url: "/",
  },
  {
    title: "Total Branches",
    bg: "var(--dashboard-layout)",
    entryName: "branches",
    roles: ["businessAdmin", "superAdmin"],
    url: "/",
  },
  {
    title: "Total Products",
    bg: "var(--dashboard-layout)",
    entryName: "products",
    roles: ["superAdmin", "businessAdmin", "admin"],
    url: "/",
  },
  {
    title: "Total Banks",
    bg: "var(--dashboard-layout)",
    entryName: "banks",
    roles: ["user", "public", "superAdmin", "businessAdmin", "admin"],
    url: "/",
  },
  {
    title: "Total Agents",
    bg: "var(--dashboard-layout)",
    entryName: "agents",
    roles: ["user", "public", "superAdmin", "businessAdmin", "admin"],
    url: "/",
  },
];

const earningSummaryCounters = [
  {
    title: "Total Trust Amount",
    entryName: "totalTrustAmount",
    url: "/",
  },
  {
    title: "Total Payout",
    entryName: "totalPayout",
    url: "/",
  },
  {
    title: "Total Income",
    entryName: "totalIncome",
    url: "/",
  },
];
