import { useState } from "react";
import {
  IoBedOutline,
  IoCarOutline,
  IoInfiniteOutline,
  IoInformationCircleOutline,
  IoPeopleOutline,
  IoResizeOutline,
  IoRestaurantOutline,
  IoWifiOutline,
} from "react-icons/io5";
import {
  MdCameraAlt,
  MdChevronLeft,
  MdChevronRight,
  MdFitnessCenter,
  MdTv,
  MdCoffee,
  MdBalcony,
  MdAir,
  MdRestaurant,
  MdSupportAgent,
  MdHotTub
} from "react-icons/md";
import { Room } from "../../../../types/rooms.type";
import { useNavigate } from "react-router-dom";
import { Hotel } from "../../../../types/hotel.type";
import { GalleryModal } from "../../gallery/gallery";

interface RoomCardProps {
  room: Room;
  hotel: Hotel;
}

const ICON_MAP: Record<string, any> = {
  fitness: MdFitnessCenter,
  tv: MdTv,
  coffee: MdCoffee,
  balcony: MdBalcony,
  ac: MdAir,
  breakfast: MdRestaurant,
  concierge: MdSupportAgent,
  jacuzzi: MdHotTub,
};

const VALUE_AMENITIES = [
  { key: "size", icon: IoResizeOutline, label: (val: any) => val, className: "text-muted-foreground" },
  { key: "bedrooms", icon: IoBedOutline, label: (val: any) => `${val} bedroom${val > 1 ? "s" : ""}`, className: "text-gray-700 font-medium" },
  { key: "sleeps", icon: IoPeopleOutline, label: (val: any) => `Sleeps ${val}`, className: "text-muted-foreground" },
  { key: "bedType", icon: IoBedOutline, label: (val: any) => `${val} bed`, className: "text-muted-foreground capitalize" },
];

export default function RoomCard({ room, hotel }: RoomCardProps) {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  let navigate = useNavigate();

  const handlNextImage = () => {
    setCurrentImgIndex((prev) =>
      prev === room.images.length - 1 ? 0 : prev + 1
    );
  };

  const handlPrevImg = () => {
    setCurrentImgIndex((prev) =>
      prev === 0 ? room.images.length - 1 : prev - 1
    );
  };

  const handleReserve = () => {
    navigate("/booking-info", {
      state: {
        room,
        hotel,
      },
    });
  };

  const openGallery = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsGalleryOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeGallery = () => {
    setIsGalleryOpen(false);
    document.body.style.overflow = "auto";
  };

  return (
    <>
      {isGalleryOpen && (
        <GalleryModal
          images={room.images}
          initialIndex={currentImgIndex}
          onClose={closeGallery}
        />
      )}
      {/* i need to make all cards has the same height */}
      <div className="bg-card rounded-xl border border-card-border overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col group/card">
        <div className="relative h-64 bg-muted overflow-hidden">
          <img
            src={room.images[currentImgIndex]}
            alt={room.name}
            className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-700"
          />

          {/* Navigation Arrows */}
          <button
            onClick={(e) => { e.stopPropagation(); handlPrevImg(); }}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-black/80 backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-white dark:hover:bg-black transition-all opacity-0 group-hover/card:opacity-100"
          >
            <MdChevronLeft className="text-xl" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); handlNextImage(); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-black/80 backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-white dark:hover:bg-black transition-all opacity-0 group-hover/card:opacity-100"
          >
            <MdChevronRight className="text-xl" />
          </button>

          <button
            onClick={openGallery}
            className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white px-3 py-1.5 rounded-full flex items-center gap-2 text-xs font-medium hover:bg-black/80 transition-all active:scale-95"
          >
            <MdCameraAlt className="text-sm" />
            <span>{room.images.length}</span>
          </button>
        </div>
        <div className="p-4 flex-1 flex flex-col">
          {/* Room Name */}
          <h3 className="text-lg font-bold text-foreground mb-3 line-clamp-2 min-h-[3.5rem]">{room.name}</h3>

          {/* Amenities Container */}
          <div className="space-y-2 mb-4 flex-1">
            {/* Value-based Amenities (Size, Beds, etc.) */}
            {VALUE_AMENITIES.map(({ key, icon: Icon, label, className }) => {
              const value = (room as any)[key];
              if (!value) return null;
              return (
                <div key={key} className={`flex items-center gap-2 text-sm ${className}`}>
                  <Icon className="text-lg flex-shrink-0" />
                  <span>{label(value)}</span>
                </div>
              );
            })}

            {/* Dynamic Amenities from API */}
            {room.amenities?.map((amenity) => {
              const Icon = ICON_MAP[amenity.icon] || IoInformationCircleOutline;
              const isTeal = ["breakfast", "concierge", "jacuzzi"].includes(amenity.icon);
              return (
                <div key={amenity._id} className={`flex items-center gap-2 text-sm ${isTeal ? "text-teal-700 font-medium" : "text-muted-foreground"}`}>
                  <Icon className="text-lg flex-shrink-0" />
                  <span>{amenity.name}</span>
                </div>
              );
            })}
          </div>

          <div className="mb-4">
            {room.refundable?.isRefundable ? (
              <div className="flex items-center gap-2 text-sm text-teal-700">
                <span className="font-medium">Fully refundable</span>
                <IoInformationCircleOutline className="text-lg" />
              </div>
            ) : (
              <div className="flex items-center gap-2 text-sm text-red-600">
                <span className="font-medium">Non-refundable</span>
                <IoInformationCircleOutline className="text-lg" />
              </div>
            )}
            {room.refundable?.deadline && (
              <div className="text-xs text-muted-foreground mt-1">
                Before {room.refundable.deadline}
              </div>
            )}
          </div>

          {/* More Details Link */}
          {/* <button className="text-blue-600 hover:underline text-sm font-medium flex items-center gap-1 mb-2">
            More details
            <MdChevronRight />
          </button> */}

          {/* Price Section */}
          <div className="border-t border-card-border pt-4 mt-auto">
            {room.price.discount > 0 && (
              <div className="bg-red-600 text-white px-2 py-1 rounded text-[10px] font-bold inline-block mb-2 uppercase tracking-tight">
                Save {room.price.currency}{room.price.discount.toLocaleString()} today
              </div>
            )}

            <div className="flex items-baseline justify-between mb-1">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-foreground">
                  {room.price.currency}
                  {(room.price.discounted || room.price.original).toLocaleString()}
                </span>
                <span className="text-xs text-muted-foreground font-medium">/night</span>
              </div>
            </div>

            <div className="flex flex-col gap-0.5">
              {room.price.original > (room.price.discounted || room.price.original) && (
                <span className="text-xs text-gray-500 line-through">
                  Was {room.price.currency}{room.price.original.toLocaleString()}
                </span>
              )}
              <span className="text-xs font-bold text-foreground">
                {room.price.currency}
                {(room.price.discounted || room.price.original).toLocaleString()} total
              </span>
              <p className="text-[10px] text-muted-foreground">includes taxes & fees</p>
            </div>
          </div>
        </div>
        {/* reserve button */}
        <div className="p-4 pt-0">
          <button
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm md:text-base"
            onClick={() => handleReserve()}
          >
            Reserve
          </button>
        </div>
      </div>
    </>
  );
}
