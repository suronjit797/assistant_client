import CustomTable from "@/components/CustomTable";
import PageHeader from "@/components/PageHeader";
import { IPayment } from "@/interfaces/paymentInterface";
import { useUploadPaymentCsvMutation } from "@/redux/api/paymentApi";
import { numberFormatter } from "@/utils/numberFormatter";
import { Button, Spin, TableProps, Tabs } from "antd";
import dayjs from "dayjs";
import React, { useRef, useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import Swal from "sweetalert2";
import ManualReconciliationCvsModal from "./ManualReconciliationCvsModal";

const ManualReconciliation: React.FC = () => {
  const [cvsModal, setCvsModal] = useState(false);
  const [uploadCsv, { error, isLoading, data }] = useUploadPaymentCsvMutation();

  const sectionRefs = {
    summary: useRef<HTMLDivElement>(null),
    banking: useRef<HTMLDivElement>(null),
    donor: useRef<HTMLDivElement>(null),
    advice: useRef<HTMLDivElement>(null),
  };

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
      title: <div ref={sectionRefs.summary}> Date of Trust Deed </div>,
      ellipsis: true,
      dataIndex: "dtd",
      key: "dtd",
      align: "center",
      render: (_, record) => dayjs(record.dateOfTrustDeed).format("DD/MM/YYYY"),
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
      title: (
        <div className="text-center" ref={sectionRefs.banking}>
          Income (RM)
        </div>
      ),
      ellipsis: true,
      dataIndex: "incomeForFeb2025",
      key: "incomeForFeb2025",
      render: (_, record) => <> {numberFormatter(record.incomeForFeb2025)} </>,
      align: "end",
    },

    {
      title: <div className="text-center"> Account Number </div>,
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
      title: <div className="text-center"  ref={sectionRefs.donor}>Bank Code</div>,
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
      title: <div> Name </div>,
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
      title: <div className="text-center"  ref={sectionRefs.advice}> Mobile No. </div>,
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

    // {
    //   title: "Action",
    //   key: "action",
    //   render: (_, record) => (
    //     <Space size="middle" style={{columnGap: 8}}>
    //       <Button type="primary" title="Advise Details" icon={<FaRegLightbulb />} onClick={() => handleAdvice(record)}></Button>
    //       <Button
    //         type="default"
    //         color="blue"
    //         variant="outlined"
    //         title="Banking Details"
    //         icon={<BankOutlined />}
    //         onClick={() => handleBankingDetails(record)}
    //       ></Button>
    //       <Button
    //         color="default"
    //         variant="outlined"
    //         type="default"
    //         title="Donor Details"
    //         icon={<UserOutlined />}
    //         onClick={() => handleDonorDetails(record)}
    //       ></Button>
    //     </Space>
    //   ),
    //   align: "center",
    // },
  ];

  if (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Something went wrong while uploading the file.",
      confirmButtonText: "OK",
      timer: 3000,
    });
  }
  const handleTabClick = (key: string) => {
    const ref = sectionRefs[key as keyof typeof sectionRefs];
    ref?.current?.scrollIntoView({ behavior: "smooth", block: "start", inline: "center" });
  };

  return (
    <div>
      <PageHeader title="Payments" subTitle="Manual Reconciliation">
        <div className="ms-auto">
          <Button onClick={() => setCvsModal((prev) => !prev)} icon={<FiUploadCloud />} type="primary">
            Bulk CSV Upload
          </Button>
        </div>
      </PageHeader>
      <a href="#name">click</a>

      <Spin spinning={isLoading}>
        <div className="mb-3">
          <Tabs defaultActiveKey="1" items={tabItems} onTabClick={handleTabClick} />
        </div>
        <CustomTable data={data?.data || []} columns={column} />,
        <ManualReconciliationCvsModal modal={cvsModal} setModal={setCvsModal} uploadCsv={uploadCsv} />
      </Spin>
    </div>
  );
};

export default ManualReconciliation;

// tab data
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
  {
    label: "Advice Details",
    key: "advice",
  },
];
