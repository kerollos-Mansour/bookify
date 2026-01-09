import { useGetFilterFacetsQuery } from "../../store/api/flights.api";
import { Loader2 } from "lucide-react";

interface FlightFiltersProps {
  filters: {
    stops: string;
    minPrice: string;
    maxPrice: string;
    airline: string;
    sort: string;
  };
  searchParams: {
    origin?: string;
    destination?: string;
    departureDate?: string;
  };
  onFilterChange: (filters: FlightFiltersProps["filters"]) => void;
}

export function FlightFilters({
  filters,
  searchParams,
  onFilterChange,
}: FlightFiltersProps) {
  // Fetch dynamic filter facets based on search criteria
  const { data: facets, isLoading } = useGetFilterFacetsQuery(searchParams);

  const handleChange = (key: string, value: string) => {
    onFilterChange({
      ...filters,
      [key]: value,
    });
  };

  const clearFilters = () => {
    onFilterChange({
      stops: "",
      minPrice: "",
      maxPrice: "",
      airline: "",
      sort: "departure",
    });
  };

  if (isLoading) {
    return (
      <div className="bg-card border border-card-border rounded-xl p-6 flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="bg-card border border-card-border rounded-xl p-4 sm:p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-card-foreground">Filter by</h2>
        <button
          onClick={clearFilters}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-6">
        {/* Sort By */}
        <div>
          <label className="block text-sm font-semibold text-card-foreground mb-3">
            Sort by
          </label>
          <select
            value={filters.sort}
            onChange={(e) => handleChange("sort", e.target.value)}
            className="w-full px-4 py-2 border border-card-border bg-background text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="recommended">Recommended</option>
            <option value="departure">Departure Time</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="duration">Shortest Duration</option>
          </select>
        </div>

        {/* Stops */}
        {facets?.stops && facets.stops.length > 0 && (
          <div>
            <label className="block text-sm font-semibold text-card-foreground mb-3">
              Stops
            </label>
            <div className="space-y-2">
              <label className="flex items-center justify-between cursor-pointer hover:bg-muted p-2 rounded transition-colors">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="stops"
                    value=""
                    checked={filters.stops === ""}
                    onChange={(e) => handleChange("stops", e.target.value)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm text-card-foreground">Any</span>
                </div>
              </label>
              {facets.stops.map((stop: any) => (
                <label
                  key={stop.value}
                  className="flex items-center justify-between cursor-pointer hover:bg-muted p-2 rounded transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="stops"
                      value={stop.value}
                      checked={filters.stops === stop.value.toString()}
                      onChange={(e) => handleChange("stops", e.target.value)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="text-sm text-card-foreground">
                      {stop.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      ({stop.count})
                    </span>
                    <span className="text-xs font-medium text-green-600">
                      ${stop.minPrice}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Airlines */}
        {facets?.airlines && facets.airlines.length > 0 && (
          <div>
            <label className="block text-sm font-semibold text-card-foreground mb-3">
              Airlines
            </label>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              <label className="flex items-center justify-between cursor-pointer hover:bg-muted p-2 rounded transition-colors">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="airline"
                    value=""
                    checked={filters.airline === ""}
                    onChange={(e) => handleChange("airline", e.target.value)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm text-card-foreground">
                    All Airlines
                  </span>
                </div>
              </label>
              {facets.airlines.map((airline: any) => (
                <label
                  key={airline.name}
                  className="flex items-center justify-between cursor-pointer hover:bg-muted p-2 rounded transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <input
                      type="radio"
                      name="airline"
                      value={airline.name}
                      checked={filters.airline === airline.name}
                      onChange={(e) => handleChange("airline", e.target.value)}
                      className="w-4 h-4 text-blue-600 flex-shrink-0"
                    />
                    <span className="text-sm text-card-foreground truncate">
                      {airline.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs text-muted-foreground">
                      ({airline.count})
                    </span>
                    <span className="text-xs font-medium text-green-600">
                      ${airline.minPrice}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Price Range */}
        {facets?.priceRange && (
          <div>
            <label className="block text-sm font-semibold text-card-foreground mb-3">
              Price Range
            </label>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>${facets.priceRange.minPrice}</span>
                <div className="flex-1 h-1 bg-gradient-to-r from-green-500 to-blue-500 rounded" />
                <span>${facets.priceRange.maxPrice}</span>
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1">
                  Min Price ($)
                </label>
                <input
                  type="number"
                  placeholder={`Min: ${facets.priceRange.minPrice}`}
                  value={filters.minPrice}
                  onChange={(e) => handleChange("minPrice", e.target.value)}
                  min={facets.priceRange.minPrice}
                  max={facets.priceRange.maxPrice}
                  className="w-full px-4 py-2 border border-card-border bg-background text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1">
                  Max Price ($)
                </label>
                <input
                  type="number"
                  placeholder={`Max: ${facets.priceRange.maxPrice}`}
                  value={filters.maxPrice}
                  onChange={(e) => handleChange("maxPrice", e.target.value)}
                  min={facets.priceRange.minPrice}
                  max={facets.priceRange.maxPrice}
                  className="w-full px-4 py-2 border border-card-border bg-background text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Class Availability */}
        {facets?.classes && (
          <div>
            <label className="block text-sm font-semibold text-card-foreground mb-3">
              Class Availability
            </label>
            <div className="space-y-2">
              {facets.classes.economy > 0 && (
                <div className="flex items-center justify-between p-2 bg-muted rounded">
                  <span className="text-sm text-card-foreground">Economy</span>
                  <span className="text-xs text-muted-foreground">
                    {facets.classes.economy} flights
                  </span>
                </div>
              )}
              {facets.classes.business > 0 && (
                <div className="flex items-center justify-between p-2 bg-muted rounded">
                  <span className="text-sm text-card-foreground">Business</span>
                  <span className="text-xs text-muted-foreground">
                    {facets.classes.business} flights
                  </span>
                </div>
              )}
              {facets.classes.firstClass > 0 && (
                <div className="flex items-center justify-between p-2 bg-muted rounded">
                  <span className="text-sm text-card-foreground">
                    First Class
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {facets.classes.firstClass} flights
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
