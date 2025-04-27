/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomTable from "@/components/CustomTable";
import { useQueryParams } from "@/hooks/useQueryParams";
import { IPayment } from "@/interfaces/paymentInterface";
import { useGetPaymentsQuery } from "@/redux/api/paymentApi";
import { numberFormatter } from "@/utils/numberFormatter";
import tableSearchFilter from "@/utils/tableSearchFilter";
import { SearchOutlined } from "@ant-design/icons";
import { Spin, TableProps, Tabs } from "antd";
import dayjs from "dayjs";
import React, { useRef } from "react";

const productFilters = [
  { text: "Liquidity Trust", value: "Liquidity Trust" },
  { text: "Cash Trust III", value: "Cash Trust III" },
  { text: "Cash Trust", value: "Cash Trust" },
  { text: "Education Trust", value: "Education Trust" },
];

const bankFilter = [
  { text: "CIMB", value: "CIMB" },
  { text: "PBB", value: "PBB" },
];

const bankCodeFilter = [
  { text: "CIMB", value: "CIMB" },
  { text: "PBB", value: "PBB" },
];
const paymentModeFilter = [{ text: "IG", value: "IG" }];

interface Props {
  selectedRowKeys?: React.Key[];
  setSelectedRowKeys?: React.Dispatch<React.SetStateAction<React.Key[]>>;
  muliSelect?: boolean;
}

const PaymentTable: React.FC<Props> = ({
  selectedRowKeys = [],
  setSelectedRowKeys = () => {},
  muliSelect = false,
}) => {
  const { queryParams, setQueryParams, getNonEmptyQueryParams } =
    useQueryParams({ page: 1, limit: 10 });

  // rek query
  const { data, isFetching } = useGetPaymentsQuery(getNonEmptyQueryParams);
  const page = Number(queryParams.page);
  const limit = Number(queryParams.limit);

  //   ref
  const sectionRefs = {
    summary: useRef<HTMLDivElement>(null),
    banking: useRef<HTMLDivElement>(null),
    donor: useRef<HTMLDivElement>(null),
  };

  // if (isError) {
  //   Swal.fire({
  //     icon: "error",
  //     title: "Error",
  //     text: "Payment summary fetch failed",
  //     confirmButtonText: "OK",
  //     timer: 3000,
  //   });
  // }

  const handleTabClick = (key: string) => {
    const ref = sectionRefs[key as keyof typeof sectionRefs];
    ref?.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
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
      dataIndex: "no",
      key: "no",
      render: (_text, _record, index) => (
        <div> {(page - 1) * limit + (index + 1)} </div>
      ),
      align: "center",
    },
    {
      title: "Product",
      ellipsis: true,
      dataIndex: "product",
      key: "product",
      filters: productFilters,
      filteredValue: (queryParams?.product as string)?.split(",") || null,
      filterSearch: true,
    },
    {
      title: "Donor Name",
      ellipsis: true,
      dataIndex: "donorName",
      key: "donorName",
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
      ),
      ...tableSearchFilter,
      filteredValue: (queryParams.donorName as any) || null,
    },
    {
      title: <div> Date of Trust Deed </div>,
      ellipsis: true,
      dataIndex: "dtd",
      key: "dtd",
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
      ),
      // ...getFilterColumnSearchProps,
      align: "center",
      render: (_, record) => dayjs(record.dateOfTrustDeed).format("DD/MM/YYYY"),
    },
    {
      title: <div> Trust Deed Expire Date </div>,
      ellipsis: true,
      dataIndex: "dtd",
      key: "dtd",
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
      ),
      // ...getFilterColumnSearchProps,
      align: "center",
      render: (_, record) =>
        dayjs(record.trustDeedExpiryDate).format("DD/MM/YYYY"),
    },
    {
      title: "Trust Deed No",
      ellipsis: true,
      dataIndex: "trustDeedNo",
      key: "trustDeedNo",
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
      ),
      ...tableSearchFilter,
      filteredValue: (queryParams.trustDeedNo as any) || null,
      align: "center",
    },
    {
      title: "Reference",
      ellipsis: true,
      dataIndex: "reference",
      key: "reference",
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
      ),
      ...tableSearchFilter,
      filteredValue: (queryParams.reference as any) || null,
      align: "center",
    },

    {
      title: <div className="text-center">Trust Amount (RM)</div>,
      ellipsis: true,
      dataIndex: "amount",
      key: "amount",
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
      ),
      ...tableSearchFilter,
      filteredValue: (queryParams.amount as any) || null,
      render: (_, record) => <> {numberFormatter(record.trustAmount)} </>,
      align: "end",
    },

    {
      title: <div className="text-center">Payable (%)</div>,
      ellipsis: true,
      dataIndex: "interestDividendPayableToClient",
      key: "interestDividendPayableToClient",
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
      ),
      ...tableSearchFilter,
      filteredValue:
        (queryParams.interestDividendPayableToClient as any) || null,
      render: (_, record) => (
        <> {numberFormatter(record.interestDividendPayableToClient)} </>
      ),
      align: "end",
    },
    {
      title: <div className="text-center">Income (RM)</div>,
      ellipsis: true,
      dataIndex: "income",
      key: "income",
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
      ),
      ...tableSearchFilter,
      filteredValue: (queryParams.income as any) || null,
      render: (_, record) => <> {numberFormatter(record.income)} </>,
      align: "end",
    },

    {
      title: (
        <div
          className="text-center mx-[-16px] px-[16px]"
          ref={sectionRefs.banking}
        >
          Account Number
        </div>
      ),
      ellipsis: true,
      dataIndex: "accountNumber",
      key: "accountNumber",
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
      ),
      ...tableSearchFilter,
      filteredValue: (queryParams.accountNumber as any) || null,
      align: "center",
    },
    {
      title: <div className=""> Account Name </div>,
      ellipsis: true,
      dataIndex: "accountName",
      key: "accountName",
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
      ),
      ...tableSearchFilter,
      filteredValue: (queryParams.accountName as any) || null,
    },
    {
      title: <div className="text-center"> Bank </div>,
      ellipsis: true,
      dataIndex: "bank",
      key: "bank",
      align: "center",
      filters: bankFilter,
      filteredValue: (queryParams?.bank as string)?.split(",") || null,
      filterSearch: true,
    },
    {
      title: <div className="text-center">Bank Code</div>,
      ellipsis: true,
      dataIndex: "bankCode",
      key: "bankCode",
      align: "center",
      filters: bankCodeFilter,
      filteredValue: (queryParams?.bankCode as string)?.split(",") || null,
      filterSearch: true,
    },
    {
      title: <div className="text-center"> Payment Mode </div>,
      ellipsis: true,
      dataIndex: "paymentMode",
      key: "paymentMode",
      align: "center",
      filters: paymentModeFilter,
      filteredValue: (queryParams?.paymentMode as string)?.split(",") || null,
      filterSearch: true,
    },
    {
      title: <div className="text-center"> NRIC NO. </div>,
      ellipsis: true,
      dataIndex: "nricNo",
      key: "nricNo",
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
      ),
      ...tableSearchFilter,
      filteredValue: (queryParams.donorName as any) || null,
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
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
      ),
      ...tableSearchFilter,
      filteredValue: (queryParams.donorName as any) || null,
    },
    {
      title: <div className="text-center"> NRIC/Passport No. </div>,
      ellipsis: true,
      dataIndex: "nricPassportNo",
      key: "nricPassportNo",
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
      ),
      ...tableSearchFilter,
      filteredValue: (queryParams.donorName as any) || null,
      align: "center",
    },
    {
      title: <div className="text-center"> Mobile No. </div>,
      ellipsis: true,
      dataIndex: "mobileNo",
      key: "mobileNo",
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
      ),
      ...tableSearchFilter,
      filteredValue: (queryParams.donorName as any) || null,
      align: "center",
    },
    {
      title: <div className=""> Email Address </div>,
      ellipsis: true,
      dataIndex: "emailAddress",
      key: "emailAddress",
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
      ),
      ...tableSearchFilter,
      filteredValue: (queryParams.donorName as any) || null,
    },
    {
      title: <div className="text-center">Uploaded Date</div>,
      ellipsis: true,
      dataIndex: "date",
      key: "date",
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
      ),
      // ...getFilterColumnSearchProps,
      render: (_, record) => (
        <> {dayjs(record.createdAt).format("DD/MM/YYYY hh:mm:ss")} </>
      ),
      align: "center",
    },
  ];

  // rowSelection object indicates the need for row selection
  const rowSelection: TableProps<IPayment>["rowSelection"] = {
    selectedRowKeys,
    onChange: (selectedRowKeys) => {
      setSelectedRowKeys(selectedRowKeys);
    },
    getCheckboxProps: (record: IPayment) => ({
      disabled: false,
      name: record._id,
    }),
  };

  return (
    <Spin spinning={isFetching}>
      <div className="my-3">
        <Tabs
          defaultActiveKey="1"
          items={tabItems}
          onTabClick={handleTabClick}
        />
      </div>
      <CustomTable
        data={
          Array.isArray(data?.data)
            ? data?.data?.map((d) => ({ ...d, key: d?._id }))
            : []
        }
        columns={paymentColumn}
        total={data?.meta?.total || 0}
        query={queryParams}
        setQuery={setQueryParams}
        rowSelection={
          muliSelect ? { type: "checkbox", ...rowSelection } : undefined
        }
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
