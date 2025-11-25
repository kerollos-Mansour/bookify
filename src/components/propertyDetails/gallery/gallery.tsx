// import { useState } from "react";
import { BsCamera } from "react-icons/bs";

interface GalleryProps {
  images?: string[];
}

export default function Gallery({ images = [] }: GalleryProps) {
  // const [showAllPhotos, setShowAllPhotos] = useState(false);

  const validImgs = images.filter((img) => img && img.trim() !== "");

  if (validImgs.length === 0) {
    return (
      <div className="imageGallery mb-6 bg-gray-100 rounded-lg p-8 text-center">
        <p className="text-gray-500">No images available</p>
      </div>
    );
  }
  const displayImages = images?.slice(0, 5) || [];
  const remainingCount = images.length - 5;

  return (
    <div className="imageGallery mb-6">
      {/* Mobile Layout */}
      <div className="block md:hidden space-y-2">
        <div className="h-64 overflow-hidden rounded-lg">
          <img
            src={displayImages[0]}
            alt="Main room view"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Grid of 2-4 images if available */}
        {displayImages.length > 1 && (
          <div className="grid grid-cols-2 gap-2">
            {displayImages.slice(1, 3).map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Room view ${index + 2}`}
                className="w-full h-32 object-cover rounded-lg"
                loading="lazy"
              />
            ))}
          </div>
        )}

        {/* Last image with remaining count */}
        {displayImages.length > 3 && (
          <div className="relative h-32">
            <img
              src={displayImages[3]}
              alt="Room view 4"
              className="w-full h-full object-cover rounded-lg"
              loading="lazy"
            />
            {remainingCount > 0 && (
              <button className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white gap-2 rounded-lg hover:bg-opacity-60">
                <BsCamera size={20} />
                <span className="font-semibold">+{remainingCount}</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex gap-2 h-96">
        {/* Large image - always show */}
        <div
          className={`${
            displayImages.length === 1
              ? "w-full rounded-lg"
              : "w-2/3 rounded-l-lg"
          } overflow-hidden`}
        >
          <img
            src={displayImages[0]}
            alt="Main room view"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Small images grid - only if we have more than 1 image */}
        {displayImages.length > 1 && (
          <div
            className={`grid gap-2 w-1/3 ${
              displayImages.length === 2
                ? "grid-cols-1"
                : displayImages.length === 3
                ? "grid-cols-1 grid-rows-2"
                : "grid-cols-2 grid-rows-2"
            }`}
          >
            {displayImages.slice(1, 5).map((img, index) => {
              const actualIndex = index + 1;
              const isLast =
                actualIndex === displayImages.length - 1 || actualIndex === 4;
              const isTopRight = actualIndex === 2 && displayImages.length > 2;
              const isBottomRight = isLast && displayImages.length > 3;

              return (
                <div
                  key={index}
                  className={`relative ${isTopRight ? "rounded-tr-lg" : ""} ${
                    isBottomRight ? "rounded-br-lg" : ""
                  } overflow-hidden`}
                >
                  <img
                    src={img}
                    alt={`Room view ${actualIndex + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  {isLast && remainingCount > 0 && (
                    <button className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white gap-2 hover:bg-opacity-60">
                      <BsCamera size={20} />
                      <span className="font-semibold">+{remainingCount}</span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
