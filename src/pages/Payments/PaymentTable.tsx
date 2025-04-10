import CustomTable from "@/components/CustomTable";
import { useQueryParams } from "@/hooks/useQueryParams";
import { IPayment } from "@/interfaces/paymentInterface";
import { useGetPaymentsQuery } from "@/redux/api/paymentApi";
import { numberFormatter } from "@/utils/numberFormatter";
import { Spin, TableProps, Tabs } from "antd";
import dayjs from "dayjs";
import React, { useRef } from "react";
import Swal from "sweetalert2";

const PaymentTable: React.FC = () => {
  const { queryParams, setQueryParams, getNonEmptyQueryParams } = useQueryParams({ page: 1, limit: 10 });
  // rek query
  const { data, isFetching, isError } = useGetPaymentsQuery(getNonEmptyQueryParams);
  const page = Number(queryParams.page);
  const limit = Number(queryParams.limit);

  //   ref
  const sectionRefs = {
    summary: useRef<HTMLDivElement>(null),
    banking: useRef<HTMLDivElement>(null),
    donor: useRef<HTMLDivElement>(null),
  };

  if (isError) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Payment summary fetch failed",
      confirmButtonText: "OK",
      timer: 3000,
    });
  }

  const handleTabClick = (key: string) => {
    const ref = sectionRefs[key as keyof typeof sectionRefs];
    ref?.current?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
  };

  //   constants
  const paymentColumn: TableProps<IPayment>["columns"] = [
    {
      title: (
        <div className="mx-[-16px] px-[16px]" ref={sectionRefs.summary}>
          No.
        </div>
      ),
      ellipsis: true,
      dataIndex: "key",
      key: "key",
      render: (_text, _record, index) => <div> {(page - 1) * limit + (index + 1)} </div>,
      align: "center",
    },
    {
      title: "Product",
      ellipsis: true,
      dataIndex: "product",
      key: "product",
    },
    {
      title: "Donor Name",
      ellipsis: true,
      dataIndex: "donorName",
      key: "donorName",
    },
    {
      title: <div> Date of Trust Deed </div>,
      ellipsis: true,
      dataIndex: "dtd",
      key: "dtd",
      align: "center",
      render: (_, record) => dayjs(record.dateOfTrustDeed).format("DD/MM/YYYY"),
    },
    {
      title: <div> Trust Deed Expire Date </div>,
      ellipsis: true,
      dataIndex: "dtd",
      key: "dtd",
      align: "center",
      render: (_, record) => dayjs(record.trustDeedExpiryDate).format("DD/MM/YYYY"),
    },
    {
      title: "Trust Deed No",
      ellipsis: true,
      dataIndex: "trustDeedNo",
      key: "trustDeedNo",
      align: "center",
    },
    {
      title: "Reference",
      ellipsis: true,
      dataIndex: "reference",
      key: "reference",
      align: "center",
    },

    {
      title: <div className="text-center">Trust Amount (RM)</div>,
      ellipsis: true,
      dataIndex: "amount",
      key: "amount",
      render: (_, record) => <> {numberFormatter(record.trustAmount)} </>,
      align: "end",
    },

    {
      title: <div className="text-center">Payable (%)</div>,
      ellipsis: true,
      dataIndex: "interestDividendPayableToClient",
      key: "interestDividendPayableToClient",
      render: (_, record) => <> {numberFormatter(record.interestDividendPayableToClient)} </>,
      align: "end",
    },
    {
      title: <div className="text-center">Income (RM)</div>,
      ellipsis: true,
      dataIndex: "incomeForFeb2025",
      key: "incomeForFeb2025",
      render: (_, record) => <> {numberFormatter(record.income)} </>,
      align: "end",
    },

    {
      title: (
        <div className="text-center mx-[-16px] px-[16px]" ref={sectionRefs.banking}>
          Account Number
        </div>
      ),
      ellipsis: true,
      dataIndex: "accountNumber",
      key: "accountNumber",
      align: "center",
    },
    {
      title: <div className=""> Account Name </div>,
      ellipsis: true,
      dataIndex: "accountName",
      key: "accountName",
    },
    {
      title: <div className="text-center"> Bank </div>,
      ellipsis: true,
      dataIndex: "bank",
      key: "bank",
      align: "center",
    },
    {
      title: <div className="text-center">Bank Code</div>,
      ellipsis: true,
      dataIndex: "bankCode",
      key: "bankCode",
    },
    {
      title: <div className="text-center"> Payment Mode </div>,
      ellipsis: true,
      dataIndex: "paymentMode",
      key: "paymentMode",
      align: "center",
    },
    {
      title: <div className="text-center"> NRIC NO. </div>,
      ellipsis: true,
      dataIndex: "nricNo",
      key: "nricNo",
      align: "center",
    },

    {
      title: (
        <div className="mx-[-16px] px-[16px]" ref={sectionRefs.donor}>
          Name
        </div>
      ),
      ellipsis: true,
      dataIndex: "name",
      key: "name",
    },
    {
      title: <div className="text-center"> NRIC/Passport No. </div>,
      ellipsis: true,
      dataIndex: "nricPassportNo",
      key: "nricPassportNo",
      align: "center",
    },
    {
      title: <div className="text-center"> Mobile No. </div>,
      ellipsis: true,
      dataIndex: "mobileNo",
      key: "mobileNo",
      align: "center",
    },
    {
      title: <div className=""> Email Address </div>,
      ellipsis: true,
      dataIndex: "emailAddress",
      key: "emailAddress",
    },
    {
      title: <div className="text-center">Uploaded Date</div>,
      ellipsis: true,
      dataIndex: "date",
      key: "date",
      render: (_, record) => <> {dayjs(record.createdAt).format("DD/MM/YYYY hh:mm:ss")} </>,
      align: "center",
    },
  ];

  return (
    <Spin spinning={isFetching}>
      <div className="my-3">
        <Tabs defaultActiveKey="1" items={tabItems} onTabClick={handleTabClick} />
      </div>
      <CustomTable
        data={data?.data || []}
        columns={paymentColumn}
        total={data?.meta?.total || 0}
        query={queryParams}
        setQuery={setQueryParams}
      />
    </Spin>
  );
};

export default PaymentTable;

const tabItems = [
  {
    label: "Summary",
    key: "summary",
  },
  {
    label: "Banking Account Details",
    key: "banking",
  },
  {
    label: "Donor Details",
    key: "donor",
  },
  // {
  //   label: "Advice Details",
  //   key: "advice",
  // },
];
