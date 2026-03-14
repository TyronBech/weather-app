import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { SvgProps } from "react-native-svg";

// ── Weather Card Props ──────────────────────────────────────────────
export type CardSize = "main" | "hourly";

/**
 * Props for the WeatherCard component, which displays current weather information
 * in a stylized card format.
 */
export interface WeatherCardProps {
  size?: CardSize;
  city?: string;
  country?: string;
  temperature: number;
  feelsLike?: number;
  weatherCode: number;
  humidity: number;
  isDay?: 0 | 1;
  windSpeed?: number;
  time?: string;
  className?: string;
  style?: StyleProp<ViewStyle>;
  advice?: string | null;
  adviceLoading?: boolean;
  adviceError?: string | null;
}

/**
 * Interface for a single weather code entry, which includes a label and corresponding
 * SVG icons for day and night.
 */
export interface WeatherCodeEntry {
  label: string;
  icon: {
    day: React.FC<SvgProps> | { default: React.FC<SvgProps> };
    night: React.FC<SvgProps> | { default: React.FC<SvgProps> };
  };
}

/**
 * Props for the WeatherBackground component, which renders a dynamic gradient background with
 * animated blobs based on the current weather conditions.
 */
export interface WeatherBackgroundProps {
  weatherCode: number;
  isDay: 0 | 1;
  currentTime?: string;
  children: React.ReactNode;
}

/**
 * Props for the ThemeTester component, which provides a UI for testing different weather scenarios
 * by allowing users to select various weather codes, day/night settings, and times. The onSelect
 * callback is triggered when a scenario is selected, passing the corresponding weather code,
 * day/night value, and time to the parent component for testing purposes.
 */
export type ThemeTesterProps = {
  visible?: boolean;
  onSelect: (
    weatherCode: number | null,
    isDay: 0 | 1 | null,
    time: string | null,
  ) => void;
};

/**
 * Type definition for a test scenario used in the ThemeTester component, which includes a label for the scenario, 
 * a weather code, a day/night indicator, and a time string. This type is used to define the structure of 
 * each test scenario in the TEST_SCENARIOS array.
 */
export type TestScenario = {
  label: string;
  code: number | null;
  isDay: 0 | 1 | null;
  time: string | null;
};
