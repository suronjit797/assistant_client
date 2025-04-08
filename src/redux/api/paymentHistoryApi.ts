import { IPaymentHistory } from "@/interfaces/paymentInterface";
import { mainApi } from "../mainApi";
import { IResponse } from "../reduxTypes";

export const paymentHistoryApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get All PaymentHistory
    getPaymentH: builder.query<IResponse<IPaymentHistory[]>, { token?: string }>({
      query: (token) => {
        return {
          url: "/payments-history",
          method: "GET",
          ...(token ? { headers: { Authorization: token as string } } : {}),
        };
      },
      providesTags: ["User"],
    }),
    // getAllPaymentHistory: builder.query<IResponse<IPaymentHistory[]>, Record<string, unknown>>({
    //   query: (params) => {
    //     console.log("history query all");
    //     return {
    //       url: "/payments-history",
    //       method: "GET",
    //       params,
    //     };
    //   },
    //   providesTags: ["PaymentHistory"],
    // }),

    // Get Single PaymentHistory
    getPaymentHistoryById: builder.query<IResponse<IPaymentHistory>, string>({
      query: (id) => ({
        url: `/payments-history/${id}`,
        method: "GET",
      }),
      providesTags: ["PaymentHistory"],
    }),

  }),
});

export const { useGetPaymentHQuery, useGetPaymentHistoryByIdQuery } = paymentHistoryApi;
