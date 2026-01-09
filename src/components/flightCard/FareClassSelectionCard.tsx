import { useState } from "react";
import { Flight } from "../../types/flight.types";
import {
  Plane,
  Clock,
  Sun,
  Sunset,
  Moon,
  ChevronDown,
  ChevronUp,
  Check,
  DollarSign,
  Briefcase,
  ShoppingBag,
} from "lucide-react";

interface FareClassSelectionCardProps {
  flight: Flight;
  onSelect: (
    flight: Flight,
    classOfService: "economy" | "business" | "firstClass",
    fareClassName: string
  ) => void;
}

export function FareClassSelectionCard({
  flight,
  onSelect,
}: FareClassSelectionCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

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

  const getTimeOfDayIcon = (dateTime: string) => {
    const hour = new Date(dateTime).getHours();
    if (hour >= 6 && hour < 12)
      return <Sun className="w-5 h-5 text-yellow-500" />;
    if (hour >= 12 && hour < 18)
      return <Sun className="w-5 h-5 text-orange-500" />;
    if (hour >= 18 && hour < 21)
      return <Sunset className="w-5 h-5 text-orange-600" />;
    return <Moon className="w-5 h-5 text-indigo-500" />;
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

  // Default fare classes if not provided
  const defaultFareClasses = [
    {
      name: "Economy Saver",
      cabin: "Economy",
      price: flight.pricing.economy.price,
      features: {
        seatSelection: { included: false, fee: 15 },
        carryOn: { included: true, weight: 7 },
        checkedBags: { count: 0, weight: 0, fee: 50 },
        cancellationFee: 100,
        changeFee: 75,
        refundable: false,
      },
      availableSeats: flight.pricing.economy.availableSeats,
    },
    {
      name: "Economy Flex",
      cabin: "Economy",
      price: flight.pricing.economy.price * 1.25,
      features: {
        seatSelection: { included: true, fee: 0 },
        carryOn: { included: true, weight: 7 },
        checkedBags: { count: 2, weight: 23, fee: 0 },
        cancellationFee: 47,
        changeFee: 30,
        refundable: false,
      },
      availableSeats: flight.pricing.economy.availableSeats,
    },
  ];

  if (flight.pricing.business.available) {
    defaultFareClasses.push({
      name: "Business",
      cabin: "Business",
      price: flight.pricing.business.price,
      features: {
        seatSelection: { included: true, fee: 0 },
        carryOn: { included: true, weight: 10 },
        checkedBags: { count: 2, weight: 32, fee: 0 },
        cancellationFee: 0,
        changeFee: 0,
        refundable: true,
      },
      availableSeats: flight.pricing.business.availableSeats,
    });
  }

  if (flight.pricing.firstClass.available) {
    defaultFareClasses.push({
      name: "First Class",
      cabin: "First",
      price: flight.pricing.firstClass.price,
      features: {
        seatSelection: { included: true, fee: 0 },
        carryOn: { included: true, weight: 15 },
        checkedBags: { count: 3, weight: 32, fee: 0 },
        cancellationFee: 0,
        changeFee: 0,
        refundable: true,
      },
      availableSeats: flight.pricing.firstClass.availableSeats,
    });
  }

  const fareClasses = (flight as any).fareClasses?.length
    ? (flight as any).fareClasses
    : defaultFareClasses;

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      {/* Collapsed View */}
      <div
        className="p-5 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex gap-4 lg:gap-6 items-start">
          {/* Logo */}
          <div className="w-12 h-12 bg-[#D71921] rounded-sm flex items-center justify-center flex-shrink-0 text-white">
            {/* Emirates red color used in example, employing generic Airline icon or text */}
            <Plane className="w-6 h-6" fill="currentColor" />
          </div>

          {/* New Horizontal Layout */}
          <div className="flex-1 flex flex-col sm:flex-row gap-4 sm:gap-8 justify-between">
            {/* Times & Route */}
            <div className="flex-1 min-w-[200px]">
              <div className="flex items-center gap-3 mb-1">
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  {formatTime(flight.departure.dateTime)}
                </span>
                <div className="flex-1 max-w-[100px] h-[2px] bg-emerald-600 relative flex items-center justify-between">
                  {/* Optional: Add clear start/end markers if needed, simple line for now matches image */}
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  {formatTime(flight.arrival.dateTime)}
                </span>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {flight.departure.airport.city} ({flight.departure.airport.code}
                ) - {flight.arrival.airport.city} ({flight.arrival.airport.code}
                )
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-500 mt-0.5">
                {flight.airline}
              </div>
              <div
                className="text-blue-600 text-sm mt-3 font-medium hover:underline inline-block"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(!isExpanded);
                }}
              >
                Flight details
              </div>
            </div>

            {/* Duration */}
            <div className="flex-shrink-0 pt-1">
              <span className="text-gray-900 dark:text-white font-medium">
                {formatDuration(flight.duration)}
              </span>
              <span className="mx-1.5 text-gray-400">•</span>
              <span className="text-emerald-700 dark:text-emerald-400 font-medium">
                {flight.stops === 0
                  ? "Nonstop"
                  : `${flight.stops} stop${flight.stops > 1 ? "s" : ""}`}
              </span>
            </div>

            {/* Price section */}
            <div className="text-left sm:text-right flex-shrink-0 pt-1">
              <div className="flex sm:flex-col sm:items-end gap-2 sm:gap-0 items-baseline">
                <div className="text-xl font-bold text-gray-900 dark:text-white">
                  +US$ 0
                </div>
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  US$ {getLowestPrice()}
                </div>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Roundtrip per traveler
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded View - Fare Classes */}
      {isExpanded && (
        <div className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {fareClasses.map((fareClass: any, index: number) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
              >
                {/* Price */}
                <div className="mb-4">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    US$ {fareClass.price}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    US$ {fareClass.price} roundtrip for 1 traveler
                  </div>
                </div>

                {/* Fare Name & Cabin */}
                <div className="mb-4">
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {fareClass.name}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Cabin: {fareClass.cabin}
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-2 mb-4 text-sm">
                  {/* Seat Selection */}
                  <div className="flex items-start gap-2">
                    {fareClass.features.seatSelection.included ? (
                      <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    ) : (
                      <DollarSign className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    )}
                    <span className="text-gray-700 dark:text-gray-300">
                      {fareClass.features.seatSelection.included
                        ? "Seat choice included"
                        : `Seat choice for a fee`}
                    </span>
                  </div>

                  {/* Carry-on */}
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Carry-on bag included ({fareClass.features.carryOn.weight}{" "}
                      kg)
                    </span>
                  </div>

                  {/* Checked Bags */}
                  <div className="flex items-start gap-2">
                    {fareClass.features.checkedBags.count > 0 ? (
                      <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    ) : (
                      <DollarSign className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    )}
                    <span className="text-gray-700 dark:text-gray-300">
                      {fareClass.features.checkedBags.count > 0
                        ? `${fareClass.features.checkedBags.count} checked bag${
                            fareClass.features.checkedBags.count > 1 ? "s" : ""
                          } included (${
                            fareClass.features.checkedBags.weight
                          } kg each)`
                        : "No checked bags included"}
                    </span>
                  </div>

                  {/* Cancellation */}
                  {fareClass.features.cancellationFee > 0 ? (
                    <div className="flex items-start gap-2">
                      <DollarSign className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">
                        Cancellation fee: US${" "}
                        {fareClass.features.cancellationFee}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">
                        Free cancellation
                      </span>
                    </div>
                  )}

                  {/* Change Fee */}
                  {fareClass.features.changeFee > 0 ? (
                    <div className="flex items-start gap-2">
                      <DollarSign className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">
                        Change fee: US$ {fareClass.features.changeFee}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">
                        Free changes
                      </span>
                    </div>
                  )}
                </div>

                {/* Select Button */}
                <button
                  onClick={() => {
                    const classMap: any = {
                      Economy: "economy",
                      Business: "business",
                      First: "firstClass",
                    };
                    onSelect(flight, classMap[fareClass.cabin], fareClass.name);
                  }}
                  className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Select
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
