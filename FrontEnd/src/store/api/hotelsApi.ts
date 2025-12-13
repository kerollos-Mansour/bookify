import { Hotel } from "types";
import { apiSlice } from "./apiSlice";

export const hotelsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHotels: builder.query<Hotel[], void>({
      query: () => `/hotels?_embed=hotelDetails`,
      providesTags: ["Hotel"],
    }),

    getHotelById: builder.query<Hotel[], string>({
      query: (id) => `/hotels/${id}?_embed=hotelDetails`,
      providesTags: (result, error, id) => [{ type: "Hotel", id }],
    }),

    searchHotels: builder.query<Hotel[], string>({
      query: (searchTerm) => `/hotels?q=${searchTerm}&_embed=hotelDetails`,
      providesTags: ["Hotel"],
    }),
  }),
});

export const { 
  useGetHotelsQuery, 
  useGetHotelByIdQuery, 
  useSearchHotelsQuery 
} = hotelsApi;
