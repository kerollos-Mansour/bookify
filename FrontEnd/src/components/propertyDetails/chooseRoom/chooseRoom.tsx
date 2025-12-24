// components/rooms/RoomsSection.tsx
import { useMemo, useState } from "react";
import RoomCard from "./roomCard/roomCard";
import { FILTERS, Room } from "../../../types/rooms.type";

interface RoomsSectionProps {
  rooms?: Room[];
}

const parseBedCount = (bedType?: string) => {
  if (!bedType) return 1;
  const match = bedType.match(/\d+/);
  return match ? Number(match[0]) : 1;
};

export default function RoomsSection({ rooms = [] }: RoomsSectionProps) {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => {
      if (activeFilter === "all") return true;
      const filter = FILTERS.find((f) => f.id === activeFilter);
      if (!filter?.beds) return true;
      return parseBedCount(room.amenities.bedType) === filter.beds;
    });
  }, [rooms, activeFilter]);

  return (
    <div className="mt-12 mb-9">
      {/* Header with Filters */}
      <div className="flex justify-between items-center mb-6">
        {/* Filter Pills */}
        <div className="flex gap-3">
          {FILTERS.map((filter) => (
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
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      )}
    </div>
  );
}
