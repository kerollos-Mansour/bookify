import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { FlightSearchParams, Flight } from "../../types/flight.types";
import { useSearchFlightsQuery } from "../../store/api/flights.api";
import { FareClassSelectionCard } from "../../components/flightCard/FareClassSelectionCard";
import { BreadcrumbNavigation } from "../../components/breadcrumb/BreadcrumbNavigation";
import { FlightFilters } from "../../components/flightFilters/FlightFilters";
import { Loader2 } from "lucide-react";
import { MdFilterList, MdClose } from "react-icons/md";
import PageTransition from "../../components/pageTransition/pageTransition";
import { useFlightBooking } from "../../context/flightBookingContext";

export default function FlightSearchResults() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const {
    setSearchParams: setBookingSearch,
    selectDepartingFlight,
    state: bookingState,
  } = useFlightBooking();

  // Filters state
  const [filters, setFilters] = useState({
    stops: searchParams.get("stops") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    airline: searchParams.get("airline") || "",
    sort: searchParams.get("sort") || "departure",
  });

  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  // Initialize booking context with search params
  useEffect(() => {
    setBookingSearch({
      origin: searchParams.get("origin") || "",
      destination: searchParams.get("destination") || "",
      departureDate: searchParams.get("departureDate") || "",
      returnDate: searchParams.get("returnDate") || "",
      passengers: Number(searchParams.get("passengers")) || 1,
      classOfService: (searchParams.get("classOfService") as any) || "economy",
    });
  }, [searchParams]);

  // Build query params
  const queryParams: FlightSearchParams & any = {
    origin: searchParams.get("origin") || "",
    destination: searchParams.get("destination") || "",
    departureDate: searchParams.get("departureDate") || "",
    returnDate: searchParams.get("returnDate") || "",
    passengers: Number(searchParams.get("passengers")) || 1,
    classOfService: (searchParams.get("classOfService") as any) || "economy",
    page,
    limit: 10,
    ...filters,
  };

  // Remove empty values
  Object.keys(queryParams).forEach((key) => {
    if (!queryParams[key]) delete queryParams[key];
  });

  const {
    data: flights = [],
    isLoading,
    error,
  } = useSearchFlightsQuery(queryParams);

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    setPage(1);
  };

  const handleFlightSelect = (
    flight: Flight,
    classOfService: "economy" | "business" | "firstClass",
    fareClassName: string
  ) => {
    selectDepartingFlight(flight, classOfService);

    // If round trip, navigate to returning flights
    if (searchParams.get("returnDate")) {
      navigate(`/flights/returning?${searchParams.toString()}`);
    } else {
      // One way, go to passengers
      navigate("/flights/passengers");
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-alternate dark:bg-[#0F172A]">
        {/* Breadcrumb Navigation */}
        <BreadcrumbNavigation
          currentStep="departing"
          isRoundTrip={!!searchParams.get("returnDate")}
        />

        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
              Flights from {searchParams.get("origin")} to{" "}
              {searchParams.get("destination")}
            </h1>
            <p className="text-muted-foreground">
              {searchParams.get("departureDate")}
              {searchParams.get("returnDate") &&
                ` - ${searchParams.get("returnDate")}`}{" "}
              • {searchParams.get("passengers")} passenger(s) •{" "}
              {searchParams.get("classOfService")}
            </p>
          </div>

          {/* Mobile Filter Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden mb-4 flex items-center gap-2 px-4 py-2 bg-card border border-card-border rounded-lg text-card-foreground hover:bg-muted transition-colors"
          >
            {showFilters ? (
              <MdClose className="text-xl" />
            ) : (
              <MdFilterList className="text-xl" />
            )}
            {showFilters ? "Close Filters" : "Show Filters"}
          </button>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Filters Sidebar */}
            <aside
              className={`${
                showFilters ? "block" : "hidden"
              } md:block w-full md:w-80 flex-shrink-0`}
            >
              <div className="sticky top-24">
                <FlightFilters
                  filters={filters}
                  searchParams={{
                    origin: queryParams.origin,
                    destination: queryParams.destination,
                    departureDate: queryParams.departureDate,
                  }}
                  onFilterChange={handleFilterChange}
                />
              </div>
            </aside>

            {/* Results */}
            <main className="flex-1">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <Loader2 className="w-12 h-12 animate-spin text-blue-600 mb-4" />
                  <p className="text-muted-foreground">
                    Searching for flights...
                  </p>
                </div>
              ) : error ? (
                <div className="text-center py-20">
                  <p className="text-red-500 text-lg mb-4">
                    Failed to load flights
                  </p>
                  <button
                    onClick={() => window.location.reload()}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              ) : flights.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-xl text-muted-foreground mb-4">
                    No flights found
                  </p>
                  <p className="text-muted-foreground">
                    Try adjusting your search criteria
                  </p>
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    {flights.map((flight) => (
                      <FareClassSelectionCard
                        key={flight._id}
                        flight={flight}
                        onSelect={handleFlightSelect}
                      />
                    ))}
                  </div>

                  {/* Pagination */}
                  <div className="flex justify-center gap-2 mt-8">
                    <button
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="px-4 py-2 bg-card border border-card-border rounded-lg text-card-foreground hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Previous
                    </button>
                    <span className="px-4 py-2 bg-card border border-card-border rounded-lg text-card-foreground">
                      Page {page}
                    </span>
                    <button
                      onClick={() => setPage((p) => p + 1)}
                      disabled={flights.length < 10}
                      className="px-4 py-2 bg-card border border-card-border rounded-lg text-card-foreground hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Next
                    </button>
                  </div>
                </>
              )}
            </main>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
