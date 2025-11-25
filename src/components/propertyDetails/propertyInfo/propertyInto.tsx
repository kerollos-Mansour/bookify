import { IoRestaurantOutline, IoWifiSharp } from "react-icons/io5";
import { MdPets, MdPool, MdRestaurant, MdSpa } from "react-icons/md";

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
};

type HotelDetail = {
  tagline?: string;
  reviewCount?: number;
  highlights?: string[];
  amenities?: string[];
};

type PropertyInfoProps = {
  hotel: HotelSummary;
  detail?: HotelDetail;
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

export default function PropertyInfo({ hotel, detail }: PropertyInfoProps) {
  const amenities = (detail?.amenities ?? defaultAmenities).slice(0, 6);
  const ratingValue = hotel.tripAdvisorRating ?? hotel.hotelRating ?? 0;
  const rating = Number.isFinite(ratingValue) ? Number(ratingValue) : 0;
  const reviews = detail?.reviewCount ?? hotel.confidenceRating ?? 0;
  const description =
    detail?.tagline ??
    hotel.shortDescription ??
    "Details about this property will be available soon.";
  const address = [hotel.address1, hotel.city, hotel.stateProvinceCode, hotel.countryCode]
    .filter(Boolean)
    .join(", ");
  const highlights = detail?.highlights ?? [];

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Left column - Property Details */}
        <div className="lg:col-span-2">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{hotel.name}</h1>

          {/* Star rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex text-gray-700">
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
            <p className="text-gray-700 mb-6 text-sm md:text-base">
              {description}
            </p>
            {highlights.length > 0 && (
              <ul className="list-disc pl-5 text-gray-700 text-sm md:text-base mb-6 space-y-1">
                {highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
            {/* Amenities Grid */}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 md:gap-x-8 gap-y-4 mb-6">
              {amenities.map((text, index) => (
                <div key={`${text}-${index}`} className="flex items-center gap-3">
                  <span className="text-xl md:text-2xl text-gray-700">
                    {amenityIcons[index] ?? amenityIcons[amenityIcons.length - 1]}
                  </span>
                  <span className="text-gray-800 text-sm md:text-base">
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
        <div className="lg:col-span-1">
          <h3 className="font-semibold text-base md:text-lg mb-4">
            Explore the area
          </h3>
          <div className="w-full h-48 md:h-64 bg-gray-200 rounded-lg overflow-hidden mb-4">
            <img
              src="/map-placeholder.png"
              alt="Location map"
              className="w-full h-full object-cover"
            />
          </div>

          <p className="text-sm text-gray-800 mb-2">
            {address || "Address details will be shared soon."}
          </p>
          <button className="text-blue-600 hover:underline text-sm flex items-center gap-1 mb-6">
            View in a map <span>›</span>
          </button>
        </div>
      </div>
    </>
  );
}
