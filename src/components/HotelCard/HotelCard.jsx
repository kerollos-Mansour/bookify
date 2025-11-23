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
        <div className="mb-4 w-full mx-auto bg-white rounded-2xl border border-cyan-200 overflow-hidden font-sans flex flex-col lg:flex-row">
            <div className="relative">
                {/* Image */}
                <img
                    className="w-full h-full object-cover"
                    src={cardData.img.img[currentImage]}
                    alt={cardData.img.alt}
                />

                {/* VIP Badge */}
                {cardData.vip ? (
                    <div className="absolute top-4 left-4 bg-cyan-950 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                        VIP Access
                    </div>
                ) : null}

                {/* Hart Icon */}

                <button
                    onClick={() => setIsLiked(!isLiked)}
                    className="cursor-pointer absolute z-10 top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition"
                >
                    <Heart
                        className={`w-6 h-6 transition-all duration-300 ${
                            isLiked
                                ? "fill-red-500 text-red-500 scale-110"
                                : "text-gray-700 group-hover:text-red-500"
                        }`}
                    />
                </button>

                {/* navigate between images */}
                <button
                    onClick={prevImage}
                    className="cursor-pointer z-10 absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur p-2 rounded-full shadow-lg"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                    onClick={nextImage}
                    className="cursor-pointer z-10 absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur p-2 rounded-full shadow-lg"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>

            <div to="/search#" className="p-5 w-full">
                <div>
                    <h3 className="text-lg font-bold text-gray-900">
                        {cardData.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                        {cardData.location}
                    </p>

                    {/* Kitchen Icon */}
                    <ul className="flex items-center gap-2 mt-3 text-gray-700">
                        {cardData.Amenities.map((a,index) => (
                            <li key={index} className="text-sm">{a}</li>
                        )) || null}
                    </ul>

                    <div className="flex items-end justify-between mt-6">
                        {/* Rating */}
                        <div className="flex items-center gap-3">
                            <div className="bg-green-700 text-white px-3 py-1.5 rounded-lg text-lg font-bold">
                                {cardData.reviews.avgReview}
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900">
                                    Excellent
                                </p>
                                <p className="text-xs text-gray-500">
                                    {cardData.reviews.reviewsCount} reviews
                                </p>
                            </div>
                        </div>

                        {/* prices */}
                        <div className="text-right">
                            <div className="flex items-center gap-2 justify-end mb-1">
                                <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
                                    EGP{" "}
                                    {cardData.prices.day *
                                        (cardData.prices.offer / 100)}{" "}
                                    off
                                </span>
                            </div>
                            <p className="text-2xl font-bold text-gray-900">
                                EGP {cardData.prices.nightly}{" "}
                                <span className="text-sm font-normal text-gray-500">
                                    nightly
                                </span>
                            </p>
                            <p className="text-2xl font-bold text-gray-900">
                                <span className="text-sm text-gray-500 line-through">
                                    EGP{" "}
                                    {cardData.prices.day * 1 +
                                        cardData.prices.day *
                                            (cardData.prices.offer / 100)}
                                </span>{" "}
                                EGP {cardData.prices.day}{" "}
                                <span className="text-sm font-normal text-gray-500">
                                    total
                                </span>
                            </p>

                            {cardData.withFees && (
                                <p className="text-sm text-gray-600 mt-1">
                                    with taxes and fees
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
