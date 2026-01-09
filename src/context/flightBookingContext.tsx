import React, { createContext, useContext, useState, ReactNode } from "react";
import { Flight } from "../types/flight.types";

interface PassengerInfo {
  type: "adult" | "child" | "infant";
  title: "Mr" | "Mrs" | "Ms" | "Miss" | "Dr";
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  passportNumber?: string;
  nationality?: string;
}

interface FlightBookingState {
  // Search Parameters
  searchParams: {
    origin: string;
    destination: string;
    departureDate: string;
    returnDate?: string;
    passengers: number;
    classOfService: "economy" | "business" | "firstClass";
  };

  // Selected Flights
  departingFlight: Flight | null;
  departingClass: "economy" | "business" | "firstClass" | null;
  returningFlight: Flight | null;
  returningClass: "economy" | "business" | "firstClass" | null;

  // Passenger Information
  passengers: PassengerInfo[];
  contactEmail: string;
  contactPhone: string;

  // Booking Flow
  currentStep: "departing" | "returning" | "passengers" | "review";
}

interface FlightBookingContextType {
  state: FlightBookingState;
  setSearchParams: (params: FlightBookingState["searchParams"]) => void;
  selectDepartingFlight: (
    flight: Flight,
    classOfService: "economy" | "business" | "firstClass"
  ) => void;
  selectReturningFlight: (
    flight: Flight,
    classOfService: "economy" | "business" | "firstClass"
  ) => void;
  setPassengers: (passengers: PassengerInfo[]) => void;
  setContactInfo: (email: string, phone: string) => void;
  setCurrentStep: (step: FlightBookingState["currentStep"]) => void;
  getTotalPrice: () => number;
  reset: () => void;
}

const FlightBookingContext = createContext<
  FlightBookingContextType | undefined
>(undefined);

const initialState: FlightBookingState = {
  searchParams: {
    origin: "",
    destination: "",
    departureDate: "",
    returnDate: "",
    passengers: 1,
    classOfService: "economy",
  },
  departingFlight: null,
  departingClass: null,
  returningFlight: null,
  returningClass: null,
  passengers: [],
  contactEmail: "",
  contactPhone: "",
  currentStep: "departing",
};

export function FlightBookingProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<FlightBookingState>(initialState);

  const setSearchParams = (params: FlightBookingState["searchParams"]) => {
    setState((prev) => ({ ...prev, searchParams: params }));
  };

  const selectDepartingFlight = (
    flight: Flight,
    classOfService: "economy" | "business" | "firstClass"
  ) => {
    setState((prev) => ({
      ...prev,
      departingFlight: flight,
      departingClass: classOfService,
      currentStep: prev.searchParams.returnDate ? "returning" : "passengers",
    }));
  };

  const selectReturningFlight = (
    flight: Flight,
    classOfService: "economy" | "business" | "firstClass"
  ) => {
    setState((prev) => ({
      ...prev,
      returningFlight: flight,
      returningClass: classOfService,
      currentStep: "passengers",
    }));
  };

  const setPassengers = (passengers: PassengerInfo[]) => {
    setState((prev) => ({ ...prev, passengers }));
  };

  const setContactInfo = (email: string, phone: string) => {
    setState((prev) => ({
      ...prev,
      contactEmail: email,
      contactPhone: phone,
    }));
  };

  const setCurrentStep = (step: FlightBookingState["currentStep"]) => {
    setState((prev) => ({ ...prev, currentStep: step }));
  };

  const getTotalPrice = () => {
    let total = 0;

    if (state.departingFlight && state.departingClass) {
      const price = state.departingFlight.pricing[state.departingClass].price;
      total += price * state.searchParams.passengers;
    }

    if (state.returningFlight && state.returningClass) {
      const price = state.returningFlight.pricing[state.returningClass].price;
      total += price * state.searchParams.passengers;
    }

    return total;
  };

  const reset = () => {
    setState(initialState);
  };

  const value: FlightBookingContextType = {
    state,
    setSearchParams,
    selectDepartingFlight,
    selectReturningFlight,
    setPassengers,
    setContactInfo,
    setCurrentStep,
    getTotalPrice,
    reset,
  };

  return (
    <FlightBookingContext.Provider value={value}>
      {children}
    </FlightBookingContext.Provider>
  );
}

export function useFlightBooking() {
  const context = useContext(FlightBookingContext);
  if (context === undefined) {
    throw new Error(
      "useFlightBooking must be used within a FlightBookingProvider"
    );
  }
  return context;
}
