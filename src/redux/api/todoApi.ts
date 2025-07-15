import { ITodos } from "@/interfaces/todosInterface";
import { globalEndpoints } from "../globalEndpoints";
import { mainApi } from "../mainApi";

const path = "todos";
const name = "Todos";

export const todosApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    // basic global endpoints
    ...globalEndpoints<ITodos, "Todos">(builder, path, name, []),
  }),
});

export const {
  useGetAllTodosQuery,
  useCreateTodosMutation,
  useUpdateTodosMutation,
  useDeleteManyTodosMutation,
  useDeleteTodosMutation,
} = todosApi;
