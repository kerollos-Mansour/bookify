// components/rooms/RoomsSection.tsx
import { useState } from "react";
import RoomCard from "./roomCard/roomCard";

// Mock Data
const ROOMS_DATA = [
  {
    id: 1,
    name: "Standard Double Room, Ocean View (U)",
    images: [
      "/room1.png",
      "/room2.png",
    ],
    amenities: {
      breakfast: true,
      parking: true,
      size: "312 sq ft",
      sleeps: 3,
      bedType: "2 Double Beds OR 1 King Bed",
      allInclusive: true,
      wifi: true,
    },
    refundable: {
      isRefundable: true,
      deadline: "Tue, Feb 3",
    },
    price: {
      original: 80517,
      discounted: 40447,
      discount: 40070,
      currency: "EGP",
    },
  },
  {
    id: 2,
    name: "Junior Suite, Ocean View (U)",
    images: [
      "/room3.png",
      "/room4.png",
    ],
    amenities: {
      breakfast: true,
      parking: true,
      size: "474 sq ft",
      sleeps: 3,
      bedType: "2 Double Beds OR 1 King Bed",
      allInclusive: true,
      wifi: true,
      bedrooms: 1,
    },
    refundable: {
      isRefundable: true,
      deadline: "Tue, Feb 3",
    },
    price: {
      original: 86362,
      discounted: 43368,
      discount: 42994,
      currency: "EGP",
    },
  },
  {
    id: 3,
    name: "Double Room, 2 Bedrooms, Ocean View (U)",
    images: [
      "/room5.png",
      "/room1.png",
    ],
    amenities: {
      breakfast: true,
      parking: true,
      size: "323 sq ft",
      sleeps: 6,
      bedType: "1 King Bed",
      allInclusive: true,
      wifi: true,
      bedrooms: 2,
    },
    refundable: {
      isRefundable: true,
      deadline: "Tue, Feb 3",
    },
    price: {
      original: 160588,
      discounted: 80465,
      discount: 80120,
      currency: "EGP",
    },
  },
];

const FILTERS = [
  { id: "all", label: "All rooms", beds: null },
  { id: "1bed", label: "1 bed", beds: 1 },
  { id: "2beds", label: "2 beds", beds: 2 },
];

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