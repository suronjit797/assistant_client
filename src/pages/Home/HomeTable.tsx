import CustomTable from "@/components/CustomTable";
import { BankOutlined, EditOutlined, UserOutlined } from "@ant-design/icons";
import type { TableProps } from "antd";
import { Button, Space } from "antd";
import React from "react";

interface DataType {
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

const data: DataType[] = [
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

const HomeTable: React.FC = () => {
  // Functions to handle actions
  const handleEdit = (record: DataType) => {
    console.log("Edit clicked for:", record);
  };

  const handleBankingDetails = (record: DataType) => {
    console.log("Banking Details clicked for:", record);
  };

  const handleDonorDetails = (record: DataType) => {
    console.log("Donor Details clicked for:", record);
  };

  const columns: TableProps<DataType>["columns"] = [
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
      title: "Donar Name",
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
      title: "Trust Deed no",
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
      title: "Trust Amount (RM)",
      dataIndex: "amount",
      key: "amount",
      align: "center",
    },

    {
      title: "Payable (%)",
      dataIndex: "amount",
      key: "amount",
      align: "center",
    },
    {
      title: "Income (RM)",
      dataIndex: "amount",
      key: "amount",
      align: "center",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle" style={{columnGap: 8}}>
          <Button type="primary" title="Edit" icon={<EditOutlined />} onClick={() => handleEdit(record)}></Button>
          <Button
            type="default"
            color="purple"
            variant="solid"
            title="Banking Details"
            icon={<BankOutlined />}
            onClick={() => handleBankingDetails(record)}
          ></Button>
          <Button
            color="default"
            variant="solid"
            type="default"
            title="Donor Details"
            icon={<UserOutlined />}
            onClick={() => handleDonorDetails(record)}
          ></Button>
        </Space>
      ),
      align: "center",
    },
  ];

  return (
    <div>
      <CustomTable data={data} columns={columns} />
    </div>
  );
};

export default HomeTable;
