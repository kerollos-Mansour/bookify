import { IoRestaurantOutline, IoWifiSharp } from "react-icons/io5";
import { MdPets, MdPool, MdRestaurant, MdSpa } from "react-icons/md";
import Map from "../../map/map";
import { Hotel } from "../../../types/hotel.type";
import { useGetAllAmenitiesQuery } from "../../../store/api/amenities.api";

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

  // Fetch amenities from API
  const { data: apiAmenities } = useGetAllAmenitiesQuery({ limit: 50 });

  const detail = hotel.hotelDetails?.[0]; // Access embedded details

  // Prioritize hotel-specific amenities, then try to map IDs if needed, finally fallback
  // If detail.amenities is strings, use them.
  const hotelAmenities = detail?.amenities?.length ? detail.amenities : [];

  const amenities = hotelAmenities.slice(0, 6);

  // Calculate star rating (convert 0-100 to 0-5 scale)
  const ratingValue = hotel.tripAdvisorRating ?? hotel.hotelRating ?? 0;
  const rating = Number.isFinite(ratingValue) ? Number(ratingValue) : 0;
  const starRating = Math.min(5, Math.max(0, Math.round((rating / 100) * 5)));

  const reviews = detail?.reviewCount ?? hotel.confidenceRating ?? 0;
  const description = detail?.tagline || hotel.hotelDetails;
  const address = [hotel.city, hotel.stateProvinceCode, hotel.countryCode]
    .filter(Boolean)
    .join(", ");

  const highlights = detail?.highlights ?? [];

  // Default coords if missing (e.g., center of map or 0,0)
  const latitude = hotel.location?.latitude ?? 0;
  const longitude = hotel.location?.longitude ?? 0;

  return (
    <>
      <div
        id="overview"
        className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8"
      >
        {/* Left column - Property Details */}
        <div className="lg:col-span-2">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 text-foreground">
            {hotel.name}
          </h1>

          {/* Star rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex text-yellow-500 dark:text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={
                    i < starRating ? "" : "text-gray-300 dark:text-gray-600"
                  }
                >
                  ★
                </span>
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

          <div id="about" className="mb-8">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-foreground">
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
            <div
              id="amenities"
              className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 md:gap-x-8 gap-y-4 mb-6"
            >
              {amenities.length > 0 ? (
                amenities.map((text, index) => (
                  <div
                    key={`${text}-${index}`}
                    className="flex items-center gap-3"
                  >
                    <span className="text-xl md:text-2xl text-muted-foreground">
                      {amenityIcons[index % amenityIcons.length]}
                    </span>
                    <span className="text-foreground text-sm md:text-base">
                      {text}
                    </span>
                  </div>
                ))
              ) : (
                <div className="col-span-2 text-muted-foreground text-sm">
                  No specific amenities listed for this property.
                </div>
              )}
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
