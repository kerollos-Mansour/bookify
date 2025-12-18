import { apiSlice } from "./apiSlice";
import { Room } from "../../types";

interface RoomsApiResponse {
  status: string;
  data: {
    rooms: Room[];
  };
}

interface SingleRoomApiResponse {
  status: string;
  data: {
    room: Room;
  };
}

export const roomsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all rooms for a specific hotel
    getRoomsByHotelId: builder.query<Room[], string>({
      query: (hotelId) => `/rooms/hotel/${hotelId}`,
      transformResponse: (response: RoomsApiResponse) => {
        return response.data?.rooms ?? [];
      },
      providesTags: (result, error, hotelId) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Room" as const, id })),
              { type: "Room", id: `HOTEL-${hotelId}` },
            ]
          : [{ type: "Room", id: `HOTEL-${hotelId}` }],
    }),

    // Get rooms by status for a hotel
    getRoomsByStatus: builder.query<
      Room[],
      { hotelId: string; status: string }
    >({
      query: ({ hotelId, status }) =>
        `/rooms/hotel/${hotelId}/status/${status}`,
      transformResponse: (response: RoomsApiResponse) => {
        return response.data?.rooms ?? [];
      },
      providesTags: (result, error, { hotelId, status }) => [
        { type: "Room", id: `HOTEL-${hotelId}-${status}` },
      ],
    }),

    // Get a single room by ID
    getRoomById: builder.query<Room, string>({
      query: (roomId) => `/rooms/${roomId}`,
      providesTags: (result, error, id) => [{ type: "Room", id }],
    }),

    // Create a new room (admin only)
    createRoom: builder.mutation<Room, Partial<Room>>({
      query: (room) => ({
        url: "/rooms",
        method: "POST",
        body: room,
      }),
      invalidatesTags: [{ type: "Room", id: "LIST" }],
    }),

    // Update a room (admin only)
    updateRoom: builder.mutation<Room, { roomId: string; data: Partial<Room> }>(
      {
        query: ({ roomId, data }) => ({
          url: `/rooms/${roomId}`,
          method: "PUT",
          body: data,
        }),
        invalidatesTags: (result, error, { roomId }) => [
          { type: "Room", id: roomId },
        ],
      }
    ),

    // Delete a room (admin only)
    deleteRoom: builder.mutation<void, string>({
      query: (roomId) => ({
        url: `/rooms/${roomId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Room", id }],
    }),
  }),
});

export const {
  useGetRoomsByHotelIdQuery,
  useGetRoomsByStatusQuery,
  useGetRoomByIdQuery,
  useCreateRoomMutation,
  useUpdateRoomMutation,
  useDeleteRoomMutation,
} = roomsApi;
