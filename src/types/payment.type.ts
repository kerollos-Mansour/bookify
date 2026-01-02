// Payment interface
export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: string;
  clientSecret?: string;
}

export interface CreatePaymentIntentRequest {
  bookingId: string;
  currency?: string;
}
