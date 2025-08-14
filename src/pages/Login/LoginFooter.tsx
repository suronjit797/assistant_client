import appConfig from "@/config/appConfig";
import React from "react";

const LoginFooter = () => {
  return (
    <footer className="col-span-full bg-black text-white py-2 text-sm px-5 w-full">
      <div className="text-center pb-1 md:pb-0"> {appConfig.copyright} </div>
      <div className="text-center md:text-end md:mt-[-20px]">Terms of Use | Privacy Policy</div>
    </footer>
  );
};

export default LoginFooter;
