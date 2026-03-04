import { WeatherCodeEntry } from '../types/weatherTypes';

export type WeatherIconVariant = 'day' | 'night';

/**
 * A mapping of weather codes to their corresponding labels and SVG icons for both day and night variants.
 * This allows us to easily retrieve the appropriate icon and label based on the weather code and time of day.
 */
export const WEATHER_CODES: Record<number, WeatherCodeEntry> = {
  // ── Clear ──────────────────────────────────────────────────────
  0: {
    label: 'Clear Sky',
    icon: {
      day:   require('../assets/svg/google/v4/clear_day.svg'),
      night: require('../assets/svg/google/v4/clear_night.svg'),
    },
  },

  // ── Mostly Clear ──────────────────────────────────────────────
  1: {
    label: 'Mostly Clear',
    icon: {
      day:   require('../assets/svg/google/v4/mostly_clear_day.svg'),
      night: require('../assets/svg/google/v4/mostly_clear_night.svg'),
    },
  },

  // ── Partly Cloudy ─────────────────────────────────────────────
  2: {
    label: 'Partly Cloudy',
    icon: {
      day:   require('../assets/svg/google/v4/partly_cloudy_day.svg'),
      night: require('../assets/svg/google/v4/partly_cloudy_night.svg'),
    },
  },

  // ── Overcast ──────────────────────────────────────────────────
  3: {
    label: 'Overcast',
    icon: {
      day:   require('../assets/svg/google/v4/cloudy.svg'),
      night: require('../assets/svg/google/v4/cloudy.svg'),
    },
  },

  // ── Fog ───────────────────────────────────────────────────────
  45: {
    label: 'Foggy',
    icon: {
      day:   require('../assets/svg/google/v4/haze_fog_dust_smoke.svg'),
      night: require('../assets/svg/google/v4/haze_fog_dust_smoke.svg'),
    },
  },
  48: {
    label: 'Icy Fog',
    icon: {
      day:   require('../assets/svg/google/v4/haze_fog_dust_smoke.svg'),
      night: require('../assets/svg/google/v4/haze_fog_dust_smoke.svg'),
    },
  },

  // ── Drizzle ───────────────────────────────────────────────────
  51: {
    label: 'Light Drizzle',
    icon: {
      day:   require('../assets/svg/google/v4/drizzle.svg'),
      night: require('../assets/svg/google/v4/drizzle.svg'),
    },
  },
  53: {
    label: 'Drizzle',
    icon: {
      day:   require('../assets/svg/google/v4/drizzle.svg'),
      night: require('../assets/svg/google/v4/drizzle.svg'),
    },
  },
  55: {
    label: 'Heavy Drizzle',
    icon: {
      day:   require('../assets/svg/google/v4/drizzle.svg'),
      night: require('../assets/svg/google/v4/drizzle.svg'),
    },
  },

  // ── Freezing Drizzle ──────────────────────────────────────────
  56: {
    label: 'Freezing Drizzle',
    icon: {
      day:   require('../assets/svg/google/v4/sleet_hail.svg'),
      night: require('../assets/svg/google/v4/sleet_hail.svg'),
    },
  },
  57: {
    label: 'Heavy Freezing Drizzle',
    icon: {
      day:   require('../assets/svg/google/v4/sleet_hail.svg'),
      night: require('../assets/svg/google/v4/sleet_hail.svg'),
    },
  },

  // ── Rain ──────────────────────────────────────────────────────
  61: {
    label: 'Light Rain',
    icon: {
      day:   require('../assets/svg/google/v4/rain_with_cloudy_light.svg'),
      night: require('../assets/svg/google/v4/rain_with_cloudy_dark.svg'),
    },
  },
  63: {
    label: 'Moderate Rain',
    icon: {
      day:   require('../assets/svg/google/v4/showers_rain.svg'),
      night: require('../assets/svg/google/v4/showers_rain.svg'),
    },
  },
  65: {
    label: 'Heavy Rain',
    icon: {
      day:   require('../assets/svg/google/v4/heavy_rain.svg'),
      night: require('../assets/svg/google/v4/heavy_rain.svg'),
    },
  },

  // ── Freezing Rain ─────────────────────────────────────────────
  66: {
    label: 'Freezing Rain',
    icon: {
      day:   require('../assets/svg/google/v4/sleet_hail.svg'),
      night: require('../assets/svg/google/v4/sleet_hail.svg'),
    },
  },
  67: {
    label: 'Heavy Freezing Rain',
    icon: {
      day:   require('../assets/svg/google/v4/mixed_rain_hail_sleet.svg'),
      night: require('../assets/svg/google/v4/mixed_rain_hail_sleet.svg'),
    },
  },

  // ── Snow ──────────────────────────────────────────────────────
  71: {
    label: 'Light Snow',
    icon: {
      day:   require('../assets/svg/google/v4/scattered_snow_showers_day.svg'),
      night: require('../assets/svg/google/v4/scattered_snow_showers_night.svg'),
    },
  },
  73: {
    label: 'Moderate Snow',
    icon: {
      day:   require('../assets/svg/google/v4/showers_snow.svg'),
      night: require('../assets/svg/google/v4/showers_snow.svg'),
    },
  },
  75: {
    label: 'Heavy Snow',
    icon: {
      day:   require('../assets/svg/google/v4/heavy_snow.svg'),
      night: require('../assets/svg/google/v4/heavy_snow.svg'),
    },
  },
  77: {
    label: 'Snow Grains',
    icon: {
      day:   require('../assets/svg/google/v4/flurries.svg'),
      night: require('../assets/svg/google/v4/flurries.svg'),
    },
  },

  // ── Rain Showers ──────────────────────────────────────────────
  80: {
    label: 'Light Showers',
    icon: {
      day:   require('../assets/svg/google/v4/scattered_showers_day.svg'),
      night: require('../assets/svg/google/v4/scattered_showers_night.svg'),
    },
  },
  81: {
    label: 'Showers',
    icon: {
      day:   require('../assets/svg/google/v4/showers_rain.svg'),
      night: require('../assets/svg/google/v4/showers_rain.svg'),
    },
  },
  82: {
    label: 'Heavy Showers',
    icon: {
      day:   require('../assets/svg/google/v4/heavy_rain.svg'),
      night: require('../assets/svg/google/v4/heavy_rain.svg'),
    },
  },

  // ── Snow Showers ──────────────────────────────────────────────
  85: {
    label: 'Snow Showers',
    icon: {
      day:   require('../assets/svg/google/v4/scattered_snow_showers_day.svg'),
      night: require('../assets/svg/google/v4/scattered_snow_showers_night.svg'),
    },
  },
  86: {
    label: 'Heavy Snow Showers',
    icon: {
      day:   require('../assets/svg/google/v4/heavy_snow.svg'),
      night: require('../assets/svg/google/v4/heavy_snow.svg'),
    },
  },

  // ── Thunderstorm ──────────────────────────────────────────────
  95: {
    label: 'Thunderstorm',
    icon: {
      day:   require('../assets/svg/google/v4/isolated_scattered_thunderstorms_day.svg'),
      night: require('../assets/svg/google/v4/isolated_scattered_thunderstorms_night.svg'),
    },
  },
  96: {
    label: 'Thunderstorm with Hail',
    icon: {
      day:   require('../assets/svg/google/v4/strong_thunderstorms.svg'),
      night: require('../assets/svg/google/v4/strong_thunderstorms.svg'),
    },
  },
  99: {
    label: 'Heavy Thunderstorm',
    icon: {
      day:   require('../assets/svg/google/v4/strong_thunderstorms.svg'),
      night: require('../assets/svg/google/v4/strong_thunderstorms.svg'),
    },
  },
};