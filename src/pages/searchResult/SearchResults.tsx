import { SearchBar } from "../../components/searchBar/SearchBar";
import HotelCard from "../../components/hotelCard/HotelCard";
import { useEffect, useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import Map from "../../components/map/map";
import Tabs from "../../components/filterProperties/tabs/Tabs";
import FilterProperties, {
  PropertyFilters,
} from "../../components/filterProperties/filterProperties/filterProperties";
import { Link, useLocation } from "react-router-dom";
import PageTransition from "../../components/pageTransition/pageTransition";
import { Hotel } from "../../types/hotel.type";
import { HotelCardData } from "../../types/hotelCard.type";
import { useSearchHotelsQuery } from "../../store/api/hotels.api";
import { useGetAllAmenitiesQuery } from "../../store/api/amenities.api";

type SearchFilters = PropertyFilters & {
  propertyName: string;
  amenities?: string[];
};

const getNightlyRate = (hotel: Hotel) =>
  hotel.nightlyPrice ?? hotel.lowRate ?? hotel.highRate ?? 0;
const toCardData = (hotel: Hotel): HotelCardData => {
  const nightly = getNightlyRate(hotel);
  const total = hotel.highRate ?? nightly;
  // hotelDetails can be string or array based on API. Safeguard it.
  const detail = Array.isArray(hotel.hotelDetails)
    ? hotel.hotelDetails[0]
    : null;

  return {
    id: hotel._id,
    img: {
      img:
        hotel.images && hotel.images.length > 0
          ? hotel.images
          : [
              "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
            ],
      alt: hotel.name,
    },
    title: hotel.name,
    location: [hotel.city, hotel.stateProvinceCode, hotel.countryCode]
      .filter(Boolean)
      .join(", "),
    Amenities: detail?.amenities?.slice(0, 3) || [],
    reviews: {
      reviewsCount: detail?.reviewCount ?? 0,
      avgReview: Number(hotel.tripAdvisorRating ?? hotel.hotelRating ?? 0),
    },
    withFees: true,
    prices: {
      day: Number(total),
      nightly: Number(nightly),
      offer:
        total && nightly
          ? Math.max(
              5,
              Math.min(40, Math.round(((total - nightly) / total) * 100))
            )
          : 10,
    },
    vip: (hotel.confidenceRating ?? 0) > 50,
    featured: !!hotel.featured,
  };
};

export default function SearchResult() {
  // States
  const { search } = useLocation();

  const [activeTab, setActiveTab] = useState("all");
  const [filters, setFilters] = useState<SearchFilters>({
    propertyName: "",
    selectedTypes: [],
    maxPrice: 0,
    minRating: 0,
    amenities: [],
  });
  const [priceBounds, setPriceBounds] = useState({ min: 0, max: 0 });
  const [propertyTypeOptions, setPropertyTypeOptions] = useState<string[]>([]);
  const [locationFilter, setLocationFilter] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const searchParams = useMemo(() => {
    const params = new URLSearchParams(search);

    // Logic for combining Tab and Sidebar filters (Intersection)
    let finalTypes: string[] | undefined;
    let tabTypes: string[] | undefined = undefined;

    if (activeTab === "hotels") tabTypes = ["hotel", "resort"];
    if (activeTab === "homes")
      tabTypes = ["home", "apartment", "villa", "cabin", "cottage"];

    if (tabTypes) {
      if (filters.selectedTypes?.length) {
        // Intersect: Only allow types that are in BOTH lists (case-insensitive)
        finalTypes = tabTypes.filter((t) =>
          filters.selectedTypes.some(
            (selected) => selected.toLowerCase() === t.toLowerCase()
          )
        );

        // If user selected a type NOT in this tab (e.g. "Home" while on "Hotels" tab)
        // We must send a value that matches NOTHING instead of undefined
        if (finalTypes.length === 0) finalTypes = ["__no_match__"];
      } else {
        finalTypes = tabTypes;
      }
    } else {
      // All Stays tab -> use sidebar selection
      finalTypes = filters.selectedTypes?.length
        ? filters.selectedTypes
        : undefined;
    }

    const rawParams = {
      location: params.get("location") || undefined,
      city: params.get("city") || undefined,
      country: params.get("country") || undefined,
      checkIn: params.get("checkIn") || undefined,
      checkOut: params.get("checkOut") || undefined,
      adults: params.get("adults") ? Number(params.get("adults")) : undefined,
      rooms: params.get("rooms") ? Number(params.get("rooms")) : undefined,
      minRate: params.get("minRate")
        ? Number(params.get("minRate"))
        : undefined,
      maxRate: filters.maxPrice > 0 ? filters.maxPrice : undefined,
      search: filters.propertyName || undefined,
      hotelRating: filters.minRating > 0 ? filters.minRating : undefined,
      sort: params.get("sort") || undefined,
      page: params.get("page") ? Number(params.get("page")) : 1,
      limit: params.get("limit") ? Number(params.get("limit")) : 20,
      amenities: filters.amenities?.filter(Boolean).length
        ? filters.amenities.filter(Boolean).join(",")
        : undefined,
      types: finalTypes?.filter(Boolean).length
        ? finalTypes.filter(Boolean).join(",")
        : undefined,
    };

    const cleanParams: Record<string, any> = {};
    Object.entries(rawParams).forEach(([key, val]) => {
      if (val !== undefined && val !== null && val !== "") {
        cleanParams[key] = val;
      }
    });

    return cleanParams as any;
  }, [
    search,
    activeTab,
    filters.maxPrice,
    filters.propertyName,
    filters.minRating,
    filters.amenities,
    filters.selectedTypes,
  ]);

  const {
    data: hotels = [],
    isLoading,
    error,
  } = useSearchHotelsQuery(searchParams);
  // Fetch Amenities for Sidebar
  const { data: amenitiesList = [] } = useGetAllAmenitiesQuery({ limit: 50 });
  // Fetch Max Price (Global High) for Slider
  // We query for 1 hotel, sorted by highest price.
  const { data: maxPriceHotels = [] } = useSearchHotelsQuery({
    sort: "-nightlyPrice", // or -highRate depending on backend
    limit: 1,
  });

  const globalMaxPrice = useMemo(() => {
    if (maxPriceHotels.length > 0) {
      // Use nightlyPrice or highRate
      return (
        maxPriceHotels[0].nightlyPrice ?? maxPriceHotels[0].highRate ?? 3000
      );
    }
    return 3000; // Default fallback
  }, [maxPriceHotels]);

  // Update logic to use this globalMaxPrice for the UI slider bounds
  useEffect(() => {
    if (globalMaxPrice > 0 && priceBounds.max !== globalMaxPrice) {
      setPriceBounds((prev) => ({ ...prev, max: globalMaxPrice }));
    }
  }, [globalMaxPrice, priceBounds.max]);

  // Effects
  // location from params effect
  useEffect(() => {
    const params = new URLSearchParams(search);
    const locationParam = params.get("location") ?? "";
    setLocationFilter(locationParam);
  }, [search]);

  // Reset type filters when switching tabs
  useEffect(() => {
    setFilters((prev) => ({ ...prev, selectedTypes: [] }));
  }, [activeTab]);

  // Static property types to prevent options from disappearing when filtered
  useEffect(() => {
    setPropertyTypeOptions([
      "Hotel",
      "Resort",
      "Apartment",
      "Villa",
      "Cabin",
      "Cottage",
    ]);
  }, []);

  const hotelCards = useMemo(
    () =>
      hotels.map((hotel) => ({
        hotel,
        card: toCardData(hotel),
      })),
    [hotels]
  );

  const mapMarkers = useMemo(
    () =>
      hotelCards
        .filter(
          ({ hotel }) =>
            hotel.location &&
            typeof hotel.location.latitude === "number" &&
            typeof hotel.location.longitude === "number"
        )
        .map(({ hotel, card }) => ({
          position: [hotel.location!.latitude, hotel.location!.longitude] as [
            number,
            number
          ],
          title: card.title,
          description: `${card.location || "Unknown"} • $${
            card.prices.nightly
          }`,
        })),
    [hotelCards]
  );

  const mapCenter = mapMarkers.length
    ? {
        latitude: mapMarkers[0].position[0],
        longitude: mapMarkers[0].position[1],
      }
    : undefined;

  const handleFilterChange = (updates: Partial<PropertyFilters>) => {
    setFilters((prev) => ({ ...prev, ...updates }));
  };

  const handleResetFilters = () => {
    setFilters((prev) => ({
      ...prev,
      propertyName: "",
      selectedTypes: [],
      minRating: 0,
      maxPrice: 3000,
      amenities: [],
    }));
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background transition-colors duration-300">
        {/* Sticky Search Bar */}
        <div className="sticky top-0 z-50 bg-card border-b border-card-border shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <SearchBar />
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            <aside className="hidden lg:block lg:w-80 flex-shrink-0">
              <div className="bg-card p-6 rounded-2xl border border-card-border sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <Map
                  location={mapCenter}
                  markers={mapMarkers}
                  zoom={11}
                  height="240px"
                  width="100%"
                  scrollWheelZoom={false}
                  className="mb-6 rounded-xl overflow-hidden"
                />

                <div className="w-full my-5 py-5 border-card-border border-y">
                  <p className="font-semibold text-lg mb-3 text-foreground">
                    Search by property name
                  </p>
                  <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="e.g. Marriott"
                      value={filters.propertyName}
                      onChange={(event) =>
                        setFilters((prev) => ({
                          ...prev,
                          propertyName: event.target.value,
                        }))
                      }
                      className="w-full pl-11 pr-4 py-2.5 border border-card-border bg-background text-foreground rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <FilterProperties
                  filters={{
                    selectedTypes: filters.selectedTypes,
                    maxPrice: filters.maxPrice,
                    minRating: filters.minRating,
                    amenities: filters.amenities,
                  }}
                  priceBounds={{ min: 0, max: globalMaxPrice }} // Use dynamic max
                  propertyTypeOptions={propertyTypeOptions}
                  availableAmenities={amenitiesList.map((a) => a.name)} // Pass API amenities
                  onChange={handleFilterChange}
                  onReset={handleResetFilters}
                />
              </div>
            </aside>

            <section className="flex-1 bg-card p-4 sm:p-6 rounded-2xl border border-card-border">
              <div className="flex flex-col gap-4 mb-6">
                <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm text-muted-foreground">
                    Showing {hotelCards.length}{" "}
                    {hotelCards.length === 1 ? "property" : "properties"}
                    {locationFilter ? ` in "${locationFilter}"` : ""}
                  </p>
                  {/* Mobile Filter Button */}
                  <button
                    onClick={() => setShowMobileFilters(true)}
                    className="lg:hidden flex items-center gap-2 px-4 py-2 bg-card border border-card-border rounded-xl font-medium text-sm hover:bg-muted transition-colors"
                  >
                    <Search className="w-4 h-4" />
                    Filters
                  </button>
                </div>
              </div>

              {isLoading && (
                <div className="flex justify-center items-center py-20">
                  <div className="text-muted-foreground">
                    Loading properties...
                  </div>
                </div>
              )}

              {error && !isLoading && (
                <div className="flex justify-center items-center py-20 text-red-600">
                  {(error as any)?.message || "Failed to load hotels"}
                </div>
              )}

              {!isLoading && !error && hotelCards.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <p className="text-lg font-semibold text-foreground mb-2">
                    No properties match these filters
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Try adjusting your filters or search in a different
                    location.
                  </p>
                </div>
              )}

              <div className="space-y-4">
                {hotelCards.map(({ hotel, card }) => (
                  <HotelCard key={hotel._id} cardData={card} />
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Mobile Filter Overlay */}
        {showMobileFilters && (
          <div className="fixed inset-0 z-[60] lg:hidden">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setShowMobileFilters(false)}
            />

            {/* Drawer */}
            <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-card shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
              <div className="flex items-center justify-between p-4 border-b border-card-border">
                <h2 className="text-xl font-bold">Filters</h2>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="p-2 hover:bg-muted rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <div className="w-full mb-6 py-5 border-card-border border-y">
                  <p className="font-semibold text-lg mb-3 text-foreground">
                    Search by property name
                  </p>
                  <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="e.g. Marriott"
                      value={filters.propertyName}
                      onChange={(event) =>
                        setFilters((prev) => ({
                          ...prev,
                          propertyName: event.target.value,
                        }))
                      }
                      className="w-full pl-11 pr-4 py-2.5 border border-card-border bg-background text-foreground rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <FilterProperties
                  filters={{
                    selectedTypes: filters.selectedTypes,
                    maxPrice: filters.maxPrice,
                    minRating: filters.minRating,
                    amenities: filters.amenities,
                  }}
                  priceBounds={{ min: 0, max: globalMaxPrice }}
                  propertyTypeOptions={propertyTypeOptions}
                  availableAmenities={amenitiesList.map((a) => a.name)}
                  onChange={handleFilterChange}
                  onReset={handleResetFilters}
                />
              </div>

              <div className="p-4 border-t border-card-border bg-card">
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold transition-colors"
                >
                  Show {hotelCards.length}{" "}
                  {hotelCards.length === 1 ? "property" : "properties"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
