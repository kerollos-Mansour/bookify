import { Link } from "react-router-dom";
import DestinationCardSkeleton from "../UI/FeaturedDestinationSkeleton";
import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { MapPin, Star, Crown, ArrowRight } from "lucide-react";
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
      vip: (hotel.confidenceRating ?? 0) > 50,
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
        vip: (hotel.confidenceRating ?? 0) > 50,
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
      <div className="group bg-white dark:bg-[#111827] rounded-3xl border border-slate-200 dark:border-white/5 overflow-hidden h-full flex flex-col transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
        <div className="relative overflow-hidden h-44">
          <Link to={`/property/${hotel._id}`} onClick={handleVisit}>
            <img
              src={hotel.images?.[0]}
              alt={hotel.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            />
            {/* Soft Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </Link>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {(hotel.confidenceRating ?? 0) > 50 ? (
              <span className="bg-cyan-950 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                VIP Access
              </span>
            ) : hotel.featured ? (
              <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                Best Seller
              </span>
            ) : null}
          </div>

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

        <div className="p-4 flex-1 flex flex-col">
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {hotel.name}
            </h3>
            <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-white/5 py-0.5 px-2 rounded-lg border border-slate-200 dark:border-white/5 flex-shrink-0">
              <Star size={12} className="text-amber-500" fill="#f59e0b" />
              <span className="text-[11px] font-black text-slate-900 dark:text-white">
                {hotel.hotelRating}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-slate-500 dark:text-gray-400 text-[13px] mb-4 font-medium">
            <MapPin size={14} className="text-blue-500 flex-shrink-0" />
            <span className="truncate">
              {hotel.location?.city ?? hotel.location?.address}
            </span>
          </div>

          <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-100 dark:border-white/5">
            <div className="flex flex-col">
              <p className="text-lg font-black text-slate-900 dark:text-white">
                ${hotel.lowRate ?? hotel.highRate}
                <span className="text-[11px] text-slate-400 dark:text-gray-500 font-bold ml-1">/nt</span>
              </p>
            </div>

            <Link to={`/property/${hotel._id}`}>
              <button className="flex items-center gap-1.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 dark:hover:bg-blue-500 dark:hover:text-white transition-all shadow-md active:scale-95 group/btn">
                Select
                <ArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </div>
      </div>

      {showToast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-slate-900/95 dark:bg-white/95 backdrop-blur-xl text-white dark:text-slate-900 px-8 py-5 rounded-[2rem] shadow-2xl flex items-center justify-between gap-6 max-w-[90%] z-[100] animate-toast border border-white/20 dark:border-slate-200">
          <p className="text-sm font-bold tracking-tight">
            Saved to your <span className="text-blue-400 dark:text-blue-600 italic">odyssey</span>
          </p>
          <button
            onClick={() => setOpenSidebar(true)}
            className="text-white dark:text-slate-900 font-black text-[10px] uppercase tracking-widest bg-white/10 dark:bg-slate-900/10 px-4 py-2 rounded-full hover:bg-white/20"
          >
            Review Items
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

    handleScroll();
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [destinations]);

  const scrollLeft = () => {
    document
      .getElementById("destinations-row")
      ?.scrollBy({ left: -400, behavior: "smooth" });
  };

  const scrollRight = () => {
    document
      .getElementById("destinations-row")
      ?.scrollBy({ left: 400, behavior: "smooth" });
  };

  if (isLoading) {
    return (
      <div className="py-24 flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">Seeking Elite Escapes...</p>
      </div>
    );
  }

  return (
    <section className="py-24 bg-[#F8FAFC] dark:bg-[#020617] relative overflow-hidden transition-colors duration-500">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10">
        <div className="container mx-auto px-6 max-w-[95%] 2xl:max-w-[1400px] mb-8 sm:mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-black tracking-widest uppercase mb-6 border border-blue-500/20">
              <Crown size={12} />
              Curated Collections
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-4">
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Extraordinary</span> Destinations
            </h2>
            <p className="text-lg text-slate-500 dark:text-gray-400 font-medium leading-relaxed">
              Handpicked exceptional properties around the world, offering unparalleled luxury and unforgettable experiences.
            </p>
          </div>
        </div>

        <div className="relative w-full overflow-hidden">
          {showLeftArrow && (
            <button
              onClick={scrollLeft}
              className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 z-20 bg-card shadow-xl rounded-full p-3 hover:bg-accent border border-card-border transition-all duration-300 hover:scale-110 active:scale-90"
            >
              <FiChevronLeft size={24} />
            </button>
          )}

          {showRightArrow && (
            <button
              onClick={scrollRight}
              className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 z-20 bg-card shadow-xl rounded-full p-3 hover:bg-accent border border-card-border transition-all duration-300 hover:scale-110 active:scale-90"
            >
              <FiChevronRight size={24} />
            </button>
          )}

          <div
            id="destinations-row"
            className="flex gap-4 sm:gap-8 overflow-x-auto scroll-smooth scrollbar-hide pb-12 snap-x snap-mandatory px-6 sm:px-[calc((100vw-1400px)/2+24px)] md:px-12"
          >
            {destinations.length === 0
              ? Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="w-64 sm:w-72 flex-shrink-0 min-w-0"
                >
                  <DestinationCardSkeleton />
                </div>
              ))
              : destinations.map((hotel) => (
                <div
                  key={hotel._id}
                  className="w-64 sm:w-72 flex-shrink-0 snap-center min-w-0"
                >
                  <DestinationCard hotel={hotel} />
                </div>
              ))}
          </div>
        </div>

        {destinations.length > 0 && (
          <div className="mt-6 flex justify-center">
            <Link
              to="/search"
              className="group relative inline-flex items-center gap-3 px-10 py-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-full text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest hover:border-blue-500 transition-all duration-300 shadow-2xl shadow-slate-200/50 dark:shadow-none overflow-hidden"
            >
              <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <span className="relative z-10 group-hover:text-white transition-colors">Discover All Destinations</span>
              <ArrowRight size={18} className="relative z-10 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
