import { SearchBar } from "../../components/searchBar/searchBar";
import HotelCard from "../../components/HotelCard/HotelCard";
import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import Map from "../../components/map/map";
import Tabs from "../../components/filterProperties/tabs/Tabs";
import FilterProperties, {
  PropertyFilters,
} from "../../components/filterProperties/filterProperties/filterProperties";
import { Link, useLocation } from "react-router-dom";
import PageTransition from "../../components/pageTransition/pageTransition";
import { Hotel } from "../../types/hotel";
import { HotelCardData } from "../../types/hotelCard";
import { useSearchHotelsQuery } from "../../store/api/hotelsApi";

type SearchFilters = PropertyFilters & {
  propertyName: string;
};

const getNightlyRate = (hotel: Hotel) => hotel.lowRate ?? hotel.highRate ?? 0;

const toCardData = (hotel: Hotel): HotelCardData => {
  const nightly = getNightlyRate(hotel);
  const total = hotel.highRate ?? nightly;
  const detail = hotel.hotelDetails?.[0];

  return {
    id: hotel.id,
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
    Amenities: detail?.amenities?.slice(0, 3) ?? [
      "Free WiFi",
      "Pool access",
      "Breakfast",
    ],
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
  };
};

export default function SearchResult() {
  // States
  const { search } = useLocation();
  const searchParams = useMemo(() => {
    const params = new URLSearchParams(search);

    return {
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
      maxRate: params.get("maxRate")
        ? Number(params.get("maxRate"))
        : undefined,
      sort: params.get("sort") || undefined,
      page: params.get("page") ? Number(params.get("page")) : 1,
      limit: params.get("limit") ? Number(params.get("limit")) : 20,
    };
  }, [search]);

  const {
    data: hotels = [],
    isLoading,
    error,
  } = useSearchHotelsQuery(searchParams);

  const [activeTab, setActiveTab] = useState("all");
  const [filters, setFilters] = useState<SearchFilters>({
    propertyName: "",
    selectedTypes: [],
    maxPrice: 0,
    minRating: 0,
  });
  const [priceBounds, setPriceBounds] = useState({ min: 0, max: 0 });
  const [propertyTypeOptions, setPropertyTypeOptions] = useState<string[]>([]);
  const [locationFilter, setLocationFilter] = useState("");

  // Effects
  // location from params effect
  useEffect(() => {
    const params = new URLSearchParams(search);
    const locationParam = params.get("location") ?? "";
    setLocationFilter(locationParam);
  }, [search]);

  // Calculate price bounds and property types when hotels data changes
  useEffect(() => {
    if (hotels.length > 0) {
      const nightlyRates = hotels
        .map((hotel) => getNightlyRate(hotel))
        .filter((rate) => rate > 0);

      if (nightlyRates.length) {
        const minRate = Math.min(...nightlyRates);
        const maxRate = Math.max(...nightlyRates);
        setPriceBounds({ min: minRate, max: maxRate });
        setFilters((prev) => ({
          ...prev,
          maxPrice: maxRate,
        }));
      }

      const types = Array.from(
        new Set(hotels.map((hotel) => (hotel.type ?? "hotel").toLowerCase()))
      ).sort();
      setPropertyTypeOptions(types);
    }
  }, [hotels]);

  const filteredHotels = useMemo(() => {
    const normalizedLocation = locationFilter.trim().toLowerCase();
    const normalizedName = filters.propertyName.trim().toLowerCase();

    return hotels.filter((hotel) => {
      const nightlyRate = getNightlyRate(hotel);
      const rating = hotel.tripAdvisorRating ?? hotel.hotelRating ?? 0;
      const type = (hotel.type ?? "hotel").toLowerCase();
      const locationTokens = [
        hotel.city ?? "",
        hotel.stateProvinceCode ?? "",
        hotel.countryCode ?? "",
      ]
        .join(" ")
        .toLowerCase();
      const name = hotel.name.toLowerCase();

      const matchesLocation = true;

      const matchesName = normalizedName ? name.includes(normalizedName) : true;

      const matchesTab =
        activeTab === "all"
          ? true
          : activeTab === "hotels"
          ? type === "hotel" || hotel.propertyCategory === 1
          : type !== "hotel" && hotel.propertyCategory !== 1;

      const matchesType =
        filters.selectedTypes.length > 0
          ? filters.selectedTypes.includes(type)
          : true;

      const maxPrice = filters.maxPrice || priceBounds.max || nightlyRate;
      const matchesPrice = nightlyRate <= maxPrice;
      const matchesRating = rating >= filters.minRating;

      return (
        matchesLocation &&
        matchesName &&
        matchesTab &&
        matchesType &&
        matchesPrice &&
        matchesRating
      );
    });
  }, [
    hotels,
    filters.selectedTypes,
    filters.maxPrice,
    filters.minRating,
    filters.propertyName,
    locationFilter,
    activeTab,
    priceBounds.max,
  ]);

  const hotelCards = useMemo(
    () =>
      filteredHotels.map((hotel) => ({
        hotel,
        card: toCardData(hotel),
      })),
    [filteredHotels]
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
  console.log(filters);
  const mapCenter = mapMarkers.length
    ? {
        latitude: mapMarkers[0].position[0],
        longitude: mapMarkers[0].position[1],
      }
    : undefined;

  const handleFilterChange = (updates: Partial<PropertyFilters>) => {
    setFilters((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  const handleResetFilters = () => {
    setFilters((prev) => ({
      ...prev,
      propertyName: "",
      selectedTypes: [],
      minRating: 0,
      maxPrice: priceBounds.max || prev.maxPrice,
    }));
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50">
        {/* Sticky Search Bar - Fixed for Mobile */}
        <div className="sticky top-0 z-50 bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <SearchBar />
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar - Hidden on Mobile, Visible on Desktop */}
            <aside className="hidden lg:block lg:w-80 flex-shrink-0">
              <div className="bg-white p-6 rounded-2xl border border-gray-200 sticky top-24">
                <Map
                  location={mapCenter}
                  markers={mapMarkers}
                  zoom={11}
                  height="240px"
                  width="100%"
                  scrollWheelZoom={false}
                  className="mb-6 rounded-xl overflow-hidden"
                />

                <div className="w-full my-5 py-5 border-gray-200 border-y">
                  <p className="font-semibold text-lg mb-3">
                    Search by property name
                  </p>
                  <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
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
                      className="w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <FilterProperties
                  filters={{
                    selectedTypes: filters.selectedTypes,
                    maxPrice: filters.maxPrice,
                    minRating: filters.minRating,
                  }}
                  priceBounds={priceBounds}
                  propertyTypeOptions={propertyTypeOptions}
                  onChange={handleFilterChange}
                  onReset={handleResetFilters}
                />
              </div>
            </aside>

            {/* Main Content Section */}
            <section className="flex-1 bg-white p-4 sm:p-6 rounded-2xl border border-gray-200">
              <div className="flex flex-col gap-4 mb-6">
                <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
                <p className="text-sm text-gray-600">
                  Showing {hotelCards.length}{" "}
                  {hotelCards.length === 1 ? "property" : "properties"}
                  {locationFilter ? ` in "${locationFilter}"` : ""}
                </p>
              </div>

              {isLoading && (
                <div className="flex justify-center items-center py-20">
                  <div className="text-gray-600">Loading properties...</div>
                </div>
              )}

              {error && !isLoading && (
                <div className="flex justify-center items-center py-20 text-red-600">
                  {(error as any)?.message || "Failed to load hotels"}
                </div>
              )}

              {!isLoading && !error && hotelCards.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <p className="text-lg font-semibold text-gray-800 mb-2">
                    No properties match these filters
                  </p>
                  <p className="text-sm text-gray-500">
                    Try adjusting your filters or search in a different
                    location.
                  </p>
                </div>
              )}

              <div className="space-y-4">
                {hotelCards.map(({ hotel, card }) => (
                  <Link key={hotel._id} to={`/property/${hotel._id}`}>
                    <HotelCard cardData={card} />
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
