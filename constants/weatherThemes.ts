/**
 * Defines the weather themes used for the dynamic background in the WeatherBackground component.
 * Each theme includes gradient colors, blob colors, and the preferred status bar style.
 */
export interface WeatherTheme {
  gradientColors: string[];
  blobColors: string[];
  statusBarStyle: 'light' | 'dark';
}

/**
 * A mapping of theme keys to their corresponding WeatherTheme objects. 
 * These themes are used to style the background based on the current weather conditions.
 */
export const WEATHER_THEMES: Record<string, WeatherTheme> = {
  // ── Clear Day ─────────────────────────────────────────────────
  clear_day: {
    gradientColors: ['#1a6bbd', '#2e8fe0', '#74c3f7'],
    blobColors:     ['rgba(255, 220, 80, 0.25)', 'rgba(255, 180, 40, 0.15)'],
    statusBarStyle: 'light',
  },

  // ── Clear Night ───────────────────────────────────────────────
  clear_night: {
    gradientColors: ['#0a0e27', '#0f1f4a', '#1a2d6b'],
    blobColors:     ['rgba(160, 180, 255, 0.15)', 'rgba(100, 120, 255, 0.1)'],
    statusBarStyle: 'light',
  },

  // ── Mostly / Partly Cloudy Day ────────────────────────────────
  partly_cloudy_day: {
    gradientColors: ['#1e6fa8', '#3a8fbf', '#89c4e1'],
    blobColors:     ['rgba(255, 255, 255, 0.2)', 'rgba(180, 220, 255, 0.15)'],
    statusBarStyle: 'light',
  },

  // ── Mostly / Partly Cloudy Night ─────────────────────────────
  partly_cloudy_night: {
    gradientColors: ['#111827', '#1f2e45', '#243550'],
    blobColors:     ['rgba(150, 170, 220, 0.12)', 'rgba(100, 130, 200, 0.08)'],
    statusBarStyle: 'light',
  },

  // ── Overcast ──────────────────────────────────────────────────
  cloudy: {
    gradientColors: ['#3d4f5e', '#546070', '#7a8a96'],
    blobColors:     ['rgba(200, 210, 220, 0.15)', 'rgba(180, 190, 200, 0.1)'],
    statusBarStyle: 'light',
  },

  // ── Fog / Haze ────────────────────────────────────────────────
  fog: {
    gradientColors: ['#5a6470', '#7a8490', '#a0aab0'],
    blobColors:     ['rgba(220, 225, 230, 0.25)', 'rgba(200, 205, 210, 0.2)'],
    statusBarStyle: 'dark',
  },

  // ── Drizzle ───────────────────────────────────────────────────
  drizzle: {
    gradientColors: ['#2c4a6a', '#3d6080', '#5580a0'],
    blobColors:     ['rgba(120, 180, 230, 0.2)', 'rgba(100, 160, 210, 0.12)'],
    statusBarStyle: 'light',
  },

  // ── Rain ──────────────────────────────────────────────────────
  rain: {
    gradientColors: ['#1a3045', '#243d55', '#2e5070'],
    blobColors:     ['rgba(80, 140, 200, 0.2)', 'rgba(60, 120, 180, 0.15)'],
    statusBarStyle: 'light',
  },

  // ── Heavy Rain ────────────────────────────────────────────────
  heavy_rain: {
    gradientColors: ['#111e2b', '#182535', '#1e3045'],
    blobColors:     ['rgba(50, 100, 160, 0.25)', 'rgba(30, 80, 140, 0.2)'],
    statusBarStyle: 'light',
  },

  // ── Snow ──────────────────────────────────────────────────────
  snow: {
    gradientColors: ['#2a3f5f', '#4a6080', '#8aaac0'],
    blobColors:     ['rgba(220, 235, 255, 0.25)', 'rgba(200, 220, 245, 0.2)'],
    statusBarStyle: 'light',
  },

  // ── Thunderstorm ──────────────────────────────────────────────
  thunderstorm: {
    gradientColors: ['#0d1117', '#1a1f2e', '#252840'],
    blobColors:     ['rgba(140, 100, 255, 0.2)', 'rgba(80, 60, 200, 0.15)'],
    statusBarStyle: 'light',
  },

  // ── Sleet / Hail ──────────────────────────────────────────────
  sleet: {
    gradientColors: ['#2a3545', '#3a4555', '#506070'],
    blobColors:     ['rgba(180, 200, 220, 0.18)', 'rgba(160, 180, 200, 0.12)'],
    statusBarStyle: 'light',
  },

  // ── Fallback ──────────────────────────────────────────────────
  default: {
    gradientColors: ['#0f2027', '#203a43', '#2c5364'],
    blobColors:     ['rgba(100, 180, 255, 0.1)', 'rgba(80, 140, 220, 0.08)'],
    statusBarStyle: 'light',
  },
};

// ── Maps WMO weatherCode + isDay → a theme key ────────────────
export function getWeatherThemeKey(weatherCode: number, isDay: 0 | 1): string {
  const night = isDay === 0;

  if (weatherCode === 0)  return night ? 'clear_night'         : 'clear_day';
  if (weatherCode <= 2)   return night ? 'partly_cloudy_night' : 'partly_cloudy_day';
  if (weatherCode === 3)  return 'cloudy';
  if (weatherCode <= 48)  return 'fog';
  if (weatherCode <= 55)  return 'drizzle';
  if (weatherCode <= 57)  return 'sleet';
  if (weatherCode <= 65)  return 'rain';
  if (weatherCode <= 67)  return 'sleet';
  if (weatherCode <= 77)  return 'snow';
  if (weatherCode <= 82)  return 'rain';
  if (weatherCode <= 86)  return 'snow';
  if (weatherCode >= 95)  return 'thunderstorm';

  return 'default';
}