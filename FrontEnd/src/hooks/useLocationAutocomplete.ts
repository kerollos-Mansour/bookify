import { useState, useEffect } from "react";
import { useDebounce } from "./useDebounce";
import { LocationSuggestion } from "../types/location.types";

const API_BASE_URL =
  import.meta.env?.VITE_API_BASE_URL || "http://localhost:3000/api/v1";

interface UseLocationAutocompleteResult {
  suggestions: LocationSuggestion[];
  isLoading: boolean;
  error: string | null;
}

/**
 * Hook to fetch location suggestions from backend hotel API
 * Searches hotels and extracts unique cities for autocomplete
 */
export function useLocationAutocomplete(
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
          location: debouncedQuery,
          limit: "10",
        });

        const response = await fetch(`${API_BASE_URL}/hotel?${params}`);

        if (!response.ok) {
          throw new Error("Failed to fetch suggestions");
        }

        const data = await response.json();
        const hotels = data.data?.hotels || [];

        // Extract unique cities from hotels
        const uniqueLocations = new Map<string, LocationSuggestion>();

        hotels.forEach((hotel: any) => {
          const city = hotel.location?.city;
          const country = hotel.location?.country || "";

          if (city) {
            const key = `${city}-${country}`;

            if (!uniqueLocations.has(key)) {
              uniqueLocations.set(key, {
                id: key,
                displayName: country ? `${city}, ${country}` : city,
                city: city,
                country: country,
              });
            }
          }
        });

        setSuggestions(Array.from(uniqueLocations.values()));
      } catch (err) {
        console.error("Location autocomplete error:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch");
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSuggestions();
  }, [debouncedQuery]);

  return { suggestions, isLoading, error };
}
