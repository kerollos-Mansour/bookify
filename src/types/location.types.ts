export interface UserLocation {
  country: string;
  countryCode: string;
  currency: string;
  flag: string;
}

export interface LocationSuggestion {
  id: string;
  displayName: string;
  city: string;
  country?: string;
}
