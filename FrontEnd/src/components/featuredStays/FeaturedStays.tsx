import { Link } from "react-router-dom";
import DestinationCardSkeleton from "../UI/FeaturedDestinationSkeleton";
import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useFavorites } from "../../context/favoritesContext";
import { visitedStorage } from "../../utils/visitedStorage";
import { Hotel } from "../../types/hotel.type";
import { useSearchHotelsQuery } from "../../store/api/hotels.api";

function DestinationCard({ hotel }: { hotel: Hotel }) {
  const { favorites, addFavorite, setOpenSidebar } = useFavorites();
  const isFavorite = favorites.some((f) => f.id === hotel._id);
  const [showToast, setShowToast] = useState(false);

  const handleVisit = () => {
    visitedStorage.add({
      id: hotel._id,
      title: hotel.name,
      image: hotel.images?.[0],
      rating: hotel.hotelRating,
      address: hotel.location?.address ?? hotel.location?.city ?? "",
      price: hotel.lowRate ?? hotel.highRate ?? 0,
      bestSeller: !!hotel.featured,
    });
  };

  const handleFavorite = () => {
    if (isFavorite) {
      setOpenSidebar(true);
    } else {
      addFavorite({
        id: hotel._id,
        title: hotel.name,
        image: hotel.images?.[0],
        rating: hotel.hotelRating,
        address: hotel.location?.address ?? hotel.location?.city ?? "",
        price: hotel.lowRate ?? hotel.highRate ?? 0,
        bestSeller: !!hotel.featured,
      });
      setShowToast(true);
    }
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <>
      <div className="group bg-card rounded-xl shadow-md hover:shadow-2xl border border-card-border overflow-hidden h-full flex flex-col transition-all duration-300 hover:-translate-y-1">
        <div className="relative">
          <Link to={`/property/${hotel._id}`} onClick={handleVisit}>
            <img
              src={hotel.images?.[0]}
              alt={hotel.name}
              className="w-full h-52 sm:h-60 md:h-64 object-contain group-hover:scale-110 transition-transform duration-500"
            />
          </Link>
          {hotel.featured && (
            <span className="absolute top-3 left-3 bg-linear-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
              Best Seller
            </span>
          )}

          <button
            onClick={handleFavorite}
            className="absolute top-3 right-3 p-2 rounded-full bg-card/90 backdrop-blur-sm shadow-md hover:bg-card hover:scale-110 transition-all duration-200"
          >
            {isFavorite ? (
              <AiFillHeart className="text-red-500 w-6 h-6" />
            ) : (
              <AiOutlineHeart className="text-red-500 dark:text-red-400 w-6 h-6" />
            )}
          </button>
        </div>

        <div className="p-4 sm:p-5 flex-1 flex flex-col">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-base sm:text-lg font-semibold text-card-foreground line-clamp-2 flex-1">
              {hotel.name}
            </h3>
            <div className="flex items-center gap-1 flex-shrink-0 bg-accent px-2 py-1 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                className="sm:w-4 sm:h-4"
                fill="#f97316"
                viewBox="0 0 24 24"
              >
                <path d="M12 .587l3.668 7.568L24 9.748l-6 5.848L19.335 24 12 19.771 4.665 24 6 15.596l-6-5.848 8.332-1.593z" />
              </svg>
              <span className="text-xs sm:text-sm font-semibold text-foreground">
                {hotel.hotelRating}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-2 text-muted-foreground text-xs sm:text-sm mt-1 mb-3 sm:mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              className="sm:w-4 sm:h-4 flex-shrink-0 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 11.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7-7.5 11-7.5 11S4.5 17.5 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>
            <span className="line-clamp-2">
              {hotel.location?.address ?? hotel.location?.city}
            </span>
          </div>

          <div className="flex items-center justify-between mt-auto gap-2 sm:gap-3">
            <p className="text-lg sm:text-xl font-bold text-card-foreground">
              ${hotel.lowRate ?? hotel.highRate}
              <span className="text-xs sm:text-sm text-muted-foreground font-normal">
                /night
              </span>
            </p>
            <Link to={`/property/${hotel._id}`} className="flex-shrink-0">
              <button className="px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-xs sm:text-sm text-white font-semibold transition-all duration-200 hover:shadow-lg whitespace-nowrap">
                Book Now
              </button>
            </Link>
          </div>
        </div>
      </div>

      {showToast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-sm text-white px-6 py-4 rounded-xl shadow-xl flex items-center justify-between gap-4 max-w-[90%] w-auto z-50 animate-toast">
          <p className="text-sm text-gray-200 flex-1">
            This property was saved to your {hotel.name} trip.
          </p>
          <button
            onClick={() => setOpenSidebar(true)}
            className="text-blue-400 font-medium hover:underline whitespace-nowrap"
          >
            Edit
          </button>
        </div>
      )}
    </>
  );
}

export default function FeaturedStays() {
  const {
    data: destinations = [],
    isLoading,
    isError,
  } = useSearchHotelsQuery({ featured: true });
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleScroll = () => {
    const container = document.getElementById("destinations-row");
    if (!container) return;

    const atStart = container.scrollLeft === 0;
    const atEnd =
      container.scrollLeft + container.clientWidth >= container.scrollWidth - 5;

    setShowLeftArrow(!atStart);
    setShowRightArrow(!atEnd);
  };

  useEffect(() => {
    const container = document.getElementById("destinations-row");
    if (!container) return;

    handleScroll(); // initial check
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [destinations]);

  const scrollLeft = () => {
    document
      .getElementById("destinations-row")
      ?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    document
      .getElementById("destinations-row")
      ?.scrollBy({ left: 300, behavior: "smooth" });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen text-red-600">
        Failed to load featured destinations
      </div>
    );
  }

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-Background transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-full">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground">
            Featured Destination
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground mt-2 sm:mt-3 max-w-2xl mx-auto px-4">
            Discover our handpicked selection of exceptional properties around
            the world, offering unparalleled luxury and unforgettable
            experiences.
          </p>
        </div>

        <div className="relative w-full mt-6 sm:mt-8 md:mt-10">
          {showLeftArrow && (
            <button
              onClick={scrollLeft}
              className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-card shadow-lg rounded-full p-2 md:p-3 hover:bg-accent border border-card-border transition-colors"
            >
              <FiChevronLeft size={22} />
            </button>
          )}

          {showRightArrow && (
            <button
              onClick={scrollRight}
              className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-20
              bg-card shadow-lg rounded-full p-2 md:p-3 hover:bg-accent border border-card-border transition-colors"
            >
              <FiChevronRight size={22} />
            </button>
          )}

          <div
            id="destinations-row"
            className="flex gap-4 sm:gap-6 overflow-x-auto scroll-smooth scrollbar-hide px-4 sm:px-8 pb-4"
          >
            {destinations.length === 0
              ? Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="min-w-[300px] sm:min-w-[340px] md:min-w-[380px] flex-shrink-0"
                >
                  <DestinationCardSkeleton />
                </div>
              ))
              : destinations.map((hotel) => (
                <div
                  key={hotel._id}
                  className="min-w-[300px] sm:min-w-[340px] md:min-w-[380px] flex-shrink-0"
                >
                  <DestinationCard hotel={hotel} />
                </div>
              ))}
          </div>
        </div>

        {destinations.length > 0 && (
          <div className="text-center mt-8 sm:mt-10 md:mt-12">
            <Link
              to={"/search"}
              className="inline-block px-5 sm:px-6 py-2.5 sm:py-3 border border-card-border rounded-full text-sm sm:text-base font-medium text-foreground hover:bg-accent transition-colors"
            >
              View All Destinations
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
