import { JSX } from "react";

export interface IMeta {
  total: number;
  limit: number;
  page: number;
}

export interface IRoute {
  name: string;
  path: string;
  icon: JSX.Element;
}


export interface ImageInterface {
  uid: string;
  name: string;
  status: string;
  url: string;
  size: number;
}

export interface NavConfig {
  name: string;
  path: string | null;
  authorizedRoles: string[];
  icon?: React.ReactNode;
  children?: NavConfig[];
  onClick?: (logOut?: () => void) => void;
}
