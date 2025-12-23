import { Hotel } from "types";
import { apiSlice } from "./apiSlice";

interface HotelsApiResponse {
  data: {
    hotels: Hotel[];
    page: number;
    totalPages: number;
    totalHotels: number;
  };
}

type SearchHotelsParams = {
  location?: string;
  city?: string;
  country?: string;
  search?: string;
  checkIn?: string;
  checkOut?: string;
  adults?: number;
  rooms?: number;
  minRate?: number;
  maxRate?: number;
  featured?: boolean;
  propertyCategory?: string;
  sort?: string;
  page?: number;
  limit?: number;
  amenities?: string[];
};

export const hotelsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    searchHotels: builder.query<Hotel[], SearchHotelsParams>({
      query: (params) => ({
        url: `/hotels`,
        params,
      }),
      transformResponse: (response: HotelsApiResponse) => {
        return response.data.hotels;
      },
      providesTags: ["Hotel"],
    }),

    getHotelById: builder.query<Hotel, string>({
      query: (id) => `/hotels/${id}`,
      transformResponse: (response: any) => {
        return response.data.hotel;
      },
      providesTags: (result, error, id) => [{ type: "Hotel", id }],
    }),
  }),
});

export const { useSearchHotelsQuery, useGetHotelByIdQuery } = hotelsApi;
