// Coupon interface
export interface Coupon {
  _id: string;
  code: string;
  discountValue: number;
  discountType: "percentage" | "fixed";
  validTo: string;
  validFrom?: string;
  minPurchase?: number;
  maxDiscount?: number;
  isActive: boolean;
  usedCount: number | null;
  usageLimit: number;
}
export interface CreateCouponRequest {
  code: string;
  discountType: "percentage" | "fixed";
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
