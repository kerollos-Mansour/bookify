import { useState } from "react";
import { X, Globe, Search } from "lucide-react";
import { useLocation } from "../../context/locationContext";
import { UserLocation } from "../../types/location.types";

interface LocationSelectorProps {
  isOpen: boolean;
  onClose: () => void;
}

// Popular countries with their currency
const POPULAR_COUNTRIES: UserLocation[] = [
  { country: "United States", countryCode: "US", currency: "USD", flag: "🇺🇸" },
  { country: "United Kingdom", countryCode: "GB", currency: "GBP", flag: "🇬🇧" },
  { country: "Egypt", countryCode: "EG", currency: "EGP", flag: "🇪🇬" },
  { country: "Saudi Arabia", countryCode: "SA", currency: "SAR", flag: "🇸🇦" },
  {
    country: "United Arab Emirates",
    countryCode: "AE",
    currency: "AED",
    flag: "🇦🇪",
  },
  { country: "Canada", countryCode: "CA", currency: "CAD", flag: "🇨🇦" },
  { country: "Australia", countryCode: "AU", currency: "AUD", flag: "🇦🇺" },
  { country: "Germany", countryCode: "DE", currency: "EUR", flag: "🇩🇪" },
  { country: "France", countryCode: "FR", currency: "EUR", flag: "🇫🇷" },
  { country: "Japan", countryCode: "JP", currency: "JPY", flag: "🇯🇵" },
];

export function LocationSelector({ isOpen, onClose }: LocationSelectorProps) {
  const { location: currentLocation, setLocation } = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSelectLocation = (location: UserLocation) => {
    setLocation(location);
    onClose();
  };

  const filteredCountries = POPULAR_COUNTRIES.filter(
    (country) =>
      country.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.currency.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <>
      {/* Modal - Wrapper handles backdrop click */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <div
          className="bg-card rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-card-border">
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-muted-foreground" />
              <h2 className="text-xl font-semibold text-card-foreground">
                Select your location
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-full transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {/* Search */}
          <div className="p-4 border-b border-card-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search country or currency..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-background border border-card-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>

          {/* Countries List */}
          <div className="overflow-y-auto max-h-[400px] p-4">
            <div className="space-y-1">
              {filteredCountries.length > 0 ? (
                filteredCountries.map((country) => (
                  <button
                    key={country.countryCode}
                    onClick={() => handleSelectLocation(country)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                      currentLocation.countryCode === country.countryCode
                        ? "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
                        : "hover:bg-muted"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{country.flag}</span>
                      <div className="text-left">
                        <div className="font-medium text-card-foreground">
                          {country.country}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {country.currency}
                        </div>
                      </div>
                    </div>
                    {currentLocation.countryCode === country.countryCode && (
                      <div className="w-2 h-2 bg-blue-600 rounded-full" />
                    )}
                  </button>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No countries found
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
