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
interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

interface ChangePasswordResponse {
  message: string;
}
interface AddPhoneRequest {
  phoneNumber: string;
  countryCode?: string;
}
interface AddPhoneResponse {
  message: string;
  user: UserProfile;
}
interface DeleteAccountResponse {
  message: string;
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
     // New endpoints for settings
    changePassword: builder.mutation<ChangePasswordResponse, ChangePasswordRequest>({
      query: (body) => ({
        url: '/users/password/change',
        method: 'POST',
        body,
      }),
    }),
     addMobileNumber: builder.mutation<AddPhoneResponse, AddPhoneRequest>({
      query: (body) => ({
        url: '/users/phone',
        method: 'POST',
        body,
      }),
      invalidatesTags: ["User"],
    }),
    deleteAccount: builder.mutation<DeleteAccountResponse, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUserByIdQuery,
  useUpdateUserByIdMutation,
  useChangePasswordMutation,
  useAddMobileNumberMutation,
  useDeleteAccountMutation,
} = userApi;
