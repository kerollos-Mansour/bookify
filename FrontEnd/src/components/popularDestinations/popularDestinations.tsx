import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, ImageOff } from "lucide-react";
import { Destination } from "../../types/destination.type";
import { useNavigate } from "react-router-dom";
import DestinationCardSkeleton from "../UI/PopularDestinationSkeleton";
import {
  useGetGroupedDestinationsQuery,
  useLazyGetDestinationSearchQuery,
} from "../../store/api/destination.api";
const SCROLL_AMOUNT = 400;
const CURRENCY = "EGP";

function DestinationCard({ destination }: { destination: Destination }) {
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(
      `/search?location=${encodeURIComponent(destination.location)}&maxPrice=${destination.price
      }`
    );
  };
  return (
    <article
      onClick={handleClick}
      className="shrink-0 w-72 sm:w-80 md:w-96 bg-card rounded-xl md:rounded-2xl overflow-hidden border border-card-border hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group snap-start"
    >
      <div className="relative aspect-video bg-muted overflow-hidden">
        {!imageError ? (
          <img
            src={destination.image || ""}
            alt={`${destination.name || "Destination"}, ${destination.location || ""
              }`}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={() => setImageError(true)}
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <ImageOff className="w-12 h-12 md:w-16 md:h-16 text-muted-foreground" />
          </div>
        )}
      </div>

      <div className="p-4 md:p-6">
        <h3 className="text-lg md:text-xl font-bold text-foreground mb-1 truncate">
          {destination.name || "Unknown Destination"}
        </h3>
        <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4 truncate">
          {destination.location || "Unknown Location"}
        </p>
        <div>
          <span className="text-xl md:text-2xl font-bold text-foreground">
            {CURRENCY} {destination.price?.toLocaleString() ?? "N/A"}
          </span>
          <p className="text-xs md:text-sm text-muted-foreground">avg. nightly price</p>
        </div>
      </div>
    </article>
  );
}

// 
export function PopularDestinations() {
  const {
    data: groupedDestinations = [],
    isLoading,
    error,
  } = useGetGroupedDestinationsQuery();
  const [activeCategoryId, setActiveCategoryId] = useState<string>("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Set initial active category
  useEffect(() => {
    if (groupedDestinations.length > 0 && !activeCategoryId) {
      setActiveCategoryId(groupedDestinations[0].category._id);
    }
  }, [groupedDestinations, activeCategoryId]);

  const activeGroup = groupedDestinations.find(
    (g) => g.category._id === activeCategoryId
  );
  const destinations = activeGroup ? activeGroup.destinations : [];
  console.log;
  const handleScroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = direction === "left" ? -SCROLL_AMOUNT : SCROLL_AMOUNT;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  if (error) {
    return (
      <section className="py-12 md:py-16 bg-background text-center">
        <p className="text-red-600">Error loading destinations</p>
      </section>
    );
  }

  // Generate skeleton items for tabs and cards if loading initially
  const showSkeleton = isLoading && groupedDestinations.length === 0;

  return (
    <section
      className="py-12 md:py-16 bg-background"
      aria-label="Popular destinations"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <header className="mb-8 md:mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-foreground">
            Explore stays in popular destinations
          </h2>
          <p className="text-sm md:text-base text-muted-foreground">
            Average prices based on current calendar month
          </p>
        </header>

        {/* Category Tabs */}
        <div
          className="flex gap-6 md:gap-8 mb-8 md:mb-10 border-b border-card-border overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0"
          role="tablist"
          aria-label="Destination categories"
        >
          {showSkeleton
            ? Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="w-24 h-8 bg-muted rounded animate-pulse"
              />
            ))
            : groupedDestinations.map(({ category }) => (
              <button
                key={category._id}
                onClick={() => setActiveCategoryId(category._id)}
                role="tab"
                aria-selected={activeCategoryId === category._id}
                aria-controls={`destinations-${category._id}`}
                className={`relative pb-3 md:pb-4 text-sm md:text-lg font-semibold transition-all duration-200 whitespace-nowrap capitalize focus:ring-offset-2 rounded-t ${activeCategoryId === category._id
                  ? "text-blue-500"
                  : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                {category.name}
                {activeCategoryId === category._id && (
                  <span
                    className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500 rounded-full"
                    aria-hidden="true"
                  />
                )}
              </button>
            ))}
        </div>

        {/* Carousel */}
        <div className="relative group/carousel">
          {/* Left Arrow */}
          <button
            onClick={() => handleScroll("left")}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover/carousel:opacity-100 transition-opacity bg-card rounded-full shadow-xl p-2 md:p-3 hover:scale-110 hidden lg:flex items-center justify-center border border-card-border focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Scroll to previous destinations"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => handleScroll("right")}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover/carousel:opacity-100 transition-opacity bg-card rounded-full shadow-xl p-2 md:p-3 hover:scale-110 hidden lg:flex items-center justify-center border border-card-border focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Scroll to next destinations"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
          </button>

          {/* Destinations */}
          <div
            ref={scrollRef}
            id={`destinations-${activeCategoryId}`}
            role="tabpanel"
            className="flex gap-4 md:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide"
          >
            {showSkeleton
              ? Array.from({ length: 4 }).map((_, i) => (
                <DestinationCardSkeleton key={i} />
              ))
              : destinations.map((dest, index) => (
                <DestinationCard key={dest.id || index} destination={dest} />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
