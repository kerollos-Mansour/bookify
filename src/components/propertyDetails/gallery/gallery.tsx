import { useState, useEffect } from "react";
import { BsCamera, BsChevronLeft, BsChevronRight, BsX } from "react-icons/bs";

interface GalleryModalProps {
  images: string[];
  initialIndex: number;
  onClose: () => void;
}

export function GalleryModal({
  images,
  initialIndex,
  onClose,
}: GalleryModalProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(initialIndex);

  const validImgs = images.filter((img) => img && img.trim() !== "");

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onClose();
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
  }, [selectedImageIndex, validImgs.length, onClose]);

  const goToPrev = () => {
    if (selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  const goToNext = () => {
    if (selectedImageIndex < validImgs.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black z-[9998]"
        onClick={onClose}
      />

      <div className="fixed inset-0 z-[9999] pointer-events-none">
        <div className="relative w-full h-full pointer-events-auto">
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-gradient-to-b from-black/80 to-transparent">
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
            >
              <BsX size={28} />
            </button>
            <div className="text-white text-lg font-medium">
              {selectedImageIndex + 1} / {validImgs.length}
            </div>
            <div className="w-10" />
          </div>

          {/* Main Image */}
          <div className="flex items-center justify-center h-full p-4">
            <img
              src={validImgs[selectedImageIndex]}
              alt={`Gallery image ${selectedImageIndex + 1}`}
              className="max-h-full max-w-full object-contain cursor-pointer"
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
            <div className="flex gap-2 justify-center px-4 overflow-x-auto no-scrollbar">
              {validImgs.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-14 rounded overflow-hidden border-2 transition-all ${index === selectedImageIndex
                      ? "border-white scale-105"
                      : "border-transparent opacity-90 hover:opacity-100"
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
  );
}

interface GalleryProps {
  images?: string[];
}

export default function Gallery({ images = [] }: GalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  const validImgs = images.filter((img) => img && img.trim() !== "");
  const displayImages = validImgs.slice(0, 5) || [];
  const remainingCount = Math.max(0, validImgs.length - 5);

  const openGallery = (index: number) => {
    setSelectedImageIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeGallery = () => {
    setSelectedImageIndex(null);
    document.body.style.overflow = "auto";
  };

  if (validImgs.length === 0) {
    return (
      <div className="imageGallery mb-6 bg-muted rounded-lg p-8 text-center flex flex-col items-center justify-center border border-card-border">
        <BsCamera size={40} className="text-muted-foreground mb-2" />
        <p className="text-muted-foreground font-medium">No images available</p>
      </div>
    );
  }

  const GalleryButton = ({
    onClick,
    children,
    className = "",
  }: {
    onClick: () => void;
    children: React.ReactNode;
    className?: string;
  }) => (
    <button
      onClick={onClick}
      className={`absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center text-white gap-2 hover:bg-black/50 transition-all duration-300 ${className}`}
    >
      {children}
    </button>
  );

  return (
    <div className="imageGallery mb-6 relative group">
      {/* Mobile Layout */}
      <div className="block md:hidden space-y-2">
        <div
          className="h-64 overflow-hidden rounded-xl cursor-pointer"
          onClick={() => openGallery(0)}
        >
          <img
            src={displayImages[0]}
            alt="Main property view"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {displayImages.length > 1 && (
          <div className="grid grid-cols-2 gap-2">
            {displayImages.slice(1, 4).map((img, index) => (
              <div
                key={index}
                className="relative h-32 cursor-pointer"
                onClick={() => openGallery(index + 1)}
              >
                <img
                  src={img}
                  alt={`View ${index + 2}`}
                  className="w-full h-full object-cover rounded-xl"
                  loading="lazy"
                />
                {index === 2 && remainingCount > 0 && (
                  <GalleryButton
                    onClick={() => openGallery(3)}
                    className="rounded-xl"
                  >
                    <BsCamera size={20} />
                    <span className="font-semibold">+{remainingCount}</span>
                  </GalleryButton>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex gap-2 h-[450px]">
        {/* Large image */}
        <div
          className={`relative ${displayImages.length === 1
              ? "w-full rounded-2xl"
              : "w-2/3 rounded-l-2xl"
            } overflow-hidden cursor-pointer`}
          onClick={() => openGallery(0)}
        >
          <img
            src={displayImages[0]}
            alt="Main property view"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />
        </div>

        {/* Small images grid */}
        {displayImages.length > 1 && (
          <div
            className={`grid gap-2 w-1/3 ${displayImages.length === 2
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
                  className={`relative cursor-pointer ${isTopRight ? "rounded-tr-2xl" : ""
                    } ${isBottomRight ? "rounded-br-2xl" : ""} overflow-hidden`}
                  onClick={() => openGallery(actualIndex)}
                >
                  <img
                    src={img}
                    alt={`View ${actualIndex + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {isLast && remainingCount > 0 && (
                    <GalleryButton
                      onClick={() => openGallery(actualIndex)}
                      className={isBottomRight ? "rounded-br-2xl" : ""}
                    >
                      <BsCamera size={20} />
                      <span className="font-semibold text-lg">
                        +{remainingCount}
                      </span>
                    </GalleryButton>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Gallery Modal Integration */}
      {selectedImageIndex !== null && (
        <GalleryModal
          images={validImgs}
          initialIndex={selectedImageIndex}
          onClose={closeGallery}
        />
      )}
    </div>
  );
}
