export interface Amenity {
  id: string; // Using 'id' to match backend
  name: string;
  description?: string;
  icon?: string;
  category?: "room" | "hotel" | "both";
  createdAt?: string;
  updatedAt?: string;
}

export interface AmenitiesResponse {
  data: {
    amenities: Amenity[];
    page: number;
    totalPages: number;
    totalAmenities: number;
  };
}
// Define the query params
export interface GetAmenitiesParams {
  category?: "room" | "hotel" | "both";
  search?: string;
  page?: number;
  limit?: number;
}
