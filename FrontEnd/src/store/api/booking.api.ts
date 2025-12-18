import { apiSlice } from "./apiSlice";
import { Booking, CreateBookingRequest } from "../../types";

export const bookingsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all bookings
    getAllBookings: builder.query<Booking[], void>({
      query: () => "/bookings",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Booking" as const, id })),
              { type: "Booking", id: "LIST" },
            ]
          : [{ type: "Booking", id: "LIST" }],
    }),

    // Get a single booking by ID
    getBookingById: builder.query<Booking, string>({
      query: (id) => `/bookings/${id}`,
      providesTags: (result, error, id) => [{ type: "Booking", id }],
    }),

    // Get bookings for a specific user
    getUserBookings: builder.query<Booking[], string>({
      query: (userId) => `/bookings?userId=${userId}`,
      providesTags: (result, error, userId) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "Booking" as const,
                id: id,
              })),
              { type: "Booking", id: `USER-${userId}` },
            ]
          : [{ type: "Booking", id: `USER-${userId}` }],
    }),

    // Create a new booking
    createBooking: builder.mutation<Booking, CreateBookingRequest>({
      query: (booking) => ({
        url: "/bookings",
        method: "POST",
        body: booking,
      }),
      invalidatesTags: [{ type: "Booking", id: "LIST" }],
    }),

    // Update a booking
    updateBooking: builder.mutation<
      Booking,
      { id: string; data: Partial<Booking> }
    >({
      query: ({ id, data }) => ({
        url: `/bookings/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Booking", id }],
    }),

    // Cancel/Delete a booking
    cancelBooking: builder.mutation<void, string>({
      query: (id) => ({
        url: `/bookings/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Booking", id }],
    }),
  }),
});

export const {
  useGetAllBookingsQuery,
  useGetBookingByIdQuery,
  useGetUserBookingsQuery,
  useCreateBookingMutation,
  useUpdateBookingMutation,
  useCancelBookingMutation,
} = bookingsApi;
