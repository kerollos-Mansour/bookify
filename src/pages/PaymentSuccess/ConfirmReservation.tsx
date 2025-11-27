import React from "react";
import { Logo, ProgressSteps } from "./paymentSuccess";


export default function ConfirmReservation() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-6 px-4">
      <Logo />
      <ProgressSteps currentStep={3} />

      <div className="text-center mb-8">
        <h2 className="text-[34px] font-bold text-blue-900 mb-2">
          Payment Completed
        </h2>
      </div>

      <div className="flex items-center justify-center mb-8">
        <img
        src="Confirm-reservation.png"
        alt="Payment Illustration"
        className="w-[350px] mx-auto mb-6 select-none pointer-events-none"
      />
      </div>

      <div className="text-center mb-10">
        <p className="text-blue-600 text-[15px] mb-1">
          Please check your email & phone Message.
        </p>
        <p className="text-blue-600 text-[15px]">
          We have sent all the information
        </p>
      </div>

      <button className="w-64 bg-white border-2 border-gray-300 text-gray-400 py-3 rounded-lg font-medium mb-10">
        Go to Dashboard
      </button>
    </div>
  );
}