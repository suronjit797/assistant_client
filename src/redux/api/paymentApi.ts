import { IPayment } from "@/interfaces/paymentInterface";
import { mainApi } from "../mainApi";
import { IResponse } from "../reduxTypes";

const apiPath = "/payments";

export const paymentApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadPaymentCsv: builder.mutation<IResponse<IPayment[]>, FormData>({
      query: (body) => ({
        url: `${apiPath}/csv-upload`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Payments", "PaymentHistory"],
    }),
    getPayments: builder.query<IResponse<IPayment[]>, Record<string, unknown>>({
      query: (params) => {
        return {
          url: "/payments",
          method: "GET",
          params,
        };
      },
      providesTags: ["Payments"],
    }),

    // remove single payment
    deletePayment: builder.mutation<IPayment, string>({
      query: (id) => ({
        url: `${apiPath}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Payments", "PaymentHistory"],
    }),

    // delete many
    deleteManyPayment: builder.mutation<IPayment, { ids: React.Key[] }>({
      query: (body) => ({
        url: `${apiPath}/delete-many`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Payments", "PaymentHistory"],
    }),

    // end
  }),
});

export const {
  useUploadPaymentCsvMutation,
  useGetPaymentsQuery,
  useDeleteManyPaymentMutation,
  useDeletePaymentMutation
} = paymentApi;
