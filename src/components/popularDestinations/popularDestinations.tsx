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

  const location =
    destination.searchConfig?.city ||
    destination.searchConfig?.location ||
    destination.location ||
    "Unknown Location";
  const price = destination.searchConfig?.minRate || destination.price;

  const handleClick = () => {
    navigate(
      `/search?location=${encodeURIComponent(
        location === "Unknown Location" ? "" : location
      )}&maxPrice=${price || ""}`
    );
  };

  return (
    <article
      onClick={handleClick}
      className="shrink-0 w-72 sm:w-80 md:w-96 bg-card rounded-xl md:rounded-2xl overflow-hidden border border-card-border hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group snap-start flex flex-col h-full"
    >
      <div className="relative aspect-video bg-muted overflow-hidden">
        {destination.rating && (
          <div className="absolute top-3 right-3 z-10 bg-black/60 backdrop-blur-md text-white px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 border border-white/20">
            <svg
              className="w-3 h-3 fill-yellow-400 text-yellow-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {destination.rating}
          </div>
        )}
        {!imageError ? (
          <img
            src={destination.image || ""}
            alt={destination.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
            onError={() => setImageError(true)}
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <ImageOff className="w-12 h-12 md:w-16 md:h-16 text-muted-foreground opacity-20" />
          </div>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-4 md:p-6 flex-1 flex flex-col">
        <h3 className="text-lg md:text-xl font-bold text-foreground mb-1 group-hover:text-blue-600 transition-colors line-clamp-1">
          {destination.name || "Unknown Destination"}
        </h3>

        <div className="flex items-center gap-1.5 text-muted-foreground mb-4">
          <svg
            className="w-4 h-4 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            ></path>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            ></path>
          </svg>
          <p className="text-xs md:text-sm truncate font-medium">{location}</p>
        </div>

        <div className="mt-auto pt-4 border-t border-card-border/50 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-0.5">
              avg. nightly price
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl md:text-3xl font-black text-blue-600">
                {price ? `${CURRENCY} ${price.toLocaleString()}` : "N/A"}
              </span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-600 transition-all duration-300 transform group-hover:translate-x-1">
            <ChevronRight className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
          </div>
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

  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 5);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 5);
    }
  };

  useEffect(() => {
    checkScroll();
    const currentRef = scrollRef.current;
    if (currentRef) {
      currentRef.addEventListener("scroll", checkScroll);
      window.addEventListener("resize", checkScroll);
    }
    return () => {
      if (currentRef) {
        currentRef.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
      }
    };
  }, [destinations, activeCategoryId]);

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
          {showLeftArrow && (
            <button
              onClick={() => handleScroll("left")}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 bg-card rounded-full shadow-xl p-2 md:p-3 hover:scale-110 hidden lg:flex items-center justify-center border border-card-border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 transform"
              aria-label="Scroll to previous destinations"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
            </button>
          )}

          {/* Right Arrow */}
          {showRightArrow && (
            <button
              onClick={() => handleScroll("right")}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 bg-card rounded-full shadow-xl p-2 md:p-3 hover:scale-110 hidden lg:flex items-center justify-center border border-card-border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 transform"
              aria-label="Scroll to next destinations"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
            </button>
          )}

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
                <DestinationCard key={(dest as any)._id || dest.id || index} destination={dest} />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
