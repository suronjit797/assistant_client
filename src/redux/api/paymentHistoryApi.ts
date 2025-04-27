import { IPaymentHistory } from "@/interfaces/paymentInterface";
import { mainApi } from "../mainApi";
import { IResponse } from "../reduxTypes";

const apiPath = "/payments-history";

export const paymentHistoryApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get All PaymentHistory
    getPaymentH: builder.query<
      IResponse<IPaymentHistory[]>,
      Record<string, unknown>
    >({
      query: (params) => {
        return {
          url: apiPath,
          method: "GET",
          params,
        };
      },
      providesTags: ["PaymentHistory"],
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
        url: `${apiPath}/${id}`,
        method: "GET",
      }),
      providesTags: ["PaymentHistory"],
    }),

    // end
  }),
});

export const { useGetPaymentHQuery, useGetPaymentHistoryByIdQuery } =
  paymentHistoryApi;
