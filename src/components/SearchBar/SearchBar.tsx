import { LOCATIONS } from "../../Data/locations";
import { useState, useRef, useEffect } from "react";
import {
  MdLocationOn,
  MdCalendarToday,
  MdPerson,
  MdClose,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export function SearchBar() {
  const navigate = useNavigate();
  const { search } = useLocation();

  // States
  const [selectedLocation, setSelectedLocation] = useState(LOCATIONS[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [checkInDate, setCheckInDate] = useState("2024-02-06");
  const [checkOutDate, setCheckOutDate] = useState("2024-02-08");
  const [adults, setAdults] = useState(2);
  const [rooms, setRooms] = useState(1);

  // Dropdown states
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showDatesDropdown, setShowDatesDropdown] = useState(false);
  const [showTravelersDropdown, setShowTravelersDropdown] = useState(false);

  // Refs للـ click outside
  const locationRef = useRef<HTMLDivElement>(null);
  const datesRef = useRef<HTMLDivElement>(null);
  const travelersRef = useRef<HTMLDivElement>(null);

  // Filter locations based on search
  const filteredLocations = LOCATIONS.filter(
    (location) =>
      location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Format dates
  const formatDate = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  useEffect(() => {
    const params = new URLSearchParams(search);

    const urlLocation = params.get("location");
    const urlCheckIn = params.get("checkIn");
    const urlCheckOut = params.get("checkOut");
    const urlAdults = params.get("adults");
    const urlRooms = params.get("rooms");

    if (urlLocation) {
      const found = LOCATIONS.find(
        (loc) => loc.name.toLowerCase() === urlLocation.toLowerCase()
      );
      if (found) setSelectedLocation(found);
    }

    if (urlCheckIn) setCheckInDate(urlCheckIn);
    if (urlCheckOut) setCheckOutDate(urlCheckOut);
    if (urlAdults) setAdults(Number(urlAdults));
    if (urlRooms) setRooms(Number(urlRooms));
  }, [search]);

  
  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        locationRef.current &&
        !locationRef.current.contains(event.target as Node)
      ) {
        setShowLocationDropdown(false);
      }
      if (
        datesRef.current &&
        !datesRef.current.contains(event.target as Node)
      ) {
        setShowDatesDropdown(false);
      }
      if (
        travelersRef.current &&
        !travelersRef.current.contains(event.target as Node)
      ) {
        setShowTravelersDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams({
      location: selectedLocation.name,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      adults: adults.toString(),
      rooms: rooms.toString(),
    });

    navigate(`/search?${params.toString()}`);
  };

  return (
    <div className="relative mb-6">
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-0 bg-white rounded-xl md:rounded-full shadow-lg p-2 md:p-2">
        {/* Where to? */}
        <div
          ref={locationRef}
          className="relative flex items-center gap-2 sm:gap-3 px-3 sm:px-4 md:px-6 py-3 flex-1 border-b md:border-b-0 md:border-r border-gray-200 cursor-pointer hover:bg-gray-50 rounded-t-xl md:rounded-t-none md:rounded-l-full transition-colors"
          onClick={() => {
            setShowLocationDropdown(!showLocationDropdown);
            setShowDatesDropdown(false);
            setShowTravelersDropdown(false);
          }}
        >
          <MdLocationOn className="text-xl sm:text-2xl text-gray-600 flex-shrink-0" />
          <div className="flex flex-col min-w-0 flex-1">
            <label className="text-xs text-gray-600 font-medium mb-1">
              Where to?
            </label>
            <span className="text-xs sm:text-sm font-medium text-gray-900 truncate">
              {selectedLocation.name}
            </span>
          </div>

          {/* Location Dropdown */}
          {showLocationDropdown && (
            <div
              className="absolute top-full left-0 right-0 md:right-auto mt-2 bg-white rounded-lg shadow-2xl p-4 z-50 w-full md:w-96 max-h-96 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Search destinations, hotels..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
              </div>

              <div className="space-y-1">
                {filteredLocations.length > 0 ? (
                  filteredLocations.map((location) => (
                    <div
                      key={location.id}
                      className={`p-3 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors ${
                        selectedLocation.id === location.id ? "bg-blue-50" : ""
                      }`}
                      onClick={() => {
                        setSelectedLocation(location);
                        setShowLocationDropdown(false);
                        setSearchQuery("");
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <MdLocationOn className="text-gray-400 mt-1 flex-shrink-0" />
                        <div>
                          <div className="font-medium text-gray-900">
                            {location.name}
                          </div>
                          <div className="text-sm text-gray-600">
                            {location.city}, {location.country}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    No results found
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Dates */}
        <div
          ref={datesRef}
          className="relative flex items-center gap-2 sm:gap-3 px-3 sm:px-4 md:px-6 py-3 flex-1 border-b md:border-b-0 md:border-r border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => {
            setShowDatesDropdown(!showDatesDropdown);
            setShowLocationDropdown(false);
            setShowTravelersDropdown(false);
          }}
        >
          <MdCalendarToday className="text-xl sm:text-2xl text-gray-600 flex-shrink-0" />
          <div className="flex flex-col min-w-0 flex-1">
            <label className="text-xs text-gray-600 font-medium mb-1">
              Dates
            </label>
            <span className="text-xs sm:text-sm font-medium text-gray-900 truncate">
              {formatDate(checkInDate)} - {formatDate(checkOutDate)}
            </span>
          </div>

          {/* Dates Dropdown */}
          {showDatesDropdown && (
            <div
              className="absolute top-full left-0 right-0 md:right-auto mt-2 bg-white rounded-lg shadow-2xl p-4 sm:p-6 z-50 w-full md:w-80"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-semibold mb-4 text-gray-900">Select dates</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Check-in
                  </label>
                  <input
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Check-out
                  </label>
                  <input
                    type="date"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    min={checkInDate}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <button
                onClick={() => setShowDatesDropdown(false)}
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Done
              </button>
            </div>
          )}
        </div>

        {/* Travelers */}
        <div
          ref={travelersRef}
          className="relative flex items-center gap-2 sm:gap-3 px-3 sm:px-4 md:px-6 py-3 flex-1 cursor-pointer hover:bg-gray-50 transition-colors rounded-b-xl md:rounded-b-none"
          onClick={() => {
            setShowTravelersDropdown(!showTravelersDropdown);
            setShowLocationDropdown(false);
            setShowDatesDropdown(false);
          }}
        >
          <MdPerson className="text-xl sm:text-2xl text-gray-600 flex-shrink-0" />
          <div className="flex flex-col min-w-0 flex-1">
            <label className="text-xs text-gray-600 font-medium mb-1">
              Travelers
            </label>
            <span className="text-xs sm:text-sm font-medium text-gray-900 truncate">
              {adults} traveler{adults > 1 ? "s" : ""}, {rooms} room
              {rooms > 1 ? "s" : ""}
            </span>
          </div>

          {/* Travelers Dropdown */}
          {showTravelersDropdown && (
            <div
              className="absolute top-full left-0 right-0 md:left-auto md:right-0 mt-2 bg-white rounded-lg shadow-2xl p-4 sm:p-6 z-50 w-full md:w-80"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-semibold mb-4 text-gray-900">Travelers</h3>

              <div className="space-y-4">
                {/* Adults */}
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium text-gray-900">Adults</div>
                    <div className="text-sm text-gray-600">
                      Ages 18 or above
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setAdults(Math.max(1, adults - 1))}
                      className="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-blue-500 hover:text-blue-500 transition-colors font-medium disabled:opacity-30 disabled:cursor-not-allowed"
                      disabled={adults <= 1}
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-medium">
                      {adults}
                    </span>
                    <button
                      onClick={() => setAdults(adults + 1)}
                      className="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-blue-500 hover:text-blue-500 transition-colors font-medium"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Rooms */}
                <div className="flex justify-between items-center pt-4 border-t">
                  <div>
                    <div className="font-medium text-gray-900">Rooms</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setRooms(Math.max(1, rooms - 1))}
                      className="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-blue-500 hover:text-blue-500 transition-colors font-medium disabled:opacity-30 disabled:cursor-not-allowed"
                      disabled={rooms <= 1}
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-medium">{rooms}</span>
                    <button
                      onClick={() => setRooms(rooms + 1)}
                      className="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-blue-500 hover:text-blue-500 transition-colors font-medium"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowTravelersDropdown(false)}
                className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Done
              </button>
            </div>
          )}
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-xl md:rounded-full font-semibold transition-colors flex-shrink-0 mt-2 md:mt-0 md:ml-2 shadow-md text-sm sm:text-base w-full md:w-auto"
        >
          Search
        </button>
      </div>
    </div>
  );
}
