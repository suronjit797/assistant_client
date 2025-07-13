import { TTransactions } from "@/interfaces/transactionsInterface";
import { globalEndpoints } from "../globalEndpoints";
import { mainApi } from "../mainApi";

const apiPath = "transactions";

export const transactionsApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    ...globalEndpoints<TTransactions, "Transactions">(builder, apiPath, "Transactions"),
  }),
});

export const { useGetAllTransactionsQuery, useCreateTransactionsMutation, useUpdateTransactionsMutation } = transactionsApi;
