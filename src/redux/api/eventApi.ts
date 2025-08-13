import { IEvent } from "@/interfaces/eventInterface";
import { globalEndpoints } from "../globalEndpoints";
import { mainApi } from "../mainApi";

const path = "events";
const name = "Event";

export const eventApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    // basic global endpoints
    ...globalEndpoints<IEvent, typeof name>(builder, path, name, []),
  }),
});

export const {
  useGetAllEventQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteManyEventMutation,
  useDeleteEventMutation,
} = eventApi;
