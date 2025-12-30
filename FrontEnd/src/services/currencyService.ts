// Currency conversion service using free exchangerate-api.com
const CACHE_KEY = "exchangeRates";
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

interface ExchangeRates {
  base: string;
  rates: Record<string, number>;
  timestamp: number;
}

interface CachedRates extends ExchangeRates {
  cachedAt: number;
}

const BASE_CURRENCY = "USD";

/**
 * Fetch exchange rates from API
 * Using exchangerate-api.com (1,500 free requests/month)
 */
const fetchExchangeRates = async (): Promise<ExchangeRates> => {
  try {
    // Note: This uses the free tier without API key
    // For production, sign up at exchangerate-api.com and use your key
    const API_KEY = import.meta.env?.VITE_EXCHANGE_RATE_API_KEY;

    const url = API_KEY
      ? `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${BASE_CURRENCY}`
      : `https://api.exchangerate-api.com/v4/latest/${BASE_CURRENCY}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch exchange rates");
    }

    const data = await response.json();

    return {
      base: BASE_CURRENCY,
      rates: data.rates || data.conversion_rates,
      timestamp: Date.now(),
    };
  } catch (error) {
    console.error("Currency fetch failed:", error);
    // Return default rates (1:1) as fallback
    return {
      base: BASE_CURRENCY,
      rates: { USD: 1, EUR: 0.85, GBP: 0.73, EGP: 30.9 },
      timestamp: Date.now(),
    };
  }
};

/**
 * Get exchange rates from cache or fetch new ones
 */
const getExchangeRates = async (): Promise<ExchangeRates> => {
  if (typeof window === "undefined") {
    return fetchExchangeRates();
  }

  const cached = localStorage.getItem(CACHE_KEY);

  if (cached) {
    try {
      const cachedRates: CachedRates = JSON.parse(cached);
      const age = Date.now() - cachedRates.cachedAt;

      // Use cached rates if less than 24 hours old
      if (age < CACHE_DURATION) {
        return cachedRates;
      }
    } catch (error) {
      console.error("Failed to parse cached rates:", error);
    }
  }

  // Fetch new rates
  const rates = await fetchExchangeRates();
  const cachedData: CachedRates = {
    ...rates,
    cachedAt: Date.now(),
  };

  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(cachedData));
  } catch (error) {
    console.error("Failed to cache exchange rates:", error);
  }

  return rates;
};

/**
 * Convert amount from base currency (USD) to target currency
 */
export const convertCurrency = async (
  amount: number,
  targetCurrency: string
): Promise<number> => {
  if (targetCurrency === BASE_CURRENCY) {
    return amount;
  }

  const rates = await getExchangeRates();
  const rate = rates.rates[targetCurrency];

  if (!rate) {
    console.warn(`Exchange rate for ${targetCurrency} not found, using base`);
    return amount;
  }

  return amount * rate;
};

/**
 * Format price with currency symbol
 */
export const formatPrice = (amount: number, currency: string): string => {
  const currencySymbols: Record<string, string> = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    EGP: "E£",
    AED: "AED",
    SAR: "SAR",
  };

  const symbol = currencySymbols[currency] || currency;
  return `${symbol}${amount.toFixed(2)}`;
};

/**
 * Clear cached exchange rates (useful for testing)
 */
export const clearRatesCache = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(CACHE_KEY);
  }
};
