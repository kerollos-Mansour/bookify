// components/rooms/RoomsSection.tsx
import { useMemo, useState } from "react";
import RoomCard from "./roomCard/roomCard";
import { FILTERS, Room } from "../../../types/rooms.type";
import { Hotel } from "../../../types/hotel.type";

interface RoomsSectionProps {
  rooms?: Room[];
  hotel: Hotel;
}

const parseBedCount = (room: Room) => {
  // 1. Check if bedrooms field is explicitly set
  if (room.bedrooms && room.bedrooms > 0) return room.bedrooms;

  // 2. Try parsing the room name (e.g., "2 Twin Beds")
  const nameMatch = room.name.match(/(\d+)\s*(?:bed|bedroom)/i);
  if (nameMatch) return Number(nameMatch[1]);

  // 3. Try parsing bedType string (e.g., "king" -> 1, "2 double beds" -> 2)
  const bedTypeMatch = room.bedType?.match(/\d+/);
  if (bedTypeMatch) return Number(bedTypeMatch[0]);

  // Fallback to 1 if it's a "king", "queen", etc.
  return 1;
};

export default function RoomsSection({ rooms = [], hotel }: RoomsSectionProps) {
  const [activeFilter, setActiveFilter] = useState("all");

  // Dynamically determine which filters to show based on available rooms
  const availableFilters = useMemo(() => {
    return FILTERS.filter((filter) => {
      if (filter.id === "all") return true;
      return rooms.some((room) => {
        if (filter.beds !== undefined && filter.beds !== null) {
          return parseBedCount(room) === filter.beds;
        }
        if (filter.refundable) {
          return room.refundable?.isRefundable;
        }
        if (filter.amenity) {
          return room.amenities?.some((a) => a.name === filter.amenity);
        }
        return false;
      });
    });
  }, [rooms]);

  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => {
      if (activeFilter === "all") return true;
      const filter = FILTERS.find((f) => f.id === activeFilter);
      if (!filter) return true;

      // Filter by beds
      if (filter.beds !== undefined && filter.beds !== null) {
        return parseBedCount(room) === filter.beds;
      }

      // Filter by refundable
      if (filter.refundable) {
        return room.refundable?.isRefundable;
      }

      // Filter by amenity name
      if (filter.amenity) {
        return room.amenities?.some((a) => a.name === filter.amenity);
      }

      return true;
    });
  }, [rooms, activeFilter]);

  return (
    <div id="rooms" className="mt-12 mb-9">
      {/* Header with Filters */}
      <div className="flex justify-between items-center mb-6">
        {/* Filter Pills */}
        <div className="flex gap-3 overflow-x-auto pb-1 no-scrollbar">
          {availableFilters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-5 py-2 rounded-full border-2 font-medium transition-colors ${activeFilter === filter.id
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-card-border bg-card text-card-foreground hover:border-foreground"
                }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Room Count */}
        <div className="text-sm text-muted-foreground">
          Showing {filteredRooms.length} of {rooms.length} rooms
        </div>
      </div>

      {rooms.length === 0 ? (
        <p className="text-gray-500">
          No rooms are available for the selected property.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredRooms.map((room) => (
            <RoomCard key={room._id || room.id} room={room} hotel={hotel} />
          ))}
        </div>
      )}
    </div>
  );
}
