import CustomTable from "@/components/CustomTable";
import PageHeader from "@/components/PageHeader";
import { IPayment } from "@/interfaces/paymentInterface";
import { useGetPaymentsQuery } from "@/redux/api/paymentApi";
import { Button, Spin, TableProps } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
import { IoTrashBin } from "react-icons/io5";
import Swal from "sweetalert2";

const PaymentSummary: React.FC = () => {
  // states
  const [query, setQuery] = useState<Record<string, unknown>>({
    page: 1,
    limit: 10,
  });

  // rek query
  const { data, isFetching, isError } = useGetPaymentsQuery(query);

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
      <CustomTable
        data={data?.data || []}
        columns={column}
        total={data?.meta?.total || 0}
        query={query}
        setQuery={setQuery}
      />
    </Spin>
  );
};

export default PaymentSummary;

const column: TableProps<IPayment>["columns"] = [
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
