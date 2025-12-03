import { DestinationType } from "../../Data/DestinationType";
import { Link } from "react-router-dom";
import DestinationCardSkeleton from "../UI/FeaturedDestinationSkeleton";
import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import axios from "axios";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const API_BASE_URL = "http://localhost:3000";

function DestinationCard({ item }: { item: DestinationType }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const toggleFavorite = () => setIsFavorite((prev) => !prev);

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden h-full flex flex-col">
      <div className="relative">
        <Link to={`/property/${item.id}`}>
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-40 sm:h-44 md:h-48 object-cover"
          />
        </Link>
        {item.bestSeller && (
          <span className="absolute top-3 left-3 bg-white px-3 py-1 rounded-full text-sm font-medium shadow">
            Best Seller
          </span>
        )}

        <button
          onClick={toggleFavorite}
          className="absolute top-3 right-3 p-2 rounded-full bg-white shadow hover:bg-gray-100 transition"
        >
          {isFavorite ? (
            <AiFillHeart className="text-red-500 w-6 h-6" />
          ) : (
            <AiOutlineHeart className="text-red-500 w-6 h-6" />
          )}
        </button>
      </div>

      <div className="p-4 sm:p-5 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 line-clamp-2 flex-1">{item.title}</h3>
          <div className="flex items-center gap-1 flex-shrink-0">
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
            <span className="text-xs sm:text-sm font-medium text-gray-500">
              {item.rating}
            </span>
          </div>
        </div>

        <div className="flex items-start gap-2 text-gray-500 text-xs sm:text-sm mt-1 mb-3 sm:mb-4">
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
          <span className="line-clamp-2">{item.address}</span>
        </div>

        <div className="flex items-center justify-between mt-auto gap-2 sm:gap-3">
          <p className="text-lg sm:text-xl font-semibold text-gray-900">
            ${item.price} <span className="text-xs sm:text-sm text-gray-400">/night</span>
          </p>
          <Link to={`/property/${item.id}`} className="flex-shrink-0">
            <button className="px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 rounded-lg text-xs sm:text-sm text-gray-700 font-medium hover:bg-gray-100 transition whitespace-nowrap">
              Book Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}


export default function FeaturedStays({}: {}) {
  const [loading, setLoading] = useState(true);
  const [destinations, setDestinations] = useState<DestinationType[]>([]);
  const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   setLoading(true);

  //   setTimeout(() => {
  //     setDestinations(featuredData);
  //     setLoading(false);
  //   }, 1500);
  // }, []);

  useEffect(() => {
    const controller = new AbortController();
    const fetchFeatured = async () => {
      try {
        setLoading(true);
        const response = await axios.get<DestinationType[]>(
          `${API_BASE_URL}/featuredStays`,
          { signal: controller.signal }
        );
        console.log("API response:", response.data);
        setDestinations(response.data);
      } catch (err) {
        if (!axios.isCancel(err)) {
          setError("Failed to load featured destinations");
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();

    return () => controller.abort();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-600">
        {error}
      </div>
    );
  }

  const scrollLeft = () => {
    document.getElementById("destinations-row")?.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    document.getElementById("destinations-row")?.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-[#f8f9fb]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900">
            Featured Destination
          </h2>
          <p className="text-sm sm:text-base text-gray-500 mt-2 sm:mt-3 max-w-2xl mx-auto px-4">
            Discover our handpicked selection of exceptional properties around the
            world, offering unparalleled luxury and unforgettable experiences.
          </p>
        </div>

      {/* <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
        {destinations.map((item, index) => (
          <DestinationCard key={index} item={item} />
        ))}

        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <DestinationCardSkeleton key={i} />
            ))
          : destinations.map((item, index) => (
              <DestinationCard key={index} item={item} />
            ))}
      </div> */}

        <div className="relative w-full max-w-7xl mx-auto mt-6 sm:mt-8 md:mt-10">
          <button
            onClick={scrollLeft}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 
               bg-white shadow-lg rounded-full p-2 md:p-3 hover:bg-gray-100 transition-colors"
            aria-label="Scroll left"
          >
            <FiChevronLeft size={20} className="md:w-6 md:h-6" />
          </button>

          <button
            onClick={scrollRight}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-20
               bg-white shadow-lg rounded-full p-2 md:p-3 hover:bg-gray-100 transition-colors"
            aria-label="Scroll right"
          >
            <FiChevronRight size={20} className="md:w-6 md:h-6" />
          </button>

          <div
            id="destinations-row"
            className="flex gap-4 sm:gap-5 md:gap-6 overflow-x-auto scroll-smooth scrollbar-hide px-2 sm:px-4 pb-4"
          >
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="min-w-[260px] sm:min-w-[280px] md:min-w-[300px] flex-shrink-0">
                    <DestinationCardSkeleton />
                  </div>
                ))
              : destinations.map((item, i) => (
                  <div key={i} className="min-w-[260px] sm:min-w-[280px] md:min-w-[300px] flex-shrink-0">
                    <DestinationCard item={item} />
                  </div>
                ))}
          </div>
        </div>

        {!loading && (
          <div className="text-center mt-8 sm:mt-10 md:mt-12">
            <Link
              to={"/search"}
              className="inline-block px-5 sm:px-6 py-2.5 sm:py-3 border border-gray-400 rounded-full text-sm sm:text-base font-medium hover:bg-gray-100 transition-colors"
            >
              View All Destinations
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
