import PageHeader from "@/components/PageHeader";
import { Button } from "antd";
import React from "react";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Products: React.FC = () => {
  return (
    <div>
      <PageHeader title="Manage Investment Products" subTitle="All Investment Products">
        <div className="ms-auto">
          <Link to="/products/create">
            <Button icon={<FaPlus />} type="primary">
              Create Investment Products
            </Button>
          </Link>
        </div>
      </PageHeader>
      products
    </div>
  );
};

export default Products;
