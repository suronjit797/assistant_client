import PageHeader from "@/components/PageHeader";
import { Button, Spin, TableProps } from "antd";
import React, { useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import ManualReconciliationCvsModal from "./ManualReconciliationCvsModal";
import { useUploadPaymentCsvMutation } from "@/redux/api/paymentApi";
import Swal from "sweetalert2";
import CustomTable from "@/components/CustomTable";
import { numberFormatter } from "@/utils/numberFormatter";
import { IPayment } from "@/interfaces/paymentInterface";
import dayjs from "dayjs";

const ManualReconciliation: React.FC = () => {
  const [cvsModal, setCvsModal] = useState(false);
  const [uploadCsv, { error, isLoading, data }] = useUploadPaymentCsvMutation();

  if (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Something went wrong while uploading the file.",
      confirmButtonText: "OK",
      timer: 3000,
    });
  }

  console.log({ data });

  return (
    <div>
      <PageHeader title="Payments" subTitle="Manual Reconciliation">
        <div className="ms-auto">
          <Button onClick={() => setCvsModal((prev) => !prev)} icon={<FiUploadCloud />} type="primary">
            Bulk CSV Upload
          </Button>
        </div>
      </PageHeader>

      <Spin spinning={isLoading}>
        <CustomTable data={data?.data || []} columns={column} />,
        <ManualReconciliationCvsModal modal={cvsModal} setModal={setCvsModal} uploadCsv={uploadCsv} />
      </Spin>
    </div>
  );
};

export default ManualReconciliation;

const column: TableProps<IPayment>["columns"] = [
  {
    title: "No.",
    dataIndex: "key",
    key: "key",
    render: (_text, _record, index) => index + 1,
    align: "center",
  },
  {
    title: "Product",
    dataIndex: "product",
    key: "product",
  },
  {
    title: "Donor Name",
    dataIndex: "donorName",
    key: "donorName",
  },
  {
    title: "Date of Trust Deed",
    dataIndex: "dtd",
    key: "dtd",
    align: "center",
    render: (_, record) => dayjs(record.dateOfTrustDeed).format("DD/MM/YYYY"),
  },
  {
    title: "Trust Deed No",
    dataIndex: "trustDeedNo",
    key: "trustDeedNo",
    align: "center",
  },
  {
    title: "Reference",
    dataIndex: "reference",
    key: "reference",
    align: "center",
  },

  {
    title: <div className="text-center">Trust Amount (RM)</div>,
    dataIndex: "amount",
    key: "amount",
    render: (_, record) => <> {numberFormatter(record.trustAmount)} </>,
    align: "end",
  },

  {
    title: <div className="text-center">Payable (%)</div>,
    dataIndex: "interestDividendPayableToClient",
    key: "interestDividendPayableToClient",
    render: (_, record) => <> {numberFormatter(record.interestDividendPayableToClient)} </>,
    align: "end",
  },
  {
    title: <div className="text-center">Income (RM)</div>,
    dataIndex: "incomeForFeb2025",
    key: "incomeForFeb2025",
    render: (_, record) => <> {numberFormatter(record.incomeForFeb2025)} </>,
    align: "end",
  },

  {
    title: <div className="text-center"> Account Number </div>,
    dataIndex: "accountNumber",
    key: "accountNumber",
    align: "center",
  },
  {
    title: <div className=""> Account Name </div>,
    dataIndex: "accountName",
    key: "accountName",
  },
  {
    title: <div className="text-center"> Bank </div>,
    dataIndex: "bank",
    key: "bank",
    align: "center",
  },
  {
    title: <div className="text-center"> Bank Code </div>,
    dataIndex: "bankCode",
    key: "bankCode",
  },
  {
    title: <div className="text-center"> Payment Mode </div>,
    dataIndex: "paymentMode",
    key: "paymentMode",
    align: "center",
  },
  {
    title: <div className="text-center"> Name </div>,
    dataIndex: "name",
    key: "name",
    align: "center",
  },
  {
    title: <div className="text-center"> NRIC NO. </div>,
    dataIndex: "nricNo",
    key: "nricNo",
    align: "center",
  },

  {
    title: <div className=""> Name </div>,
    dataIndex: "name",
    key: "name",
  },
  {
    title: <div className="text-center"> NRIC/Passport No. </div>,
    dataIndex: "nricPassportNo",
    key: "nricPassportNo",
    align: "center",
  },
  {
    title: <div className="text-center"> Mobile No. </div>,
    dataIndex: "mobileNo",
    key: "mobileNo",
    align: "center",
  },
  {
    title: <div className=""> Email Address </div>,
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
