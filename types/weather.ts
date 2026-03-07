// This interface represents the current weather data returned by the Open-Meteo API.
export interface CurrentWeather {
  time: string;
  temperature_2m: number;
  apparent_temperature: number;
  is_day: 0 | 1;
  precipitation: number;
  weather_code: number;
  wind_speed_10m: number;
  relative_humidity_2m: number;
  surface_pressure: number;
}

// This interface represents the hourly weather data returned by the Open-Meteo API.
export interface HourlyWeather {
  time: string[];
  temperature_2m: number[];
  weather_code: number[];
  relative_humidity_2m: number[];
  precipitation_probability: number[];
}

// This is a simplified version of the Open-Meteo API response.
export interface WeatherResponse {
  latitude: number;
  longitude: number;
  timezone: string;
  current: CurrentWeather;
  hourly: HourlyWeather;
}
