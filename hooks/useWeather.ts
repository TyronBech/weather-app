import { useState, useEffect } from 'react';
import { fetchWeather } from '@/services/weatherService';
import { WeatherResponse } from '../types/weather';

export function useWeather(latitude: number, longitude: number) {
  const [data, setData] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchWeather(latitude, longitude)
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [latitude, longitude]);

  return { data, loading, error };
}