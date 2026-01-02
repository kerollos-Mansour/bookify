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
  };
  withFees: boolean;
  prices: {
    day: number;
    nightly: number;
    offer: number;
  };
  vip: boolean;
  featured?: boolean;
};
