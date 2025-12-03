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

      {/* Price Range Filter */}
      <div className="mb-6">
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
          <span>${filters.maxPrice}</span>
        </div>
      </div>

      {/* Rating Filter */}
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