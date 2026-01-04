export type HotelCardData = {
  id: string;
  img: {
    img: string[];
    alt: string;
  };
  title: string;
  location: string;
  Amenities: string[];
  reviews: {
    reviewsCount: number;
    avgReview: number;
    ratingText?: string;
  };
  withFees: boolean;
  prices: {
    day: number;
    nightly: number;
    offer: number;
    originalPrice?: number;
  };
  vip: boolean;
  featured?: boolean;
};
