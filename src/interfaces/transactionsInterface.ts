export type TTransactions = {
  _id: string;
  title: string;
  type: string;
  amount: number;
  user: string;
  isPending: boolean;
  isImportant: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export interface ITransactionsSummary {
  allTime: Record<string, number>;
  monthly: Record<string, number>;
  month: string | number;
  year: string | number;
}
