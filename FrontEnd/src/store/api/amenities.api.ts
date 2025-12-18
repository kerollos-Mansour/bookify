import { apiSlice } from "./apiSlice";
import { Amenity } from "../../types";

export const amenitiesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all amenities
    getAllAmenities: builder.query<
      Amenity[],
      { category?: "room" | "hotel" | "both" }
    >({
      query: (params) => ({
        url: "/amenities",
        params,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Amenity" as const, id })),
              { type: "Amenity", id: "LIST" },
            ]
          : [{ type: "Amenity", id: "LIST" }],
    }),

    // Get amenity by ID
    getAmenityById: builder.query<Amenity, string>({
      query: (id) => `/amenities/${id}`,
      providesTags: (result, error, id) => [{ type: "Amenity", id }],
    }),

    // Create amenity (admin only)
    createAmenity: builder.mutation<Amenity, Partial<Amenity>>({
      query: (amenity) => ({
        url: "/amenities",
        method: "POST",
        body: amenity,
      }),
      invalidatesTags: [{ type: "Amenity", id: "LIST" }],
    }),
  }),
});

export const {
  useGetAllAmenitiesQuery,
  useGetAmenityByIdQuery,
  useCreateAmenityMutation,
} = amenitiesApi;
