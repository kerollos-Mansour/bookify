import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdLocationOn,
  MdCalendarToday,
  MdPerson,
  MdFlightTakeoff,
  MdFlightLand,
  MdHistory,
  MdClose,
} from "react-icons/md";
import { Loader2 } from "lucide-react";
import { DateRangePicker } from "../UI/DateRangePicker";
import { DateRange } from "react-day-picker";
import { format, addDays } from "date-fns";
import {
  flightSearchStorage,
  VisitedFlightSearch,
} from "../../utils/flightSearchStorage";

interface FlightSearchBarProps {
  hideOnMobile?: boolean;
}

export function FlightSearchBar({
  hideOnMobile = false,
}: FlightSearchBarProps) {
  const navigate = useNavigate();

  // States
  const [origin, setOrigin] = useState("From where?");
  const [destination, setDestination] = useState("To where?");
  const [originQuery, setOriginQuery] = useState("");
  const [destinationQuery, setDestinationQuery] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });
  const [passengers, setPassengers] = useState(1);
  const [classOfService, setClassOfService] = useState<
    "economy" | "business" | "firstClass"
  >("economy");

  const [recentSearches, setRecentSearches] = useState<VisitedFlightSearch[]>(
    []
  );

  // Dropdown states
  const [showOriginDropdown, setShowOriginDropdown] = useState(false);
  const [showDestinationDropdown, setShowDestinationDropdown] = useState(false);
  const [showDatesDropdown, setShowDatesDropdown] = useState(false);
  const [showTravelersDropdown, setShowTravelersDropdown] = useState(false);

  // Refs
  const originRef = useRef<HTMLDivElement>(null);
  const destinationRef = useRef<HTMLDivElement>(null);
  const datesRef = useRef<HTMLDivElement>(null);
  const travelersRef = useRef<HTMLDivElement>(null);

  // Load recent searches
  useEffect(() => {
    setRecentSearches(flightSearchStorage.get());
  }, [showOriginDropdown]);

  // Popular airports (you can expand this list)
  const popularAirports = [
    {
      code: "JFK",
      city: "New York",
      name: "John F. Kennedy International Airport",
    },
    {
      code: "LAX",
      city: "Los Angeles",
      name: "Los Angeles International Airport",
    },
    { code: "ORD", city: "Chicago", name: "O'Hare International Airport" },
    { code: "DXB", city: "Dubai", name: "Dubai International Airport" },
    { code: "LHR", city: "London", name: "Heathrow Airport" },
    { code: "CDG", city: "Paris", name: "Charles de Gaulle Airport" },
    { code: "CAI", city: "Cairo", name: "Cairo International Airport" },
    { code: "IST", city: "Istanbul", name: "Istanbul Airport" },
    { code: "SIN", city: "Singapore", name: "Singapore Changi Airport" },
    { code: "HND", city: "Tokyo", name: "Tokyo Haneda Airport" },
  ];

  // Format dates
  const formatDateRange = (range: DateRange | undefined) => {
    if (!range?.from) return "Select dates";
    const fromStr = format(range.from, "MMM d");
    if (!range.to) return `${fromStr} - ...`;
    return `${fromStr} - ${format(range.to, "MMM d")}`;
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        originRef.current &&
        !originRef.current.contains(event.target as Node)
      ) {
        setShowOriginDropdown(false);
      }
      if (
        destinationRef.current &&
        !destinationRef.current.contains(event.target as Node)
      ) {
        setShowDestinationDropdown(false);
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

  // Lock body scroll when dropdowns are open on mobile
  useEffect(() => {
    const isAnyDropdownOpen =
      showOriginDropdown ||
      showDestinationDropdown ||
      showDatesDropdown ||
      showTravelersDropdown;
    if (isAnyDropdownOpen && window.innerWidth < 768) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [
    showOriginDropdown,
    showDestinationDropdown,
    showDatesDropdown,
    showTravelersDropdown,
  ]);

  const handleSearch = () => {
    const departureDate = dateRange?.from
      ? format(dateRange.from, "yyyy-MM-dd")
      : "";
    const returnDate = dateRange?.to ? format(dateRange.to, "yyyy-MM-dd") : "";

    // Save search history
    if (origin !== "From where?" && destination !== "To where?") {
      flightSearchStorage.add({
        origin,
        destination,
        departureDate,
        returnDate,
        passengers,
        classOfService,
      });
    }

    const params = new URLSearchParams({
      origin,
      destination,
      departureDate,
      ...(returnDate && { returnDate }),
      passengers: passengers.toString(),
      classOfService,
    });

    navigate(`/flights/search?${params.toString()}`);
  };

  const getFilteredAirports = (query: string) => {
    if (!query) return popularAirports.slice(0, 5);
    return popularAirports.filter(
      (airport) =>
        airport.city.toLowerCase().includes(query.toLowerCase()) ||
        airport.code.toLowerCase().includes(query.toLowerCase()) ||
        airport.name.toLowerCase().includes(query.toLowerCase())
    );
  };

  const applyRecentSearch = (search: VisitedFlightSearch) => {
    setOrigin(search.origin);
    setDestination(search.destination);
    setPassengers(search.passengers);
    setClassOfService(search.classOfService as any);
    setDateRange({
      from: new Date(search.departureDate),
      to: search.returnDate ? new Date(search.returnDate) : undefined,
    });
    setShowOriginDropdown(false);
  };

  return (
    <div className={`relative ${hideOnMobile ? "hidden md:block" : ""}`}>
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-0 bg-card rounded-xl md:rounded-full shadow-lg dark:shadow-lg p-1.5 sm:p-2 md:p-2 border border-card-border">
        {/* Origin */}
        <div
          ref={originRef}
          className="relative flex items-center gap-2 sm:gap-3 px-3 sm:px-4 md:px-5 lg:px-6 py-2.5 sm:py-3 md:py-3 flex-1 border-b md:border-b-0 md:border-r border-card-border cursor-pointer hover:bg-muted rounded-t-xl md:rounded-t-none md:rounded-l-full transition-colors"
          onClick={() => {
            setShowOriginDropdown(!showOriginDropdown);
            setShowDestinationDropdown(false);
            setShowDatesDropdown(false);
            setShowTravelersDropdown(false);
          }}
        >
          <MdFlightTakeoff className="text-xl sm:text-2xl text-muted-foreground flex-shrink-0" />
          <div className="flex flex-col min-w-0 flex-1">
            <label className="text-xs text-muted-foreground font-medium mb-1">
              From
            </label>
            <span className="text-xs sm:text-sm font-medium text-card-foreground truncate">
              {origin}
            </span>
          </div>

          {/* Origin Dropdown */}
          {showOriginDropdown && (
            <div
              className="absolute top-full left-0 right-0 md:right-auto mt-2 bg-card rounded-lg shadow-2xl p-4 z-50 w-full md:w-96 max-h-[28rem] overflow-y-auto border border-card-border"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Search airports..."
                  value={originQuery}
                  onChange={(e) => setOriginQuery(e.target.value)}
                  className="w-full px-4 py-2 border border-card-border bg-background text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-muted-foreground"
                  autoFocus
                />
              </div>

              {/* Recent Searches */}
              {!originQuery && recentSearches.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-2 px-1">
                    Recent Searches
                  </h3>
                  {recentSearches.slice(0, 3).map((search) => (
                    <div
                      key={search.id}
                      className="flex items-center gap-3 px-3 py-2 hover:bg-muted rounded-lg group transition-colors"
                    >
                      <MdHistory className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <div
                        className="flex-1 min-w-0 cursor-pointer"
                        onClick={() => applyRecentSearch(search)}
                      >
                        <div className="text-sm text-card-foreground truncate font-medium">
                          {search.origin} → {search.destination}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {search.departureDate}
                          {search.returnDate
                            ? ` - ${search.returnDate}`
                            : ""} • {search.passengers} Pax
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          flightSearchStorage.remove(search.id);
                          setRecentSearches(flightSearchStorage.get());
                        }}
                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-background rounded transition-opacity"
                        aria-label="Remove"
                      >
                        <MdClose className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </div>
                  ))}
                  <div className="border-t border-card-border my-3" />
                </div>
              )}

              <div>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-2 px-1">
                  {originQuery ? "Search Results" : "Popular Airports"}
                </h3>
                {getFilteredAirports(originQuery).map((airport) => (
                  <div
                    key={airport.code}
                    onClick={() => {
                      setOrigin(`${airport.city} (${airport.code})`);
                      setOriginQuery("");
                      setShowOriginDropdown(false);
                    }}
                    className="flex items-center gap-3 px-3 py-2 hover:bg-muted rounded-lg cursor-pointer transition-colors"
                  >
                    <MdLocationOn className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-card-foreground font-medium">
                        {airport.city} ({airport.code})
                      </div>
                      <div className="text-xs text-muted-foreground truncate">
                        {airport.name}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Destination */}
        <div
          ref={destinationRef}
          className="relative flex items-center gap-2 sm:gap-3 px-3 sm:px-4 md:px-5 lg:px-6 py-2.5 sm:py-3 md:py-3 flex-1 border-b md:border-b-0 md:border-r border-card-border cursor-pointer hover:bg-muted transition-colors"
          onClick={() => {
            setShowDestinationDropdown(!showDestinationDropdown);
            setShowOriginDropdown(false);
            setShowDatesDropdown(false);
            setShowTravelersDropdown(false);
          }}
        >
          <MdFlightLand className="text-xl sm:text-2xl text-muted-foreground flex-shrink-0" />
          <div className="flex flex-col min-w-0 flex-1">
            <label className="text-xs text-muted-foreground font-medium mb-1">
              To
            </label>
            <span className="text-xs sm:text-sm font-medium text-card-foreground truncate">
              {destination}
            </span>
          </div>

          {/* Destination Dropdown */}
          {showDestinationDropdown && (
            <div
              className="absolute top-full left-0 right-0 md:right-auto mt-2 bg-card rounded-lg shadow-2xl p-4 z-50 w-full md:w-96 max-h-[28rem] overflow-y-auto border border-card-border"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Search airports..."
                  value={destinationQuery}
                  onChange={(e) => setDestinationQuery(e.target.value)}
                  className="w-full px-4 py-2 border border-card-border bg-background text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-muted-foreground"
                  autoFocus
                />
              </div>

              <div>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-2 px-1">
                  {destinationQuery ? "Search Results" : "Popular Airports"}
                </h3>
                {getFilteredAirports(destinationQuery).map((airport) => (
                  <div
                    key={airport.code}
                    onClick={() => {
                      setDestination(`${airport.city} (${airport.code})`);
                      setDestinationQuery("");
                      setShowDestinationDropdown(false);
                    }}
                    className="flex items-center gap-3 px-3 py-2 hover:bg-muted rounded-lg cursor-pointer transition-colors"
                  >
                    <MdLocationOn className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-card-foreground font-medium">
                        {airport.city} ({airport.code})
                      </div>
                      <div className="text-xs text-muted-foreground truncate">
                        {airport.name}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Dates */}
        <div
          ref={datesRef}
          className="relative flex items-center gap-2 sm:gap-3 px-3 sm:px-4 md:px-5 lg:px-6 py-2.5 sm:py-3 md:py-3 flex-1 border-b md:border-b-0 md:border-r border-card-border cursor-pointer hover:bg-muted transition-colors"
          onClick={() => {
            setShowDatesDropdown(!showDatesDropdown);
            setShowOriginDropdown(false);
            setShowDestinationDropdown(false);
            setShowTravelersDropdown(false);
          }}
        >
          <MdCalendarToday className="text-xl sm:text-2xl text-muted-foreground flex-shrink-0" />
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

        {/* Travelers & Class */}
        <div
          ref={travelersRef}
          className="relative flex items-center gap-2 sm:gap-3 px-3 sm:px-4 md:px-5 lg:px-6 py-2.5 sm:py-3 md:py-3 flex-1 cursor-pointer hover:bg-muted transition-colors rounded-b-xl md:rounded-b-none"
          onClick={() => {
            setShowTravelersDropdown(!showTravelersDropdown);
            setShowOriginDropdown(false);
            setShowDestinationDropdown(false);
            setShowDatesDropdown(false);
          }}
        >
          <MdPerson className="text-xl sm:text-2xl text-muted-foreground flex-shrink-0" />
          <div className="flex flex-col min-w-0 flex-1">
            <label className="text-xs text-muted-foreground font-medium mb-1">
              Travelers
            </label>
            <span className="text-xs sm:text-sm font-medium text-card-foreground truncate">
              {passengers} passenger{passengers > 1 ? "s" : ""},{" "}
              {classOfService}
            </span>
          </div>

          {/* Travelers Dropdown */}
          {showTravelersDropdown && (
            <div
              className="absolute top-full left-0 right-0 md:left-auto md:right-0 mt-2 bg-card rounded-lg shadow-2xl p-4 sm:p-6 z-50 w-full md:w-80 border border-card-border max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-semibold mb-4 text-card-foreground">
                Travelers & Class
              </h3>

              <div className="space-y-4">
                {/* Passengers */}
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium text-card-foreground">
                      Passengers
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setPassengers(Math.max(1, passengers - 1))}
                      className="w-8 h-8 rounded-full border-2 border-card-border hover:border-blue-500 hover:text-blue-500 transition-colors font-medium text-foreground disabled:opacity-30 disabled:cursor-not-allowed"
                      disabled={passengers <= 1}
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-medium text-foreground">
                      {passengers}
                    </span>
                    <button
                      onClick={() => setPassengers(passengers + 1)}
                      className="w-8 h-8 rounded-full border-2 border-card-border hover:border-blue-500 hover:text-blue-500 transition-colors font-medium text-foreground"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Class */}
                <div className="pt-4 border-t border-card-border">
                  <div className="font-medium text-card-foreground mb-3">
                    Class
                  </div>
                  <div className="space-y-2">
                    {[
                      { value: "economy", label: "Economy" },
                      { value: "business", label: "Business" },
                      { value: "firstClass", label: "First Class" },
                    ].map((option) => (
                      <label
                        key={option.value}
                        className="flex items-center gap-3 cursor-pointer hover:bg-muted p-2 rounded transition-colors"
                      >
                        <input
                          type="radio"
                          name="class"
                          value={option.value}
                          checked={classOfService === option.value}
                          onChange={(e) =>
                            setClassOfService(e.target.value as any)
                          }
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-sm text-card-foreground">
                          {option.label}
                        </span>
                      </label>
                    ))}
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
          Search Flights
        </button>
      </div>
    </div>
  );
}
