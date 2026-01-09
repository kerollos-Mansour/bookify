import {
  Flight,
  FlightBooking,
  FlightSearchParams,
  PopularRoute,
} from "../../types/flight.types";
import { apiSlice } from "../../store/api/apiSlice";

interface FlightsApiResponse {
  data: {
    flights: Flight[];
    page: number;
    totalPages: number;
    totalFlights: number;
  };
}

interface FlightApiResponse {
  data: {
    flight: Flight;
  };
}

interface FlightBookingsApiResponse {
  data: {
    bookings: FlightBooking[];
    page: number;
    totalPages: number;
    totalBookings: number;
  };
}

interface FlightBookingApiResponse {
  data: {
    booking: FlightBooking;
  };
}

interface PopularRoutesApiResponse {
  data: {
    routes: PopularRoute[];
  };
}

export const flightApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    searchFlights: builder.query<
      Flight[],
      FlightSearchParams & { page?: number; limit?: number; sort?: string }
    >({
      query: (params) => ({
        url: `/flights`,
        params,
      }),
      transformResponse: (response: FlightsApiResponse) => {
        return response.data.flights;
      },
      providesTags: ["Flight"],
    }),

    getFlightById: builder.query<Flight, string>({
      query: (id) => `/flights/${id}`,
      transformResponse: (response: FlightApiResponse) => {
        return response.data.flight;
      },
      providesTags: (result, error, id) => [{ type: "Flight" as const, id }],
    }),

    getPopularRoutes: builder.query<PopularRoute[], number>({
      query: (limit = 10) => `/flights/popular-routes?limit=${limit}`,
      transformResponse: (response: PopularRoutesApiResponse) => {
        return response.data.routes;
      },
    }),

    getFilterFacets: builder.query<
      any,
      { origin?: string; destination?: string; departureDate?: string }
    >({
      query: (params) => ({
        url: `/flights/filter-facets`,
        params,
      }),
      transformResponse: (response: any) => {
        return response.data.facets;
      },
    }),

    // Flight Bookings
    getFlightBookings: builder.query<FlightBooking[], any>({
      query: (params) => ({
        url: `/flight-bookings`,
        params,
      }),
      transformResponse: (response: FlightBookingsApiResponse) => {
        return response.data.bookings;
      },
      providesTags: ["FlightBooking"],
    }),

    getMyFlightBookings: builder.query<FlightBooking[], void>({
      query: () => `/flight-bookings/user/me`,
      transformResponse: (response: FlightBookingsApiResponse) => {
        return response.data.bookings;
      },
      providesTags: ["FlightBooking"],
    }),

    getFlightBookingById: builder.query<FlightBooking, string>({
      query: (id) => `/flight-bookings/${id}`,
      transformResponse: (response: FlightBookingApiResponse) => {
        return response.data.booking;
      },
      providesTags: (result, error, id) => [
        { type: "FlightBooking" as const, id },
      ],
    }),

    createFlightBooking: builder.mutation<
      FlightBooking,
      Partial<FlightBooking>
    >({
      query: (bookingData) => ({
        url: `/flight-bookings`,
        method: "POST",
        body: bookingData,
      }),
      transformResponse: (response: FlightBookingApiResponse) => {
        return response.data.booking;
      },
      invalidatesTags: ["FlightBooking", "Flight"],
    }),

    updateFlightBooking: builder.mutation<
      FlightBooking,
      { id: string; data: Partial<FlightBooking> }
    >({
      query: ({ id, data }) => ({
        url: `/flight-bookings/${id}`,
        method: "PUT",
        body: data,
      }),
      transformResponse: (response: FlightBookingApiResponse) => {
        return response.data.booking;
      },
      invalidatesTags: (result, error, { id }) => [
        { type: "FlightBooking" as const, id },
        "FlightBooking",
        "Flight",
      ],
    }),

    cancelFlightBooking: builder.mutation<
      FlightBooking,
      { id: string; reason?: string }
    >({
      query: ({ id, reason }) => ({
        url: `/flight-bookings/${id}`,
        method: "PUT",
        body: {
          status: "cancelled",
          cancellationReason: reason,
        },
      }),
      transformResponse: (response: FlightBookingApiResponse) => {
        return response.data.booking;
      },
      invalidatesTags: (result, error, { id }) => [
        { type: "FlightBooking" as const, id },
        "FlightBooking",
        "Flight",
      ],
    }),

    createPaymentIntent: builder.mutation<
      { clientSecret: string },
      { bookingId: string; bookingType: "flight" | "hotel"; currency?: string }
    >({
      query: (data) => ({
        url: `/payments/stripe/create-intent`,
        method: "POST",
        body: data,
      }),
      transformResponse: (response: { data: { clientSecret: string } }) => {
        return response.data;
      },
    }),
  }),
});

export const {
  useSearchFlightsQuery,
  useGetFlightByIdQuery,
  useGetPopularRoutesQuery,
  useGetFilterFacetsQuery,
  useGetFlightBookingsQuery,
  useGetMyFlightBookingsQuery,
  useGetFlightBookingByIdQuery,
  useCreateFlightBookingMutation,
  useUpdateFlightBookingMutation,
  useCancelFlightBookingMutation,
  useCreatePaymentIntentMutation,
} = flightApi;
