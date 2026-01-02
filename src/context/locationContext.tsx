import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { UserLocation } from "../types/location.types";
import { detectUserLocation } from "../services/geolocationService";

interface LocationContextType {
  location: UserLocation;
  setLocation: (location: UserLocation) => void;
  isLoading: boolean;
  isSelectorOpen: boolean;
  openSelector: () => void;
  closeSelector: () => void;
}

const LocationContext = createContext<LocationContextType | undefined>(
  undefined
);

const STORAGE_KEY = "userLocation";

export function LocationProvider({ children }: { children: ReactNode }) {
  const [location, setLocationState] = useState<UserLocation>({
    country: "United States",
    countryCode: "US",
    currency: "USD",
    flag: "🇺🇸",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);

  const openSelector = () => setIsSelectorOpen(true);
  const closeSelector = () => setIsSelectorOpen(false);

  useEffect(() => {
    const initializeLocation = async () => {
      try {
        // Check localStorage first
        const cached = localStorage.getItem(STORAGE_KEY);

        if (cached) {
          const parsedLocation = JSON.parse(cached);
          setLocationState(parsedLocation);
          setIsLoading(false);
          return;
        }

        // Auto-detect location
        console.log("Detecting user location...");
        const detected = await detectUserLocation();
        console.log("Detected location:", detected);

        setLocationState(detected);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(detected));
      } catch (error) {
        console.error("Failed to initialize location:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeLocation();
  }, []);

  const setLocation = (newLocation: UserLocation) => {
    setLocationState(newLocation);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newLocation));
    } catch (error) {
      console.error("Failed to save location:", error);
    }
  };

  return (
    <LocationContext.Provider
      value={{
        location,
        setLocation,
        isLoading,
        isSelectorOpen,
        openSelector,
        closeSelector,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);

  if (context === undefined) {
    throw new Error("useLocation must be used within a LocationProvider");
  }

  return context;
}
