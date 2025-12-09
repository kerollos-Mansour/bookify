import { Hotel } from "../types/hotel";
import { PropertyFilters } from "../components/filterProperties/filterProperties/filterProperties";
import { useMemo } from "react";

type SearchFilters = PropertyFilters & {
  propertyName: string;
};

const getNightRate = (hotel: Hotel) => hotel.lowRate ?? hotel.highRate ?? 0;

export const useHotelsFilter = (
  hotels: Hotel[],
  filters: SearchFilters,
  locationFilter: string,
  activeTab: string,
  maxPriceBound:number
) => {
    return useMemo(() => {
        const normalizedLocation = locationFilter.trim().toLowerCase();
        const normalizedName = filters.propertyName.trim().toLowerCase();
    
        return hotels.filter((hotel) => {
          const nightlyRate = getNightRate(hotel);
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
    
          const matchesLocation = normalizedLocation
            ? locationTokens.includes(normalizedLocation) ||
              name.includes(normalizedLocation)
            : true;
    
          const matchesName = normalizedName
            ? name.includes(normalizedName)
            : true;
    
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
    
          const maxPrice = filters.maxPrice || maxPriceBound || nightlyRate;
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
        maxPriceBound,
      ]);
    };
