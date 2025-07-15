import { ITransactionsSummary, TTransactions } from "@/interfaces/transactionsInterface";
import { globalEndpoints } from "../globalEndpoints";
import { mainApi } from "../mainApi";
import { IResponse } from "../reduxTypes";

const path = "transactions";
const name = "Transactions";

export const transactionsApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    // basic global endpoints
    ...globalEndpoints<TTransactions, "Transactions">(builder, path, name, ["TransactionsSummary"]),

    // rest endpoints
    getSummary: builder.query<IResponse<ITransactionsSummary>, Record<string, unknown>>({
      query: (params) => ({
        url: `/${path}/summary`,
        method: "GET",
        params,
      }),
      providesTags: ["TransactionsSummary"],
    }),
  }),
});

export const {
  useGetAllTransactionsQuery,
  useCreateTransactionsMutation,
  useUpdateTransactionsMutation,
  useGetSummaryQuery,
  useDeleteTransactionsMutation,
  useDeleteManyTransactionsMutation,
} = transactionsApi;
