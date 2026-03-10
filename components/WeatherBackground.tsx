import { WEATHER_THEMES, getWeatherThemeKey } from "@/constants/weatherThemes";
import { WeatherBackgroundProps } from "@/types/weatherTypes";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, StyleSheet, View } from "react-native";

// Get screen dimensions for blob sizing
const { width } = Dimensions.get("window");

/**
 * WeatherBackground component renders a dynamic gradient background with animated blobs based on the current weather conditions.
 * It uses the weather code and day/night information to determine the appropriate color scheme and animation style.
 * The component includes a fade transition effect when the weather conditions change, providing a smooth visual experience.
 * It is designed to wrap around the main content of the weather screen, allowing the dynamic background to enhance the overall aesthetic of the app.
 * Props:
 * - weatherCode: The weather code representing the current weather conditions.
 * - isDay: A flag indicating whether it's day (1) or night (0).
 * - children: The content to be wrapped by the WeatherBackground component.
 * @component
 * @returns A React component that renders a dynamic gradient background with animated blobs based on the current weather conditions, and wraps around the provided children content.
 * @see WeatherBackgroundProps
 */
export default function WeatherBackground({
  weatherCode,
  isDay,
  children,
}: WeatherBackgroundProps) {
  // Get theme based on weather code and day/night
  const themeKey = getWeatherThemeKey(weatherCode, isDay);
  const theme = WEATHER_THEMES[themeKey] ?? WEATHER_THEMES.default;

  // Blob animations
  const blob1X = useRef(new Animated.Value(0)).current;
  const blob1Y = useRef(new Animated.Value(0)).current;
  const blob2X = useRef(new Animated.Value(0)).current;
  const blob2Y = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  // Fade transition when weather changes
  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0.3,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, [weatherCode, isDay, fadeAnim]);

  // Slow floating blob animation — loops forever
  useEffect(() => {
    const floatBlob = (
      animX: Animated.Value,
      animY: Animated.Value,
      rangeX: number,
      rangeY: number,
      duration: number,
    ) => {
      return Animated.loop(
        Animated.sequence([
          Animated.parallel([
            Animated.timing(animX, {
              toValue: rangeX,
              duration,
              useNativeDriver: true,
            }),
            Animated.timing(animY, {
              toValue: rangeY,
              duration,
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(animX, {
              toValue: -rangeX,
              duration,
              useNativeDriver: true,
            }),
            Animated.timing(animY, {
              toValue: -rangeY,
              duration,
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(animX, {
              toValue: 0,
              duration,
              useNativeDriver: true,
            }),
            Animated.timing(animY, {
              toValue: 0,
              duration,
              useNativeDriver: true,
            }),
          ]),
        ]),
      );
    };

    const loop1 = floatBlob(blob1X, blob1Y, 30, 20, 6000);
    const loop2 = floatBlob(blob2X, blob2Y, -25, 30, 8000);
    loop1.start();
    loop2.start();

    return () => {
      loop1.stop();
      loop2.stop();
    };
  }, [blob1X, blob1Y, blob2X, blob2Y]);

  return (
    <View style={styles.container}>
      <StatusBar style={theme.statusBarStyle} />

      {/* Base gradient */}
      <Animated.View style={[StyleSheet.absoluteFill, { opacity: fadeAnim }]}>
        <LinearGradient
          colors={theme.gradientColors as [string, string, ...string[]]}
          start={{ x: 0.2, y: 0 }}
          end={{ x: 0.8, y: 1 }}
          style={StyleSheet.absoluteFill}
        />

        {/* Blob 1 — top left */}
        <Animated.View
          style={[
            styles.blob,
            styles.blob1,
            {
              backgroundColor: theme.blobColors[0],
              transform: [{ translateX: blob1X }, { translateY: blob1Y }],
            },
          ]}
        />

        {/* Blob 2 — bottom right */}
        <Animated.View
          style={[
            styles.blob,
            styles.blob2,
            {
              backgroundColor: theme.blobColors[1],
              transform: [{ translateX: blob2X }, { translateY: blob2Y }],
            },
          ]}
        />
      </Animated.View>

      {/* Screen content */}
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  blob: {
    position: "absolute",
    borderRadius: 999,
  },
  blob1: {
    width: width * 0.75,
    height: width * 0.75,
    top: -width * 0.2,
    left: -width * 0.2,
  },
  blob2: {
    width: width * 0.65,
    height: width * 0.65,
    bottom: -width * 0.15,
    right: -width * 0.15,
  },
});
