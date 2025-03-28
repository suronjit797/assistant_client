import { useAppSelector } from "@/redux/store";
import { numberFormatter } from "@/utils/numberFormatter";
import React from "react";

interface Props {
  count: number;
  title: string;
  bg: string;
}

export const DashboardCount: React.FC<Props> = ({ count, title, bg }) => {
  const { isDark } = useAppSelector((state) => state.theme);

  return (
    <div className={`w-full p-6 h-full ${bg} rounded-md ${!isDark && "text-black"}`}>
      <div
        style={{
          fontSize: "32px",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        {numberFormatter(count, 0)}
      </div>
      <div
        style={{
          fontSize: "14px",
          fontWeight: "500",
          textAlign: "center",
        }}
      >
        {title}
      </div>
    </div>
  );
};
