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
