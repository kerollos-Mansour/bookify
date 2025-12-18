// HotelDetail interface for embedded hotel details
export interface HotelDetail {
  id: string;
  hotelId: string;
  tagline?: string;
  reviewCount?: number;
  highlights?: string[];
  amenities?: string[];
}

// Hotel interface matching your actual backend response
export interface Hotel {
  _id: string; 
  name: string;
  city?: string;
  stateProvinceCode?: string;
  countryCode?: string;
  type?: string;
  images?: string[];
  tripAdvisorRating?: number;
  hotelRating?: number;
  propertyCategory?: number;
  confidenceRating?: number;
  lowRate?: number;
  highRate?: number;
  location?: {
    latitude?: number;
    longitude?: number;
  };
  hotelDetails?: HotelDetail[]; // Embedded hotel details
  createdAt?: string;
  updatedAt?: string;
}
