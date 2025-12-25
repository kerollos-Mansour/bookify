import { IoRestaurantOutline, IoWifiSharp } from "react-icons/io5";
import { MdPets, MdPool, MdRestaurant, MdSpa } from "react-icons/md";
import Map from "../../Map/Map";
import { Hotel } from "../../../types/hotel.type";

type HotelSummary = {
  name?: string;
  tripAdvisorRating?: number;
  hotelRating?: number;
  confidenceRating?: number;
  shortDescription?: string;
  address1?: string;
  city?: string;
  stateProvinceCode?: string;
  countryCode?: string;
  location: {
    latitude: number;
    longitude: number;
  };
};

type HotelDetail = {
  tagline?: string;
  reviewCount?: number;
  highlights?: string[];
  amenities?: string[];
};

type PropertyInfoProps = {
  hotel: Hotel;
};

const defaultAmenities = [
  "Indoor pool",
  "Continental breakfast available",
  "Pets stay free",
  "Restaurant",
  "Full-service spa",
  "Free WiFi",
];

const amenityIcons = [
  <MdPool />,
  <IoRestaurantOutline />,
  <MdPets />,
  <MdRestaurant />,
  <MdSpa />,
  <IoWifiSharp />,
];

export default function PropertyInfo({ hotel }: PropertyInfoProps) {
  console.log(hotel);
  const detail = hotel.hotelDetails?.[0]; // Access embedded details
  const amenities = (detail?.amenities ?? defaultAmenities).slice(0, 6);
  const ratingValue = hotel.tripAdvisorRating ?? hotel.hotelRating ?? 0;
  const rating = Number.isFinite(ratingValue) ? Number(ratingValue) : 0;
  const reviews = detail?.reviewCount ?? hotel.confidenceRating ?? 0;
  const description =
    detail?.tagline ??
    hotel.hotelDetails?.[0]?.tagline ??
    "Details about this property will be available soon.";

  const address = [hotel.city, hotel.stateProvinceCode, hotel.countryCode]
    .filter(Boolean)
    .join(", ");

  const highlights = detail?.highlights ?? [];

  // Default coords if missing (e.g., center of map or 0,0)
  const latitude = hotel.location?.latitude ?? 0;
  const longitude = hotel.location?.longitude ?? 0;

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Left column - Property Details */}
        <div className="lg:col-span-2">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{hotel.name}</h1>

          {/* Star rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex text-muted-foreground">
              {[...Array(4)].map((_, i) => (
                <span key={i}>★</span>
              ))}
            </div>
          </div>

          {/* Rating badge */}
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-green-700 text-white px-2 py-1 rounded font-bold text-sm md:text-base">
              {rating.toFixed(1)}
            </span>
            <span className="font-semibold text-sm md:text-base">
              Exceptional
            </span>
          </div>

          {reviews ? (
            <button className="text-blue-600 hover:underline mb-6 cursor-pointer text-sm md:text-base">
              See all {reviews} reviews →
            </button>
          ) : null}

          <div className="mb-8">
            <h2 className="text-xl md:text-2xl font-bold mb-4">
              About this property
            </h2>
            <p className="text-muted-foreground mb-6 text-sm md:text-base">
              {description}
            </p>
            {highlights.length > 0 && (
              <ul className="list-disc pl-5 text-muted-foreground text-sm md:text-base mb-6 space-y-1">
                {highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
            {/* Amenities Grid */}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 md:gap-x-8 gap-y-4 mb-6">
              {amenities.map((text, index) => (
                <div
                  key={`${text}-${index}`}
                  className="flex items-center gap-3"
                >
                  <span className="text-xl md:text-2xl text-muted-foreground">
                    {amenityIcons[index] ??
                      amenityIcons[amenityIcons.length - 1]}
                  </span>
                  <span className="text-foreground text-sm md:text-base">
                    {text}
                  </span>
                </div>
              ))}
            </div>

            <button className="text-blue-600 hover:underline flex items-center gap-1 cursor-pointer text-sm md:text-base">
              See all about this property <span>›</span>
            </button>
          </div>
        </div>

        {/* Right column - Map */}
        <Map
          location={{
            latitude,
            longitude,
          }}
        />
      </div>
    </>
  );
}
