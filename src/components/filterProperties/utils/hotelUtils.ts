import { Hotel } from "../../../types/hotel.type";
import { HotelCardData } from "../../../types/hotelCard.type";

export const getNightRate = (hotel: Hotel) => {
  hotel.lowRate ?? hotel.highRate ?? 0;
};

export const toCardDate = (hotel: Hotel): HotelCardData => {
  const nightlyRate = getNightRate(hotel);
  const total = hotel.highRate ?? nightlyRate;
  const detail = hotel.hotelDetails?.[0];

  return {
    id: hotel.id,
    img: {
      img: hotel.images && hotel.images.length > 0 ? hotel.images : [""],
      alt: hotel.name,
    },
    title: hotel.name,
    location: [hotel.city, hotel.stateProvinceCode, hotel.countryCode]
      .filter(Boolean)
      .join(", "),
    Amenities: detail?.amenities?.slice(0, 3) ?? [
      "Free WiFi",
      "Pool access",
      "Breakfast",
    ],
    reviews: {
      reviewsCount: detail?.reviewCount ?? 0,
      avgReview: Number(hotel.tripAdvisorRating ?? hotel.hotelRating ?? 0),
    },
    withFees: true,
    prices: {
      day: Number(total),
      nightly: Number(nightlyRate),
      offer:
        total !== undefined && nightlyRate !== undefined
          ? Math.max(
              5,
              Math.min(
                40,
                Math.round(
                  ((Number(total) - Number(nightlyRate)) / Number(total)) * 100
                )
              )
            )
          : 10,
    },
    vip: (hotel.confidenceRating ?? 0) > 50,
  };
};
