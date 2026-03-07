import { WEATHER_CODES } from "@/constants/weatherCodes";
import { WeatherCardProps } from "@/types/weatherTypes";
import { BlurView } from "expo-blur";
import React from "react";
import { Platform, Text, View } from "react-native";

function resolveWeatherIcon(
  iconModule: WeatherCardProps["weatherCode"] extends number ? any : never,
) {
  return iconModule?.default ?? iconModule;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function WeatherCard({
  size = "main",
  city,
  country,
  temperature,
  feelsLike,
  weatherCode,
  isDay = 1,
  humidity,
  windSpeed,
  time,
  className = "",
  style,
}: WeatherCardProps) {
  const variant = isDay === 0 ? "night" : "day";
  const weather = WEATHER_CODES[weatherCode] ?? WEATHER_CODES[0];
  const WeatherIcon = resolveWeatherIcon(weather.icon[variant]);
  const isMain = size === "main";

  if (isMain) {
    return (
      <BlurView
        intensity={40}
        tint="light"
        className={`rounded-[32px] overflow-hidden border border-white/20 ${className}`}
        style={style}
      >
        {/* Shimmer overlay */}
        <View className="absolute top-0 left-0 right-0 h-1/2 bg-white/10 rounded-t-[32px]" />

        {/* Glow blob */}
        <View
          className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-white/5"
          style={Platform.OS === "web" ? ({ filter: "blur(20px)" } as object) : undefined}
        />

        <View className="relative z-10 p-6">
          {/* Header row */}
          <View className="flex-row justify-between items-start">
            <View>
              <Text className="text-xs font-semibold text-white/60 tracking-widest uppercase">
                {country ?? ""}
              </Text>
              <Text className="text-2xl font-bold text-white mt-0.5 tracking-tight">
                {city ?? ""}
              </Text>
            </View>

            {/* ── SVG Icon ── */}
            <WeatherIcon width={56} height={56} />
          </View>

          {/* Temperature */}
          <View className="flex-row items-end mt-5">
            <Text className="text-7xl font-extrabold text-white leading-none tracking-tighter">
              {temperature}
            </Text>
            <Text className="text-3xl text-white/70 mb-2 ml-1">°C</Text>
          </View>

          <Text className="text-sm text-white/55 mt-1">
            {weather.label}{feelsLike != null ? ` · Feels like ${feelsLike}°C` : ""}
          </Text>

          {/* Stats row */}
          <View className="flex-row mt-5 bg-white/[0.07] rounded-2xl border border-white/10 overflow-hidden">
            <View className="flex-1 px-4 py-3">
              <Text className="text-[11px] text-white/50 uppercase tracking-widest">
                💧 Humidity
              </Text>
              <Text className="text-base font-semibold text-white mt-1">
                {humidity}%
              </Text>
            </View>
            <View className="w-px bg-white/10" />
            <View className="flex-1 px-4 py-3">
              <Text className="text-[11px] text-white/50 uppercase tracking-widest">
                🌬️ Wind
              </Text>
              <Text className="text-base font-semibold text-white mt-1">
                {windSpeed != null ? `${windSpeed} km/h` : "—"}
              </Text>
            </View>
          </View>
        </View>
      </BlurView>
    );
  }

  // ─── Hourly variant ───────────────────────────────────────────────────────
  return (
    <BlurView
      intensity={30}
      tint="light"
      className={`rounded-3xl overflow-hidden border border-white/[0.18] w-[90px] ${className}`}
      style={style}
    >
      {/* Shimmer overlay */}
      <View className="absolute top-0 left-0 right-0 h-1/2 bg-white/10 rounded-t-3xl" />

      <View className="relative z-10 py-4 px-3 items-center gap-1.5">
        <Text className="text-[11px] font-semibold text-white/55 uppercase tracking-widest">
          {time ?? "Now"}
        </Text>

        {/* ── SVG Icon ── */}
        <WeatherIcon width={36} height={36} />

        <Text className="text-xl font-bold text-white tracking-tight">
          {temperature}°
        </Text>
        <Text className="text-[10px] text-white/45 text-center">
          {weather.label}
        </Text>
        <Text className="text-[11px] text-white/45">💧 {humidity}%</Text>
      </View>
    </BlurView>
  );
}
