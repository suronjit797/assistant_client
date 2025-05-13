import PageHeader from "@/components/PageHeader";
import appConfig from "@/config/appConfig";
import { useQueryParams } from "@/hooks/useQueryParams";
import { useDeleteManyPaymentMutation } from "@/redux/api/paymentApi";
import { Button, Input } from "antd";
import { SearchProps } from "antd/es/input";
import React, { useEffect, useState } from "react";
import { MdOutlineFilterAltOff } from "react-icons/md";
import { RiDeleteBin7Line } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import PaymentTable from "./PaymentTable";
import Swal from "sweetalert2";
const { Search } = Input;

const PaymentSummary: React.FC = () => {
  // hooks
  const navigate = useNavigate();
  const location = useLocation();

  // rtk query
  const { queryParams, setQueryParams } = useQueryParams({
    page: 1,
    limit: 10,
  });
  const [deleteMany, { isSuccess }] = useDeleteManyPaymentMutation();

  // states
  const [search, setSearch] = useState(queryParams.search as string);
  const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>([]);

  useEffect(() => {
    document.title = `${appConfig.name} - Payment Summary`;
  }, []);

  const onSearch: SearchProps["onSearch"] = (value) =>
    setQueryParams({ search: value });

  const handleClearQuery = () => {
    navigate(location.pathname, { replace: true });
  };

  const handleDeleteMany = async () => {
    const result = await Swal.fire({
      // title: "",
      text: "Are you sure want to remove this?",
      showCancelButton: true,
      confirmButtonText: "Confirm",
    });

    if (result.isConfirmed) {
      try {
        deleteMany({ ids: selectedRowKeys });
      } catch (error) {
        console.error(
          error instanceof Error ? error.message : "An unknown error occurred."
        );
      }
    }
  };

  if (isSuccess) {
    Swal.fire({
      title: "",
      text: "Payment Deleted Successfully.",
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
    });
  }

  return (
    <>
      <PageHeader title="Payments" subTitle="Reconciliation Summary" />
      <div className="flex my-3 items-center justify-center gap-2">
        <Search
          placeholder="input search text"
          className="ms-auto max-w-64"
          onSearch={onSearch}
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          enterButton
          allowClear
        />

        <Button
          type="primary"
          className="!bg-gray-300 !text-black hover:!bg-gray-400"
          title="Clear All Filters"
          onClick={handleClearQuery}
          icon={<MdOutlineFilterAltOff />}
        />
        <Button
          type="primary"
          title="Delete Many"
          onClick={handleDeleteMany}
          danger
          icon={<RiDeleteBin7Line />}
        />
      </div>
      <PaymentTable
        {...{ selectedRowKeys, setSelectedRowKeys, muliSelect: true }}
      />
    </>
  );
};

export default PaymentSummary;
