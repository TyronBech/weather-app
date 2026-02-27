import { OPEN_METEO_BASE_URL, DEFAULT_WEATHER_PARAMS } from '@/constants/weather';
import { WeatherResponse } from '@/types/weather';

export async function fetchWeather(
  latitude: number,
  longitude: number
): Promise<WeatherResponse> {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    ...DEFAULT_WEATHER_PARAMS,
  });

  const response = await fetch(`${OPEN_METEO_BASE_URL}?${params}`);

  if (!response.ok) {
    throw new Error(`Weather fetch failed: ${response.status}`);
  }

  const data: WeatherResponse = await response.json();
  return data;
}