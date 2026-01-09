import { apiSlice } from "./apiSlice";
import { Coupon, CouponsResponse, CreateCouponRequest } from "../../types";

export const couponsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all coupons
    getAllCoupons: builder.query<Coupon[], void>({
      query: () => "/coupons",
      transformResponse: (response: CouponsResponse) => {
        console.log("Raw API response:", response); // DEBUG - check this!
        return response.data.coupons;
      },
      providesTags: (result) =>
        result
          ? [
            ...result.map(({ _id }) => ({ type: "Coupon" as const, _id })),
            { type: "Coupon", id: "LIST" },
          ]
          : [{ type: "Coupon", id: "LIST" }],
    }),

    // Get coupon by code
    getCouponByCode: builder.query<Coupon, string>({
      query: (code) => `/coupons?search=${code}`,
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
  useLazyGetAllCouponsQuery,
  useGetCouponByCodeQuery,
  useLazyGetCouponByCodeQuery,
  useCreateCouponMutation,
  useDeleteCouponMutation,
} = couponsApi;
