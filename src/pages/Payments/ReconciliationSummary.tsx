import CustomTable from "@/components/CustomTable";
import PageHeader from "@/components/PageHeader";
import { IPaymentHistory } from "@/interfaces/paymentInterface";
import { useGetPaymentHQuery } from "@/redux/api/paymentHistoryApi";
import { Button, Spin, TableProps } from "antd";
import dayjs from "dayjs";
import React from "react";
import { IoTrashBin } from "react-icons/io5";
import Swal from "sweetalert2";

const ReconciliationSummary: React.FC = () => {
  const { data, isFetching, isError } = useGetPaymentHQuery(undefined);

  console.log("Query triggered"); // ← This should print
  console.log("Data", data); // ← This should show data or undefined

  if (isError) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Payment summary fetch failed",
      confirmButtonText: "OK",
      timer: 3000,
    });
  }
  return (
    <Spin spinning={isFetching}>
      <PageHeader title="Payments" subTitle="Reconciliation Summary" />
      <CustomTable data={data?.data || []} columns={column} />,
    </Spin>
  );
};

export default ReconciliationSummary;

const column: TableProps<IPaymentHistory>["columns"] = [
  {
    title: "No.",
    ellipsis: true,
    dataIndex: "key",
    key: "key",
    render: (_text, _record, index) => <div> {index + 1} </div>,
    align: "center",
  },

  {
    title: <div className="text-center">Date</div>,
    ellipsis: true,
    dataIndex: "date",
    key: "date",
    render: (_, record) => <> {dayjs(record.createdAt).format("DD/MM/YYYY hh:mm:ss")} </>,
    align: "center",
  },

  {
    title: <div className="text-center">Type</div>,
    ellipsis: true,
    dataIndex: "type",
    key: "type",
    render: (_, record) => <> {record.type === "auto" ? "Automatic" : "Manual"} </>,
    align: "center",
  },

  {
    title: <div className="text-center">Performed By</div>,
    ellipsis: true,
    dataIndex: "user",
    key: "user",
    render: (_, record) => <> {record.user} </>,
    align: "start",
  },

  {
    title: <div className="text-center">Bank</div>,
    ellipsis: true,
    dataIndex: "bank",
    key: "bank",
    render: () => <> {"Maybank"} </>,
    align: "center",
  },

  {
    title: <div className="text-center">Action</div>,
    ellipsis: true,
    render: () => (
      <>
        <Button danger type="primary" disabled>
          <IoTrashBin />
        </Button>
      </>
    ),
    align: "end",
  },
];
