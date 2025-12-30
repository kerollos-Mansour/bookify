export interface VisitedHotel {
  id: string;
  title: string;
  image: string;
  rating?: number;
  address?: string;
  price?: number;
  bestSeller?: boolean;
  reviewCount?: number;
}

const STORAGE_KEY = "visitedHotels";

export const visitedStorage = {
  get: (): VisitedHotel[] => {
    if (typeof window === "undefined") 
        return [];
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  },

  add: (hotel: VisitedHotel) => {
    if (typeof window === "undefined") 
        return;
    const current = visitedStorage.get();
    // to avoid duplicates
    const exists = current.some((p) => p.id === hotel.id);
    if (!exists) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify([hotel, ...current])
      );
    }
  },

  clear: () => {
    if (typeof window === "undefined")
        return;
    localStorage.removeItem(STORAGE_KEY);
  },
};
