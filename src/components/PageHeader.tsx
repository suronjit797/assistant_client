import React from "react";

interface Props {
  title: string;
  subTitle?: string;
  children?: React.ReactNode;
}

const PageHeader: React.FC<Props> = ({ title, subTitle, children }) => {
  return (
    <>
      <div className="flex items-center">
        <div>
          <h5 className="font-bold uppercase text-sm mb-3"> {title} </h5>
          <div className="text-gray-700 text-sm dark:text-gray-300"> {subTitle} </div>
        </div>
        {children}
      </div>
      <hr className="border-gray-300 dark:border-slate-600 my-3" />
    </>
  );
};

export default PageHeader;
