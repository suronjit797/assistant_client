import { transactionsTypes } from "@/constant/constants";
import { Card } from "antd";
import dayjs from "dayjs";
import React from "react";

type Props = {
  allTime: Record<string, number>;
  monthly: Record<string, number>;
  month?: number;
  year?: string | number;
};

const creditTypes = ["income", "take", "withdraw"];
const debitTypes = ["expense", "give", "save"];

const getTotalByTypeGroup = (totals: Record<string, number>, types: string[]): number => {
  return types.reduce((sum, type) => sum + (totals[type] || 0), 0);
};

const TransactionSummaryCards: React.FC<Props> = ({
  allTime,
  monthly,
  month = new Date().getMonth(),
  year = new Date().getFullYear(),
}) => {
  return (
    <div className="grid  sm:grid-cols-1 md:grid-cols-2 gap-x-4">
      <Card className="shadow-md border " title="All Time">
        <div className="grid  sm:grid-cols-1 md:grid-cols-2 gap-x-4">
          {transactionsTypes.map((type) => (
            <div key={`all-time-${type}`}>
              <span className="capitalize inline-block w-20">{type}</span> <span className="inline-block px-3">:</span>
              {allTime[type] || 0}
            </div>
          ))}
        </div>
        <div className="grid  sm:grid-cols-1 md:grid-cols-2 gap-x-4 font-bold mt-3">
          <div>
            <span className="capitalize inline-block w-21">Total Credit</span>
            <span className="inline-block px-3">:</span> {getTotalByTypeGroup(allTime, creditTypes)}
          </div>
          <div>
            <span className="capitalize inline-block w-21">Total Debit</span>
            <span className="inline-block px-3">:</span> {getTotalByTypeGroup(allTime, debitTypes)}
          </div>
          <div>
            <span className="capitalize inline-block w-21">Cash</span>
            <span className="inline-block px-3">:</span>{" "}
            {getTotalByTypeGroup(allTime, creditTypes) - getTotalByTypeGroup(allTime, debitTypes)}
          </div>
        </div>
      </Card>

      <Card
        className="shadow-md border"
        title={`Monthly (${dayjs()
          .month(month - 1)
          .format("MMMM")}, ${year})`}
      >
        <div className="grid  sm:grid-cols-1 md:grid-cols-2 gap-x-4">
          {transactionsTypes.map((type) => (
            <div key={`monthly-${type}`}>
              <span className="capitalize inline-block w-20">{type}</span> <span className="inline-block px-3">:</span>
              {monthly[type] || 0}
            </div>
          ))}
        </div>

        <div className="grid  sm:grid-cols-1 md:grid-cols-2 gap-x-4 mt-3 font-bold">
          <div>
            <span className="capitalize inline-block w-21">Total Credit</span>
            <span className="inline-block px-3">:</span> {getTotalByTypeGroup(monthly, creditTypes)}
          </div>
          <div>
            <span className="capitalize inline-block w-21">Total Debit</span>
            <span className="inline-block px-3">:</span> {getTotalByTypeGroup(monthly, debitTypes)}
          </div>
          <div>
            <span className="capitalize inline-block w-21">Cash</span>
            <span className="inline-block px-3">:</span>{" "}
            {getTotalByTypeGroup(monthly, creditTypes) - getTotalByTypeGroup(monthly, debitTypes)}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TransactionSummaryCards;
