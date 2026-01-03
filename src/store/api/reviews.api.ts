import { apiSlice } from "./apiSlice";
import { Review, ReviewListResponse } from "../../types/review.type";

export const reviewsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserReviews: builder.query<Review[], string>({
      query: (userId) => {
        const filters = JSON.stringify({ userid: userId });
        // Request a higher limit to show more reviews since pagination isn't implemented in UI yet
        const pagination = JSON.stringify({ limit: 50 });
        return `/reviews?filters=${filters}&pagination=${pagination}`;
      },
      transformResponse: (response: ReviewListResponse) => response.data,
      providesTags: ["Review"],
    }),
    getHotelReviews: builder.query<Review[], string>({
      query: (hotelId) => {
        const filters = JSON.stringify({
          hotelid: hotelId,
          status: "approved",
        });
        // Request a higher limit to show more reviews since pagination isn't implemented in UI yet
        const pagination = JSON.stringify({ limit: 50 });
        return `/reviews?filters=${filters}&pagination=${pagination}`;
      },
      transformResponse: (response: ReviewListResponse) => response.data,
      providesTags: ["Review"],
    }),
    createReview: builder.mutation<Review, Partial<Review>>({
      query: (body) => ({
        url: "/reviews",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Review"],
    }),
    deleteReview: builder.mutation<void, string>({
      query: (id) => ({
        url: `/reviews/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Review"],
    }),
  }),
});

export const {
  useGetUserReviewsQuery,
  useGetHotelReviewsQuery,
  useCreateReviewMutation,
  useDeleteReviewMutation,
} = reviewsApi;
