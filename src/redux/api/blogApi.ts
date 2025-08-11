import { IBlog } from "@/interfaces/blogInterface";
import { globalEndpoints } from "../globalEndpoints";
import { mainApi } from "../mainApi";

const path = "blog";
const name = "Blog";

export const diaryApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    // basic global endpoints
    ...globalEndpoints<IBlog, typeof name>(builder, path, name, []),
  }),
});

export const {
  useGetAllBlogQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteManyBlogMutation,
  useDeleteBlogMutation,
} = diaryApi;
