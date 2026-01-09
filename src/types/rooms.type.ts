// Amenity interface
export interface Amenity {
  _id: string;
  name: string;
  description?: string;
  icon: string;
  category: "room" | "hotel";
}

export interface RefundableInfo {
  isRefundable: boolean;
  deadline?: string;
}

export interface PriceInfo {
  original: number;
  discounted: number;
  discount: number;
  currency: string;
}

export interface Room {
  id?: string;
  _id: string;
  hotelId?: any;
  name: string;
  images: string[];
  amenities: Amenity[];
  size: string;
  sleeps: number;
  bedType: string;
  allInclusive: boolean;
  bedrooms?: number;
  refundable: RefundableInfo;
  price: PriceInfo;
}

export interface Filter {
  id: string;
  label: string;
  beds?: number | null;
  amenity?: string;
  refundable?: boolean;
}

// Mock Data / Config
export const FILTERS: Filter[] = [
  { id: "all", label: "All rooms", beds: null },
  { id: "1bed", label: "1 bed", beds: 1 },
  { id: "2beds", label: "2 beds", beds: 2 },
  { id: "refundable", label: "Fully refundable", refundable: true },
  { id: "breakfast", label: "Breakfast included", amenity: "Breakfast Included" },
];
