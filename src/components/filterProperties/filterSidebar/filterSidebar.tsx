import React, { useState, useEffect, useRef } from "react";
import { Check, Star, ChevronDown, ChevronUp, RotateCcw } from "lucide-react";

export interface PropertyFilters {
  selectedTypes: string[];
  minPrice: number;
  maxPrice: number;
  minRating: number;
  amenities: string[];
}

interface FilterPropertiesProps {
  filters: PropertyFilters;
  priceBounds: { min: number; max: number };
  propertyTypeOptions: string[];
  availableAmenities: string[];
  onChange: (updates: Partial<PropertyFilters>) => void;
  onReset: () => void;
}

export default function FilterSidebar({
  filters,
  priceBounds,
  propertyTypeOptions,
  availableAmenities,
  onChange,
  onReset,
}: FilterPropertiesProps) {
  // Local state for price inputs to avoid stuttering while typing
  const [localMinPrice, setLocalMinPrice] = useState<string>(
    filters.minPrice?.toString() || ""
  );
  const [localMaxPrice, setLocalMaxPrice] = useState<string>(
    filters.maxPrice?.toString() || ""
  );

  const [showAllAmenities, setShowAllAmenities] = useState(false);

  // Sync local state with props when props change (e.g. reset)
  useEffect(() => {
    setLocalMinPrice(filters.minPrice > 0 ? filters.minPrice.toString() : "");
  }, [filters.minPrice]);

  useEffect(() => {
    setLocalMaxPrice(
      filters.maxPrice > 0 && filters.maxPrice < 3000
        ? filters.maxPrice.toString()
        : ""
    );
  }, [filters.maxPrice]);

  const handlePriceBlur = () => {
    const min = Number(localMinPrice) || 0;
    const max = Number(localMaxPrice) || 0;

    // Validate logic
    let newMin = min;
    let newMax = max;

    if (max > 0 && min > max) {
      newMin = max; // clamp min to max
    }

    onChange({
      minPrice: newMin,
      maxPrice: newMax,
    });
  };

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (/^\d*$/.test(val)) {
      setLocalMinPrice(val);
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (/^\d*$/.test(val)) {
      setLocalMaxPrice(val);
    }
  };

  const toggleType = (type: string) => {
    const current = filters.selectedTypes || [];
    const newTypes = current.includes(type)
      ? current.filter((t) => t !== type)
      : [...current, type];
    onChange({ selectedTypes: newTypes });
  };

  const toggleAmenity = (amenity: string) => {
    const current = filters.amenities || [];
    const newAmenities = current.includes(amenity)
      ? current.filter((a) => a !== amenity)
      : [...current, amenity];
    onChange({ amenities: newAmenities });
  };

  // Dual Slider Logic simulation
  // We will use two inputs range, heavily styled
  // But for reliability now, let's use the explicit Inputs + A Visual Range Bar
  const percentMin = ((filters.minPrice || 0) / priceBounds.max) * 100;
  const percentMax =
    ((filters.maxPrice || priceBounds.max) / priceBounds.max) * 100;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-foreground">Filters</h3>
        <button
          onClick={onReset}
          className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-blue-50 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset
        </button>
      </div>

      {/* Price Range */}
      <div className="space-y-4">
        <h4 className="font-semibold text-sm text-foreground">Price Range</h4>
        <div className="bg-card/50 rounded-xl p-1 space-y-4">
          {/* Inputs */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 group">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium group-focus-within:text-blue-600 transition-colors">
                $
              </span>
              <input
                type="text"
                value={localMinPrice}
                onChange={handleMinChange}
                onBlur={handlePriceBlur}
                placeholder="Min"
                className="w-full pl-7 pr-3 py-2 bg-background border border-border rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-muted-foreground/50"
              />
            </div>
            <div className="w-2 h-[2px] bg-border flex-shrink-0" />
            <div className="relative flex-1 group">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium group-focus-within:text-blue-600 transition-colors">
                $
              </span>
              <input
                type="text"
                value={localMaxPrice}
                onChange={handleMaxChange}
                onBlur={handlePriceBlur}
                placeholder="Max"
                className="w-full pl-7 pr-3 py-2 bg-background border border-border rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-muted-foreground/50"
              />
            </div>
          </div>

          {/* Visual Slider Bar (Optional but nice) */}
          <div className="relative h-1.5 w-full bg-secondary rounded-full overflow-hidden">
            <div
              className="absolute top-0 bottom-0 bg-blue-600 rounded-full transition-all duration-300"
              style={{
                left: `${Math.min(percentMin, 100)}%`,
                right: `${100 - Math.min(percentMax, 100)}%`,
              }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground font-medium px-0.5">
            <span>$0</span>
            <span>${priceBounds.max}+</span>
          </div>
        </div>
      </div>

      <div className="h-[1px] bg-border/50" />

      {/* Property Type */}
      <div className="space-y-3">
        <h4 className="font-semibold text-sm text-foreground">Property Type</h4>
        <div className="space-y-2">
          {propertyTypeOptions.map((type) => {
            const isSelected = filters.selectedTypes?.includes(type);
            return (
              <label
                key={type}
                className={`flex items-center gap-3 p-2.5 rounded-lg border cursor-pointer transition-all duration-200 group ${
                  isSelected
                    ? "bg-blue-50/50 border-blue-200"
                    : "bg-transparent border-transparent hover:bg-secondary/50"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                    isSelected
                      ? "bg-blue-600 border-blue-600 text-white"
                      : "border-muted-foreground/30 bg-background group-hover:border-blue-400"
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
                <input
                  type="checkbox"
                  className="hidden"
                  checked={isSelected}
                  onChange={() => toggleType(type)}
                />
                <span
                  className={`text-sm font-medium ${
                    isSelected
                      ? "text-blue-900"
                      : "text-muted-foreground group-hover:text-foreground"
                  }`}
                >
                  {type}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      <div className="h-[1px] bg-border/50" />

      {/* Rating */}
      <div className="space-y-3">
        <h4 className="font-semibold text-sm text-foreground">Star Rating</h4>
        <div className="flex flex-col gap-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <button
              key={rating}
              onClick={() =>
                onChange({
                  minRating: filters.minRating === rating ? 0 : rating,
                })
              }
              className={`flex items-center justify-between p-2.5 rounded-lg border transition-all duration-200 ${
                filters.minRating === rating
                  ? "bg-amber-50/50 border-amber-200 shadow-sm"
                  : "bg-transparent border-transparent hover:bg-secondary/50"
              }`}
            >
              <div className="flex items-center gap-1.5">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < rating
                          ? "fill-amber-400 text-amber-400"
                          : "fill-muted/20 text-muted-foreground/20"
                      }`}
                    />
                  ))}
                </div>
                <span
                  className={`text-sm font-medium ${
                    filters.minRating === rating
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {rating} stars
                </span>
              </div>
              {filters.minRating === rating && (
                <Check className="w-4 h-4 text-amber-500" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[1px] bg-border/50" />

      {/* Amenities */}
      <div className="space-y-3">
        <h4 className="font-semibold text-sm text-foreground">Amenities</h4>
        <div className="space-y-2">
          {availableAmenities
            .slice(0, showAllAmenities ? undefined : 6)
            .map((amenity) => {
              const isSelected = filters.amenities?.includes(amenity);
              return (
                <label
                  key={amenity}
                  className="flex items-center gap-2.5 group cursor-pointer"
                >
                  <div
                    className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                      isSelected
                        ? "bg-primary border-primary text-primary-foreground"
                        : "border-muted-foreground/40 bg-background group-hover:border-primary"
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3" />}
                  </div>
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={isSelected}
                    onChange={() => toggleAmenity(amenity)}
                  />
                  <span
                    className={`text-sm ${
                      isSelected
                        ? "text-foreground font-medium"
                        : "text-muted-foreground group-hover:text-foreground transition-colors"
                    }`}
                  >
                    {amenity}
                  </span>
                </label>
              );
            })}
        </div>

        {availableAmenities.length > 6 && (
          <button
            onClick={() => setShowAllAmenities(!showAllAmenities)}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 mt-2 hover:underline"
          >
            {showAllAmenities ? (
              <>
                Show Less <ChevronUp className="w-3 h-3" />
              </>
            ) : (
              <>
                Show {availableAmenities.length - 6} more{" "}
                <ChevronDown className="w-3 h-3" />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
