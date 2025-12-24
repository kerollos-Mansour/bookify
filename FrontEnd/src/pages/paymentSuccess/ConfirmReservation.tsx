import React from "react";
import { Logo, ProgressSteps } from "./PaymentSuccess";
import PageTransition from "../../components/pageTransition/pageTransition";


export default function ConfirmReservation() {
  return (
    <PageTransition>

      <div className="min-h-screen bg-background flex flex-col items-center pt-6 px-4 transition-colors duration-300">
        <Logo />
        <ProgressSteps currentStep={3} />

        <div className="text-center mb-8">
          <h2 className="text-[34px] font-bold text-foreground mb-2">
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
          <p className="text-blue-500 text-[15px] mb-1">
            Please check your email & phone Message.
          </p>
          <p className="text-blue-500 text-[15px]">
            We have sent all the information
          </p>
        </div>

        <button className="w-64 bg-card border-2 border-card-border text-muted-foreground py-3 rounded-lg font-medium mb-10 hover:bg-accent transition">
          Go to Dashboard
        </button>
      </div>
    </PageTransition>
  );
}