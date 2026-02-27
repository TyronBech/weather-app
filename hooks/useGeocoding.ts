import { useState } from 'react';
import { searchLocation } from '@/services/geocodingService';
import { GeocodingResult } from '@/types/geocoding';

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
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return { results, loading, error, search };
}