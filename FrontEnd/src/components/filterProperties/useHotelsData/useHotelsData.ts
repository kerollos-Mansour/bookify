import axios from "axios";
import { Hotel } from "../../../types/hotel.type";
import { useEffect, useState } from "react";
const API_BASE_URL = "http://localhost:3000/api";

export const useHotelsData = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [priceBounds, setPriceBounds] = useState({ min: 0, max: 0 });
  const [propertyTypeOptions, setPropertyTypeOptions] = useState<string[]>([]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchHotels = async () => {
      try {
        setLoading(true);
        const response = await axios.get<Hotel[]>(`${API_BASE_URL}/hotels`, {
          params: {
            _embed: "hotelDetails",
          },
          signal: controller.signal,
        });

        setHotels(response.data);

        const nightlyRates = response.data
          .map((hotel) => hotel.lowRate ?? hotel.highRate ?? 0)
          .filter((rate) => rate > 0);

        if (nightlyRates.length) {
          const minRate = Math.min(...nightlyRates);
          const maxRate = Math.max(...nightlyRates);
          setPriceBounds({ min: minRate, max: maxRate });
        }

        const types = Array.from(
          new Set(
            response.data.map((hotel) => (hotel.type ?? "hotel").toLowerCase())
          )
        ).sort();
        setPropertyTypeOptions(types);
        setError(null);
      } catch (err) {
        if (!axios.isCancel(err)) {
          const message =
            err instanceof Error ? err.message : "Failed to load data.";
          setError(message);
          console.error("Error loading hotels:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();

    return () => controller.abort();
  }, []);

  return { hotels, loading, error, priceBounds, propertyTypeOptions };
};
