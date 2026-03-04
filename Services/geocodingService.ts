import { GEOCODING_BASE_URL } from '@/constants/geocoding';
import { GeocodingResponse, GeocodingResult } from '@/types/geocoding';

/**
 * Searches for a location based on the provided query string. 
 * It sends a request to the Open-Meteo Geocoding API and returns an array of matching geocoding results, 
 * which include details like latitude, longitude, country, and timezone.
 * @param query 
 * @returns 
 */
export async function searchLocation(query: string): Promise<GeocodingResult[]> {
  const params = new URLSearchParams({
    name: query,
    count: '5',
    language: 'en',
    format: 'json',
  });

  const response = await fetch(`${GEOCODING_BASE_URL}?${params}`);

  if (!response.ok) {
    throw new Error(`Geocoding failed: ${response.status}`);
  }

  const data: GeocodingResponse = await response.json();
  return data.results ?? []; // returns empty array if no results
}