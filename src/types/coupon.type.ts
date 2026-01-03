// Coupon interface
export interface Coupon {
  _id: string;
  code: string;
  discountValue: number;
  validTo: string;
  validFrom?: string;
  minPurchase?: number;
  maxDiscount?: number;
  isActive: boolean;
  discountType:
  | "percentage"
  | "fixed_amount"
  | "free_night"
  | "early_bird"
  | "last_minute"
  | "long_stay"
  | "weekday_discount"
  | "weekend_discount"
  | "seasonal"
  | "loyalty_tier"
  | "bundle_discount";
  usedCount: number | null;
  usageLimit: number;
}
export interface CreateCouponRequest {
  code: string;
  discountType: "percentage" | "fixed_amount";
  discountValue: number;
  validTo: string;
  validFrom?: string;
}

export interface CouponsResponse {
  success: boolean;
  data: {
    coupons: Coupon[];
    page: number;
    totalCoupons: number;
    totalPages: number;
  };
}
