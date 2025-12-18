// Coupon interface
export interface Coupon {
  id: string; // Using 'id' to match backend
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  validTo: string;
  validFrom?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateCouponRequest {
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  validTo: string;
  validFrom?: string;
}