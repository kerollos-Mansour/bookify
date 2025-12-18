import { apiSlice } from "./apiSlice";

export interface UserProfile {
  _id: string;
  username?: string;
  name?: string;
  email?: string;
  role?: string;
  phoneNo?: string;
  bio?: string;
  dateOfBirth?: string;
  gender?: string;
  phone?: string;
  address?: string;
  accessibilityNeeds?: string;
  emergencyContact?: string;
}

interface ProfileResponse {
  message: string;
  user: UserProfile;
}
export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch user by ID
    getUserById: builder.query<UserProfile, string>({
      query: (id) => `/users/${id}`, // <-- use the user ID here
transformResponse: (response: ProfileResponse) => response.user,
      providesTags: ["User"],
    }),

    // Update user by ID
    updateUserById: builder.mutation<UserProfile, { id: string; body: Partial<UserProfile> }>({
      query: ({ id, body }) => ({
        url: `/users/${id}`, // <-- use the user ID here
        method: "PUT",
        body,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUserByIdQuery,
  useUpdateUserByIdMutation,
} = userApi;
