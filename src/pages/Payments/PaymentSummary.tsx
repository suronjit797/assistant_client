import PageHeader from "@/components/PageHeader";
import appConfig from "@/config/appConfig";
import { useQueryParams } from "@/hooks/useQueryParams";
import { Input } from "antd";
import { SearchProps } from "antd/es/input";
import React, { useEffect, useState } from "react";
import PaymentTable from "./PaymentTable";
const { Search } = Input;

const PaymentSummary: React.FC = () => {
  // hooks
  const { queryParams, setQueryParams } = useQueryParams({
    page: 1,
    limit: 10,
  });
  // states
  const [search, setSearch] = useState(queryParams.search as string);

  useEffect(() => {
    document.title = `${appConfig.name} - Payment Summary`;
  }, []);

  const onSearch: SearchProps["onSearch"] = (value) => setQueryParams({ search: value });

  return (
    <>
      <PageHeader title="Payments" subTitle="Reconciliation Summary" />
      <div className="flex my-3">
        <Search
          placeholder="input search text"
          className="ms-auto max-w-64"
          onSearch={onSearch}
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          enterButton
          allowClear
        />
      </div>
      <PaymentTable />
    </>
  );
};

export default PaymentSummary;
