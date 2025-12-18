import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_CONFIG } from "../../config/api.config";
import { storage } from "../../utils/storage"; // import your storage helper

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: API_CONFIG.BASE_URL,
    prepareHeaders: (headers) => {
      const token = storage.getToken(); // read token from localStorage
      if (token) {
        headers.set("Authorization", `Bearer ${token}`); // add to header
      }
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
    "User",
  ],
  endpoints: () => ({}),
});
