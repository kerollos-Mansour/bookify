import { apiSlice } from "./apiSlice";
import { Destination, GroupedDestinations } from "../../types";

export const destinationsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all destinations
    getAllDestinations: builder.query<Destination[], { bestSeller?: boolean }>({
      query: (params) => ({
        url: "/destinations",
        params,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Destination" as const, id })),
              { type: "Destination", id: "LIST" },
            ]
          : [{ type: "Destination", id: "LIST" }],
    }),

    // Get destination by ID
    getDestinationById: builder.query<Destination, string>({
      query: (id) => `/destinations/${id}`,
      providesTags: (result, error, id) => [{ type: "Destination", id }],
    }),

    // Create destination (admin only)
    createDestination: builder.mutation<Destination, Partial<Destination>>({
      query: (destination) => ({
        url: "/destinations",
        method: "POST",
        body: destination,
      }),
      invalidatesTags: [{ type: "Destination", id: "LIST" }],
    }),

    // Update destination (admin only)
    updateDestination: builder.mutation<
      Destination,
      { id: string; data: Partial<Destination> }
    >({
      query: ({ id, data }) => ({
        url: `/destinations/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Destination", id }],
    }),

    // Delete destination (admin only)
    deleteDestination: builder.mutation<void, string>({
      query: (id) => ({
        url: `/destinations/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Destination", id }],
    }),

    // Get destinations grouped by category
    getGroupedDestinations: builder.query<GroupedDestinations[], void>({
      query: () => "/destinations/grouped",
      transformResponse: (response: any) => {

        if (Array.isArray(response)) return response;
        if (response && Array.isArray(response.data)) return response.data;
        return [];
      },
      providesTags: (result) =>
        Array.isArray(result)
          ? [
              ...result.flatMap(({ destinations }) =>
                (destinations || []).map(({ id }) => ({
                  type: "Destination" as const,
                  id,
                }))
              ),
              { type: "Destination", id: "LIST" },
            ]
          : [{ type: "Destination", id: "LIST" }],
    }),

    // Get search config for a destination
    getDestinationSearch: builder.query<Record<string, any>, string>({
      query: (slug) => `/destinations/${slug}/search`,
    }),
  }),
});

export const {
  useGetAllDestinationsQuery,
  useGetDestinationByIdQuery,
  useCreateDestinationMutation,
  useUpdateDestinationMutation,
  useDeleteDestinationMutation,
  useGetGroupedDestinationsQuery,
  useGetDestinationSearchQuery,
  useLazyGetDestinationSearchQuery,
} = destinationsApi;
