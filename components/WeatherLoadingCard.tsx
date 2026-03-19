import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import React, { useEffect, useRef } from "react";
import { Animated, Easing, Text, View } from "react-native";

type WeatherLoadingCardProps = {
  variant?: "hero" | "inline";
  title?: string;
  message?: string;
  steps?: string[];
};

const ICONS = [
  { name: "weather-sunny", color: "#FFD76A", size: 28, top: 2, left: 4 },
  { name: "weather-partly-cloudy", color: "#F4FAFF", size: 36, top: 16, left: 20 },
  { name: "weather-rainy", color: "#8ED8FF", size: 26, top: 40, left: 44 },
] as const;

export default function WeatherLoadingCard({
  variant = "hero",
  title,
  message,
  steps,
}: WeatherLoadingCardProps) {
  const isInline = variant === "inline";
  const float = useRef(new Animated.Value(0)).current;
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const floatLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(float, {
          toValue: 1,
          duration: 1800,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(float, {
          toValue: 0,
          duration: 1800,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ]),
    );

    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 1400,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 1400,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
    );

    floatLoop.start();
    pulseLoop.start();

    return () => {
      floatLoop.stop();
      pulseLoop.stop();
    };
  }, [float, pulse]);

  const defaultTitle = isInline ? "Preparing insight" : "Building your forecast";
  const defaultMessage = isInline
    ? "Animating the latest weather advice..."
    : "Gathering your location, live conditions, and the next sky update.";
  const defaultSteps = isInline
    ? []
    : ["Locating", "Syncing forecast", "Styling the sky"];

  return (
    <BlurView
      intensity={isInline ? 28 : 36}
      tint="dark"
      className={`overflow-hidden border border-white/20 bg-black/10 ${
        isInline ? "rounded-2xl" : "rounded-[28px]"
      }`}
    >
      <View className="absolute top-0 left-0 right-0 h-1/2 bg-white/10" />

      <View className={`${isInline ? "px-4 py-4" : "px-5 py-6"}`}>
        <View className={`flex-row items-center ${isInline ? "gap-3" : "gap-4"}`}>
          <View
            className={`items-center justify-center ${
              isInline ? "h-14 w-14" : "h-24 w-24"
            }`}
          >
            <Animated.View
              className={`absolute rounded-full bg-white/10 ${
                isInline ? "h-12 w-12" : "h-20 w-20"
              }`}
              style={{
                opacity: pulse.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.16, 0.3],
                }),
                transform: [
                  {
                    scale: pulse.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.92, 1.08],
                    }),
                  },
                ],
              }}
            />

            {ICONS.map((icon, index) => (
              <Animated.View
                key={icon.name}
                className="absolute"
                style={{
                  top: isInline ? Math.round(icon.top * 0.55) : icon.top,
                  left: isInline ? Math.round(icon.left * 0.55) : icon.left,
                  opacity: pulse.interpolate({
                    inputRange: [0, 1],
                    outputRange: index === 1 ? [0.82, 1] : [0.64, 0.9],
                  }),
                  transform: [
                    {
                      translateY: float.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, index === 1 ? -10 : -6],
                      }),
                    },
                    {
                      translateX: pulse.interpolate({
                        inputRange: [0, 1],
                        outputRange: index === 0 ? [-3, 3] : index === 2 ? [3, -3] : [0, 0],
                      }),
                    },
                    {
                      scale: pulse.interpolate({
                        inputRange: [0, 1],
                        outputRange: index === 1 ? [1, 1.06] : [0.96, 1.02],
                      }),
                    },
                  ],
                }}
              >
                <MaterialCommunityIcons
                  name={icon.name}
                  size={isInline ? Math.max(icon.size - 8, 18) : icon.size}
                  color={icon.color}
                />
              </Animated.View>
            ))}
          </View>

          <View className="flex-1">
            <Text
              className={`font-semibold uppercase text-white/55 ${
                isInline ? "text-[10px] tracking-[2.5px]" : "text-[11px] tracking-[2.8px]"
              }`}
            >
              Live weather
            </Text>
            <Text
              className={`mt-1 font-bold text-white ${
                isInline ? "text-base" : "text-[22px]"
              }`}
            >
              {title ?? defaultTitle}
            </Text>
            <Text
              className={`mt-1 text-white/70 ${
                isInline ? "text-sm leading-5" : "text-[15px] leading-6"
              }`}
            >
              {message ?? defaultMessage}
            </Text>
          </View>
        </View>

        {!isInline ? (
          <View className="mt-5 flex-row gap-2">
            {(steps ?? defaultSteps).map((step, index) => (
              <Animated.View
                key={step}
                className="rounded-full border border-white/10 bg-white/8 px-3 py-2"
                style={{
                  opacity: pulse.interpolate({
                    inputRange: [0, 1],
                    outputRange: index === 1 ? [0.8, 1] : [0.9, 0.72],
                  }),
                }}
              >
                <Text className="text-[11px] font-semibold uppercase tracking-[1.8px] text-white/75">
                  {step}
                </Text>
              </Animated.View>
            ))}
          </View>
        ) : null}
      </View>
    </BlurView>
  );
}
