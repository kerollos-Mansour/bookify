import { AuthResponse, LoginRequest, RegisterRequest } from "types/auth.type";
import { apiSlice } from "./apiSlice";
import { storage } from "../../utils/storage";

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse["data"], LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      transformResponse: (response: any) => {
        if (response.data) {
          storage.setToken(response.data.accessToken);
          storage.setRefreshToken(response.data.refreshToken);
          storage.setUser(response.data.user);
          return response.data;
        }
        return response;
      },
    }),

    register: builder.mutation<AuthResponse["data"], RegisterRequest>({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: credentials,
      }),
      transformResponse: (response: any) => {
        if (response.data) {
          storage.setToken(response.data.accessToken);
          storage.setRefreshToken(response.data.refreshToken);
          storage.setUser(response.data.user);
          return response.data;
        }
        return response;
      },
    }),

    forgotPassword: builder.mutation<{ message: string }, { email: string }>({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: data,
      }),
    }),

    resetPassword: builder.mutation<
      { message: string },
      { token: string; password: string }
    >({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
      }),
    }),
  }),
});
export const {
  useLoginMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
