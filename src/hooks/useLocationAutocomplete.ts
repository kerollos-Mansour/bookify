import { useState, useEffect } from "react";
import { useDebounce } from "./useDebounce";
import { LocationSuggestion } from "../types/location.types";
import { API_CONFIG } from "../config/api.config";

const API_BASE_URL = API_CONFIG.BASE_URL;

interface UseLocationAutocompleteResult {
  suggestions: LocationSuggestion[];
  isLoading: boolean;
  error: string | null;
}

/**
 * Hook to fetch location suggestions from backend hotel API
 * Searches hotels and extracts unique cities for autocomplete
 */ export function useLocationAutocomplete(
  query: string
): UseLocationAutocompleteResult {
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (!debouncedQuery || debouncedQuery.length < 2) {
      setSuggestions([]);
      setIsLoading(false);
      return;
    }

    const fetchSuggestions = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({
          search: debouncedQuery, // 🔑 search by name
          limit: "10",
        });

        const response = await fetch(`${API_BASE_URL}/hotels?${params}`);

        if (!response.ok) {
          throw new Error("Failed to fetch suggestions");
        }

        const data = await response.json();
        const hotels = data.data?.hotels || [];

        const uniqueLocations = new Map<string, LocationSuggestion>();

        hotels.forEach((hotel: any) => {
          const city = hotel.location?.city || "";
          const country = hotel.location?.country || "";
          const hotelName = hotel.name || "";

          // Add city
          if (city) {
            const key = `city-${city}-${country}`;
            if (!uniqueLocations.has(key)) {
              uniqueLocations.set(key, {
                id: key,
                type: "city",
                displayName: country ? `${city}, ${country}` : city,
                city,
                country,
              });
            }
          }

          // Add hotel
          if (hotelName) {
            const key = `hotel-${hotelName}-${city}`;
            if (!uniqueLocations.has(key)) {
              uniqueLocations.set(key, {
                id: key,
                type: "hotel",
                displayName: hotelName,
                city,
                country,
                hotelName,
              });
            }
          }
        });

        setSuggestions(Array.from(uniqueLocations.values()));
      } catch (err) {
        console.error("Hotel name autocomplete error:", err);
        setError("Failed to fetch hotels");
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSuggestions();
  }, [debouncedQuery]);

  return { suggestions, isLoading, error };
}
