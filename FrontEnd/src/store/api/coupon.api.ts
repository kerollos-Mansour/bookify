import { apiSlice } from "./apiSlice";
import { Coupon, CreateCouponRequest } from "../../types";

export const couponsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all coupons
    getAllCoupons: builder.query<Coupon[], void>({
      query: () => "/coupons",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Coupon" as const, id })),
              { type: "Coupon", id: "LIST" },
            ]
          : [{ type: "Coupon", id: "LIST" }],
    }),

    // Get coupon by code
    getCouponByCode: builder.query<Coupon, string>({
      query: (code) => `/coupons?code=${code}`,
      providesTags: (result, error, code) => [{ type: "Coupon", id: code }],
    }),

    // Create coupon
    createCoupon: builder.mutation<Coupon, CreateCouponRequest>({
      query: (coupon) => ({
        url: "/coupons",
        method: "POST",
        body: coupon,
      }),
      invalidatesTags: [{ type: "Coupon", id: "LIST" }],
    }),

    // Delete coupon
    deleteCoupon: builder.mutation<void, string>({
      query: (id) => ({
        url: `/coupons/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Coupon", id }],
    }),
  }),
});

export const {
  useGetAllCouponsQuery,
  useGetCouponByCodeQuery,
  useCreateCouponMutation,
  useDeleteCouponMutation,
} = couponsApi;
