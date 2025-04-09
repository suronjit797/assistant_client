import { IPayment } from "@/interfaces/paymentInterface";
import { mainApi } from "../mainApi";
import { IResponse } from "../reduxTypes";

export const paymentApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadPaymentCsv: builder.mutation<IResponse<IPayment[]>, FormData>({
      query: (body) => ({
        url: "/payments/csv-upload",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Payments", "PaymentHistory"],
    }),
    getPayments: builder.query<IResponse<IPayment[]>, Record<string, unknown>>({
      query: (params) => {
        console.log({ params });
        return {
          url: "/payments",
          method: "GET",
          params,
        };
      },
      providesTags: ["Payments"],
    }),
  }),
});

export const { useUploadPaymentCsvMutation, useGetPaymentsQuery } = paymentApi;
