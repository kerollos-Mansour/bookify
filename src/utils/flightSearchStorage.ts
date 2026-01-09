export interface VisitedFlightSearch {
  id: string; // unique ID or timestamp
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  passengers: number;
  classOfService: string;
  timestamp: number;
}

const FLIGHT_SEARCH_STORAGE_KEY = "recentFlightSearches";

export const flightSearchStorage = {
  get: (): VisitedFlightSearch[] => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem(FLIGHT_SEARCH_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error("Error reading recent flight searches", e);
      return [];
    }
  },

  add: (search: Omit<VisitedFlightSearch, "id" | "timestamp">) => {
    if (typeof window === "undefined") return;
    try {
      const current = flightSearchStorage.get();
      const newSearch: VisitedFlightSearch = {
        ...search,
        id: Date.now().toString(),
        timestamp: Date.now(),
      };

      // Remove duplicates (same origin, destination, dates)
      const filtered = current.filter(
        (s) =>
          !(
            s.origin === search.origin &&
            s.destination === search.destination &&
            s.departureDate === search.departureDate &&
            s.returnDate === search.returnDate
          )
      );

      // Keep only last 10 searches
      const updated = [newSearch, ...filtered].slice(0, 10);

      localStorage.setItem(FLIGHT_SEARCH_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error("Error saving recent flight search", e);
    }
  },

  remove: (id: string) => {
    if (typeof window === "undefined") return;
    try {
      const current = flightSearchStorage.get();
      const updated = current.filter((s) => s.id !== id);
      localStorage.setItem(FLIGHT_SEARCH_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error("Error removing flight search", e);
    }
  },

  clear: () => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(FLIGHT_SEARCH_STORAGE_KEY);
  },
};
