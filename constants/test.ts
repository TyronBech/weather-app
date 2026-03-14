import { TestScenario } from "@/types/weatherTypes";

/**
 * Array of test scenarios for the WeatherCard component.
 */
export const TEST_SCENARIOS = [
  { label: "Reset (Real Weather)", code: null, isDay: null, time: null },
  { label: "Clear Day", code: 0, isDay: 1, time: "2024-01-01T12:00" },
  { label: "Clear Night", code: 0, isDay: 0, time: "2024-01-01T23:00" },
  { label: "Mostly Clear Day", code: 1, isDay: 1, time: "2024-01-01T12:00" },
  { label: "Mostly Clear Night", code: 1, isDay: 0, time: "2024-01-01T23:00" },
  { label: "Partly Cloudy Day", code: 2, isDay: 1, time: "2024-01-01T12:00" },
  { label: "Partly Cloudy Night", code: 2, isDay: 0, time: "2024-01-01T23:00" },
  { label: "Sunrise", code: 0, isDay: 1, time: "2024-01-01T06:00" },
  { label: "Sunset", code: 0, isDay: 1, time: "2024-01-01T17:00" },
  { label: "Overcast", code: 3, isDay: 1, time: "2024-01-01T12:00" },
  { label: "Fog", code: 45, isDay: 1, time: "2024-01-01T12:00" },
  { label: "Drizzle", code: 51, isDay: 1, time: "2024-01-01T12:00" },
  { label: "Freezing Drizzle", code: 56, isDay: 1, time: "2024-01-01T12:00" },
  { label: "Rain", code: 63, isDay: 1, time: "2024-01-01T12:00" },
  { label: "Heavy Rain", code: 65, isDay: 1, time: "2024-01-01T12:00" },
  { label: "Freezing Rain", code: 66, isDay: 1, time: "2024-01-01T12:00" },
  { label: "Showers", code: 80, isDay: 1, time: "2024-01-01T12:00" },
  { label: "Snow", code: 71, isDay: 1, time: "2024-01-01T12:00" },
  { label: "Heavy Snow", code: 75, isDay: 1, time: "2024-01-01T12:00" },
  { label: "Thunderstorm", code: 95, isDay: 1, time: "2024-01-01T12:00" },
  { label: "Heavy Thunderstorm", code: 96, isDay: 1, time: "2024-01-01T12:00" },
] as const satisfies readonly TestScenario[];