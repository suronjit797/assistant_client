import { Card, Statistic } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined, WalletOutlined, RiseOutlined, FallOutlined } from "@ant-design/icons";

interface SummaryItem {
  label: string;
  value: number;
  type: "credit" | "debit";
}

interface SummaryCardProps {
  title: string;
  subtitle?: string;
  items: SummaryItem[];
  totalCredit: number;
  totalDebit: number;
  cash: number;
}

export const SummaryCard = ({ title, subtitle, items, totalCredit, totalDebit, cash }: SummaryCardProps) => {
  const creditItems = items.filter((item) => item.type === "credit");
  const debitItems = items.filter((item) => item.type === "debit");

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US").format(value);
  };

  return (
    <Card
      className="shadow-card hover:shadow-card-hover transition-shadow duration-300 border-0 rounded-2xl"
      styles={{ body: { padding: "24px" } }}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          {subtitle && <p className="text-sm text-gray-700 font-light mt-0.5">{subtitle}</p>}
        </div>

        <div className="size-10 rounded-full bg-teal-50 text-teal-500 text-lg flex items-center justify-center">
          <WalletOutlined />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="space-y-3">
          <div className="flex items-center gap-1.5 text-xs text-gray-700 font-light uppercase tracking-wide">
            <span className="text-green-500">
              <RiseOutlined />
            </span>
            Credits
          </div>

          <div className="space-y-2">
            {creditItems.map((item) => (
              <div key={item.label} className="flex justify-between items-center">
                <span className="text-sm text-gray-700 font-light">{item.label}</span>
                <span className="text-sm font-medium tabular-nums text-foreground">
                  {formatCurrency(Number(item.value) || 0)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-1.5 text-xs font-medium text-gray-700  uppercase tracking-wide">
            <span className="text-red-600">
              <FallOutlined />
            </span>
            Debits
          </div>

          <div className="space-y-2">
            {debitItems.map((item) => (
              <div key={item.label} className="flex justify-between items-center">
                <span className="text-sm text-gray-700 font-light">{item.label}</span>
                <span className="text-sm font-medium tabular-nums text-foreground">
                  {formatCurrency(Number(item.value) || 0)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-300">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 rounded-xl bg-green-500/[0.1]">
            <Statistic
              title={
                <span className="flex items-center justify-center gap-1 text-green-500 text-xs">
                  <ArrowUpOutlined /> Total Credit
                </span>
              }
              value={totalCredit}
              valueStyle={{
                color: "hsl(var(--success))",
                fontSize: "18px",
                fontWeight: 700,
              }}
              formatter={(value) => <span className="text-green-500"> {formatCurrency(Number(value || 0))} </span>}
            />
          </div>

          <div className="text-center p-3 rounded-xl bg-red-500/[0.1]">
            <Statistic
              title={
                <span className="flex items-center justify-center gap-1 text-red-600 text-xs">
                  <ArrowDownOutlined /> Total Debit
                </span>
              }
              value={totalDebit}
              valueStyle={{
                fontSize: "18px",
                fontWeight: 700,
              }}
              formatter={(value) => <span className="text-red-600">{formatCurrency(Number(value))}</span>}
            />
          </div>

          <div className="text-center p-3 rounded-xl bg-teal-500/[0.1]">
            <Statistic
              title={
                <span className="flex items-center justify-center gap-1 text-teal-500 text-xs">
                  <WalletOutlined /> Cash
                </span>
              }
              value={cash}
              valueStyle={{
                color: "hsl(var(--primary))",
                fontSize: "18px",
                fontWeight: 700,
              }}
              formatter={(value) => <span className="text-teal-500">{formatCurrency(Number(value))}</span>}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};
