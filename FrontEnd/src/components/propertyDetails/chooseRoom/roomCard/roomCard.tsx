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
import { MdCameraAlt, MdChevronLeft, MdChevronRight } from "react-icons/md";
import { Room } from "../../../../types/rooms";
import { useNavigate } from "react-router-dom";

interface RoomCardProps {
  room: Room;
}
export default function RoomCard({ room }: RoomCardProps) {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
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
        room: {
          id: room.id,
        },
      },
    });

    console.log({
      state: {
        room: {
          id: room.id,
        },
      },
    });
  };

  return (
    <>
    {/* i need to make all cards has the same height */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative h-64 bg-gray-200 ">
          <img
            src={room.images[currentImgIndex]}
            alt={room.name}
            className="w-full h-full object-cover"
          />

          {/* Navigation Arrows */}
          <button
            onClick={handlPrevImg}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
          >
            <MdChevronLeft className="text-xl" />
          </button>
          <button
            onClick={handlNextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
          >
            <MdChevronRight className="text-xl" />
          </button>
          <div className="absolute bottom-3 right-3 bg-gray-900 bg-opacity-80 text-white px-3 py-1 rounded-full flex items-center gap-2 text-sm">
            <MdCameraAlt />
            <span>{room.images.length}</span>
          </div>
        </div>
        <div className="p-4">
          {/* Room Name */}
          <h3 className="text-lg font-bold text-gray-900 mb-3">{room.name}</h3>
          {/* Amenities */}
          <div className="space-y-2 mb-4">
            {room.amenities.breakfast && (
              <div className="flex items-center gap-2 text-sm text-teal-700">
                <IoRestaurantOutline className="text-lg" />
                <span>Free breakfast</span>
              </div>
            )}
            {room.amenities.parking && (
              <div className="flex items-center gap-2 text-sm text-teal-700">
                <IoCarOutline className="text-lg" />
                <span>Free self parking</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <IoResizeOutline className="text-lg" />
              <span>{room.amenities.size}</span>
            </div>
            {room.amenities.bedrooms && (
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <IoBedOutline className="text-lg" />
                <span>
                  {room.amenities.bedrooms} bedroom
                  {room.amenities.bedrooms > 1 ? "s" : ""}
                </span>
              </div>
            )}
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <IoPeopleOutline className="text-lg" />
              <span>Sleeps {room.amenities.sleeps}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <IoBedOutline className="text-lg" />
              <span>{room.amenities.bedType}</span>
            </div>
            {room.amenities.allInclusive && (
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <IoInfiniteOutline className="text-lg" />
                <span>All-inclusive (food/beverages/snacks)</span>
              </div>
            )}
            {room.amenities.wifi && (
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <IoWifiOutline className="text-lg" />
                <span>Free WiFi</span>
              </div>
            )}
          </div>

          <div className="mb-4">
            {room.refundable.isRefundable ? (
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
            <div className="text-xs text-gray-600 mt-1">
              Before {room.refundable.deadline}
            </div>
          </div>

          {/* More Details Link */}
          <button className="text-blue-600 hover:underline text-sm font-medium flex items-center gap-1 mb-4">
            More details
            <MdChevronRight />
          </button>

          {/* Price Section */}
          <div className="border-t pt-4">
            {room.price.discount > 0 && (
              <div className="bg-black text-white px-3 py-1 rounded text-xs font-semibold inline-block mb-2">
                Black Friday {room.price.currency}
                {room.price.discount.toLocaleString()} off
              </div>
            )}

            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-2xl font-bold text-gray-900">
                {room.price.currency}
                {room.price.discounted.toLocaleString()}
              </span>
              <span className="text-sm text-gray-600">nightly</span>
            </div>

            {room.price.original > room.price.discounted && (
              <div className="flex items-baseline gap-2">
                <span className="text-sm text-gray-500 line-through">
                  {room.price.currency}
                  {room.price.original.toLocaleString()}
                </span>
                <span className="text-sm font-medium text-gray-900">
                  {room.price.currency}
                  {room.price.discounted.toLocaleString()} total
                </span>
              </div>
            )}
          </div>
        </div>
        {/* reserve button */}
        <button
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm md:text-base"
          onClick={() => handleReserve()}
        >
          Reserve
        </button>
      </div>
    </>
  );
}
