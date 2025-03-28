import { TUser } from "@/interfaces/userInterface";
import { mainApi } from "../mainApi";
import { LoginRequest, LoginResponse } from "../reduxTyeps";

export const postsApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: "/users/login",
        method: "POST",
        body,
      }),
    }),

    getProfile: builder.query<TUser, { token: string }>({
      query: (token) => ({
        url: "/users/profile",
        method: "GET",
        headers: { Authorization: token },
      }),
    }),

    //
  }),
});

export const { useLoginUserMutation, useGetProfileQuery } = postsApi;
