// This file defines TypeScript interfaces for the geocoding results returned by the Open-Meteo Geocoding API.
export interface GeocodingResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  country_code: string;
  admin1?: string;
  admin2?: string;
  timezone: string;
}

export interface GeocodingResponse {
  results: GeocodingResult[];
}