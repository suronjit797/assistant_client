import { Button, DatePicker, Dropdown, Input, Modal } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useRef, useState } from "react";
import { BiSearch, BiX, BiZoomOut } from "react-icons/bi";
import { FiClock } from "react-icons/fi";

interface QuickTimeOption {
  label: string;
  value: number;
  durationType: "minute" | "hour" | "day" | "month";
}

interface AlarmTimeFilterProps {
  getAlarmCounter: (params?: { startDate?: string; endDate?: string }) => void;
}

const quickTimeOptions: QuickTimeOption[] = [
  { label: "Last 5 minutes", value: 5, durationType: "minute" },
  { label: "Last 15 minutes", value: 15, durationType: "minute" },
  { label: "Last 30 minutes", value: 30, durationType: "minute" },
  { label: "Last 1 hour", value: 1, durationType: "hour" },
  { label: "Last 3 hours", value: 3, durationType: "hour" },
  { label: "Last 6 hours", value: 6, durationType: "hour" },
  { label: "Last 12 hours", value: 12, durationType: "hour" },
  { label: "Last 24 hours", value: 24, durationType: "hour" },
  { label: "Last 2 days", value: 2, durationType: "day" },
  { label: "Last 3 days", value: 3, durationType: "day" },
  { label: "Last 7 days", value: 7, durationType: "day" },
  { label: "Last 30 days", value: 30, durationType: "day" },
  { label: "Last 3 months", value: 3, durationType: "month" },
  { label: "Last 6 months", value: 6, durationType: "month" },
  { label: "Last 12 months", value: 12, durationType: "month" },
];

export const AlarmTimeFilter: React.FC<AlarmTimeFilterProps> = ({ getAlarmCounter }) => {
  const ref = useRef<HTMLDivElement>(null);
  const timeInputRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(null);
  const [endDate, setEndDate] = useState<dayjs.Dayjs | null>(null);
  const [startDateShow, setStartDateShow] = useState("");
  const [endDateShow, setEndDateShow] = useState("");
  const [quickStartDate, setQuickStartDate] = useState("");
  const [quickEndDate, setQuickEndDate] = useState("");
  const [xAxis, setXAxis] = useState<"minute" | "hour" | "day" | "month">("day");

  const [timeOptions, setTimeOptions] = useState<QuickTimeOption[]>(quickTimeOptions);

  const onSearchTimeOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = quickTimeOptions.filter((tm) => tm.label.toLowerCase().includes(e.target.value.toLowerCase()));
    setTimeOptions(search);
  };

  const onApply = () => {
    if (!startDate || !endDate) return;
    setOpen(false);
    const firstDate = startDate.format("YYYY/MM/DD HH:mm");
    const lastDate = endDate.format("YYYY/MM/DD HH:mm");

    getAlarmCounter({ startDate: firstDate, endDate: lastDate });

    setStartDateShow(firstDate);
    setEndDateShow(lastDate);
    setQuickStartDate("");
    setQuickEndDate("");
    setXAxis("day");
  };

  const onSelectQuickTimer = ({ value, durationType }: QuickTimeOption) => {
    const firstDate = dayjs().subtract(value, durationType).format("YYYY/MM/DD HH:mm");
    const lastDate = dayjs().format("YYYY/MM/DD HH:mm");

    getAlarmCounter({ startDate: firstDate, endDate: lastDate });

    setStartDate(null);
    setEndDate(null);
    setStartDateShow("");
    setEndDateShow("");
    setQuickStartDate(firstDate);
    setQuickEndDate(lastDate);
    setXAxis(durationType);
    setOpen(false);
  };

  const handleClear = () => {
    setStartDate(null);
    setEndDate(null);
    setStartDateShow("");
    setEndDateShow("");
    setXAxis("day");
    setQuickStartDate("");
    setQuickEndDate("");
    getAlarmCounter();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (timeInputRef.current && !timeInputRef.current.contains(event.target as Node)) {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          setOpen(false);
        }
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="flex items-center mb-2">
      {(startDateShow || quickStartDate) && (
        <div className="mr-2 bg-red-500 text-white text-lg px-2 rounded cursor-pointer" onClick={handleClear}>
          <BiX />
        </div>
      )}
      <div ref={ref} className="flex items-center bg-gray-200 rounded-lg">
        <Dropdown
          open={open}
          onOpenChange={setOpen}
          overlay={
            <div className="p-4 bg-white rounded shadow-lg w-96">
              <Modal.Header closeButton onClick={() => setOpen(false)} />
              <h6 className="mb-2">Select Time Range</h6>
              <DatePicker
                value={startDate}
                onChange={setStartDate}
                disabledDate={(current) => current && current.isAfter(dayjs())}
                className="w-full mb-2"
              />
              <DatePicker
                value={endDate}
                onChange={setEndDate}
                disabled={!startDate}
                disabledDate={(current) =>
                  startDate && current && (current.isBefore(startDate) || current.isAfter(dayjs()))
                }
                className="w-full mb-2"
              />
              <Button disabled={!startDate || !endDate} type="primary" onClick={onApply} className="w-full">
                Apply
              </Button>
              <Input
                placeholder="Search quick ranges"
                prefix={<BiSearch />}
                onChange={onSearchTimeOption}
                className="mt-4"
              />
              <div className="mt-2">
                {timeOptions.map((time) => (
                  <Button
                    key={time.label}
                    type="text"
                    onClick={() => onSelectQuickTimer(time)}
                    className="block w-full text-left"
                  >
                    {time.label}
                  </Button>
                ))}
              </div>
            </div>
          }
        >
          <div
            className="flex items-center p-2 cursor-pointer bg-gray-100 rounded-lg border"
            onClick={() => setOpen(!open)}
          >
            <FiClock className="mr-2" />
            <span>{startDateShow || quickStartDate || "Last 7 Days"}</span>
          </div>
        </Dropdown>
        <button className="ml-2 text-gray-600 hover:text-gray-900" onClick={handleClear}>
          <BiZoomOut />
        </button>
      </div>
    </div>
  );
};

export default AlarmTimeFilter;
