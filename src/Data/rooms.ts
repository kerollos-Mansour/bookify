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
  id: number;
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
export const ROOMS_DATA: Room[] = [
  {
    id: 1,
    name: "Standard Double Room, Ocean View (U)",
    images: ["/room1.png", "/room2.png"],
    amenities: {
      breakfast: true,
      parking: true,
      size: "312 sq ft",
      sleeps: 3,
      bedType: "2 Double Beds OR 1 King Bed",
      allInclusive: true,
      wifi: true,
    },
    refundable: {
      isRefundable: true,
      deadline: "Tue, Feb 3",
    },
    price: {
      original: 80517,
      discounted: 40447,
      discount: 40070,
      currency: "EGP",
    },
  },
  {
    id: 2,
    name: "Junior Suite, Ocean View (U)",
    images: ["/room3.png", "/room4.png"],
    amenities: {
      breakfast: true,
      parking: true,
      size: "474 sq ft",
      sleeps: 3,
      bedType: "2 Double Beds OR 1 King Bed",
      allInclusive: true,
      wifi: true,
      bedrooms: 1,
    },
    refundable: {
      isRefundable: true,
      deadline: "Tue, Feb 3",
    },
    price: {
      original: 86362,
      discounted: 43368,
      discount: 42994,
      currency: "EGP",
    },
  },
  {
    id: 3,
    name: "Double Room, 2 Bedrooms, Ocean View (U)",
    images: ["/room5.png", "/room1.png"],
    amenities: {
      breakfast: true,
      parking: true,
      size: "323 sq ft",
      sleeps: 6,
      bedType: "1 King Bed",
      allInclusive: true,
      wifi: true,
      bedrooms: 2,
    },
    refundable: {
      isRefundable: true,
      deadline: "Tue, Feb 3",
    },
    price: {
      original: 160588,
      discounted: 80465,
      discount: 80120,
      currency: "EGP",
    },
  },
];

export const FILTERS: Filter[] = [
  { id: "all", label: "All rooms", beds: null },
  { id: "1bed", label: "1 bed", beds: 1 },
  { id: "2beds", label: "2 beds", beds: 2 },
];
