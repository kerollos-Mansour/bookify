export interface VisitedHotel {
  id: string;
  title: string;
  image: string;
  rating?: number;
  address?: string;
  price?: number;
  bestSeller?: boolean;
  vip?: boolean;
  reviewCount?: number;
}

const STORAGE_KEY = "visitedHotels";

export const visitedStorage = {
  get: (): VisitedHotel[] => {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  },

  add: (hotel: VisitedHotel) => {
    if (typeof window === "undefined") return;
    const current = visitedStorage.get();
    // to avoid duplicates
    const exists = current.some((p) => p.id === hotel.id);
    if (!exists) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([hotel, ...current]));
    }
  },

  clear: () => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(STORAGE_KEY);
  },
};

export interface VisitedSearch {
  id: string; // unique ID or timestamp
  location: string;
  checkIn: string;
  checkOut: string;
  travelers: number;
  rooms: number;
  timestamp: number;
}

const SEARCH_STORAGE_KEY = "recentSearches";

export const searchStorage = {
  get: (): VisitedSearch[] => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem(SEARCH_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error("Error reading recent searches", e);
      return [];
    }
  },

  add: (search: Omit<VisitedSearch, "id" | "timestamp">) => {
    if (typeof window === "undefined") return;
    try {
      const current = searchStorage.get();
      const newSearch: VisitedSearch = {
        ...search,
        id: Date.now().toString(),
        timestamp: Date.now(),
      };

      // Remove duplicates (same location, checkIn, checkOut) to keep list clean
      const filtered = current.filter(
        (s) =>
          !(
            s.location === search.location &&
            s.checkIn === search.checkIn &&
            s.checkOut === search.checkOut
          )
      );

      // Keep only last 10 searches
      const updated = [newSearch, ...filtered].slice(0, 10);

      localStorage.setItem(SEARCH_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error("Error saving recent search", e);
    }
  },

  remove: (id: string) => {
    if (typeof window === "undefined") return;
    try {
      const current = searchStorage.get();
      const updated = current.filter((s) => s.id !== id);
      localStorage.setItem(SEARCH_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error("Error removing search", e);
    }
  },

  clear: () => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(SEARCH_STORAGE_KEY);
  },
};
