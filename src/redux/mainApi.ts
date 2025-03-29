import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";
import envConfig from "@/config/envConfig";

export const mainApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: envConfig.BASED_API_URL + "/api/v1/",
    prepareHeaders: async (headers, { getState }) => {
      const token = await (getState() as RootState).auth.token;
      console.log(token)
      if (token) {
        headers.set("Authorization", token);
      }

      return headers;
    },
  }),
  tagTypes: ["User", "Profile"],
  endpoints: (builder) => ({
    uploadImage: builder.mutation({
      query: (formData) => ({
        url: "/upload",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});


export const {  useUploadImageMutation} = mainApi