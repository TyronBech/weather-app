// Constants for the weather service, including the base URL for the Open-Meteo API and default parameters for fetching weather data.
export const OPEN_METEO_BASE_URL = "https://api.open-meteo.com/v1/forecast";

export const DEFAULT_WEATHER_PARAMS = {
  current:
    "temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m,surface_pressure",
  hourly:
    "temperature_2m,weather_code,relative_humidity_2m,precipitation_probability",
  timezone: "auto",
};
