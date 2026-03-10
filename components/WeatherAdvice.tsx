import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ActivityIndicator, Text, View } from "react-native";
import { WeatherAdviceProps } from "@/types/weatherAdvice";

export default function WeatherAdvice({ advice, loading, error }: WeatherAdviceProps) {
  if (!loading && !advice && !error) return null;

  return (
    <>
      <View className="h-px bg-white/10 mt-5" />
      <View className="mt-4 gap-2.5">
        {/* Header */}
        <View className="flex-row items-center gap-1.5">
          <View className="h-5 w-5 items-center justify-center rounded-md bg-white/10">
            <MaterialCommunityIcons
              name="creation"
              size={11}
              color="rgba(255,255,255,0.6)"
            />
          </View>
          <Text className="text-[10px] font-semibold uppercase tracking-[2.5px] text-white/45">
            AI Advice
          </Text>
        </View>

        {/* Loading */}
        {loading && (
          <View className="flex-row items-center gap-2.5 bg-white/[0.05] rounded-xl px-3 py-3">
            <ActivityIndicator size="small" color="rgba(255,255,255,0.5)" />
            <Text className="text-sm text-white/45 italic">Analyzing conditions...</Text>
          </View>
        )}

        {/* Advice */}
        {advice && !loading && (
          <View className="bg-white/[0.06] rounded-xl px-3 py-3 border border-white/[0.08]">
            <Text className="text-sm text-white/80 leading-[20px]">{advice}</Text>
          </View>
        )}

        {/* Error */}
        {error && !loading && (
          <Text className="text-xs text-rose-300/70 px-1">{error}</Text>
        )}
      </View>
    </>
  );
}