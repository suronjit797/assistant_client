import { TUser } from "@/interfaces/userInterface";
import { IResponse, LoginRequest, LoginResponse } from "../reduxTypes";
import { mainApi } from "../mainApi";

export const userApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    // Register User
    registerUser: builder.mutation<IResponse<TUser>, Partial<TUser>>({
      query: (body) => ({
        url: "/users",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),

    // Login User
    loginUser: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: "/users/login",
        method: "POST",
        body,
      }),
    }),

    // Forgot password
    forgotPassword: builder.mutation<LoginResponse, { email: string }>({
      query: (body) => ({
        url: "/users/forgot-password",
        method: "POST",
        body,
      }),
    }),

    // reset password
    resetPassword: builder.mutation<IResponse<TUser>, { password: string; token: string }>({
      query: (body) => ({
        url: "/users/reset-password",
        method: "POST",
        body,
      }),
    }),

    // Get Profile
    getProfile: builder.query<IResponse<TUser>, { token?: string }>({
      query: (token) => {
        return {
          url: "/users/profile",
          method: "GET",
          ...(token ? { headers: { Authorization: token as string } } : {}),
        };
      },
      providesTags: ["Profile"],
    }),

    // Update Profile
    updateProfile: builder.mutation<IResponse<TUser>, Partial<TUser>>({
      query: (body) => ({
        url: "/users/profile",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Profile"],
    }),

    // Delete Profile
    deleteProfile: builder.mutation<void, void>({
      query: () => ({
        url: "/users/profile",
        method: "DELETE",
      }),
      invalidatesTags: ["Profile"],
    }),

    // Get All Users (Admin)  //! have to add query params
    getAllUsers: builder.query<IResponse<TUser[]>, void>({
      query: () => {
        console.log("get all user");
        return { url: "/users" };
      },
      providesTags: ["User"],
    }),

    // Get Single User (Admin)
    getUserById: builder.query<IResponse<TUser>, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    // Update User (Admin)
    updateUser: builder.mutation<IResponse<TUser>, { id: string; body: Partial<TUser> }>({
      query: ({ id, body }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["User"],
    }),

    // Delete User (Admin)
    deleteUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useDeleteProfileMutation,
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useLazyGetProfileQuery,
} = userApi;

// ! useLazyGetAllUsersQuery  //have to check
