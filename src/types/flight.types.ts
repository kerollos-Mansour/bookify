export interface Airport {
  code: string;
  name: string;
  city: string;
  country: string;
  terminal?: string;
}

export interface FlightLeg {
  airport: Airport;
  dateTime: string;
}

export interface Layover {
  airport: {
    code: string;
    name: string;
    city: string;
  };
  duration: number;
}

export interface PricingClass {
  available: boolean;
  price: number;
  availableSeats: number;
}

export interface FlightPricing {
  economy: PricingClass;
  business: PricingClass;
  firstClass: PricingClass;
}

export interface Baggage {
  cabin: {
    weight: number;
    pieces: number;
  };
  checked: {
    weight: number;
    pieces: number;
    included: boolean;
  };
}

export type FlightAmenity =
  | "wifi"
  | "meals"
  | "entertainment"
  | "power-outlets"
  | "extra-legroom"
  | "priority-boarding";
export type FlightStatus = "scheduled" | "delayed" | "cancelled" | "completed";
export type ClassOfService = "economy" | "business" | "firstClass";

export interface Flight {
  _id: string;
  airline: string;
  flightNumber: string;
  aircraft?: string;
  departure: FlightLeg;
  arrival: FlightLeg;
  duration: number;
  stops: number;
  layovers?: Layover[];
  pricing: FlightPricing;
  status: FlightStatus;
  amenities: FlightAmenity[];
  baggage: Baggage;
  refundable: boolean;
  featured: boolean;
  ownerId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Passenger {
  _id?: string;
  type: "adult" | "child" | "infant";
  title: "Mr" | "Mrs" | "Ms" | "Miss" | "Dr";
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  passportNumber?: string;
  nationality?: string;
}

export interface SeatSelection {
  passengerId: string;
  seatNumber: string;
}

export interface MealPreference {
  passengerId: string;
  preference:
    | "vegetarian"
    | "vegan"
    | "halal"
    | "kosher"
    | "glutenFree"
    | "none";
}

export interface ExtraBaggage {
  pieces: number;
  cost: number;
}

export type BookingStatus =
  | "pending"
  | "confirmed"
  | "cancelled"
  | "completed"
  | "checked-in";
export type PaymentStatus =
  | "unpaid"
  | "pending"
  | "paid"
  | "refunded"
  | "failed";

export interface FlightBooking {
  _id: string;
  userId: string;
  flightId: string | Flight;
  bookingNumber: string;
  pnr?: string;
  passengers: Passenger[];
  classOfService: ClassOfService;
  seats?: SeatSelection[];
  basePrice: number;
  taxes: number;
  fees: number;
  totalPrice: number;
  currency: string;
  extraBaggage?: ExtraBaggage;
  mealPreferences?: MealPreference[];
  specialRequests?: string;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: "stripe" | "paypal" | "cash" | "other";
  paymentIntentId?: string;
  couponId?: string;
  contactEmail: string;
  contactPhone: string;
  cancellationReason?: string;
  cancelledAt?: string;
  refundAmount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface FlightSearchParams {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  passengers: number;
  classOfService?: ClassOfService;
  stops?: "direct" | "one" | "multiple";
  minPrice?: number;
  maxPrice?: number;
  airline?: string;
}

export interface PopularRoute {
  _id: {
    from: string;
    to: string;
    fromCode: string;
    toCode: string;
  };
  count: number;
  minPrice: number;
  airlines: string[];
}
