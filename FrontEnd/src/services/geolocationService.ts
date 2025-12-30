// Free geolocation service using IP-based detection
export interface GeolocationData {
  country: string;
  countryCode: string;
  currency: string;
  flag: string;
}

const FALLBACK_LOCATION: GeolocationData = {
  country: "United States",
  countryCode: "US",
  currency: "USD",
  flag: "🇺🇸",
};

// Country code to flag emoji
const getFlagEmoji = (countryCode: string): string => {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

/**
 * Detect user location using free IP geolocation
 * Primary: ipapi.co (1,000 requests/day, no key)
 * Fallback: ip-api.com (completely free, 45 req/min)
 */
export const detectUserLocation = async (): Promise<GeolocationData> => {
  try {
    // Try primary service: ipapi.co
    const response = await fetch("https://ipapi.co/json/");

    if (response.ok) {
      const data = await response.json();

      return {
        country: data.country_name || FALLBACK_LOCATION.country,
        countryCode: data.country_code || FALLBACK_LOCATION.countryCode,
        currency: data.currency || FALLBACK_LOCATION.currency,
        flag: getFlagEmoji(data.country_code || FALLBACK_LOCATION.countryCode),
      };
    }

    // Fallback to ip-api.com
    const fallbackResponse = await fetch("http://ip-api.com/json/");

    if (fallbackResponse.ok) {
      const data = await fallbackResponse.json();

      return {
        country: data.country || FALLBACK_LOCATION.country,
        countryCode: data.countryCode || FALLBACK_LOCATION.countryCode,
        currency: data.currency || FALLBACK_LOCATION.currency,
        flag: getFlagEmoji(data.countryCode || FALLBACK_LOCATION.countryCode),
      };
    }

    console.warn("Geolocation services unavailable, using fallback");
    return FALLBACK_LOCATION;
  } catch (error) {
    console.error("Geolocation detection failed:", error);
    return FALLBACK_LOCATION;
  }
};
