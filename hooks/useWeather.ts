import { fetchWeather } from "@/Services/weatherService";
import { WeatherResponse } from "@/types/weather";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    if (latitude == null || longitude == null) {
      setData(null);
      setLoading(false);
      setError(null);
      return;
    }

    let didCancel = false;

    setLoading(true);
    setError(null);
    fetchWeather(latitude, longitude)
      .then((result) => {
        if (!didCancel) setData(result);
      })
      .catch((err) => {
        if (!didCancel)
          setError(err instanceof Error ? err.message : String(err));
      })
      .finally(() => {
        if (!didCancel) setLoading(false);
      });

    return () => {
      didCancel = true;
    };
  }, [latitude, longitude]);

  return { data, loading, error };
}
