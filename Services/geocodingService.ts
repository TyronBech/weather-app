import { GEOCODING_BASE_URL } from '@/constants/geocoding';
import { GeocodingResponse, GeocodingResult } from '@/types/geocoding';

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