import { Heart, MapPin, Calendar, Users } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  visitedStorage,
  VisitedHotel,
  searchStorage,
  VisitedSearch,
} from "../../utils/visitedStorage";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

// Property Card Component
function PropertyCard({ property }: { property: VisitedHotel }) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <Link
      to={`/property/${property.id}`}
      className="group flex-shrink-0 w-64 sm:w-72 bg-card rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden relative "
    >
      <img
        src={property.image}
        alt={property.title}
        className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          setIsFavorite(!isFavorite);
        }}
        className="absolute top-3 right-3 p-2 rounded-full bg-white/90 dark:bg-black/50 backdrop-blur-sm shadow-md hover:bg-white dark:hover:bg-black/70 transition-all duration-200 z-10"
        aria-label="Add to favorites"
      >
        <Heart
          className={`w-5 h-5 transition-colors ${
            isFavorite
              ? "fill-red-500 text-red-500"
              : "text-gray-700 dark:text-white"
          }`}
        />
      </button>

      <div className="p-4">
        <h3 className="text-base font-semibold text-card-foreground mb-2 line-clamp-1">
          {property.title}
        </h3>
        <div className="flex items-center gap-1.5">
          <div className="bg-blue-600 text-white text-sm font-semibold px-2 py-0.5 rounded">
            {property.rating}
          </div>
          <span className="text-sm text-muted-foreground">
            ({property.reviewCount ?? 0})
          </span>
        </div>
      </div>
    </Link>
  );
}

// Search Card Component
function SearchCard({ search }: { search: VisitedSearch }) {
  const navigate = useNavigate();
  const handleClick = () => {
    const params = new URLSearchParams({
      location: search.location,
      checkIn: search.checkIn,
      checkOut: search.checkOut,
      adults: search.travelers.toString(),
      rooms: search.rooms.toString(),
    });

    navigate(`/search?${params.toString()}`);
  };

  return (
    <button
      onClick={handleClick}
      className="bg-card rounded-lg shadow-sm hover:shadow-md  p-4 transition-all duration-300 hover:-translate-y-0.5 text-left w-full"
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-1">
          <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
            <MapPin className="w-5 h-5 text-muted-foreground" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-base font-semibold text-card-foreground mb-1">
            Stays in {search.location}
          </h4>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">
                {search.checkIn} – {search.checkOut}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
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
  const [visited, setVisited] = useState<VisitedHotel[]>([]);
  const [recentSearches, setRecentSearches] = useState<VisitedSearch[]>([]);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  useEffect(() => {
    setVisited(visitedStorage.get());
    setRecentSearches(searchStorage.get());
  }, []);

  const handleScroll = () => {
    const container = document.getElementById("visited-row");
    if (!container) return;
    const atStart = container.scrollLeft === 0;
    const atEnd =
      container.scrollLeft + container.clientWidth >= container.scrollWidth - 5;
    setShowLeftArrow(!atStart);
    setShowRightArrow(!atEnd);
  };

  useEffect(() => {
    const container = document.getElementById("visited-row");
    if (!container) return;
    handleScroll();
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [visited]);

  const scrollLeft = () => {
    document
      .getElementById("visited-row")
      ?.scrollBy({ left: -300, behavior: "smooth" });
  };
  const scrollRight = () => {
    document
      .getElementById("visited-row")
      ?.scrollBy({ left: 300, behavior: "smooth" });
  };

  if (!visited.length && !recentSearches.length) return null;

  return (
    <section className="py-12 md:py-10 bg-[#EFF3F7] dark:bg-background transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[95%] 2xl:max-w-[90%]">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 md:mb-10">
          Here's where you left off
        </h2>

        {/* Recently Viewed */}
        {visited.length > 0 && (
          <div className="relative mb-10 md:mb-12">
            <h3 className="text-lg md:text-xl font-semibold text-foreground mb-4 md:mb-5">
              Your recently viewed properties
            </h3>

            {showLeftArrow && (
              <button
                onClick={scrollLeft}
                className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-card  text-foreground shadow-lg rounded-full p-3 hover:bg-muted transition-colors"
              >
                <FiChevronLeft size={22} />
              </button>
            )}

            {showRightArrow && (
              <button
                onClick={scrollRight}
                className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-card  text-foreground shadow-lg rounded-full p-3 hover:bg-muted transition-colors"
              >
                <FiChevronRight size={22} />
              </button>
            )}

            <div
              id="visited-row"
              className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide pb-4"
            >
              {visited.map((hotel) => (
                <PropertyCard key={hotel.id} property={hotel} />
              ))}
            </div>
          </div>
        )}

        {/* Recent Searches */}
        {recentSearches.length > 0 && (
          <div>
            <h3 className="text-lg md:text-xl font-semibold text-foreground mb-4 md:mb-5">
              Your recent searches
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentSearches.map((search) => (
                <SearchCard key={search.id} search={search} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
