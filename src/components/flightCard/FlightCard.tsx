import { Flight } from "../../types/flight.types";
import {
  MdFlight,
  MdAccessTime,
  MdAirlineSeatReclineExtra,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";

interface FlightCardProps {
  flight: Flight;
}

export function FlightCard({ flight }: FlightCardProps) {
  const navigate = useNavigate();

  const formatTime = (dateTime: string) => {
    const date = new Date(dateTime);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const getLowestPrice = () => {
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
    <div
      className="bg-card border border-card-border rounded-xl p-4 sm:p-6 hover:shadow-lg transition-all cursor-pointer group"
      onClick={() => navigate(`/flights/${flight._id}`)}
    >
      <div className="flex flex-col lg:flex-row gap-4 lg:items-center justify-between">
        {/* Flight Info */}
        <div className="flex-1">
          {/* Airline */}
          <div className="flex items-center gap-2 mb-4">
            <MdFlight className="text-blue-600 text-xl" />
            <span className="font-semibold text-card-foreground">
              {flight.airline}
            </span>
            <span className="text-sm text-muted-foreground">
              • {flight.flightNumber}
            </span>
            {flight.aircraft && (
              <span className="text-sm text-muted-foreground">
                • {flight.aircraft}
              </span>
            )}
          </div>

          {/* Route */}
          <div className="grid grid-cols-[1fr,auto,1fr] gap-4 items-center">
            {/* Departure */}
            <div className="text-right lg:text-left">
              <div className="text-2xl sm:text-3xl font-bold text-card-foreground">
                {formatTime(flight.departure.dateTime)}
              </div>
              <div className="text-lg font-semibold text-card-foreground">
                {flight.departure.airport.code}
              </div>
              <div className="text-sm text-muted-foreground">
                {flight.departure.airport.city}
              </div>
            </div>

            {/* Duration & Stops */}
            <div className="flex flex-col items-center min-w-[120px] sm:min-w-[150px]">
              <div className="text-sm text-muted-foreground mb-1">
                {formatDuration(flight.duration)}
              </div>
              <div className="relative w-full">
                <div className="h-0.5 bg-card-border" />
                <MdFlight className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-600 text-xl bg-card" />
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {flight.stops === 0
                  ? "Direct"
                  : `${flight.stops} stop${flight.stops > 1 ? "s" : ""}`}
              </div>
            </div>

            {/* Arrival */}
            <div className="text-left">
              <div className="text-2xl sm:text-3xl font-bold text-card-foreground">
                {formatTime(flight.arrival.dateTime)}
              </div>
              <div className="text-lg font-semibold text-card-foreground">
                {flight.arrival.airport.code}
              </div>
              <div className="text-sm text-muted-foreground">
                {flight.arrival.airport.city}
              </div>
            </div>
          </div>

          {/* Amenities */}
          {flight.amenities && flight.amenities.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {flight.amenities.slice(0, 4).map((amenity) => (
                <span
                  key={amenity}
                  className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded-full"
                >
                  {amenity.replace("-", " ")}
                </span>
              ))}
              {flight.amenities.length > 4 && (
                <span className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded-full">
                  +{flight.amenities.length - 4} more
                </span>
              )}
            </div>
          )}
        </div>

        {/* Price & CTA */}
        <div className="flex lg:flex-col items-center lg:items-end gap-4 lg:gap-2 pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-card-border lg:pl-6">
          <div className="flex-1 lg:flex-none text-right">
            <div className="text-sm text-muted-foreground mb-1">From</div>
            <div className="text-2xl sm:text-3xl font-bold text-blue-600">
              ${getLowestPrice()}
            </div>
            <div className="text-xs text-muted-foreground">per person</div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/flights/${flight._id}`);
            }}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors group-hover:shadow-lg whitespace-nowrap"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
