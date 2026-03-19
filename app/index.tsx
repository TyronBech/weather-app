import DetailCard from "@/components/DetailCard";
import ThemeTester from "@/components/ThemeTester";
import WeatherBackground from "@/components/WeatherBackground";
import WeatherCard from "@/components/WeatherCard";
import WeatherLoadingCard from "../components/WeatherLoadingCard";
import { useGeocoding } from "@/hooks/useGeocoding";
import { useLocation } from "@/hooks/useLocation";
import { useWeather } from "@/hooks/useWeather";
import { useWeatherAdvice } from "@/hooks/useWeatherAdvice";
import { GeocodingResult } from "@/types/geocoding";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Animated,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Format hour label
function formatHourLabel(value: string) {
  const date = new Date(value);
  return date.toLocaleTimeString([], { hour: "numeric" });
}

// Main component
export default function Index() {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedLocation, setSelectedLocation] =
    useState<GeocodingResult | null>(null);

  // Theme Overrides
  const [overrideWeatherCode, setOverrideWeatherCode] = useState<number | null>(
    null,
  );
  const [overrideIsDay, setOverrideIsDay] = useState<0 | 1 | null>(null);
  const [overrideTime, setOverrideTime] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [showRefreshBanner, setShowRefreshBanner] = useState(false);
  const [refreshBannerProgress] = useState(() => new Animated.Value(0));
  const {
    coordinates,
    locationDetails,
    loading: locationLoading,
    error: locationError,
    refetch: refetchLocation,
  } = useLocation();
  const { results, error: geocodingError, search } = useGeocoding();
  const activeCoordinates = selectedLocation
    ? {
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude,
      }
    : coordinates;
  const {
    data,
    loading: weatherLoading,
    error: weatherError,
    refetch: refetchWeather,
  } = useWeather(
    activeCoordinates?.latitude ?? null,
    activeCoordinates?.longitude ?? null,
  );
  const {
    advice,
    loading: adviceLoading,
    error: adviceError,
    fetchAdvice,
  } = useWeatherAdvice();
  useEffect(() => {
    const trimmedQuery = searchQuery.trim();

    if (trimmedQuery.length < 2) {
      return;
    }
    const timeoutId = setTimeout(() => {
      search(trimmedQuery);
    }, 350);

    return () => clearTimeout(timeoutId);
  }, [search, searchQuery]);
  useEffect(() => {
    if (!data) return;

    const currentIndex = Math.max(
      data.hourly.time.findIndex((value) => value >= data.current.time),
      0,
    );

    const rainChance = data.hourly.precipitation_probability[currentIndex] ?? 0;

    fetchAdvice({
      temperature: data.current.temperature_2m,
      weatherCode: data.current.weather_code,
      rainChance,
      windSpeed: data.current.wind_speed_10m,
      humidity: data.current.relative_humidity_2m,
      isDay: data.current.is_day,
    });
  }, [data, fetchAdvice]);
  const activeCity =
    selectedLocation?.name ??
    locationDetails?.city ??
    locationDetails?.region ??
    "Current location";
  const activeCountry =
    selectedLocation?.country ?? locationDetails?.country ?? "Live";

  const shouldShowResults =
    showSuggestions && searchQuery.trim().length >= 2 && results.length > 0;

  const hourlyForecast = useMemo(() => {
    if (!data) {
      return [];
    }

    const startIndex = Math.max(
      data.hourly.time.findIndex((value) => value >= data.current.time),
      0,
    );

    return data.hourly.time
      .slice(startIndex, startIndex + 24)
      .map((time, index) => ({
        isDay: (data.hourly.is_day[startIndex + index] ??
          data.current.is_day) as 0 | 1,
        time,
        temperature: Math.round(
          data.hourly.temperature_2m[startIndex + index] ?? 0,
        ),
        weatherCode:
          data.hourly.weather_code[startIndex + index] ??
          data.current.weather_code,
        humidity:
          data.hourly.relative_humidity_2m[startIndex + index] ??
          data.current.relative_humidity_2m,
        rainChance:
          data.hourly.precipitation_probability[startIndex + index] ?? 0,
      }));
  }, [data]);

  const todayTemperatures = useMemo(() => {
    if (!data) {
      return { min: 0, max: 0 };
    }

    const upcomingTemps = data.hourly.temperature_2m.slice(0, 24);
    return {
      min: Math.round(Math.min(...upcomingTemps)),
      max: Math.round(Math.max(...upcomingTemps)),
    };
  }, [data]);

  const currentRainChance = hourlyForecast[0]?.rainChance ?? 0;
  const backgroundWeatherCode =
    overrideWeatherCode ?? data?.current.weather_code ?? 0;
  const backgroundIsDay = overrideIsDay ?? data?.current.is_day ?? 1;
  const backgroundTime = overrideTime ?? data?.current.time;
  const currentWeather = data?.current ?? null;
  const hasWeather = Boolean(data);
  const isInitialLoading = locationLoading || weatherLoading;

  useEffect(() => {
    if (refreshing) {
      setShowRefreshBanner(true);
      Animated.spring(refreshBannerProgress, {
        toValue: 1,
        damping: 16,
        mass: 0.8,
        stiffness: 180,
        useNativeDriver: true,
      }).start();
      return;
    }

    Animated.timing(refreshBannerProgress, {
      toValue: 0,
      duration: 220,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        setShowRefreshBanner(false);
      }
    });
  }, [refreshBannerProgress, refreshing]);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);

    try {
      if (selectedLocation) {
        await refetchWeather();
        return;
      }

      const nextCoordinates = await refetchLocation();
      if (nextCoordinates) {
        await refetchWeather(nextCoordinates.latitude, nextCoordinates.longitude);
      }
    } finally {
      setRefreshing(false);
    }
  }, [refetchLocation, refetchWeather, selectedLocation]);

  function handleLocationSelect(result: GeocodingResult) {
    setSelectedLocation(result);
    setSearchQuery(`${result.name}, ${result.country}`);
    setShowSuggestions(false);
  }

  return (
    <View
      className="flex-1 "
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      <WeatherBackground
        weatherCode={backgroundWeatherCode}
        isDay={backgroundIsDay}
        currentTime={backgroundTime}
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor="transparent"
              colors={["transparent"]}
              progressBackgroundColor="transparent"
              progressViewOffset={-300}
              
            />
          }
        >
          <View className="gap-6 pt-4">
            {showRefreshBanner ? (
              <Animated.View
                style={{
                  opacity: refreshBannerProgress,
                  transform: [
                    {
                      translateY: refreshBannerProgress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-18, 0],
                      }),
                    },
                    {
                      scale: refreshBannerProgress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.96, 1],
                      }),
                    },
                  ],
                }}
              >
                <WeatherLoadingCard
                  variant="inline"
                  title="Refreshing forecast"
                  message="Updating the sky, temperature, and local conditions."
                />
              </Animated.View>
            ) : null}

            <View className="gap-4">
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-3">
                  <View className="h-14 w-14 items-center justify-center rounded-[20px] bg-white/15">
                    <MaterialCommunityIcons
                      name="weather-partly-cloudy"
                      size={28}
                      color="white"
                    />
                  </View>
                  <View>
                    <Text className="text-[12px] uppercase tracking-[2.5px] text-white/65">
                      Forecast
                    </Text>
                    <Text className="text-3xl font-black text-white">
                      SkyCast
                    </Text>
                  </View>
                </View>

                <BlurView
                  intensity={backgroundIsDay ? 20 : 30}
                  tint={backgroundIsDay ? "light" : "dark"}
                  className="overflow-hidden rounded-full border border-white/20 bg-white/5"
                >
                  <View className="px-4 py-3">
                    <Text className="text-xs font-semibold uppercase tracking-[2px] text-white/80">
                      {activeCountry}
                    </Text>
                  </View>
                </BlurView>
              </View>

              <BlurView
                intensity={backgroundIsDay ? 20 : 30}
                tint={backgroundIsDay ? "light" : "dark"}
                className="overflow-hidden rounded-[28px] border border-white/20 bg-white/5"
              >
                <View className="flex-row items-center gap-3 px-4 py-4">
                  <Ionicons
                    name="search"
                    size={20}
                    color="rgba(255,255,255,0.75)"
                  />
                  <TextInput
                    value={searchQuery}
                    onChangeText={(text) => {
                      setSearchQuery(text);
                      setShowSuggestions(true);
                    }}
                    placeholder="Search for a location"
                    placeholderTextColor="rgba(255,255,255,0.55)"
                    className="flex-1 text-base font-medium text-white"
                    autoCapitalize="words"
                    autoCorrect={false}
                  />
                </View>
              </BlurView>

              {shouldShowResults ? (
                <BlurView
                  intensity={backgroundIsDay ? 20 : 30}
                  tint={backgroundIsDay ? "light" : "dark"}
                  className="overflow-hidden rounded-[28px] border border-white/20 bg-white/5"
                >
                  <View className="divide-y divide-white/10">
                    {results.map((result) => {
                      const locationLabel = [
                        result.name,
                        result.admin1,
                        result.country,
                      ]
                        .filter(Boolean)
                        .join(", ");

                      return (
                        <Pressable
                          key={result.id}
                          onPress={() => handleLocationSelect(result)}
                          className="px-4 py-4 active:bg-white/10"
                        >
                          <Text className="text-base font-semibold text-white">
                            {result.name}
                          </Text>
                          <Text className="mt-1 text-sm text-white/65">
                            {locationLabel}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </View>
                </BlurView>
              ) : null}
            </View>

            {hasWeather && currentWeather ? (
              <>
                <View className="gap-4">
                  <View className="flex-row items-center justify-between">
                    <View>
                      <Text className="text-[12px] uppercase tracking-[2px] text-white/60">
                        Right now
                      </Text>
                      <Text className="mt-1 text-xl font-semibold text-white">
                        {activeCity}
                      </Text>
                    </View>
                    <Text className="text-sm text-white/65">
                      {data?.timezone}
                    </Text>
                  </View>

                  <WeatherCard
                    city={activeCity}
                    country={activeCountry}
                    temperature={Math.round(currentWeather.temperature_2m)}
                    feelsLike={Math.round(currentWeather.apparent_temperature)}
                    weatherCode={backgroundWeatherCode}
                    isDay={backgroundIsDay as 0 | 1}
                    humidity={Math.round(currentWeather.relative_humidity_2m)}
                    windSpeed={Math.round(currentWeather.wind_speed_10m)}
                    advice={advice}
                    adviceLoading={adviceLoading}
                    adviceError={adviceError}
                  />
                </View>

                <View className="gap-4">
                  <View className="flex-row items-center justify-between">
                    <Text className="text-xl font-semibold text-white">
                      Hourly outlook
                    </Text>
                    <Text className="text-sm text-white/60">Next 24 hours</Text>
                  </View>

                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingRight: 20 }}
                  >
                    <View className="flex-row gap-3">
                      {hourlyForecast.map((entry) => (
                        <WeatherCard
                          key={entry.time}
                          size="hourly"
                          temperature={entry.temperature}
                          weatherCode={entry.weatherCode}
                          humidity={entry.humidity}
                          isDay={entry.isDay}
                          time={formatHourLabel(entry.time)}
                        />
                      ))}
                    </View>
                  </ScrollView>
                </View>

                <View className="gap-4">
                  <View className="flex-row items-center justify-between">
                    <Text className="text-xl font-semibold text-white">
                      More details
                    </Text>
                    <Text className="text-sm text-white/60">
                      Live conditions
                    </Text>
                  </View>

                  <View className="flex-row flex-wrap justify-between gap-y-4">
                    <DetailCard
                      icon="water-percent"
                      label="Humidity"
                      value={`${Math.round(currentWeather.relative_humidity_2m)}%`}
                    />
                    <DetailCard
                      icon="weather-windy"
                      label="Wind speed"
                      value={`${Math.round(currentWeather.wind_speed_10m)} km/h`}
                    />
                    <DetailCard
                      icon="weather-rainy"
                      label="Rain chance"
                      value={`${Math.round(currentRainChance)}%`}
                    />
                    <DetailCard
                      icon="gauge"
                      label="Pressure"
                      value={`${Math.round(currentWeather.surface_pressure)} hPa`}
                    />
                    <DetailCard
                      icon="thermometer-lines"
                      label="Today range"
                      value={`${todayTemperatures.max}° / ${todayTemperatures.min}°`}
                    />
                    <DetailCard
                      icon="crosshairs-gps"
                      label="Coordinates"
                      value={`${activeCoordinates?.latitude.toFixed(2)}, ${activeCoordinates?.longitude.toFixed(2)}`}
                    />
                  </View>
                </View>
              </>
            ) : null}

            {isInitialLoading && !hasWeather ? (
              <WeatherLoadingCard
                title="Loading the latest weather"
                message="Pulling your location, current conditions, and a fresh forecast into view."
              />
            ) : null}

            {locationError || weatherError || geocodingError ? (
              <BlurView
                intensity={backgroundIsDay ? 20 : 30}
                tint={backgroundIsDay ? "light" : "dark"}
                className="overflow-hidden rounded-[28px] border border-rose-200/30 bg-rose-500/10"
              >
                <View className="gap-2 px-5 py-5">
                  <Text className="text-sm font-semibold uppercase tracking-[2px] text-rose-100">
                    Status
                  </Text>
                  {locationError ? (
                    <Text className="text-sm text-white/80">
                      Location: {locationError}
                    </Text>
                  ) : null}
                  {weatherError ? (
                    <Text className="text-sm text-white/80">
                      Weather: {weatherError}
                    </Text>
                  ) : null}
                  {geocodingError ? (
                    <Text className="text-sm text-white/80">
                      Search: {geocodingError}
                    </Text>
                  ) : null}
                </View>
              </BlurView>
            ) : null}
          </View>
        </ScrollView>
      </WeatherBackground>
      <ThemeTester
        visible={__DEV__} /* Only show the testing button in development */
        onSelect={(code, isDay, time) => {
          setOverrideWeatherCode(code);
          setOverrideIsDay(isDay);
          setOverrideTime(time);
        }}
      />
    </View>
  );
}
