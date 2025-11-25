// import { useState } from "react";
import { BsCamera } from "react-icons/bs";

interface GalleryProps {
  images?: string[];
}

export default function Gallery({ images = [] }: GalleryProps) {
  // const [showAllPhotos, setShowAllPhotos] = useState(false);

  // Get first 5 images for gallery display
  const displayImages = images?.slice(0, 5) || [];
    const remainingCount = images.length - 5;

  return (
    <>
      <div className="imageGallery mb-6">
        {/* Mobile: Single column stack */}
        <div className="block md:hidden space-y-2">
          <div className="h-64 overflow-hidden rounded-lg">
            <img
              src={displayImages[0]}
              alt="Main room view"
              className="w-full h-full object-cover"
              onError={(e) => (e.currentTarget.src = "/room1.png")}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <img
              src={displayImages[1]}
              alt="Room view 2"
              className="w-full h-32 object-cover rounded-lg"
              onError={(e) => (e.currentTarget.src = "/room2.png")}
            />
            <img
              src={displayImages[2]}
              alt="Room view 3"
              className="w-full h-32 object-cover rounded-lg"
              onError={(e) => (e.currentTarget.src = "/room3.png")}
            />
          </div>
          <div className="relative h-32">
            <img
              src={displayImages[3]}
              alt="Room view 4"
              className="w-full h-full object-cover rounded-lg"
              onError={(e) => (e.currentTarget.src = "/room4.png")}
            />
            {remainingCount > 0 && (
              <button className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white gap-2 rounded-lg hover:bg-opacity-60">
                <BsCamera size={20} />
                <span className="font-semibold">{remainingCount}+</span>
              </button>
            )}
          </div>
        </div>

        {/* Desktop: Side-by-side layout */}
        <div className="hidden md:flex gap-2 h-96">
          {/* Large image */}
          <div className="w-2/3 overflow-hidden rounded-l-lg">
            <img
              src={displayImages[0]}
              alt="Main room view"
              className="w-full h-full object-cover"
              onError={(e) => (e.currentTarget.src = "/room1.png")}
            />
          </div>

          {/* Small images grid */}
          <div className="grid grid-cols-2 grid-rows-2 gap-2 w-1/3">
            <img
              src={displayImages[1]}
              alt="Room view 2"
              className="w-full h-full object-cover"
              onError={(e) => (e.currentTarget.src = "/room2.png")}
            />
            <img
              src={displayImages[2]}
              alt="Room view 3"
              className="w-full h-full object-cover rounded-tr-lg"
              onError={(e) => (e.currentTarget.src = "/room3.png")}
            />
            <img
              src={displayImages[3]}
              alt="Room view 4"
              className="w-full h-full object-cover"
              onError={(e) => (e.currentTarget.src = "/room4.png")}
            />
            {/* Last image with overlay */}
            {displayImages[4] && (
              
              <div className="relative">
              <img
                src={displayImages[4]}
                alt="Room view 5"
                className="w-full h-full object-cover rounded-br-lg"
                onError={(e) => (e.currentTarget.src = "/room5.png")}
                />
              {remainingCount > 0 && (
                <button className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white gap-2 rounded-br-lg hover:bg-opacity-60">
                  <BsCamera size={20} />
                  <span className="font-semibold">{remainingCount}+</span>
                </button>
              )}
            </div>
                )}
          </div>
        </div>
      </div>
    </>
  );
}
