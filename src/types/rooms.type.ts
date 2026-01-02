// Amenity interface

export interface RoomAmenities {
  breakfast: boolean;
  parking: boolean;
  size: string;
  sleeps: number;
  bedType: string;
  allInclusive: boolean;
  wifi: boolean;
  bedrooms?: number;
}

export interface RefundableInfo {
  isRefundable: boolean;
  deadline: string;
}

export interface PriceInfo {
  original: number;
  discounted: number;
  discount: number;
  currency: string;
}

export interface Room {
  id: string;
  hotelId?: string;
  name: string;
  images: string[];
  amenities: RoomAmenities;
  refundable: RefundableInfo;
  price: PriceInfo;
}

export interface Filter {
  id: string;
  label: string;
  beds: number | null;
}

// Mock Data
export const FILTERS: Filter[] = [
  { id: "all", label: "All rooms", beds: null },
  { id: "1bed", label: "1 bed", beds: 1 },
  { id: "2beds", label: "2 beds", beds: 2 },
];
