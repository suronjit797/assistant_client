import { useAppSelector } from "@/redux/store";
import { numberFormatter } from "@/utils/numberFormatter";
import React from "react";

interface Props {
  count: number;
  title: string;
  bg: string;
  decimalCount?:number
}

export const DashboardCount: React.FC<Props> = ({ count, title, bg, decimalCount=2 }) => {
  const { isDark } = useAppSelector((state) => state.theme);

  return (
    <div className={`w-full p-3 md:p-6 h-full ${bg} rounded-md ${!isDark && "text-black text-sm md:text-xl "}`}>
      <div
        style={{
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        {numberFormatter(count, decimalCount)}
      </div>
      <div
        style={{
          fontWeight: "500",
          textAlign: "center",
        }}
        className="text-xs md:td:sm"
      >
        {title}
      </div>
    </div>
  );
};
