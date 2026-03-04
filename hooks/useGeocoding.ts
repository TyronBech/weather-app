import { useState } from 'react';
import { searchLocation } from '@/Services/geocodingService';
import { GeocodingResult } from '@/types/geocoding';

/**
 * Custom hook to manage geocoding functionality, including searching for locations and handling the results.
 * @returns An object containing the search results, loading state, error message, and a function to perform the search.
 */
export function useGeocoding() {
  const [results, setResults] = useState<GeocodingResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function search(query: string) {
    setLoading(true);
    setError(null);
    try {
      const data = await searchLocation(query);
      setResults(data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return { results, loading, error, search };
}