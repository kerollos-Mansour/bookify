import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle, Home, Loader2 } from "lucide-react";
import PageTransition from "../../components/pageTransition/pageTransition";
import { useStripe } from "@stripe/react-stripe-js";

// Re-export common components for ConfirmReservation if it still imports them
export function Logo() {
  return (
    <>
      <h1 className="text-2xl font-semibold mb-5 text-center">
        <img src="/full-logo.png" alt="Expedia" className="w-40 mx-auto" />
      </h1>
      <div className="w-full h-[1px] bg-gray-300 mb-8"></div>
    </>
  );
}

export function ProgressSteps({ currentStep }: { currentStep: number }) {
  const steps = [1, 2, 3];

  return (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => (
        <React.Fragment key={step}>
          <div
            className={`${
              currentStep > step
                ? "bg-blue-600 text-white"
                : currentStep === step
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-400"
            } w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-300`}
          >
            {currentStep > step ? <CheckCircle className="w-6 h-6" /> : step}
          </div>
          {index < steps.length - 1 && (
            <div
              className={`w-16 md:w-24 h-1 transition-colors duration-300 ${
                currentStep > step ? "bg-blue-600" : "bg-gray-200"
              }`}
            ></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "success"
  ); 


  const redirectStatus = searchParams.get("redirect_status");

  useEffect(() => {
    if (redirectStatus) {
      if (redirectStatus === "succeeded") {
        setStatus("success");
      } else {
        setStatus("error");
      }
    }
  }, [redirectStatus]);

  if (status === "error") {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center pt-20 px-4">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Payment Failed</h2>
        <p className="text-gray-600 mb-8">
          Something went wrong with your payment.
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-white flex flex-col items-center pt-6 px-4">
        <Logo />
        <ProgressSteps currentStep={3} />

        <div className="text-center mb-8 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-3">
            Payment Completed!
          </h2>
          <p className="text-gray-500 text-lg">
            Your booking has been confirmed successfully.
          </p>
        </div>

        <div className="relative flex items-center justify-center mb-10 group">
          <div className="absolute inset-0 bg-blue-100 rounded-full filter blur-3xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
          <img
            src="/Confirm-reservation.png"
            alt="Success Illustration"
            className="relative w-64 md:w-[400px] h-auto mx-auto object-contain transform group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="text-center mb-12 max-w-md mx-auto space-y-2">
          <p className="text-blue-600 font-medium text-lg">
            Please check your email & phone messages.
          </p>
          <p className="text-gray-500">
            We have sent all the confirmation details and itinerary to your
            inbox.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
          <button
            onClick={() => navigate("/account")}
            className="flex-1 bg-white border-2 border-gray-200 text-gray-700 py-3.5 rounded-xl font-bold hover:bg-gray-50 hover:border-gray-300 transition-all text-center"
          >
            View Booking
          </button>
          <button
            onClick={() => navigate("/")}
            className="flex-1 bg-blue-600 text-white py-3.5 rounded-xl font-bold hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Go to Home
          </button>
        </div>
      </div>
    </PageTransition>
  );
}
