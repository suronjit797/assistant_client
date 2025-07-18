import { IRoutines } from "@/interfaces/routinesInterface";
import { globalEndpoints } from "../globalEndpoints";
import { mainApi } from "../mainApi";

const path = "routines";
const name = "Routines";

export const routinesApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    // basic global endpoints
    ...globalEndpoints<IRoutines, "Routines">(builder, path, name, []),
  }),
});

export const {
  useGetAllRoutinesQuery,
  useCreateRoutinesMutation,
  useUpdateRoutinesMutation,
  useDeleteManyRoutinesMutation,
  useDeleteRoutinesMutation,
} = routinesApi;
