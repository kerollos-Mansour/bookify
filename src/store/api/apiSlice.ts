import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { API_CONFIG } from "../../config/api.config";
import { storage } from "../../utils/storage";

const baseQuery = fetchBaseQuery({
  baseUrl: API_CONFIG.BASE_URL,
  prepareHeaders: (headers) => {
    const token = storage.getToken();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // Try to get a new token
    const refreshToken = storage.getRefreshToken();

    if (refreshToken) {
      const refreshResult = await baseQuery(
        {
          url: "/auth/refresh-token",
          method: "POST",
          body: { refreshToken },
        },
        api,
        extraOptions
      );

      if (refreshResult.data) {
        const data = refreshResult.data as any;
        // Store the new tokens
        storage.setToken(data.accessToken);
        storage.setRefreshToken(data.refreshToken);

        // Retry the initial query
        result = await baseQuery(args, api, extraOptions);
      } else {
        // Refresh failed - logout user
        storage.clearAuth();
        window.location.href = "/login";
      }
    } else {
      // No refresh token - logout user
      storage.clearAuth();
      window.location.href = "/login";
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
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
    "User",
    "Review",
  ],
  endpoints: () => ({}),
});
