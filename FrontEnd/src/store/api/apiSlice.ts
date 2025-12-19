import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_CONFIG } from "../../config/api.config";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: API_CONFIG.BASE_URL,
    prepareHeaders: (headers) => {
      return headers;
    },
  }),
  tagTypes: [
    "Hotel",
    "Desination",
    "Property",
    "Room",
    "Booking",
    "Coupon",
    "Payment",
    "Amenity",
    "Destination",
  ],
  endpoints: () => ({}),
});
