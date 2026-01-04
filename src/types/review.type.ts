export interface ReviewHotel {
  _id: string;
  name: string;
  location: {
    address?: string;
    city?: string;
    countryCode?: string;
  };
}

export interface Review {
  _id: string;
  userid: string;
  hotelid: ReviewHotel;
  rating: number;
  comment: string;
  status: "pending" | "approved" | "rejected";
  reviewDate: string;
  helpfulCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewFilters {
  hotelid?: string;
  userid?: string;
  status?: string;
  minRating?: number;
  maxRating?: number;
}

export interface ReviewListResponse {
  status: string;
  data: Review[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
