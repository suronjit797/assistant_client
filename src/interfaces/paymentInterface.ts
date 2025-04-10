import { TUser } from "./userInterface";

export interface IPayment {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  product: string;
  donorName: string;
  dateOfTrustDeed: Date | null;
  trustDeedExpiryDate: Date | null;
  tenure: number | null;
  dividendFrequency: string;
  trustDeedNo: string;
  reference: string;
  trustAmount: number | null;
  interestDividendPayableToClient: number | null;
  income: number | null;
  payment: string;
  accountNumber: string;
  accountName: string;
  bank: string;
  bankCode: string;
  paymentMode: string;
  name: string;
  nricNo: string;
  name1: string;
  nricPassportNo: string;
  mobileNo: string;
  emailAddress: string;
}

export interface IPaymentHistory {
  _id: string;
  payments: string[] | IPayment[];
  type: "auto" | "manual";
  user: TUser | string;
  bank?: string;
  createdAt: Date;
  updatedAt: Date;
}
