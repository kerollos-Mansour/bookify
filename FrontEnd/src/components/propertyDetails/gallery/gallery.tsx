import { useState, useEffect } from "react";
import { BsCamera, BsChevronLeft, BsChevronRight, BsX } from "react-icons/bs";

interface GalleryProps {
  images?: string[];
}

export default function Gallery({ images = [] }: GalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const validImgs = images.filter((img) => img && img.trim() !== "");
  const displayImages = validImgs.slice(0, 5) || [];
  const remainingCount = Math.max(0, validImgs.length - 5);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;

      switch (e.key) {
        case "Escape":
          closeGallery();
          break;
        case "ArrowRight":
          if (selectedImageIndex < validImgs.length - 1) {
            setSelectedImageIndex(selectedImageIndex + 1);
          }
          break;
        case "ArrowLeft":
          if (selectedImageIndex > 0) {
            setSelectedImageIndex(selectedImageIndex - 1);
          }
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedImageIndex, validImgs.length]);

  const openGallery = (index: number) => {
    setSelectedImageIndex(index);
    document.body.style.overflow = "hidden"; // Prevent background scroll
  };

  const closeGallery = () => {
    setSelectedImageIndex(null);
    setIsFullscreen(false);
    document.body.style.overflow = "auto";
  };

  const goToPrev = () => {
    if (selectedImageIndex !== null && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  const goToNext = () => {
    if (selectedImageIndex !== null && selectedImageIndex < validImgs.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  if (validImgs.length === 0) {
    return (
      <div className="imageGallery mb-6 bg-gray-100 rounded-lg p-8 text-center">
        <p className="text-gray-500">No images available</p>
      </div>
    );
  }

  const GalleryButton = ({ onClick, children, className = "" }: { 
    onClick: () => void; 
    children: React.ReactNode;
    className?: string;
  }) => (
    <button
      onClick={onClick}
      className={`absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white gap-2 hover:bg-opacity-60 transition-opacity ${className}`}
    >
      {children}
    </button>
  );

  return (
    <div className="imageGallery mb-6 relative">
      {/* Mobile Layout */}
      <div className="block md:hidden space-y-2">
        <div 
          className="h-64 overflow-hidden rounded-lg cursor-pointer"
          onClick={() => openGallery(0)}
        >
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
              <div 
                key={index}
                className="relative cursor-pointer"
                onClick={() => openGallery(index + 1)}
              >
                <img
                  src={img}
                  alt={`Room view ${index + 2}`}
                  className="w-full h-32 object-cover rounded-lg"
                  loading="lazy"
                />
              </div>
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
            {remainingCount > 0 ? (
              <GalleryButton onClick={() => openGallery(3)}>
                <BsCamera size={20} />
                <span className="font-semibold">+{remainingCount}</span>
              </GalleryButton>
            ) : (
              <div 
                className="absolute inset-0 cursor-pointer"
                onClick={() => openGallery(3)}
              />
            )}
          </div>
        )}
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex gap-2 h-96">
        {/* Large image - always show */}
        <div
          className={`relative ${
            displayImages.length === 1
              ? "w-full rounded-lg"
              : "w-2/3 rounded-l-lg"
          } overflow-hidden cursor-pointer`}
          onClick={() => openGallery(0)}
        >
          <img
            src={displayImages[0]}
            alt="Main room view"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
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
                  className={`relative cursor-pointer ${isTopRight ? "rounded-tr-lg" : ""} ${
                    isBottomRight ? "rounded-br-lg" : ""
                  } overflow-hidden`}
                  onClick={() => openGallery(actualIndex)}
                >
                  <img
                    src={img}
                    alt={`Room view ${actualIndex + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  {isLast && remainingCount > 0 && (
                    <GalleryButton onClick={() => openGallery(actualIndex)}>
                      <BsCamera size={20} />
                      <span className="font-semibold">+{remainingCount}</span>
                    </GalleryButton>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Gallery Popup Modal */}
{selectedImageIndex !== null && (
  <>
    {/* Fixed overlay that covers everything */}
    <div 
      className="fixed inset-0 bg-black z-[9998]" 
      onClick={closeGallery}
    />
    
    {/* Gallery content */}
    <div className="fixed inset-0 z-[9999] pointer-events-none">
      <div className="relative w-full h-full pointer-events-auto">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-gradient-to-b from-black/80 to-transparent">
          <button
            onClick={closeGallery}
            className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
          >
            <BsX size={28} />
          </button>
          <div className="text-white text-lg font-medium">
            {selectedImageIndex + 1} / {validImgs.length}
          </div>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
          >
            {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          </button>
        </div>

        {/* Main Image */}
        <div className="flex items-center justify-center h-full p-4">
          <img
            src={validImgs[selectedImageIndex]}
            alt={`Gallery image ${selectedImageIndex + 1}`}
            className={`max-h-full max-w-full object-contain ${isFullscreen ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
            onClick={() => setIsFullscreen(!isFullscreen)}
          />
        </div>

        {/* Navigation and thumbnails */}
        {selectedImageIndex > 0 && (
          <button
            onClick={goToPrev}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 p-3 rounded-full transition-colors z-10"
          >
            <BsChevronLeft size={24} />
          </button>
        )}
        
        {selectedImageIndex < validImgs.length - 1 && (
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 p-3 rounded-full transition-colors z-10"
          >
            <BsChevronRight size={24} />
          </button>
        )}

        {/* Thumbnail Strip */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent py-4 z-10">
          <div className="flex gap-2 justify-center px-4 overflow-x-auto">
            {validImgs.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`flex-shrink-0 w-20 h-14 rounded overflow-hidden border-2 transition-all ${
                  index === selectedImageIndex 
                    ? 'border-white scale-105' 
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  </>
)}
    </div>
  );
}