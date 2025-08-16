import React from "react";
import { Helmet } from "react-helmet";

interface Props {
  title: string;
  subTitle?: string;
  children?: React.ReactNode;
  className?: string;
}

const PageHeader: React.FC<Props> = ({ title, subTitle, children, className }) => {
  return (
    <>
      <Helmet>
        <title>{title} | Personal Assistant</title>
        <meta name="description" content={`Your smart assistant for daily tasks. This page contain ${subTitle}`} />
      </Helmet>

      <div className={`flex items-center ${className}`}>
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
