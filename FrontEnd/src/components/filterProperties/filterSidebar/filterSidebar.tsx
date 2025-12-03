import { Search } from "lucide-react";
import Map from "../../map/Map";
import FilterProperties, {
  PropertyFilters,
} from "../filterProperties/filterProperties";

type filterSidebarProps = {
  mapCenter?: { latitude: number; longitude: number };
  mapMarkers: Array<{
    position: [number, number];
    title: string;
    description: string;
  }>;
  propertyNameFilter: string;
  onPropertyNameChange: (value: string) => void;
  filters: PropertyFilters;
  priceBounds: { min: number; max: number };
  propertyTypeOptions: string[];
  onFilterChange: (updates: Partial<PropertyFilters>) => void;
  onResetFilters: () => void;
};

export default function filterSidebar({
  mapCenter,
  mapMarkers,
  propertyNameFilter,
  onPropertyNameChange,
  filters,
  priceBounds,
  propertyTypeOptions,
  onFilterChange,
  onResetFilters,
}: filterSidebarProps) {
  return (
    <aside className="bg-white p-6 rounded-3xl md:w-[320px] flex-shrink-0 border border-gray-100">
      <Map
        location={mapCenter}
        markers={mapMarkers}
        zoom={11}
        height="260px"
        width="100%"
        scrollWheelZoom={false}
        className="mb-6"
      />

      <div className="w-full my-5 py-5 border-gray-200 border-y">
        <p className="font-medium text-xl mb-2">
          Search by property name
        </p>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="e.g. Marriott"
            value={propertyNameFilter}
            onChange={(e) => onPropertyNameChange(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <FilterProperties
        filters={filters}
        priceBounds={priceBounds}
        propertyTypeOptions={propertyTypeOptions}
        onChange={onFilterChange}
        onReset={onResetFilters}
      />
    </aside>
  );
}