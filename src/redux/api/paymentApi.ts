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
      invalidatesTags: ["Payments"],
    }),
  }),
});

export const { useUploadPaymentCsvMutation } = paymentApi;
