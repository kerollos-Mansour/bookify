import { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {
  useLocation,
  Navigate,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import CheckoutForm from "./checkoutForm";
import { MoveLeft, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useFlightBooking } from "../../context/flightBookingContext";
import {
  useCreateFlightBookingMutation,
  useCreatePaymentIntentMutation,
} from "../../store/api/flights.api";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");

  // Get authenticated user
  const user = useSelector((state: RootState) => state.auth.user);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  // Hotel booking state (passed via navigation state)
  const { clientSecret: hotelClientSecret, bookingId: hotelBookingId } =
    location.state || {};

  // Flight booking context
  const { state: flightState, getTotalPrice } = useFlightBooking();
  const { passengers, contactEmail, contactPhone } = flightState;
  const [createFlightBooking] = useCreateFlightBookingMutation();
  const [createPaymentIntent] = useCreatePaymentIntentMutation();

  const [clientSecret, setClientSecret] = useState(hotelClientSecret);
  const [bookingId, setBookingId] = useState(hotelBookingId);
  const [isLoading, setIsLoading] = useState(type === "flight");
  const [error, setError] = useState("");

  useEffect(() => {
    const initFlightBooking = async () => {
      if (type !== "flight" || clientSecret) return;

      // Check authentication
      if (!isAuthenticated || !user) {
        navigate("/login", {
          state: { from: location.pathname + location.search },
        });
        return;
      }

      if (!flightState.departingFlight || !passengers.length) {
        setError("Missing flight booking information");
        setIsLoading(false);
        return;
      }

      try {
        // Calculate pricing
        const totalPrice = getTotalPrice();
        const basePrice = totalPrice * 0.9; // 90% base, 10% fees
        const fees = totalPrice - basePrice;

        // 1. Create flight booking with all required fields
        const bookingData = {
          flightId: flightState.departingFlight._id,
          passengers,
          contactEmail,
          contactPhone,
          classOfService: flightState.departingClass,
          returnFlightId: flightState.returningFlight?._id,
          returnClassOfService: flightState.returningClass,
          basePrice: basePrice,
          fees: fees,
          totalPrice: totalPrice,
          currency: "USD",
          paymentMethod: "stripe" as const,
        };

        const bookingResponse = await createFlightBooking(bookingData).unwrap();

        // Extract booking ID from response
        const responseData = (bookingResponse as any).data || bookingResponse;
        const createdBooking = responseData.booking || responseData;
        const bookingId = createdBooking._id || createdBooking.id;

        if (!bookingId) {
          throw new Error("Failed to get booking ID");
        }

        setBookingId(bookingId);

        // 2. Create payment intent
        const paymentResponse = await createPaymentIntent({
          bookingId,
          bookingType: "flight",
          currency: "usd",
        }).unwrap();

        const secret =
          (paymentResponse as any).data?.clientSecret ||
          (paymentResponse as any).clientSecret;

        if (!secret) {
          throw new Error("Failed to initialize payment");
        }

        setClientSecret(secret);
      } catch (err: any) {
        console.error("Booking failed:", err);
        setError(err.data?.message || "Failed to initialize booking");
      } finally {
        setIsLoading(false);
      }
    };

    initFlightBooking();
  }, [
    type,
    flightState,
    passengers,
    createFlightBooking,
    createPaymentIntent,
    isAuthenticated,
    user,
    navigate,
    location,
  ]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <Loader2 className="w-10 h-10 animate-spin text-blue-600 mx-auto" />
          <p className="text-muted-foreground">
            Preparing your secure checkout...
          </p>
        </div>
      </div>
    );
  }

  if (error || !clientSecret) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {error || "Missing Payment Information"}
          </h2>
          <p className="text-muted-foreground mb-6">
            {error
              ? "Please try again or start over."
              : "Please start your booking from the property page."}
          </p>
          <Link
            to={type === "flight" ? "/flights/search" : "/"}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Return to Search
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
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link
            to={-1 as any}
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <MoveLeft className="w-4 h-4 mr-2" />
            Back
          </Link>
        </div>

        <div className="bg-card rounded-2xl shadow-xl overflow-hidden">
          <div className="px-8 py-6 bg-blue-600">
            <h1 className="text-2xl font-bold text-white">Secure Checkout</h1>
            <p className="text-blue-100 mt-1">
              Complete your payment to confirm booking #
              {bookingId?.slice(-6).toUpperCase()}
            </p>
            {type === "flight" && (
              <div className="mt-4 pt-4 border-t border-blue-500/50">
                <div className="flex justify-between items-center text-blue-50">
                  <span>Total Amount</span>
                  <span className="text-xl font-bold text-white">
                    ${getTotalPrice()}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="p-8">
            <Elements stripe={stripePromise} options={options}>
              <CheckoutForm />
            </Elements>
          </div>

          <div className="px-8 py-4 bg-muted border-t border-input-border flex items-center justify-center gap-2 text-sm text-muted-foreground">
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
