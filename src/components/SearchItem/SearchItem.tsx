import { useQueryParams } from "@/hooks/useQueryParams";
import { Input } from "antd";
import React, { useEffect, useState } from "react";

const { Search } = Input;

const SearchItem: React.FC<{ name?: string }> = ({ name = "" }) => {
  const { queryParams, setQueryParams } = useQueryParams();
  const [search, setSearch] = useState("");

  useEffect(() => {
    setSearch((queryParams.search as string) || "");
  }, [queryParams.search]);

  return (
    <Search
      placeholder={`Search ${name}...`}
      onSearch={() => setQueryParams({ search })}
      onClear={() => setQueryParams({ search: undefined })}
      onChange={(e) => setSearch(e.target.value)}
      enterButton
      value={search}
      allowClear
      className="w-full !max-w-60"
    />
  );
};

export default SearchItem;


