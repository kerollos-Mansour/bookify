import { useSearchFlightsQuery } from "../../store/api/flights.api";
import { MdFlight, MdStar } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export function FeaturedFlights() {
  const { data: flights, isLoading } = useSearchFlightsQuery({
    featured: "true",
    limit: 4,
    status: "scheduled",
  });

  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-64 bg-gray-200 dark:bg-gray-700 rounded-xl"
            />
          ))}
        </div>
      </div>
    );
  }

  if (!flights || flights.length === 0) return null;

  const formatTime = (dateTime: string) => {
    const date = new Date(dateTime);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const getLowestPrice = (flight: any) => {
    const prices = [];
    if (flight.pricing.economy.available)
      prices.push(flight.pricing.economy.price);
    if (flight.pricing.business.available)
      prices.push(flight.pricing.business.price);
    if (flight.pricing.firstClass.available)
      prices.push(flight.pricing.firstClass.price);
    return Math.min(...prices);
  };

  return (
    <section className="py-16 bg-alternate dark:bg-[#0F172A]">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <MdStar className="text-3xl text-yellow-500" />
          <h2 className="text-3xl font-bold text-foreground">
            Featured Flights
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {flights.map((flight: any) => (
            <div
              key={flight._id}
              onClick={() => {
                // Navigate to flight search with pre-filled origin and destination
                const searchParams = new URLSearchParams({
                  origin: flight.departure.airport.code,
                  destination: flight.arrival.airport.code,
                  departureDate: new Date(flight.departure.dateTime)
                    .toISOString()
                    .split("T")[0],
                });
                navigate(`/flights/search?${searchParams.toString()}`);
              }}
              className="group bg-card border border-card-border rounded-xl overflow-hidden hover:shadow-xl transition-all cursor-pointer"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 text-white">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold">
                    {flight.airline}
                  </span>
                  <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                    {flight.flightNumber}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <div className="text-2xl font-bold">
                      {flight.departure.airport.code}
                    </div>
                    <div className="text-xs opacity-80">
                      {formatTime(flight.departure.dateTime)}
                    </div>
                  </div>
                  <MdFlight className="text-2xl mx-4 transform group-hover:translate-x-1 transition-transform" />
                  <div className="text-center">
                    <div className="text-2xl font-bold">
                      {flight.arrival.airport.code}
                    </div>
                    <div className="text-xs opacity-80">
                      {formatTime(flight.arrival.dateTime)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-muted-foreground">
                    {flight.stops === 0 ? "Direct" : `${flight.stops} stop(s)`}
                  </span>
                  <span className="text-sm font-medium text-card-foreground">
                    {Math.floor(flight.duration / 60)}h {flight.duration % 60}m
                  </span>
                </div>

                {flight.amenities && flight.amenities.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {flight.amenities.slice(0, 3).map((amenity: string) => (
                      <span
                        key={amenity}
                        className="text-xs px-2 py-0.5 bg-muted text-muted-foreground rounded"
                      >
                        {amenity.replace("-", " ")}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-end justify-between pt-3 border-t border-card-border">
                  <div>
                    <div className="text-xs text-muted-foreground">From</div>
                    <div className="text-2xl font-bold text-blue-600">
                      ${getLowestPrice(flight)}
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => navigate("/flights/search")}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            View All Flights
          </button>
        </div>
      </div>
    </section>
  );
}
