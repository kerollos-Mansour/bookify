import { IoCarOutline, IoInformationCircleOutline, IoRestaurantOutline, IoWifiSharp } from "react-icons/io5";
import { MdAir, MdCoffee, MdFitnessCenter, MdPets, MdPool, MdRestaurant, MdSpa } from "react-icons/md";
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

const getAmenityIcon = (name: string) => {
  const lowercaseName = name.toLowerCase();
  if (lowercaseName.includes("wifi")) return <IoWifiSharp />;
  if (lowercaseName.includes("pool")) return <MdPool />;
  if (lowercaseName.includes("breakfast")) return <IoRestaurantOutline />;
  if (lowercaseName.includes("pet")) return <MdPets />;
  if (lowercaseName.includes("restaurant") || lowercaseName.includes("dining")) return <MdRestaurant />;
  if (lowercaseName.includes("spa")) return <MdSpa />;
  if (lowercaseName.includes("parking")) return <IoCarOutline />;
  if (lowercaseName.includes("gym") || lowercaseName.includes("fitness")) return <MdFitnessCenter />;
  if (lowercaseName.includes("coffee")) return <MdCoffee />;
  if (lowercaseName.includes("ac") || lowercaseName.includes("air conditioning")) return <MdAir />;
  return <IoInformationCircleOutline />;
};

const getRatingInfo = (rating: number) => {
  let normalized = rating;
  let max = 5;
  if (rating > 5 && rating <= 10) {
    max = 10;
  } else if (rating > 10) {
    normalized = rating / 10;
    max = 10;
  }

  let text = "Pleasant";
  if (normalized >= 4.5 || normalized >= 9) text = "Exceptional";
  else if (normalized >= 4.0 || normalized >= 8) text = "Excellent";
  else if (normalized >= 3.5 || normalized >= 7) text = "Very Good";
  else if (normalized >= 3.0 || normalized >= 6) text = "Good";

  return { normalized, max, text };
};

const defaultAmenities = [
  "Free WiFi",
  "Swimming pool",
  "Air conditioning",
  "Restaurant",
  "Parking available",
  "Room service"
];

export default function PropertyInfo({ hotel }: PropertyInfoProps) {
  // Safe detail access
  const detail = Array.isArray(hotel.hotelDetails) ? hotel.hotelDetails[0] : null;

  const ratingValue = hotel.tripAdvisorRating ?? hotel.hotelRating ?? 0;
  const rating = Number.isFinite(ratingValue) ? Number(ratingValue) : 0;
  const { normalized, max, text: ratingText } = getRatingInfo(rating);

  // Star rating for the UI (always 0-5 stars)
  const starRating = Math.min(5, Math.max(0, Math.round(max === 5 ? normalized : (normalized / 2))));

  const reviews = detail?.reviewCount ?? hotel.confidenceRating ?? 0;
  const address = [hotel.city, hotel.stateProvinceCode, hotel.countryCode]
    .filter(Boolean)
    .join(", ");

  const highlights = detail?.highlights ?? [];
  const hotelAmenities = detail?.amenities?.length ? detail.amenities : defaultAmenities;
  const amenities = hotelAmenities.slice(0, 6);

  // Dynamic summary generation
  const amenitiesPreview = amenities.length > 0
    ? `. Features include ${amenities.slice(0, 5).join(", ")}${amenities.length > 5 ? ", and more" : ""}`
    : "";

  const highlightsPreview = highlights.length > 0
    ? `. This property features ${highlights.join(", ")}`
    : "";

  const categoryStr = hotel.propertyCategory ? `${hotel.propertyCategory}-star ` : "";
  const typeStr = hotel.type || "property";
  const locationStr = hotel.city ? ` in ${hotel.city}` : "";
  const ratingStr = ` with ${ratingText.toLowerCase()} ${normalized}/${max} rating from ${reviews} reviews`;

  const locationDetail = hotel.location?.address
    ? `Located on ${hotel.location.address}${hotel.city ? `, ${hotel.city}` : ""}`
    : "Centrally located";

  const summary = `${categoryStr}${typeStr}${locationStr}${ratingStr}${highlightsPreview}${amenitiesPreview}. ${locationDetail} with various local attractions and scenic views nearby. Rooms feature premium bedding, comfortable designs, and modern workspace for your convenience.`;

  // Try multiple fallback sources for the description
  const description = detail?.tagline || (hotel as any).shortDescription || (hotel as any).description || summary;

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
              {normalized.toFixed(1)}
            </span>
            <span className="font-semibold text-sm md:text-base">
              {ratingText}
            </span>
          </div>

          {/* {reviews ? (
            <button
              onClick={() => {
                const el = document.getElementById("reviews");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-blue-600 hover:underline mb-6 cursor-pointer text-sm md:text-base text-left"
            >
              See all {reviews} reviews →
            </button>
          ) : null} */}

          <div id="about" className="mb-8">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-foreground">
              About this property
            </h2>
            <p className="text-muted-foreground mb-6 text-sm md:text-base leading-relaxed">
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
                      {getAmenityIcon(text)}
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

            {/* <button
              onClick={() => {
                const el = document.getElementById("about");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-blue-600 hover:underline flex items-center gap-1 cursor-pointer text-sm md:text-base"
            >
              See all about this property <span>›</span>
            </button> */}
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
