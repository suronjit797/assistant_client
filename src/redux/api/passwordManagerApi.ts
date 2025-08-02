import { IPassword } from "@/interfaces/passwordManagerInterface";
import { globalEndpoints } from "../globalEndpoints";
import { mainApi } from "../mainApi";
import { IResponse } from "../reduxTypes";

const path = "password-manager";
const name = "PasswordManager";

export const pmApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    // basic global endpoints
    ...globalEndpoints<IPassword, typeof name>(builder, path, name, []),

    // decrypt password
    decryptPassword: builder.mutation<IResponse<IPassword>, { password: string; id: string }>({
      query: (body) => ({
        url: `/${path}/decrypt`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetAllPasswordManagerQuery,
  useCreatePasswordManagerMutation,
  useUpdatePasswordManagerMutation,
  useDeleteManyPasswordManagerMutation,
  useDeletePasswordManagerMutation,
  useDecryptPasswordMutation,
} = pmApi;
