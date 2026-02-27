export interface CurrentWeather {
  time: string;
  temperature_2m: number;
  weathercode: number;
  windspeed_10m: number;
  relative_humidity_2m: number;
}

export interface HourlyWeather {
  time: string[];
  temperature_2m: number[];
  weathercode: number[];
}

export interface WeatherResponse {
  latitude: number;
  longitude: number;
  timezone: string;
  current: CurrentWeather;
  hourly: HourlyWeather;
}