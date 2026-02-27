export const OPEN_METEO_BASE_URL = 'https://api.open-meteo.com/v1/forecast';

export const DEFAULT_WEATHER_PARAMS = {
  current: 'temperature_2m,weathercode,windspeed_10m,relative_humidity_2m',
  hourly: 'temperature_2m,weathercode',
  timezone: 'auto', // auto-detects based on coordinates
};