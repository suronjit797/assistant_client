import { IDiary } from "@/interfaces/diaryInterface";
import { globalEndpoints } from "../globalEndpoints";
import { mainApi } from "../mainApi";

const path = "diary";
const name = "Diary";

export const diaryApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    // basic global endpoints
    ...globalEndpoints<IDiary, typeof name>(builder, path, name, []),
  }),
});

export const {
  useGetAllDiaryQuery,
  useCreateDiaryMutation,
  useUpdateDiaryMutation,
  useDeleteManyDiaryMutation,
  useDeleteDiaryMutation,
} = diaryApi;
