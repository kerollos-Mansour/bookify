import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, ImageOff } from "lucide-react";
import {
  CATEGORIES,
  DESTINATIONS,
  type CategoryId,
} from "../../constants/destinations";
import { DestinationType } from "../../types/destinationType";
import { useNavigate } from "react-router-dom";
import DestinationCardSkeleton from "../UI/PopularDestinationSkeleton";
import axios from "axios";

const SCROLL_AMOUNT = 400;
const CURRENCY = "EGP";
const API_BASE_URL = "http://localhost:3000";

function DestinationCard({ destination }: { destination: DestinationType }) {
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(
      `/search?location=${encodeURIComponent(destination.location)}&maxPrice=${
        destination.price
      }`
    );
  };
  return (
    <article
      onClick={handleClick}
      className="shrink-0 w-72 sm:w-80 md:w-96 bg-white rounded-xl md:rounded-2xl overflow-hidden border border-gray-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group snap-start"
    >
      <div className="relative aspect-video bg-gray-100 overflow-hidden">
        {!imageError ? (
          <img
            src={destination.image}
            alt={`${destination.name}, ${destination.location}`}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={() => setImageError(true)}
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
            <ImageOff className="w-12 h-12 md:w-16 md:h-16 text-gray-400" />
          </div>
        )}
      </div>

      <div className="p-4 md:p-6">
        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1 truncate">
          {destination.name}
        </h3>
        <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-4 truncate">
          {destination.location}
        </p>
        <div>
          <span className="text-xl md:text-2xl font-bold text-gray-900">
            {CURRENCY} {destination.price.toLocaleString()}
          </span>
          <p className="text-xs md:text-sm text-gray-500">avg. nightly price</p>
        </div>
      </div>
    </article>
  );
}

// Main Component
export function PopularDestinations() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>("beach");
  const [loading, setLoading] = useState(true);
  const [destinations, setDestinations] = useState<DestinationType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   setLoading(true);

  //   // fake API delay
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 1500);
  // }, [activeCategory]);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    const fetchDestinations = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/destinations?category=${activeCategory}`,
          { signal: controller.signal }
        );
        console.log("API response data:", response.data);

        const categoryData = response.data[activeCategory];
        setDestinations(Array.isArray(categoryData) ? categoryData : []);
      } catch (err) {
        if (!axios.isCancel(err)) {
          setError("Failed to load destinations");
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
    return () => controller.abort();
  }, [activeCategory]);

  // const currentDestinations = DESTINATIONS[activeCategory];

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = direction === "left" ? -SCROLL_AMOUNT : SCROLL_AMOUNT;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <section
      className="py-12 md:py-16 bg-gray-50"
      aria-label="Popular destinations"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <header className="mb-8 md:mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900">
            Explore stays in popular destinations
          </h2>
          <p className="text-sm md:text-base text-gray-600">
            Average prices based on current calendar month
          </p>
        </header>

        {/* Category Tabs */}
        <div
          className="flex gap-6 md:gap-8 mb-8 md:mb-10 border-b border-gray-200 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0"
          role="tablist"
          aria-label="Destination categories"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              role="tab"
              aria-selected={activeCategory === cat}
              aria-controls={`destinations-${cat}`}
              className={`relative pb-3 md:pb-4 text-sm md:text-lg font-semibold transition-all duration-200 whitespace-nowrap capitalize focus:ring-offset-2 rounded-t ${
                activeCategory === cat
                  ? "text-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {cat}
              {activeCategory === cat && (
                <span
                  className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-full"
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
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover/carousel:opacity-100 transition-opacity bg-white rounded-full shadow-xl p-2 md:p-3 hover:scale-110 hidden lg:flex items-center justify-center border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Scroll to previous destinations"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-800" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => handleScroll("right")}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover/carousel:opacity-100 transition-opacity bg-white rounded-full shadow-xl p-2 md:p-3 hover:scale-110 hidden lg:flex items-center justify-center border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Scroll to next destinations"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-gray-800" />
          </button>

          {/* Destinations */}
          {/* <div
            ref={scrollRef}
            id={`destinations-${activeCategory}`}
            role="tabpanel"
            className="flex gap-4 md:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide"
          >
            {loading
              ? Array.from({ length: currentDestinations.length }).map(
                  (_, i) => <DestinationCardSkeleton key={i} />
                )
              : currentDestinations.map((dest) => (
                  <DestinationCard key={dest.id} destination={dest} />
                ))}
          </div> */}

          <div
            ref={scrollRef}
            id={`destinations-${activeCategory}`}
            role="tabpanel"
            className="flex gap-4 md:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide"
          >
            {loading
              ? Array.from({ length: destinations.length }).map((_, i) => (
                  <DestinationCardSkeleton key={i} />
                ))
              : destinations.map((dest) => (
                  <DestinationCard key={dest.id} destination={dest} />
                ))}
          </div>
        </div>
        {error && <p className="text-red-600 mt-4">{error}</p>}
      </div>
    </section>
  );
}
