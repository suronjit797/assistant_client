
import { IContacts } from "@/interfaces/contactsInterface";
import { globalEndpoints } from "../globalEndpoints";
import { mainApi } from "../mainApi";

const path = "contact";
const name = "Contact";

export const diaryApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    // basic global endpoints
    ...globalEndpoints<IContacts, typeof name>(builder, path, name, []),
  }),
});

export const {
  useGetAllContactQuery,
  useCreateContactMutation,
  useUpdateContactMutation,
  useDeleteManyContactMutation,
  useDeleteContactMutation,
} = diaryApi;
