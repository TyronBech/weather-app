/**
 * Defines the weather themes used for the dynamic background in the WeatherBackground component.
 * Each theme includes gradient colors, blob colors, and the preferred status bar style.
 */
export interface WeatherTheme {
  gradientColors: string[];
  blobColors: string[];
  statusBarStyle: "light" | "dark";
}

/**
 * A mapping of theme keys to their corresponding WeatherTheme objects.
 * These themes are used to style the background based on the current weather conditions.
 */
export const WEATHER_THEMES: Record<string, WeatherTheme> = {
  // ── Clear Day ─────────────────────────────────────────────────
  clear_day: {
    gradientColors: ["#005BEA", "#0099FF", "#3FA9F5", "#80D0C7"],
    blobColors: [
      "rgba(255, 230, 100, 0.3)",
      "rgba(255, 180, 50, 0.2)",
      "rgba(255, 255, 255, 0.15)",
      "rgba(50, 150, 255, 0.3)",
    ],
    statusBarStyle: "light",
  },

  // ── Clear Night ───────────────────────────────────────────────
  clear_night: {
    gradientColors: ["#0A0F1D", "#151B30", "#212242", "#2B2D4E"],
    blobColors: [
      "rgba(140, 160, 255, 0.25)",
      "rgba(100, 110, 255, 0.15)",
      "rgba(140, 110, 255, 0.1)",
      "rgba(60, 60, 110, 0.2)",
    ],
    statusBarStyle: "light",
  },

  // ── Mostly Clear Day ──────────────────────────────────────────
  mostly_clear_day: {
    gradientColors: ["#0B71DA", "#1E8BE8", "#5AB0F5", "#98CEF5"],
    blobColors: [
      "rgba(255, 240, 150, 0.25)",
      "rgba(255, 200, 100, 0.15)",
      "rgba(255, 255, 255, 0.2)",
      "rgba(80, 160, 255, 0.25)",
    ],
    statusBarStyle: "light",
  },

  // ── Mostly Clear Night ────────────────────────────────────────
  mostly_clear_night: {
    gradientColors: ["#0B1224", "#182038", "#232647", "#2D3054"],
    blobColors: [
      "rgba(150, 170, 255, 0.2)",
      "rgba(110, 120, 255, 0.15)",
      "rgba(150, 120, 255, 0.1)",
      "rgba(70, 70, 120, 0.15)",
    ],
    statusBarStyle: "light",
  },

  // ── Mostly / Partly Cloudy Day ────────────────────────────────
  partly_cloudy_day: {
    gradientColors: ["#1976D2", "#42A5F5", "#90CAF9", "#E3F2FD"],
    blobColors: [
      "rgba(255, 255, 255, 0.3)",
      "rgba(200, 230, 255, 0.2)",
      "rgba(150, 210, 255, 0.25)",
      "rgba(100, 180, 255, 0.2)",
    ],
    statusBarStyle: "light",
  },

  // ── Mostly / Partly Cloudy Night ─────────────────────────────
  partly_cloudy_night: {
    gradientColors: ["#111422", "#192036", "#262945", "#333552"],
    blobColors: [
      "rgba(170, 180, 230, 0.15)",
      "rgba(120, 130, 210, 0.1)",
      "rgba(90, 95, 160, 0.15)",
      "rgba(180, 170, 230, 0.05)",
    ],
    statusBarStyle: "light",
  },

  // ── Sunrise ──────────────────────────────────────────────────
  sunrise: {
    gradientColors: ["#2d4263", "#746b89", "#c68b8e", "#f3b999"],
    blobColors: [
      "rgba(255, 150, 100, 0.3)",
      "rgba(255, 200, 150, 0.4)",
      "rgba(200, 100, 150, 0.25)",
      "rgba(240, 220, 180, 0.3)",
    ],
    statusBarStyle: "light",
  },

  // ── Sunset ───────────────────────────────────────────────────
  sunset: {
    gradientColors: ["#121620", "#4B3654", "#8A4C62", "#D87A6E"],
    blobColors: [
      "rgba(255, 100, 80, 0.3)",
      "rgba(200, 60, 100, 0.35)",
      "rgba(150, 50, 100, 0.25)",
      "rgba(255, 160, 100, 0.2)",
    ],
    statusBarStyle: "light",
  },

  // ── Overcast ──────────────────────────────────────────────────
  cloudy: {
    gradientColors: ["#4E5B68", "#687785", "#8997A5", "#A5B2BD"],
    blobColors: [
      "rgba(220, 230, 240, 0.2)",
      "rgba(200, 210, 220, 0.15)",
      "rgba(180, 190, 200, 0.15)",
      "rgba(150, 160, 170, 0.1)",
    ],
    statusBarStyle: "light",
  },

  // ── Fog / Haze ────────────────────────────────────────────────
  fog: {
    gradientColors: ["#697682", "#8694A0", "#A9B4BE", "#C6CFD6"],
    blobColors: [
      "rgba(240, 245, 250, 0.3)",
      "rgba(210, 220, 230, 0.2)",
      "rgba(190, 200, 210, 0.2)",
      "rgba(255, 255, 255, 0.15)",
    ],
    statusBarStyle: "dark",
  },

  // ── Drizzle ───────────────────────────────────────────────────
  drizzle: {
    gradientColors: ["#324C65", "#486A89", "#638BAA", "#83A6C2"],
    blobColors: [
      "rgba(150, 200, 240, 0.25)",
      "rgba(120, 180, 220, 0.15)",
      "rgba(100, 160, 200, 0.15)",
      "rgba(80, 140, 180, 0.1)",
    ],
    statusBarStyle: "light",
  },

  // ── Rain ──────────────────────────────────────────────────────
  rain: {
    gradientColors: ["#1C334A", "#294867", "#385F85", "#4E779E"],
    blobColors: [
      "rgba(100, 160, 220, 0.2)",
      "rgba(80, 140, 200, 0.15)",
      "rgba(60, 110, 170, 0.2)",
      "rgba(40, 90, 150, 0.1)",
    ],
    statusBarStyle: "light",
  },

  // ── Heavy Rain ────────────────────────────────────────────────
  heavy_rain: {
    gradientColors: ["#122030", "#1C3048", "#264261", "#34557A"],
    blobColors: [
      "rgba(80, 130, 190, 0.2)",
      "rgba(60, 100, 160, 0.15)",
      "rgba(50, 90, 140, 0.15)",
      "rgba(30, 70, 120, 0.1)",
    ],
    statusBarStyle: "light",
  },

  // ── Showers ───────────────────────────────────────────────────
  showers: {
    gradientColors: ["#234B70", "#33618A", "#4B7DA8", "#6499C4"],
    blobColors: [
      "rgba(120, 180, 240, 0.2)",
      "rgba(100, 160, 220, 0.15)",
      "rgba(80, 130, 190, 0.2)",
      "rgba(50, 100, 160, 0.1)",
    ],
    statusBarStyle: "light",
  },

  // ── Freezing Rain ─────────────────────────────────────────────
  freezing_rain: {
    gradientColors: ["#233040", "#314559", "#445C73", "#5C7891"],
    blobColors: [
      "rgba(180, 210, 230, 0.2)",
      "rgba(150, 180, 210, 0.15)",
      "rgba(130, 160, 190, 0.15)",
      "rgba(110, 140, 170, 0.1)",
    ],
    statusBarStyle: "light",
  },

  // ── Snow ──────────────────────────────────────────────────────
  snow: {
    gradientColors: ["#3A5070", "#5B7699", "#8CA8C2", "#BBCFE0"],
    blobColors: [
      "rgba(255, 255, 255, 0.3)",
      "rgba(230, 240, 255, 0.25)",
      "rgba(200, 220, 245, 0.2)",
      "rgba(180, 200, 230, 0.15)",
    ],
    statusBarStyle: "light",
  },

  // ── Heavy Snow ────────────────────────────────────────────────
  heavy_snow: {
    gradientColors: ["#2B3B52", "#445A77", "#6A84A1", "#96AFCC"],
    blobColors: [
      "rgba(230, 240, 255, 0.3)",
      "rgba(200, 220, 245, 0.25)",
      "rgba(180, 200, 230, 0.2)",
      "rgba(150, 180, 210, 0.15)",
    ],
    statusBarStyle: "light",
  },

  // ── Thunderstorm ──────────────────────────────────────────────
  thunderstorm: {
    gradientColors: ["#131022", "#221F38", "#342D52", "#4B426D"],
    blobColors: [
      "rgba(150, 100, 255, 0.25)",
      "rgba(100, 80, 220, 0.15)",
      "rgba(255, 230, 100, 0.1)",
      "rgba(120, 60, 200, 0.2)",
    ],
    statusBarStyle: "light",
  },

  // ── Heavy Thunderstorm / Hail ─────────────────────────────────
  heavy_thunderstorm: {
    gradientColors: ["#0B0914", "#151224", "#241D3A", "#352B52"],
    blobColors: [
      "rgba(255, 200, 100, 0.15)",
      "rgba(120, 90, 240, 0.2)",
      "rgba(80, 60, 180, 0.15)",
      "rgba(200, 220, 240, 0.1)",
    ],
    statusBarStyle: "light",
  },

  // ── Sleet / Hail ──────────────────────────────────────────────
  sleet: {
    gradientColors: ["#303D4F", "#46566B", "#607289", "#7F91A8"],
    blobColors: [
      "rgba(200, 210, 230, 0.2)",
      "rgba(170, 190, 210, 0.15)",
      "rgba(150, 170, 190, 0.15)",
      "rgba(130, 150, 170, 0.1)",
    ],
    statusBarStyle: "light",
  },

  // ── Fallback ──────────────────────────────────────────────────
  default: {
    gradientColors: ["#10252E", "#1C3A47", "#2E5463", "#437385"],
    blobColors: [
      "rgba(120, 190, 255, 0.15)",
      "rgba(90, 150, 230, 0.1)",
      "rgba(60, 120, 200, 0.1)",
      "rgba(40, 90, 170, 0.08)",
    ],
    statusBarStyle: "light",
  },
};

// ── Maps WMO weatherCode + isDay → a theme key ────────────────
export function getWeatherThemeKey(
  weatherCode: number,
  isDay: 0 | 1,
  currentTime?: string,
): string {
  const night = isDay === 0;

  // Check for sunrise and sunset times (around 5–6 AM and 4–5 PM)
  if (currentTime && weatherCode <= 2) {
    // Open-Meteo times are local to the forecast location and may be offset-less,
    // so avoid `new Date()` (which would interpret them in the device timezone).
    // Instead, parse the hour directly from the timestamp string (e.g. "YYYY-MM-DDTHH:MM").
    const timeSeparatorIndex =
      currentTime.indexOf("T") !== -1
        ? currentTime.indexOf("T")
        : currentTime.indexOf(" ");
    let hour = NaN;
    if (
      timeSeparatorIndex !== -1 &&
      currentTime.length > timeSeparatorIndex + 2
    ) {
      const hourString = currentTime.substring(
        timeSeparatorIndex + 1,
        timeSeparatorIndex + 3,
      );
      hour = parseInt(hourString, 10);
    }
    if (!Number.isNaN(hour)) {
      // Sunrise window: 5–6 AM (05:XX–06:XX)
      if (hour === 5 || hour === 6) return "sunrise";
      // Sunset window: 4–5 PM (16:XX–17:XX)
      if (hour === 16 || hour === 17) return "sunset";
    }
  }

  if (weatherCode === 0) return night ? "clear_night" : "clear_day";
  if (weatherCode === 1)
    return night ? "mostly_clear_night" : "mostly_clear_day";
  if (weatherCode === 2)
    return night ? "partly_cloudy_night" : "partly_cloudy_day";
  if (weatherCode === 3) return "cloudy";
  if (weatherCode <= 48) return "fog";

  if (weatherCode <= 55) return "drizzle";
  if (weatherCode <= 57) return "sleet"; // Freezing drizzle

  if (weatherCode < 61) return "drizzle"; // Light rain (61 is treated as rain)
  if (weatherCode <= 63) return "rain"; // Moderate rain (includes 61: light rain and 63: moderate rain)
  if (weatherCode === 65) return "heavy_rain";
  if (weatherCode <= 67) return "freezing_rain";

  if (weatherCode <= 73) return "snow"; // Light/Moderate snow
  if (weatherCode === 75) return "heavy_snow";
  if (weatherCode === 77) return "snow"; // Snow grains

  if (weatherCode <= 81) return "showers"; // Light/Moderate showers
  if (weatherCode === 82) return "heavy_rain"; // Heavy showers
  if (weatherCode <= 86) return "snow"; // Snow showers

  if (weatherCode === 95) return "thunderstorm";
  if (weatherCode >= 96) return "heavy_thunderstorm";

  return "default";
}
