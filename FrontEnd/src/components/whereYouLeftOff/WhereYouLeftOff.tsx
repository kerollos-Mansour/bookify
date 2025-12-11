import { Heart, MapPin, Calendar, Users } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Mock data for recently viewed properties
const RECENTLY_VIEWED = [
  {
    id: 1,
    name: "Crowne pyramids palace",
    image: "https://images.trvl-media.com/lodging/118000000/117380000/117376100/117376035/9be7fea7.jpg?impolicy=resizecrop&rw=1200&ra=fit",
    rating: 8.4,
    reviewCount: 67,
  },
  {
    id: 2,
    name: "The Palace Pyramids Inn",
    image: "https://images.trvl-media.com/lodging/118000000/117380000/117376100/117376035/2d1a2ad5.jpg?impolicy=resizecrop&rw=1200&ra=fit",
    rating: 8.6,
    reviewCount: 42,
  },
  {
    id: 3,
    name: "Downtown Antique Hotel",
    image: "https://images.trvl-media.com/lodging/118000000/117380000/117376100/117376035/c92848b6.jpg?impolicy=resizecrop&rw=1200&ra=fit",
    rating: 8.0,
    reviewCount: 19,
  },
  {
    id: 4,
    name: "Downtown Antique Hotel",
    image: "https://images.trvl-media.com/lodging/118000000/117380000/117376100/117376035/1688e98a.jpg?impolicy=resizecrop&rw=1200&ra=fit",
    rating: 8.0,
    reviewCount: 19,
  },
  
  {
    id:6,
    name: "Downtown Antique Hotel",
    image: "https://images.trvl-media.com/lodging/118000000/117380000/117376100/117376035/1688e98a.jpg?impolicy=resizecrop&rw=1200&ra=fit",
    rating: 8.0,
    reviewCount: 19,
  },
];

// Mock data for recent searches
const RECENT_SEARCHES = [
  {
    id: 1,
    location: "Cairo",
    checkIn: "Fri, Feb 20",
    checkOut: "Sun, Feb 22",
    travelers: 2,
    rooms: 1,
  },
  {
    id: 2,
    location: "Cancun",
    checkIn: "Fri, Feb 6",
    checkOut: "Sun, Feb 8",
    travelers: 2,
    rooms: 1,
  },
  {
    id: 3,
    location: "Punta Sam",
    checkIn: "Fri, Feb 6",
    checkOut: "Sun, Feb 8",
    travelers: 2,
    rooms: 1,
  },
];

// Property Card Component
function PropertyCard({ property }: { property: (typeof RECENTLY_VIEWED)[0] }) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <Link
      to={`/property/${property.id}`}
      className="group flex-shrink-0 w-64 sm:w-72 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      <div className="relative">
        <img
          src={property.image}
          alt={property.name}
          className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsFavorite(!isFavorite);
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-md hover:bg-white transition-all duration-200"
          aria-label="Add to favorites"
        >
          <Heart
            className={`w-5 h-5 transition-colors ${
              isFavorite ? "fill-red-500 text-red-500" : "text-gray-700"
            }`}
          />
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-1">
          {property.name}
        </h3>
        <div className="flex items-center gap-1.5">
          <div className="bg-blue-600 text-white text-sm font-semibold px-2 py-0.5 rounded">
            {property.rating}
          </div>
          <span className="text-sm text-gray-600">
            ({property.reviewCount})
          </span>
        </div>
      </div>
    </Link>
  );
}

// Search Card Component
function SearchCard({ search }: { search: (typeof RECENT_SEARCHES)[0] }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(
      `/search?location=${encodeURIComponent(search.location)}&checkIn=${
        search.checkIn
      }&checkOut=${search.checkOut}`
    );
  };

  return (
    <button
      onClick={handleClick}
      className="bg-white rounded-lg shadow-sm hover:shadow-md border border-gray-200 p-4 transition-all duration-300 hover:-translate-y-0.5 text-left w-full"
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-1">
          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
            <MapPin className="w-5 h-5 text-gray-600" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-base font-semibold text-gray-900 mb-1">
            Stays in {search.location}
          </h4>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">
                {search.checkIn} – {search.checkOut}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Users className="w-4 h-4 flex-shrink-0" />
              <span>
                {search.travelers} traveler{search.travelers > 1 ? "s" : ""} •{" "}
                {search.rooms} room{search.rooms > 1 ? "s" : ""}
              </span>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}

// Main Component
export function WhereYouLeftOff() {
  return (
    <section className="py-12 md:py-10 bg-[#EFF3F7] from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 md:mb-10">
          Here's where you left off
        </h2>

        {/* Recently Viewed Properties */}
        <div className="mb-10 md:mb-12">
          <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4 md:mb-5">
            Your recently viewed properties
          </h3>
          <div className="relative">
            <div
              className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide pb-4"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {RECENTLY_VIEWED.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </div>
        </div>

        {/* Recent Searches */}
        <div>
          <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4 md:mb-5">
            Your recent searches
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {RECENT_SEARCHES.map((search) => (
              <SearchCard key={search.id} search={search} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
