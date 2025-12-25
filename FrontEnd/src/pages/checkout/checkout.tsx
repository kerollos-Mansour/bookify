import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation, Navigate } from "react-router-dom";
import CheckoutForm from "./checkoutForm";
import { MoveLeft } from "lucide-react";
import { Link } from "react-router-dom";

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLIC_KEY 
);

export default function Checkout() {
  const location = useLocation();
  const { clientSecret, bookingId } = location.state || {};

  if (!clientSecret) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Missing Payment Information
          </h2>
          <p className="text-gray-600 mb-6">
            Please start your booking from the property page.
          </p>
          <Link
            to="/"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  const options = {
    clientSecret,
    appearance: {
      theme: "stripe",
      variables: {
        colorPrimary: "#2563eb",
      },
    } as const,
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link
            to={-1 as any}
            className="inline-flex items-center text-gray-500 hover:text-gray-700 transition-colors"
          >
            <MoveLeft className="w-4 h-4 mr-2" />
            Back
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-8 py-6 bg-blue-600">
            <h1 className="text-2xl font-bold text-white">Secure Checkout</h1>
            <p className="text-blue-100 mt-1">
              Complete your payment to confirm booking #
              {bookingId?.slice(-6).toUpperCase()}
            </p>
          </div>

          <div className="p-8">
            <Elements stripe={stripePromise} options={options}>
              <CheckoutForm />
            </Elements>
          </div>

          <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-center gap-2 text-sm text-gray-500">
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            Your payment information is encrypted and secure
          </div>
        </div>
      </div>
    </div>
  );
}
