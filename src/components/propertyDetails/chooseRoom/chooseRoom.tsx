// components/rooms/RoomsSection.tsx
import { useState } from "react";
import RoomCard from "./roomCard/roomCard";
import { ROOMS_DATA, FILTERS } from "../../../Data/rooms";

export default function RoomsSection() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredRooms = ROOMS_DATA.filter((room) => {
    if (activeFilter === "all") return true;
    const bedCount = room.amenities.bedType.includes("2 Double") ? 2 : 1;
    const filter = FILTERS.find((f) => f.id === activeFilter);
    return bedCount === filter?.beds;
  });

  return (
    <div className="mt-12 mb-12">
      {/* Header with Filters */}
      <div className="flex justify-between items-center mb-6">
        {/* Filter Pills */}
        <div className="flex gap-3">
          {FILTERS.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-5 py-2 rounded-full border-2 font-medium transition-colors ${
                activeFilter === filter.id
                  ? "border-gray-900 bg-gray-900 text-white"
                  : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Room Count */}
        <div className="text-sm text-gray-700">
          Showing {filteredRooms.length} of {ROOMS_DATA.length} rooms
        </div>
      </div>

      {/* Rooms Grid */}
      <div className="grid grid-cols-3 gap-6">
        {filteredRooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </div>
  );
}