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

export default function ReturningFlightSelection() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { selectReturningFlight, state: bookingState } = useFlightBooking();

  const [filters, setFilters] = useState({
    stops: "",
    minPrice: "",
    maxPrice: "",
    airline: "",
    sort: "departure",
  });

  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  // Build query params - REVERSED origin and destination for return flight
  const queryParams: FlightSearchParams & any = {
    origin: bookingState.searchParams.destination, // Reversed!
    destination: bookingState.searchParams.origin, // Reversed!
    departureDate: bookingState.searchParams.returnDate,
    passengers: bookingState.searchParams.passengers,
    classOfService: bookingState.searchParams.classOfService,
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
    selectReturningFlight(flight, classOfService);
    navigate("/flights/passengers");
  };

  if (!bookingState.departingFlight) {
    // Redirect back if no departing flight selected
    navigate("/flights/search?" + searchParams.toString());
    return null;
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-alternate dark:bg-[#0F172A]">
        {/* Breadcrumb Navigation */}
        <BreadcrumbNavigation currentStep="returning" isRoundTrip={true} />

        <div className="container mx-auto px-4 py-8">
          {/* Selected Departing Flight Summary */}
          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-card-foreground mb-2">
              Selected Departing Flight
            </h3>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <span className="font-medium">
                {bookingState.departingFlight.airline}
              </span>
              <span>•</span>
              <span>
                {bookingState.departingFlight.departure.airport.code} →{" "}
                {bookingState.departingFlight.arrival.airport.code}
              </span>
              <span>•</span>
              <span className="capitalize">{bookingState.departingClass}</span>
              {/* Note: Price logic might need adjustment if we want to show exact selected fare price */}
            </div>
          </div>

          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
              Return flights from {bookingState.searchParams.destination} to{" "}
              {bookingState.searchParams.origin}
            </h1>
            <p className="text-muted-foreground">
              {bookingState.searchParams.returnDate} •{" "}
              {bookingState.searchParams.passengers} passenger(s) •{" "}
              {bookingState.searchParams.classOfService}
            </p>
          </div>

          {/* Mobile Filter Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden mb-4 flex items-center gap-2 px-4 py-2 bg-card border border-card-border rounded-lg text-card-foreground hover:bg-muted transition-colors"
          >
            {showFilters ? <MdClose /> : <MdFilterList />}
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
                    Searching for return flights...
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
                    No return flights found
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
