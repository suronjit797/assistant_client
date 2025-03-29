import CustomTable from "@/components/CustomTable";
import { numberFormatter } from "@/utils/numberFormatter";
import type { TableProps } from "antd";
import { Tabs } from "antd";
import React, { useState } from "react";

const HomeTable: React.FC = () => {
  // states
  const [tab, setTab] = useState("summary");

  const tabValues = {
    summary: <CustomTable data={summaryData} columns={summaryColumn} />,
    banking: <CustomTable data={bankingData} columns={bankingColumn} />,
    donor: <CustomTable data={donorData} columns={donorColumns} />,
    advice: <CustomTable data={adviceData} columns={adviceColumns} />,
  };

  return (
    <div>
      <div className="mb-3">
        <Tabs defaultActiveKey="1" items={tabItems} activeKey={tab} onChange={(key) => setTab(key)} />
      </div>

      {tabValues[tab]}
      {/* <CustomTable data={summaryData} columns={summaryColumn} /> */}
    </div>
  );
};

export default HomeTable;

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

// summary
interface SummaryDataType {
  key: string;
  product: string;
  donarName: string;
  dtd: string;
  expiryDate: string;
  tdn: string;
  ref: string;
  amount: number;
  payable: number;
  income: number;
}

const summaryData: SummaryDataType[] = [
  {
    key: "1",
    product: "Education Trust",
    donarName: "TAN MENG FAR",
    dtd: "16/02/2022",
    expiryDate: "16/02/2025",
    tdn: "EDT02217",
    ref: "2-9-43590-5-1",
    amount: 30000.0,
    payable: 19.5,
    income: 5850.0,
  },
  {
    key: "2",
    product: "Cash Trust",
    donarName: "WONG SIEW YING",
    dtd: "04/02/2022",
    expiryDate: "04/02/2025",
    tdn: "CT31023",
    ref: "2-2-43492-5-1",
    amount: 100000.0,
    payable: 6.0,
    income: 6000.0,
  },
  {
    key: "3",
    product: "Cash Trust III",
    donarName: "KOPERASI DIDIK BERHAD",
    dtd: "28/02/2024",
    expiryDate: "28/02/2027",
    tdn: "CTIII150251",
    ref: "2-24-98199-2-2",
    amount: 3340000.0,
    payable: 7.0,
    income: 233800.0,
  },
  {
    key: "4",
    product: "Liquidity Trust",
    donarName: "LOW YOKE SHIM @ LAN YOKE SHIM",
    dtd: "15/08/2022",
    expiryDate: "15/08/2025",
    tdn: "LQT111298",
    ref: "2-17-60390-1-1",
    amount: 100000.0,
    payable: 3.25,
    income: 3250.0,
  },
];

const summaryColumn: TableProps<SummaryDataType>["columns"] = [
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
    dataIndex: "donarName",
    key: "donarName",
  },
  {
    title: "Date of Trust Deed",
    dataIndex: "dtd",
    key: "dtd",
    align: "center",
  },
  {
    title: "Trust Deed No",
    dataIndex: "tdn",
    key: "tdn",
    align: "center",
  },
  {
    title: "Reference",
    dataIndex: "ref",
    key: "ref",
    align: "center",
  },

  {
    title: <div className="text-center">Trust Amount (RM)</div>,
    dataIndex: "amount",
    key: "amount",
    render: (_, record) => <> {numberFormatter(record.amount)} </>,
    align: "end",
  },

  {
    title: <div className="text-center">Payable (%)</div>,
    dataIndex: "amount",
    key: "amount",
    render: (_, record) => <> {numberFormatter(record.payable)} </>,
    align: "end",
  },
  {
    title: <div className="text-center">Income (RM)</div>,
    dataIndex: "amount",
    key: "amount",
    render: (_, record) => <> {numberFormatter(record.income)} </>,
    align: "end",
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

// banking

interface BankingDataType {
  key: string;
  accountNumber: string;
  accountName: string;
  bank: string;
  bankCode: string;
  paymentMode: string;
  name: string;
  nricNo: string;
}
const bankingColumn: TableProps<BankingDataType>["columns"] = [
  {
    title: "No.",
    dataIndex: "key",
    key: "key",
    render: (_text, _record, index) => index + 1,
    align: "center",
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
];

const bankingData: BankingDataType[] = [
  {
    key: "1",
    accountNumber: "4381643522",
    accountName: "TAN MENG FAR",
    bank: "PBB",
    bankCode: "PBBEMYKL",
    paymentMode: "IG",
    name: "TAN MENG FAR",
    nricNo: "740820085390",
  },
  {
    key: "2",
    accountNumber: "8008449537",
    accountName: "Wong Siew Ying",
    bank: "CIMB",
    bankCode: "CIBBMYKL",
    paymentMode: "IG",
    name: "Wong Siew Ying",
    nricNo: "540425015150",
  },
  {
    key: "3",
    accountNumber: "8000186802",
    accountName: "KOPERASI DIDIK BERHAD",
    bank: "CIMB",
    bankCode: "CIBBMYKL",
    paymentMode: "IG",
    name: "KOPERASI DIDIK BERHAD",
    nricNo: "W60294",
  },
  {
    key: "4",
    accountNumber: "7058862124",
    accountName: "LOW YOKE SHIM @ LAN YOKE SHIM",
    bank: "CIMB",
    bankCode: "CIBBMYKL",
    paymentMode: "IG",
    name: "LOW YOKE SHIM @ LAN YOKE SHIM",
    nricNo: "S2635310F",
  },
];

// donor

interface DonorDataType {
  key: string;
  name: string;
  nric: string;
  mobile: string;
  email: string;
}
const donorColumns: TableProps<DonorDataType>["columns"] = [
  {
    title: "No.",
    dataIndex: "key",
    key: "key",
    render: (_text, _record, index) => index + 1,
    align: "center",
  },
  {
    title: <div className=""> Name </div>,
    dataIndex: "name",
    key: "name",
  },
  {
    title: <div className="text-center"> NRIC/Passport No. </div>,
    dataIndex: "nric",
    key: "nric",
    align: "center",
  },
  {
    title: <div className="text-center"> Mobile No. </div>,
    dataIndex: "mobile",
    key: "mobile",
    align: "center",
  },
  {
    title: <div className=""> Email Address </div>,
    dataIndex: "email",
    key: "email",
  },
];

const donorData: DonorDataType[] = [
  {
    key: "1",
    name: "TAN MENG FAR",
    nric: "740820-08-5390",
    mobile: "016-2127652",
    email: "fannytan.siong@gmail.com",
  },
  {
    key: "2",
    name: "WONG SIEW YING",
    nric: "540425-01-5150",
    mobile: "198631955",
    email: "sywongpersonal@gmail.com",
  },
  {
    key: "3",
    name: "KOPERASI DIDIK BERHAD",
    nric: "W60294",
    mobile: "-",
    email: "parames@mied.com.my",
  },
  {
    key: "4",
    name: "LOW YOKE SHIM @ LAN YOKE SHIM",
    nric: "E6760781A",
    mobile: "+6597417306",
    email: "mich_low@hotmail.com",
  },
];

// advice
interface AdviceDataType {
  key: string;
  adviseName: string;
  accountNumber: string;
}
const adviceColumns: TableProps<AdviceDataType>["columns"] = [
  {
    title: "No.",
    dataIndex: "key",
    key: "key",
    render: (_text, _record, index) => index + 1,
    align: "center",
  },
  {
    title: <div className=""> Advise Name </div>,
    dataIndex: "adviseName",
    key: "adviseName",
  },
  {
    title: <div className="text-center"> Account Number </div>,
    dataIndex: "accountNumber",
    key: "accountNumber",
    align: "center",
  },
];

const adviceData: AdviceDataType[] = [
  {
    key: "1",
    adviseName: "Income for Education Trust Feb 2025",
    accountNumber: "2-9-43590-5-1",
  },
  {
    key: "2",
    adviseName: "Income for Cash Trust Feb 2025",
    accountNumber: "2-2-43492-5-1",
  },
  {
    key: "3",
    adviseName: "Income for Cash Trust III Feb 2025",
    accountNumber: "2-24-98199-2-2",
  },
  {
    key: "4",
    adviseName: "Income for Liquidity Trust Feb 2025",
    accountNumber: "2-17-60390-1-1",
  },
];
