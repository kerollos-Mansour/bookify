export interface PropertyFilters {
  selectedTypes: string[];
  maxPrice: number;
  minRating: number;
  propertyName?: string;
  amenities?: string[];
}

interface FilterPropertiesProps {
  filters: PropertyFilters;
  priceBounds: { min: number; max: number };
  propertyTypeOptions: string[];
  onChange: (updates: Partial<PropertyFilters>) => void;
  onReset: () => void;
}

export default function FilterProperties({
  filters,
  priceBounds,
  propertyTypeOptions,
  onChange,
  onReset,
}: FilterPropertiesProps) {
  const handleTypeToggle = (type: string) => {
    const newTypes = filters.selectedTypes.includes(type)
      ? filters.selectedTypes.filter((t) => t !== type)
      : [...filters.selectedTypes, type];

    onChange({ selectedTypes: newTypes });
  };

  const amenities = ["WiFi", "Pool", "Parking", "Spa", "Gym", "Restaurant"];
  const guestRatingOptions = [
    { label: "Any", value: "0" },
    { label: "Wonderful 4.5+", value: "4.5" },
    { label: "Very Good 4+", value: "4" },
    { label: "Good 3.5+", value: "3.5" },
  ];
  const distanceOptions = [
    "Less than 1 km",
    "Less than 3 km",
    "Less than 5 km",
  ];
  const popularFilters = [
    "Free Cancellation",
    "Breakfast Included",
    "Free WiFi",
    "Pet Friendly",
  ];

  return (
    <div className="filter my-7">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-3xl text-foreground">Filter By</h3>
        <button
          onClick={onReset}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          Reset All
        </button>
      </div>


      {/* Price Range Filter */}
      <div className="mb-6 p-4 border border-card-border rounded-lg">
        <h4 className="font-medium text-lg mb-3 text-foreground">Price Range</h4>
        <input
          type="range"
          min={priceBounds.min}
          max={priceBounds.max}
          value={filters.maxPrice || priceBounds.max}
          onChange={(e) => onChange({ maxPrice: Number(e.target.value) })}
          className="w-full"
        />
        <div className="flex justify-between text-sm text-muted-foreground mt-2">
          <span>${priceBounds.min}</span>
          <span>${priceBounds.max}</span>
        </div>
        <div className="flex gap-2 mt-3">
          <input
            type="number"
            value={priceBounds.min}
            className="w-1/2 px-3 py-2 border border-card-border bg-background text-foreground rounded-lg text-sm"
            readOnly
          />
          <input
            type="number"
            value={filters.maxPrice || priceBounds.max}
            className="w-1/2 px-3 py-2 border border-card-border bg-background text-foreground rounded-lg text-sm"
            readOnly
          />
        </div>
      </div>

      {/* Property Type Filter */}
      <div className="mb-6">
        <h4 className="font-medium text-lg mb-3 text-foreground">Property Type</h4>
        <ul className="space-y-2 text-sm">
          {propertyTypeOptions.map((type) => (
            <li key={type} className="flex items-center">
              <input
                id={type}
                type="checkbox"
                checked={filters.selectedTypes.includes(type)}
                onChange={() => handleTypeToggle(type)}
                className="w-4 h-4 bg-muted border border-card-border rounded text-blue-600"
              />
              <label
                htmlFor={type}
                className="ml-2 text-sm font-medium text-foreground capitalize"
              >
                {type}
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Guest Rating Filter */}
      <div className="mb-6">
        <h4 className="font-medium text-lg mb-3 text-foreground">Guest Rating</h4>
        <ul className="space-y-2 text-sm">
          {guestRatingOptions.map((option) => (
            <li key={option.value} className="flex items-center">
              <input
                id={`rating-${option.value}`}
                type="radio"
                name="guestRating"
                checked={filters.minRating === Number(option.value)}
                onChange={() => onChange({ minRating: Number(option.value) })}
                className="w-4 h-4 text-blue-600 border-card-border bg-background"
              />
              <label
                htmlFor={`rating-${option.value}`}
                className="ml-2 text-sm font-medium text-foreground"
              >
                {option.label}
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Amenities Filter */}
      <div className="mb-6">
        <h4 className="font-medium text-lg mb-3 text-foreground">Amenities</h4>
        <ul className="space-y-2 text-sm">
          {amenities.map((amenity) => (
            <li key={amenity} className="flex items-center">
              <input
                id={`amenity-${amenity}`}
                type="checkbox"
                checked={filters.amenities?.includes(amenity.toLowerCase())}
                onChange={() => {
                  const am = amenity.toLowerCase();
                  const current = filters.amenities || [];
                  const newAmenities = current.includes(am)
                    ? current.filter((a) => a !== am)
                    : [...current, am];
                  onChange({ amenities: newAmenities });
                }}
                className="w-4 h-4 bg-muted border border-card-border rounded text-blue-600"
              />
              <label
                htmlFor={`amenity-${amenity}`}
                className="ml-2 text-sm font-medium text-foreground"
              >
                {amenity}
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Popular Filters */}
      <div className="mb-6">
        <h4 className="font-medium text-lg mb-3 text-foreground">Popular Filters</h4>
        <ul className="space-y-2 text-sm">
          {popularFilters.map((filter) => {
            const key = filter.toLowerCase();

            return (
              <li key={filter} className="flex items-center">
                <input
                  id={`popular-${filter}`}
                  type="checkbox"
                  checked={filters.amenities?.includes(key)}
                  onChange={() => {
                    const current = filters.amenities || [];
                    const newAmenities = current.includes(key)
                      ? current.filter((a) => a !== key)
                      : [...current, key];
                    onChange({ amenities: newAmenities });
                  }}
                  className="w-4 h-4 bg-muted border border-card-border rounded text-blue-600"
                />
                <label
                  htmlFor={`popular-${filter}`}
                  className="ml-2 text-sm font-medium text-foreground"
                >
                  {filter}
                </label>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Minimum Rating Filter Buttons (Redundant if using radio above, but keeping if requested) */}
      {/* Removed redundancy for cleaner UI, or can keep if user likes the pills */}
    </div>
  );
}
