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
