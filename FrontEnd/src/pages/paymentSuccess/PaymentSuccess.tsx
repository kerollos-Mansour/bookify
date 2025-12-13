import React from "react";
import { useNavigate } from "react-router-dom";

interface ProgressStepsProps {
  currentStep: number;
}

export function Logo() {
  return (
    <>
      <h1 className="text-2xl font-semibold mb-5 text-center">
        <img src="/full-logo.png" alt="" className="w-40 mx-auto"/>
      </h1>
      <div className="w-full h-[1px] bg-gray-300 mb-8"></div>
    </>
  );
}

export function ProgressSteps({ currentStep }: ProgressStepsProps) {
  const steps = [1, 2, 3];

  return (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => (
        <React.Fragment key={step}>
          <div
            className={`${
              currentStep > step
                ? "bg-blue-400 text-white"
                : currentStep === step
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-600"
            } w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-lg font-semibold`}
          >
            {currentStep > step ? (
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              step
            )}
          </div>
          {index < steps.length - 1 && (
            <div className="w-20 h-[2px] bg-gray-300"></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default function PaymentSuccess() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-6 px-4">
      <Logo />
      <ProgressSteps currentStep={2} />

      <div className="text-center mb-10">
        <h2 className="text-[34px] font-bold text-blue-900 mb-2">Payment</h2>
        <p className="text-gray-500 text-[15px]">
          Kindly follow the instructions below
        </p>
      </div>

      <div className="w-full max-w-4xl flex p-6 md:p-10 flex-col md:flex-row gap-20 mt-4 ">
        <div className="w-full md:w-1/2 pl-30 flex flex-col justify-start gap-8">
          <p className="text-[18px]  text-[#4B5563]  font-medium">
            Transfer Bookify:
          </p>
          <p className="text-[16px] leading-[1.85] text-[#4B5563]  font-medium">
            2 Days at Blue Origin Fams,
            <br />
            Galle, Sri Lanka
          </p>
          <p className="text-[16px] text-[#4B5563] font-medium">
            Total:
            <span className="font-bold text-blue-900 ml-2">$400 USD</span>
          </p>
          <p className="text-[16px] text-[#4B5563] font-medium">
            Initial Payment:
            <span className="font-bold text-blue-900 ml-2">$200</span>
          </p>
        </div>

        <div className="hidden md:block w-[1px] bg-gray-300 h-68 opacity-70"></div>

        <div className="w-full md:w-1/2 space-y-4">
          <div>
            <label className="block text-[14px] text-gray-600 font-semibold mb-2">
              Card Number
            </label>
            <input
              type="text"
              placeholder="Payment card number"
              className="w-full bg-gray-100 rounded-md px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 outline-none border-0"
            />
          </div>

          <div>
            <label className="block text-[14px] text-gray-600 font-semibold mb-2">
              Bank
            </label>
            <select className="w-full bg-gray-100 rounded-md px-4 py-2.5 text-sm text-gray-400 outline-none border-0 appearance-none">
              <option>Select Bank</option>
            </select>
          </div>

          <div>
            <label className="block text-[14px] text-gray-600 font-semibold mb-2">
              Exp Date
            </label>
            <input
              type="text"
              placeholder="Validation date"
              className="w-full bg-gray-100 rounded-md px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 outline-none border-0"
            />
          </div>

          <div>
            <label className="block text-[14px] text-gray-600 font-semibold mb-2">
              CVV
            </label>
            <input
              type="text"
              placeholder="Beside the card"
              className="w-full bg-gray-100 rounded-md px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 outline-none border-0"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 mt-12 mb-10">
        <button
          onClick={() => navigate("/confirm-reservation")}
          className="w-64 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Pay Now
        </button>
        <button className="w-64 bg-gray-100 text-gray-600 py-3 rounded-lg font-medium">
          Cancel
        </button>
      </div>
    </div>
  );
}
