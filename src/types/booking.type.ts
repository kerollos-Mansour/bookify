// Booking interface matching backend
export interface Booking {
  id: string; // Using 'id' to match backend
  userId: string;
  hotelId: string;
  roomId: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  subTotal: number;
  pricePerNight: number;
  totalPrice: number;
  guests: number;
  currency?: string;
  status?: "pending" | "confirmed" | "cancelled" | "completed" | "no-show";
  couponId?: string;
  paymentStatus?: "unpaid" | "pending" | "paid" | "failed";
  paymentMethod?: "stripe" | "paypal" | "cash" | "other";
  paymentIntentId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateBookingRequest {
  userId: string;
  hotelId: string;
  roomId: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  subTotal: number;
  pricePerNight: number;
  totalPrice: number;
  guests: number;
  currency?: string;
  couponId?: string;
  couponCode?: string;
  paymentMethod: "stripe" | "paypal" | "cash" | "other";
  paymentIntentId?: string;
}
