import { HotelDetail } from "./hotelDetail";

export interface Hotel {
    id: string;
    name: string;
    city?: string;
    stateProvinceCode?: string;
    countryCode?: string;
    type?: string;
    images?: string[];
    tripAdvisorRating?: number;
    hotelRating?: number;
    lowRate?: number;
    highRate?: number;
    location?: {
      latitude: number;
      longitude: number;
    };
    propertyCategory?: number;
    confidenceRating?: number;
    hotelDetails?: HotelDetail[];
  };