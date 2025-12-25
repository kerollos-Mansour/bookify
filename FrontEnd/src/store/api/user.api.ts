import { apiSlice } from "./apiSlice";
import {
  User,
  UpdateUserRequest,
  ChangePasswordRequest,
  ChangePasswordResponse,
} from "../../types/user.type";

// Response interfaces
interface UserResponse {
  message: string;
  user: User;
}

interface DeleteAccountResponse {
  message: string;
}

interface GetAllUsersResponse {
  page: number;
  limit: number;
  totalUsers: number;
  totalPages: number;
  users: User[];
}

/**
 * User API endpoints for managing user data
 * Provides CRUD operations and account management
 */
export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<
      GetAllUsersResponse,
      { page?: number; limit?: number }
    >({
      query: ({ page = 1, limit = 10 }) => `/users?page=${page}&limit=${limit}`,
      providesTags: ["User"],
    }),

    getUserById: builder.query<User, string>({
      query: (id) => `/users/${id}`,
      transformResponse: (response: UserResponse) => response.user,
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),

    createUser: builder.mutation<User, Partial<User>>({
      query: (body) => ({
        url: "/users",
        method: "POST",
        body,
      }),
      transformResponse: (response: { status: string; data: User }) =>
        response.data,
      invalidatesTags: ["User"],
    }),

    updateUserById: builder.mutation<
      User,
      { id: string; body: UpdateUserRequest }
    >({
      query: ({ id, body }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body,
      }),
      transformResponse: (response: UserResponse) => response.user,
      invalidatesTags: (result, error, { id }) => [
        { type: "User", id },
        "User",
      ],
    }),

    // Delete User
    deleteUser: builder.mutation<DeleteAccountResponse, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),

    // Change Password
    changePassword: builder.mutation<
      ChangePasswordResponse,
      ChangePasswordRequest
    >({
      query: (body) => ({
        url: "/users/password/change",
        method: "POST",
        body,
      }),
    }),

    // Change User Role
    changeUserRole: builder.mutation<
      User,
      { id: string; role: "user" | "admin" }
    >({
      query: ({ id, role }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: { role },
      }),
      transformResponse: (response: UserResponse) => response.user,
      invalidatesTags: (result, error, { id }) => [
        { type: "User", id },
        "User",
      ],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserByIdMutation,
  useDeleteUserMutation,
  useChangePasswordMutation,
  useChangeUserRoleMutation,
} = userApi;
