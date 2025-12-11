export interface PropertyFilters {
  selectedTypes: string[];
  maxPrice: number;
  minRating: number;
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
    { label: "Any", value: "any" },
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
        <h3 className="font-medium text-3xl">Filter By</h3>
        <button
          onClick={onReset}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          Reset All
        </button>
      </div>

      {/* Search by Property Name - Static */}
      <div className="mb-6">
        <h4 className="font-medium text-lg mb-3">Search by property name</h4>
        <div className="relative">
          <input
            type="text"
            placeholder="e.g. Marriott"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            readOnly
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="mb-6 p-4 border border-gray-200 rounded-lg">
        <h4 className="font-medium text-lg mb-3">Price Range</h4>
        <input
          type="range"
          min={priceBounds.min}
          max={priceBounds.max}
          value={filters.maxPrice}
          onChange={(e) => onChange({ maxPrice: Number(e.target.value) })}
          className="w-full"
        />
        <div className="flex justify-between text-sm text-gray-600 mt-2">
          <span>${priceBounds.min}</span>
          <span>${priceBounds.max}</span>
        </div>
        <div className="flex gap-2 mt-3">
          <input
            type="number"
            value={priceBounds.min}
            className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg text-sm"
            readOnly
          />
          <input
            type="number"
            value={filters.maxPrice}
            className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg text-sm"
            readOnly
          />
        </div>
      </div>

      {/* Property Type Filter */}
      <div className="mb-6">
        <h4 className="font-medium text-lg mb-3">Property Type</h4>
        <ul className="space-y-2 text-sm">
          {propertyTypeOptions.map((type) => (
            <li key={type} className="flex items-center">
              <input
                id={type}
                type="checkbox"
                checked={filters.selectedTypes.includes(type)}
                onChange={() => handleTypeToggle(type)}
                className="w-4 h-4 bg-gray-100 border-4 border-gray-300 rounded text-blue-600"
              />
              <label
                htmlFor={type}
                className="ml-2 text-sm font-medium text-black capitalize"
              >
                {type}
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Guest Rating Filter - Static */}
      <div className="mb-6">
        <h4 className="font-medium text-lg mb-3">Guest Rating</h4>
        <ul className="space-y-2 text-sm">
          {guestRatingOptions.map((option, index) => (
            <li key={option.value} className="flex items-center">
              <input
                id={`rating-${option.value}`}
                type="radio"
                name="guestRating"
                defaultChecked={index === 3}
                className="w-4 h-4 text-blue-600 border-gray-300"
                readOnly
              />
              <label
                htmlFor={`rating-${option.value}`}
                className="ml-2 text-sm font-medium text-black"
              >
                {option.label}
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Amenities Filter - Static */}
      <div className="mb-6">
        <h4 className="font-medium text-lg mb-3">Amenities</h4>
        <ul className="space-y-2 text-sm">
          {amenities.map((amenity) => (
            <li key={amenity} className="flex items-center">
              <input
                id={`amenity-${amenity}`}
                type="checkbox"
                className="w-4 h-4 bg-gray-100 border border-gray-300 rounded text-blue-600"
                readOnly
              />
              <label
                htmlFor={`amenity-${amenity}`}
                className="ml-2 text-sm font-medium text-black"
              >
                {amenity}
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Distance from Center - Static */}
      <div className="mb-6">
        <h4 className="font-medium text-lg mb-3">Distance from Center</h4>
        <ul className="space-y-2 text-sm">
          {distanceOptions.map((distance) => (
            <li key={distance} className="flex items-center">
              <input
                id={`distance-${distance}`}
                type="checkbox"
                className="w-4 h-4 bg-gray-100 border border-gray-300 rounded text-blue-600"
                readOnly
              />
              <label
                htmlFor={`distance-${distance}`}
                className="ml-2 text-sm font-medium text-black"
              >
                {distance}
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Popular Filters - Static */}
      <div className="mb-6">
        <h4 className="font-medium text-lg mb-3">Popular Filters</h4>
        <ul className="space-y-2 text-sm">
          {popularFilters.map((filter) => (
            <li key={filter} className="flex items-center">
              <input
                id={`popular-${filter}`}
                type="checkbox"
                className="w-4 h-4 bg-gray-100 border border-gray-300 rounded text-blue-600"
                readOnly
              />
              <label
                htmlFor={`popular-${filter}`}
                className="ml-2 text-sm font-medium text-black"
              >
                {filter}
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Minimum Rating Filter */}
      <div className="mb-6">
        <h4 className="font-medium text-lg mb-3">Minimum Rating</h4>
        <div className="flex gap-2">
          {[0, 1, 2, 3, 4, 5].map((rating) => (
            <button
              key={rating}
              onClick={() => onChange({ minRating: rating })}
              className={`px-3 py-1 rounded-lg border ${
                filters.minRating === rating
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
            >
              {rating}+
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}