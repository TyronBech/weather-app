// Constants for the weather service, including the base URL for the Open-Meteo API and default parameters for fetching weather data.
export const OPEN_METEO_BASE_URL = 'https://api.open-meteo.com/v1/forecast';

export const DEFAULT_WEATHER_PARAMS = {
  current: 'temperature_2m,weathercode,windspeed_10m,relative_humidity_2m',
  hourly: 'temperature_2m,weathercode',
  timezone: 'auto',
};