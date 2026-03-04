// This interface represents the current weather data returned by the Open-Meteo API.
export interface CurrentWeather {
  time: string;
  temperature_2m: number;
  weathercode: number;
  windspeed_10m: number;
  relative_humidity_2m: number;
}

// This interface represents the hourly weather data returned by the Open-Meteo API.
export interface HourlyWeather {
  time: string[];
  temperature_2m: number[];
  weathercode: number[];
}

// This is a simplified version of the Open-Meteo API response.
export interface WeatherResponse {
  latitude: number;
  longitude: number;
  timezone: string;
  current: CurrentWeather;
  hourly: HourlyWeather;
}