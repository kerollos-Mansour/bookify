import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useFavorites } from "../../context/favoritesContext";
import { visitedStorage } from "../../utils/visitedStorage";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function HotelCard({ cardData }) {
  const { favorites, addFavorite, setOpenSidebar } = useFavorites();
  const isFavorite = favorites?.some((f) => f.id === cardData.id) ?? false;
  const [currentImage, setCurrentImage] = useState(0);
  const [showToast, setShowToast] = useState(false);

  const nextImage = () => {
    setCurrentImage((prev) =>
      prev < cardData.img.img.length - 1 ? prev + 1 : 0
    );
  };

  const prevImage = () => {
    setCurrentImage((prev) =>
      prev > 0 ? prev - 1 : cardData.img.img.length - 1
    );
  };

  const handleFavorite = () => {
    if (isFavorite) {
      setOpenSidebar(true);
    } else {
      addFavorite({
        id: cardData.id,
        title: cardData.title,
        image: cardData.img.img[0],
        rating: cardData.reviews.avgReview,
        address: cardData.location,
        price: cardData.prices.nightly,
        bestSeller: cardData.vip,
      });
      setShowToast(true);
    }
  };
  const handleVisit = () => {
    visitedStorage.add({
      id: cardData.id,
      title: cardData.title,
      image: cardData.img.img[0],
      rating: cardData.reviews.avgReview,
      address: cardData.location,
      price: cardData.prices.nightly,
      vip: cardData.vip,
      bestSeller: cardData.featured,
    });
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <div className="mb-4 w-full h-64 mx-auto bg-card rounded-2xl border border-card-border overflow-hidden font-sans flex flex-row hover:shadow-lg transition-shadow duration-300">
      <div className="relative w-full lg:w-80 h-56 lg:h-auto flex-shrink-0">
        <Link
          to={`/property/${cardData.id}`}
          className="block w-full h-full"
          onClick={handleVisit}
        >
          <img
            className="w-full h-full object-cover"
            src={cardData.img.img[currentImage]}
            alt={cardData.img.alt}
          />
        </Link>

        {/* Badge */}
        {cardData.vip ? (
          <div className="absolute top-3 left-3 bg-cyan-950 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
            VIP Access
          </div>
        ) : cardData.featured ? (
          <div className="absolute top-3 left-3 bg-linear-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
            Best Seller
          </div>
        ) : null}

        {/* Heart Icon */}
        <button
          onClick={handleFavorite}
          className="cursor-pointer absolute z-10 top-3 right-3 bg-card/90 backdrop-blur-sm p-2.5 rounded-full shadow-md hover:bg-card hover:scale-110 transition-all duration-200"
        >
          {isFavorite ? (
            <AiFillHeart className="text-red-500 w-6 h-6" />
          ) : (
            <AiOutlineHeart className="text-red-500 dark:text-red-400 w-6 h-6" />
          )}
        </button>

        {/* navigate between images */}
        <button
          onClick={prevImage}
          className="cursor-pointer z-10 absolute left-2 top-1/2 -translate-y-1/2 bg-card/90 backdrop-blur p-2 rounded-full shadow-md hover:bg-card transition-all duration-200"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={nextImage}
          className="cursor-pointer z-10 absolute right-2 top-1/2 -translate-y-1/2 bg-card/90 backdrop-blur p-2 rounded-full shadow-md hover:bg-card transition-all duration-200"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Content Section */}
      <div className="p-5 lg:p-6 w-full flex flex-col">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-card-foreground mb-1">
            <Link
              to={`/property/${cardData.id}`}
              className="hover:text-blue-600 transition-colors"
              onClick={handleVisit}
            >
              {cardData.title}
            </Link>
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            {cardData.location}
          </p>

          {/* Amenities */}
          <div className="flex flex-wrap gap-2 mb-4">
            {cardData.Amenities.slice(0, 3).map((amenity, index) => (
              <span
                key={index}
                className="text-xs bg-muted text-muted-foreground px-2.5 py-1 rounded-full"
              >
                {amenity}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Section: Rating and Price */}
        <div className="flex items-end justify-between gap-4 mt-auto pt-4 border-t border-card-border">
          {/* Rating */}
          {cardData.reviews ? (
            <div className="flex items-center gap-2.5">
              <div className="bg-blue-600 text-white px-3 py-2 rounded-lg text-base font-bold">
                {cardData.reviews.avgReview.toFixed(1)}
              </div>
              <div>
                <p className="font-semibold text-card-foreground text-sm">
                  {cardData.reviews.ratingText || "Excellent"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {cardData.reviews.reviewsCount.toLocaleString()} reviews
                </p>
              </div>
            </div>
          ) : null}

          {/* Prices */}
          <div className="text-right">
            {/* Discount Badge */}
            {cardData.prices.offer > 0 && (
              <div className="flex items-center gap-2 justify-end mb-1.5">
                <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-semibold px-2.5 py-1 rounded-full">
                  {cardData.prices.offer}% off
                </span>
              </div>
            )}

            {/* Nightly Rate */}
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-2">
                {cardData.prices.originalPrice > cardData.prices.nightly && (
                  <span className="text-sm text-muted-foreground line-through">
                    EGP {cardData.prices.originalPrice.toLocaleString()}
                  </span>
                )}
                <p className="text-sm text-muted-foreground">
                  <span className="text-xl font-bold text-card-foreground">
                    EGP {cardData.prices.nightly.toLocaleString()}
                  </span>{" "}
                  <span className="text-sm font-normal">/ night</span>
                </p>
              </div>

              {/* Total Price (Only shown if different from nightly) */}
              {cardData.prices.day > 0 &&
                cardData.prices.day !== cardData.prices.nightly && (
                  <div className="mt-1">
                    <span className="text-lg font-bold text-card-foreground">
                      EGP {cardData.prices.day.toLocaleString()}
                    </span>
                    <p className="text-xs text-muted-foreground">total price</p>
                  </div>
                )}
            </div>

            {cardData.withFees && (
              <p className="text-xs text-muted-foreground mt-1">
                includes taxes & fees
              </p>
            )}
          </div>
        </div>
      </div>

      {showToast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-sm text-white px-6 py-4 rounded-xl shadow-xl flex items-center justify-between gap-4 max-w-[90%] w-auto z-50 animate-toast">
          <p className="text-sm text-gray-200 flex-1">
            This property was saved to your {cardData.title} trip.
          </p>
          <button
            onClick={() => setOpenSidebar(true)}
            className="text-blue-400 font-medium hover:underline whitespace-nowrap"
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
}
