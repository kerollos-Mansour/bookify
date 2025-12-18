

// Payment interface
export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: string;
  clientSecret?: string;
}

export interface CreatePaymentIntentRequest {
  amount: number;
  currency: string;
  userId: string;
  hotelId: string;
  roomId: string;
}
