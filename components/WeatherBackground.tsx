import { getWeatherThemeKey, WEATHER_THEMES } from "@/constants/weatherThemes";
import { WeatherBackgroundProps } from "@/types/weatherTypes";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, Platform, StyleSheet, View } from "react-native";

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
  currentTime,
  children,
}: WeatherBackgroundProps) {
  // Get theme based on weather code and day/night
  const themeKey = getWeatherThemeKey(weatherCode, isDay, currentTime);
  const theme = WEATHER_THEMES[themeKey] ?? WEATHER_THEMES.default;

  // Blob animations
  const blob1X = useRef(new Animated.Value(0)).current;
  const blob1Y = useRef(new Animated.Value(0)).current;
  const blob2X = useRef(new Animated.Value(0)).current;
  const blob2Y = useRef(new Animated.Value(0)).current;
  const blob3X = useRef(new Animated.Value(0)).current;
  const blob3Y = useRef(new Animated.Value(0)).current;
  const blob4X = useRef(new Animated.Value(0)).current;
  const blob4Y = useRef(new Animated.Value(0)).current;
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
    const loop3 = floatBlob(blob3X, blob3Y, 20, -30, 7000);
    const loop4 = floatBlob(blob4X, blob4Y, -30, -20, 9000);
    loop1.start();
    loop2.start();
    loop3.start();
    loop4.start();

    return () => {
      loop1.stop();
      loop2.stop();
      loop3.stop();
      loop4.stop();
    };
  }, [blob1X, blob1Y, blob2X, blob2Y, blob3X, blob3Y, blob4X, blob4Y]);

  const isNightWithStars =
    themeKey === "clear_night" || themeKey === "partly_cloudy_night";
  const starsArray = React.useMemo(() => {
    // Generate static random stars, mainly upper half of the screen
    return Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      left: `${(Math.random() * 100).toFixed(2)}%`,
      top: `${(Math.random() * 60).toFixed(2)}%`,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.7 + 0.3,
    }));
  }, []);

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

        {/* Stars for clear nights */}
        {isNightWithStars && (
          <View style={StyleSheet.absoluteFill} pointerEvents="none">
            {starsArray.map((star) => (
              <View
                key={star.id}
                style={{
                  position: "absolute",
                  left: star.left as any,
                  top: star.top as any,
                  width: star.size,
                  height: star.size,
                  borderRadius: star.size / 2,
                  backgroundColor: "white",
                  opacity: star.opacity,
                  shadowColor: "white",
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 0.5,
                  shadowRadius: 2,
                }}
              />
            ))}
          </View>
        )}

        {/* Sun for sunrise / sunset */}
        {(themeKey === "sunrise" || themeKey === "sunset") && (
          <View
            style={[
              {
                position: "absolute",
                width: width * 0.8,
                height: width * 0.8,
                borderRadius: width * 0.4,
                backgroundColor: themeKey === "sunrise" ? "#FFD480" : "#FF8C42",
                opacity: 0.4,
                left: width * 0.1,
                bottom: themeKey === "sunrise" ? -width * 0.2 : -width * 0.3,
              },
              Platform.OS === "web"
                ? { filter: "blur(40px)" as any }
                : {
                    shadowColor: themeKey === "sunrise" ? "#FFD480" : "#FF8C42",
                    shadowOpacity: 0.8,
                    shadowRadius: 60,
                  },
            ]}
          />
        )}

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

        {/* Blob 3 — top right */}
        {theme.blobColors[2] && (
          <Animated.View
            style={[
              styles.blob,
              styles.blob3,
              {
                backgroundColor: theme.blobColors[2],
                transform: [{ translateX: blob3X }, { translateY: blob3Y }],
              },
            ]}
          />
        )}

        {/* Blob 4 — bottom left */}
        {theme.blobColors[3] && (
          <Animated.View
            style={[
              styles.blob,
              styles.blob4,
              {
                backgroundColor: theme.blobColors[3],
                transform: [{ translateX: blob4X }, { translateY: blob4Y }],
              },
            ]}
          />
        )}
      </Animated.View>

      {/* Screen content */}
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  content: {
    flex: 1,
  },
  blob: {
    position: "absolute",
    borderRadius: 999,
    ...(Platform.OS === "web" ? { filter: "blur(60px)" as any } : {}),
  },
  blob1: {
    width: width * 1.2,
    height: width * 1.2,
    top: -width * 0.3,
    left: -width * 0.3,
  },
  blob2: {
    width: width * 1.1,
    height: width * 1.1,
    bottom: -width * 0.2,
    right: -width * 0.3,
  },
  blob3: {
    width: width * 0.9,
    height: width * 0.9,
    top: width * 0.2,
    right: -width * 0.2,
  },
  blob4: {
    width: width * 1.0,
    height: width * 1.0,
    bottom: width * 0.2,
    left: -width * 0.2,
  },
});
