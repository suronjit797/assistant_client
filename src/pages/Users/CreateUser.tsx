import React from "react";
import UserForm from "./UserForm";
import PageHeader from "@/components/PageHeader";

const CreateUser: React.FC = () => {
  return (
    <div>
      <div className="mb-5">
        <PageHeader title="Manage Users" subTitle="Add New Users" />
      </div>

      <UserForm />
    </div>
  );
};

export default CreateUser;
