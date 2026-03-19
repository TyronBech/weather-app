import { fetchWeather } from "@/services/weatherService";
import { WeatherResponse } from "@/types/weather";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 *  Custom hook to fetch weather data based on latitude and longitude. It manages the loading state, error handling, and stores the fetched weather data.
 * @param latitude
 * @param longitude
 * @returns
 */
export function useWeather(latitude: number | null, longitude: number | null) {
  const [data, setData] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isMountedRef = useRef(true);
  const requestIdRef = useRef(0);

  const refetch = useCallback(
    async (nextLatitude = latitude, nextLongitude = longitude) => {
      const currentRequestId = ++requestIdRef.current;

      if (nextLatitude == null || nextLongitude == null) {
        if (isMountedRef.current && currentRequestId === requestIdRef.current) {
          setData(null);
          setLoading(false);
          setError(null);
        }
        return;
      }

      if (isMountedRef.current && currentRequestId === requestIdRef.current) {
        setLoading(true);
        setError(null);
      }

      try {
        const result = await fetchWeather(nextLatitude, nextLongitude);
        if (isMountedRef.current && currentRequestId === requestIdRef.current) {
          setData(result);
        }
      } catch (err) {
        if (isMountedRef.current && currentRequestId === requestIdRef.current) {
          setError(err instanceof Error ? err.message : String(err));
        }
      } finally {
        if (isMountedRef.current && currentRequestId === requestIdRef.current) {
          setLoading(false);
        }
      }
    },
    [latitude, longitude],
  );

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  return { data, loading, error, refetch };
}
