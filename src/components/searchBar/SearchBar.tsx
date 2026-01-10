import { useState, useRef, useEffect } from "react";
import { searchStorage, VisitedSearch } from "../../utils/visitedStorage";
import {
    MdLocationOn,
    MdCalendarToday,
    MdPerson,
    MdClose,
} from "react-icons/md";
import { Loader2, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useLocationAutocomplete } from "../../hooks/useLocationAutocomplete";
import { DateRangePicker } from "../UI/DateRangePicker";
import { DateRange } from "react-day-picker";
import { format, addDays } from "date-fns";

interface SearchBarProps {
  hideOnMobile?: boolean;
  isCompact?: boolean;
}

export function SearchBar({
  hideOnMobile = false,
  isCompact = false,
}: SearchBarProps) {
  const navigate = useNavigate();
  const { search } = useLocation();

    // States
    const [selectedLocation, setSelectedLocation] = useState("Where to?");
    const [searchQuery, setSearchQuery] = useState("");
    const [dateRange, setDateRange] = useState<DateRange | undefined>({
        from: new Date(),
        to: addDays(new Date(), 2),
    });
    const [adults, setAdults] = useState(2);
    const [rooms, setRooms] = useState(1);
    const [recentSearches, setRecentSearches] = useState<VisitedSearch[]>([]);

  // Dropdown states
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showDatesDropdown, setShowDatesDropdown] = useState(false);
  const [showTravelersDropdown, setShowTravelersDropdown] = useState(false);
  const [showMobileDrawer, setShowMobileDrawer] = useState(false);

  // Refs للـ click outside
  const locationRef = useRef<HTMLDivElement>(null);
  const datesRef = useRef<HTMLDivElement>(null);
  const travelersRef = useRef<HTMLDivElement>(null);
  const mobileContainerRef = useRef<HTMLDivElement>(null);

    // Real-time location autocomplete
    const { suggestions, isLoading, error } =
        useLocationAutocomplete(searchQuery);

    // Load recent searches
    useEffect(() => {
        setRecentSearches(searchStorage.get());
    }, [showLocationDropdown]);

    // Format dates
    const formatDateRange = (range: DateRange | undefined) => {
        if (!range?.from) return "Select dates";
        const fromStr = format(range.from, "MMM d");
        if (!range.to) return `${fromStr} - ...`;
        return `${fromStr} - ${format(range.to, "MMM d")}`;
    };

    useEffect(() => {
        const params = new URLSearchParams(search);

        const urlLocation = params.get("location");
        const urlCheckIn = params.get("checkIn");
        const urlCheckOut = params.get("checkOut");
        const urlAdults = params.get("adults");
        const urlRooms = params.get("rooms");

        if (urlLocation) {
            setSelectedLocation(urlLocation);
        }

        if (urlCheckIn && urlCheckOut) {
            setDateRange({
                from: new Date(urlCheckIn),
                to: new Date(urlCheckOut),
            });
        }

        if (urlAdults) setAdults(Number(urlAdults));
        if (urlRooms) setRooms(Number(urlRooms));
    }, [search]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // If clicking inside mobile drawer, let the drawer internal logic handle it
      if (
        mobileContainerRef.current &&
        mobileContainerRef.current.contains(event.target as Node)
      ) {
        return;
      }

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
  }, [showMobileDrawer]);

  // Lock body scroll when dropdowns are open on mobile
  useEffect(() => {
    const isAnyDropdownOpen =
      showLocationDropdown || showDatesDropdown || showTravelersDropdown;
    if (isAnyDropdownOpen && window.innerWidth < 768) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showLocationDropdown, showDatesDropdown, showTravelersDropdown]);

    const handleSearch = () => {
        const checkIn = dateRange?.from
            ? format(dateRange.from, "yyyy-MM-dd")
            : "";
        const checkOut = dateRange?.to
            ? format(dateRange.to, "yyyy-MM-dd")
            : "";

        const params = new URLSearchParams({
            location: selectedLocation,
            checkIn,
            checkOut,
            adults: adults.toString(),
            rooms: rooms.toString(),
        });

        // Save to history
        searchStorage.add({
            location: selectedLocation,
            checkIn,
            checkOut,
            travelers: adults,
            rooms: rooms,
        });

    navigate(`/search?${params.toString()}`);
    setShowMobileDrawer(false);
  };

  return (
    <div className={`relative ${hideOnMobile ? "hidden md:block" : ""}`}>
      {/* Standard Layout (Visible on Desktop always, and on Mobile if NOT isCompact) */}
      <div
        className={`${isCompact ? "hidden md:flex" : "flex"
          } flex-col md:flex-row items-stretch md:items-center gap-0 bg-card rounded-xl md:rounded-full shadow-lg dark:shadow-lg p-1.5 sm:p-2 md:p-2 border border-card-border`}
      >
        {/* Where to? */}
        <div
          ref={locationRef}
          className="relative flex items-center gap-2 sm:gap-3 px-3 sm:px-4 md:px-5 lg:px-6 py-2.5 sm:py-3 md:py-3 flex-1 border-b md:border-b-0 md:border-r border-card-border cursor-pointer hover:bg-muted rounded-t-xl md:rounded-t-none md:rounded-l-full transition-colors"
          onClick={() => {
            setShowLocationDropdown(!showLocationDropdown);
            setShowDatesDropdown(false);
            setShowTravelersDropdown(false);
          }}
        >
          <MdLocationOn className="text-xl sm:text-2xl text-muted-foreground flex-shrink-0" />
          <div className="flex flex-col min-w-0 flex-1">
            <label className="text-xs text-muted-foreground font-medium mb-1">
              Where to?
            </label>
            <span className="text-xs sm:text-sm font-medium text-card-foreground truncate">
              {selectedLocation}
            </span>
          </div>

                    {/* Location Dropdown */}
                    {showLocationDropdown && (
                        <div
                            className="absolute top-full left-0 right-0 md:right-auto mt-2 bg-card rounded-lg shadow-2xl p-4 z-50 w-full md:w-96 max-h-112 overflow-y-auto border border-card-border"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="mb-3">
                                <input
                                    type="text"
                                    placeholder="Search destinations..."
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    className="w-full px-4 py-2 border border-card-border bg-background text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-muted-foreground"
                                    autoFocus
                                />
                            </div>

                            {/* Recent Searches */}
                            {!searchQuery && recentSearches.length > 0 && (
                                <div className="mb-4">
                                    <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-2 px-1">
                                        Recent Searches
                                    </h3>
                                    {recentSearches
                                        .slice(0, 3)
                                        .map((recentSearch) => (
                                            <div
                                                key={recentSearch.id}
                                                className="flex items-center gap-3 px-3 py-2 hover:bg-muted rounded-lg group transition-colors"
                                            >
                                                <MdLocationOn className="w-4 h-4 text-muted-foreground shrink-0" />
                                                <div
                                                    className="flex-1 min-w-0 cursor-pointer"
                                                    onClick={() => {
                                                        setSelectedLocation(
                                                            recentSearch.location
                                                        );
                                                        setSearchQuery("");
                                                        setShowLocationDropdown(
                                                            false
                                                        );
                                                    }}
                                                >
                                                    <div className="text-sm text-card-foreground truncate">
                                                        {recentSearch.location}
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        searchStorage.remove(
                                                            recentSearch.id
                                                        );
                                                        setRecentSearches(
                                                            searchStorage.get()
                                                        );
                                                    }}
                                                    className="opacity-0 group-hover:opacity-100 p-1 hover:bg-background rounded transition-opacity"
                                                    aria-label="Remove"
                                                >
                                                    <MdClose className="w-4 h-4 text-muted-foreground" />
                                                </button>
                                            </div>
                                        ))}
                                    {recentSearches.length > 0 &&
                                        searchQuery === "" && (
                                            <div className="border-t border-card-border my-3" />
                                        )}
                                </div>
                            )}

                            {/* Loading State */}
                            {isLoading && searchQuery && (
                                <div className="flex items-center justify-center py-8 text-muted-foreground">
                                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                                    <span className="text-sm">
                                        Searching...
                                    </span>
                                </div>
                            )}

              {/* Suggestions from Backend */}
              {!isLoading && searchQuery && suggestions.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-2 px-1">
                    Suggestions
                  </h3>
                  {suggestions.map((suggestion) => (
                    <div
                      key={suggestion.id}
                      onClick={() => {
                        setSelectedLocation(
                          suggestion.type === "hotel"
                            ? suggestion.hotelName || suggestion.displayName
                            : suggestion.displayName
                        );
                        setSearchQuery("");
                        setShowLocationDropdown(false);
                      }}
                      className="flex items-center gap-3 px-3 py-2 hover:bg-muted rounded-lg cursor-pointer transition-colors"
                    >
                      <MdLocationOn className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-card-foreground truncate">
                          {suggestion.type === "hotel"
                            ? `${suggestion.hotelName} (${suggestion.city})`
                            : suggestion.displayName}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

                            {/* No Results */}
                            {!isLoading &&
                                searchQuery &&
                                suggestions.length === 0 && (
                                    <div className="text-center py-8 text-muted-foreground">
                                        <MdLocationOn className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                        <p className="text-sm">
                                            No locations found
                                        </p>
                                    </div>
                                )}

                            {/* Error State */}
                            {error && (
                                <div className="text-center py-8 text-red-500">
                                    <p className="text-sm">
                                        Failed to load suggestions
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Dates */}
                <div
                    ref={datesRef}
                    className="relative flex items-center gap-2 sm:gap-3 px-3 sm:px-4 md:px-5 lg:px-6 py-2.5 sm:py-3 md:py-3 flex-1 border-b lg:border-b-0 lg:border-r border-card-border cursor-pointer hover:bg-muted transition-colors"
                    onClick={() => {
                        setShowDatesDropdown(!showDatesDropdown);
                        setShowLocationDropdown(false);
                        setShowTravelersDropdown(false);
                    }}
                >
                    <MdCalendarToday className="text-xl sm:text-2xl text-muted-foreground shrink-0" />
                    <div className="flex flex-col min-w-0 flex-1">
                        <label className="text-xs text-muted-foreground font-medium mb-1">
                            Dates
                        </label>
                        <span className="text-xs sm:text-sm font-medium text-card-foreground truncate">
                            {formatDateRange(dateRange)}
                        </span>
                    </div>

          {/* Dates Dropdown */}
          {showDatesDropdown && (
            <div
              className="absolute top-full left-0 right-0 md:left-1/2 md:-translate-x-1/2 mt-4 z-50 flex justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <DateRangePicker
                date={dateRange}
                setDate={setDateRange}
                className="w-[95vw] sm:w-auto"
              />
            </div>
          )}
        </div>

                {/* Travelers */}
                <div
                    ref={travelersRef}
                    className="relative flex items-center gap-2 sm:gap-3 px-3 sm:px-4 md:px-5 lg:px-6 py-2.5 sm:py-3 md:py-3 flex-1 cursor-pointer hover:bg-muted transition-colors rounded-b-xl md:rounded-b-none"
                    onClick={() => {
                        setShowTravelersDropdown(!showTravelersDropdown);
                        setShowLocationDropdown(false);
                        setShowDatesDropdown(false);
                    }}
                >
                    <MdPerson className="text-xl sm:text-2xl text-muted-foreground shrink-0" />
                    <div className="flex flex-col min-w-0 flex-1">
                        <label className="text-xs text-muted-foreground font-medium mb-1">
                            Travelers
                        </label>
                        <span className="text-xs sm:text-sm font-medium text-card-foreground truncate">
                            {adults} traveler{adults > 1 ? "s" : ""}, {rooms}{" "}
                            room
                            {rooms > 1 ? "s" : ""}
                        </span>
                    </div>

          {/* Travelers Dropdown */}
          {showTravelersDropdown && (
            <div
              className="absolute top-full left-0 right-0 md:left-auto md:right-0 mt-2 bg-card rounded-lg shadow-2xl p-4 sm:p-6 z-50 w-full md:w-80 border border-card-border max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-semibold mb-4 text-card-foreground">
                Travelers
              </h3>

                            <div className="space-y-4">
                                {/* Adults */}
                                <div className="flex justify-between items-center">
                                    <div>
                                        <div className="font-medium text-card-foreground">
                                            Adults
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            Ages 18 or above
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() =>
                                                setAdults(
                                                    Math.max(1, adults - 1)
                                                )
                                            }
                                            className="w-8 h-8 rounded-full border-2 border-card-border hover:border-blue-500 hover:text-blue-500 transition-colors font-medium text-foreground disabled:opacity-30 disabled:cursor-not-allowed"
                                            disabled={adults <= 1}
                                        >
                                            -
                                        </button>
                                        <span className="w-8 text-center font-medium text-foreground">
                                            {adults}
                                        </span>
                                        <button
                                            onClick={() =>
                                                setAdults(adults + 1)
                                            }
                                            className="w-8 h-8 rounded-full border-2 border-card-border hover:border-blue-500 hover:text-blue-500 transition-colors font-medium text-foreground"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                {/* Rooms */}
                                <div className="flex justify-between items-center pt-4 border-t border-card-border">
                                    <div>
                                        <div className="font-medium text-card-foreground">
                                            Rooms
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() =>
                                                setRooms(Math.max(1, rooms - 1))
                                            }
                                            className="w-8 h-8 rounded-full border-2 border-card-border hover:border-blue-500 hover:text-blue-500 transition-colors font-medium text-foreground disabled:opacity-30 disabled:cursor-not-allowed"
                                            disabled={rooms <= 1}
                                        >
                                            -
                                        </button>
                                        <span className="w-8 text-center font-medium text-foreground">
                                            {rooms}
                                        </span>
                                        <button
                                            onClick={() => setRooms(rooms + 1)}
                                            className="w-8 h-8 rounded-full border-2 border-card-border hover:border-blue-500 hover:text-blue-500 transition-colors font-medium text-foreground"
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
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-3.5 rounded-xl md:rounded-full font-semibold transition-colors flex-shrink-0 mt-2 md:mt-0 md:ml-2 shadow-md text-sm sm:text-base w-full md:w-auto"
        >
          Search
        </button>
      </div>

      {/* Mobile Compact Row (Visible only on Mobile AND when isCompact is true) */}
      {isCompact && (
        <div
          className="md:hidden flex items-center gap-3 bg-card border border-card-border rounded-full p-3 shadow-md cursor-pointer hover:bg-muted transition-colors"
          onClick={() => setShowMobileDrawer(true)}
        >
          <div className="bg-blue-600 p-2 rounded-full text-white">
            <MdLocationOn className="text-xl" />
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-sm font-bold text-card-foreground truncate">
              {selectedLocation === "Where to?" ? "Start your search" : selectedLocation}
            </span>
            <span className="text-xs text-muted-foreground truncate">
              {formatDateRange(dateRange)} • {adults} traveler{adults > 1 ? "s" : ""}
            </span>
          </div>
          <div className="border-l border-card-border pl-3 flex items-center justify-center p-1">
            <div className="bg-muted p-2 rounded-full">
              <Search className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
        </div>
      )}

      {/* Mobile Search Drawer (Only used in Compact mode) */}
      {showMobileDrawer && isCompact && (
        <div className="fixed inset-0 z-[100] md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setShowMobileDrawer(false)}
          />

          {/* Content */}
          <div
            ref={mobileContainerRef}
            className="absolute inset-x-0 bottom-0 top-0 sm:top-auto sm:h-[90vh] bg-card rounded-t-3xl shadow-2xl flex flex-col animate-in slide-in-from-bottom duration-300"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-card-border">
              <button
                onClick={() => setShowMobileDrawer(false)}
                className="p-2 hover:bg-muted rounded-full transition-colors"
              >
                <MdClose className="text-2xl text-card-foreground" />
              </button>
              <h2 className="text-lg font-bold text-card-foreground">Search Stays</h2>
              <div className="w-10" /> {/* Spacer */}
            </div>

            {/* Scrollable Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Location Selector */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-muted-foreground ml-1">
                  Destination
                </label>
                <div
                  className="flex items-center gap-3 p-4 bg-muted/30 rounded-2xl border border-card-border cursor-pointer active:scale-95 transition-transform"
                  onClick={() => {
                    setShowLocationDropdown(!showLocationDropdown);
                    setShowDatesDropdown(false);
                    setShowTravelersDropdown(false);
                  }}
                >
                  <MdLocationOn className="text-2xl text-blue-600" />
                  <span className="text-base font-medium text-card-foreground">
                    {selectedLocation}
                  </span>
                </div>

                {showLocationDropdown && (
                  <div className="mt-2 bg-card rounded-2xl border border-card-border p-4 shadow-lg">
                    <input
                      type="text"
                      placeholder="Where are you going?"
                      className="w-full p-3 bg-muted/50 rounded-xl border-none focus:ring-2 focus:ring-blue-500"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                    />

                    {/* Recent Searches */}
                    {!searchQuery && recentSearches.length > 0 && (
                      <div className="mb-4">
                        <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-2 px-1">
                          Recent Searches
                        </h3>
                        {recentSearches.slice(0, 3).map((recentSearch) => (
                          <div
                            key={recentSearch.id}
                            className="flex items-center gap-3 px-3 py-2 hover:bg-muted rounded-lg group transition-colors"
                          >
                            <MdLocationOn className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                            <div
                              className="flex-1 min-w-0 cursor-pointer"
                              onClick={() => {
                                setSelectedLocation(recentSearch.location);
                                setSearchQuery("");
                                setShowLocationDropdown(false);
                              }}
                            >
                              <div className="text-sm text-card-foreground truncate">
                                {recentSearch.location}
                              </div>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                searchStorage.remove(recentSearch.id);
                                setRecentSearches(searchStorage.get());
                              }}
                              className="p-1 hover:bg-background rounded transition-opacity"
                              aria-label="Remove"
                            >
                              <MdClose className="w-4 h-4 text-muted-foreground" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Loading State */}
                    {isLoading && searchQuery && (
                      <div className="flex items-center justify-center py-4 text-muted-foreground">
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                        <span className="text-sm">Searching...</span>
                      </div>
                    )}

                    <div className="mt-2 max-h-[30vh] overflow-y-auto space-y-1">
                      {!isLoading && searchQuery && suggestions.map((suggestion) => (
                        <div
                          key={suggestion.id}
                          className="flex items-center gap-3 p-3 hover:bg-muted rounded-xl cursor-pointer"
                          onClick={() => {
                            setSelectedLocation(
                              suggestion.type === "hotel"
                                ? suggestion.hotelName || suggestion.displayName
                                : suggestion.displayName
                            );
                            setShowLocationDropdown(false);
                            setSearchQuery("");
                          }}
                        >
                          <MdLocationOn className="text-muted-foreground" />
                          <span className="text-sm">{suggestion.displayName}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Date Selector */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-muted-foreground ml-1">
                  Dates
                </label>
                <div
                  className="flex items-center gap-3 p-4 bg-muted/30 rounded-2xl border border-card-border cursor-pointer active:scale-95 transition-transform"
                  onClick={() => {
                    setShowDatesDropdown(!showDatesDropdown);
                    setShowLocationDropdown(false);
                    setShowTravelersDropdown(false);
                  }}
                >
                  <MdCalendarToday className="text-2xl text-blue-600" />
                  <span className="text-base font-medium text-card-foreground">
                    {formatDateRange(dateRange)}
                  </span>
                </div>
                {showDatesDropdown && (
                  <div className="mt-2 bg-card rounded-2xl border border-card-border p-2 shadow-lg overflow-hidden flex justify-center">
                    <DateRangePicker
                      date={dateRange}
                      setDate={setDateRange}
                      className="w-full flex justify-center"
                    />
                  </div>
                )}
              </div>

              {/* Travelers Selector */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-muted-foreground ml-1">
                  Travelers
                </label>
                <div
                  className="flex items-center gap-3 p-4 bg-muted/30 rounded-2xl border border-card-border cursor-pointer active:scale-95 transition-transform"
                  onClick={() => {
                    setShowTravelersDropdown(!showTravelersDropdown);
                    setShowLocationDropdown(false);
                    setShowDatesDropdown(false);
                  }}
                >
                  <MdPerson className="text-2xl text-blue-600" />
                  <span className="text-base font-medium text-card-foreground">
                    {adults} adults, {rooms} room{rooms > 1 ? "s" : ""}
                  </span>
                </div>
                {showTravelersDropdown && (
                  <div className="mt-2 bg-card rounded-2xl border border-card-border p-6 shadow-lg space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold">Adults</p>
                        <p className="text-xs text-muted-foreground">Ages 18+</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => setAdults(Math.max(1, adults - 1))}
                          className="w-10 h-10 rounded-full border border-card-border flex items-center justify-center text-xl disabled:opacity-30"
                          disabled={adults <= 1}
                        >
                          -
                        </button>
                        <span className="text-lg font-bold w-4 text-center">{adults}</span>
                        <button
                          onClick={() => setAdults(adults + 1)}
                          className="w-10 h-10 rounded-full border border-card-border flex items-center justify-center text-xl"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold">Rooms</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => setRooms(Math.max(1, rooms - 1))}
                          className="w-10 h-10 rounded-full border border-card-border flex items-center justify-center text-xl disabled:opacity-30"
                          disabled={rooms <= 1}
                        >
                          -
                        </button>
                        <span className="text-lg font-bold w-4 text-center">{rooms}</span>
                        <button
                          onClick={() => setRooms(rooms + 1)}
                          className="w-10 h-10 rounded-full border border-card-border flex items-center justify-center text-xl"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-card border-t border-card-border shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
              <button
                onClick={handleSearch}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold text-lg shadow-lg active:scale-[0.98] transition-all"
              >
                Search properties
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
