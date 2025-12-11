import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function HotelCard({ cardData }) {
  const [isLiked, setIsLiked] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

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

  return (
    <div className="mb-4 w-full mx-auto bg-white rounded-2xl border border-gray-200 overflow-hidden font-sans flex flex-col lg:flex-row hover:shadow-lg transition-shadow duration-300">
      <div className="relative w-full lg:w-80 h-56 lg:h-auto flex-shrink-0">
        <img
          className="w-full h-full object-cover"
          src={cardData.img.img[currentImage]}
          alt={cardData.img.alt}
        />

        {/* VIP Badge */}
        {cardData.vip && (
          <div className="absolute top-3 left-3 bg-cyan-950 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
            VIP Access
          </div>
        )}

        {/* Heart Icon */}
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="cursor-pointer absolute z-10 top-3 right-3 bg-white/90 backdrop-blur-sm p-2.5 rounded-full shadow-md hover:bg-white hover:scale-110 transition-all duration-200"
        >
          <Heart
            className={`w-5 h-5 transition-all duration-300 ${
              isLiked ? "fill-red-500 text-red-500 scale-110" : "text-gray-700"
            }`}
          />
        </button>

        {/* navigate between images */}
        <button
          onClick={prevImage}
          className="cursor-pointer z-10 absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur p-2 rounded-full shadow-md hover:bg-white transition-all duration-200"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={nextImage}
          className="cursor-pointer z-10 absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur p-2 rounded-full shadow-md hover:bg-white transition-all duration-200"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Content Section */}
      <div className="p-5 lg:p-6 w-full flex flex-col">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-1">
            {cardData.title}
          </h3>
          <p className="text-sm text-gray-600 mb-3">{cardData.location}</p>

          {/* Amenities */}
          <div className="flex flex-wrap gap-2 mb-4">
            {cardData.Amenities.slice(0, 3).map((amenity, index) => (
              <span
                key={index}
                className="text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full"
              >
                {amenity}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Section: Rating and Price */}
        <div className="flex items-end justify-between gap-4 mt-auto pt-4 border-t border-gray-100">
          {/* Rating */}
          <div className="flex items-center gap-2.5">
            <div className="bg-blue-600 text-white px-3 py-2 rounded-lg text-base font-bold">
              {cardData.reviews.avgReview.toFixed(1)}
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">Excellent</p>
              <p className="text-xs text-gray-500">
                {cardData.reviews.reviewsCount.toLocaleString()} reviews
              </p>
            </div>
          </div>

          {/* Prices - Static Display, No Calculations */}
          <div className="text-right">
            {/* Discount Badge */}
            <div className="flex items-center gap-2 justify-end mb-1.5">
              <span className="bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                {cardData.prices.offer}% off
              </span>
            </div>

            {/* Nightly Rate */}
            <p className="text-sm text-gray-600 mb-0.5">
              <span className="text-xl font-bold text-gray-900">
                EGP {cardData.prices.nightly}
              </span>{" "}
              <span className="text-sm font-normal">/ night</span>
            </p>

            {/* Total Price */}
            <div className="flex items-center gap-2 justify-end">
              <span className="text-sm text-gray-500 line-through">
                EGP {cardData.prices.originalPrice}
              </span>
              <span className="text-lg font-bold text-gray-900">
                {cardData.prices.day}
              </span>
            </div>

            {/* Total Label */}
            <p className="text-xs text-gray-500 mt-0.5">total price</p>

            {cardData.withFees && (
              <p className="text-xs text-gray-600 mt-1">
                includes taxes & fees
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
