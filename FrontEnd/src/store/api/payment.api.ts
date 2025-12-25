import { apiSlice } from "./apiSlice";
import { PaymentIntent, CreatePaymentIntentRequest } from "../../types";

export const paymentsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Create payment intent
    createPaymentIntent: builder.mutation<
      PaymentIntent,
      CreatePaymentIntentRequest
    >({
      query: (paymentData) => ({
        url: "/payments/stripe/create-intent",
        method: "POST",
        body: paymentData,
      }),
      invalidatesTags: ["Payment"],
    }),

    // Get payment status
    getPaymentStatus: builder.query<PaymentIntent, string>({
      query: (paymentIntentId) => `/payments/${paymentIntentId}`,
      providesTags: (result, error, id) => [{ type: "Payment", id }],
    }),
  }),
});

export const { useCreatePaymentIntentMutation, useGetPaymentStatusQuery } =
  paymentsApi;
