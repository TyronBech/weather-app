import { BlurView } from 'expo-blur';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';

/**
 * DetailCard component displays a single piece of weather information (like humidity, wind speed, etc.) in a stylized card format.
 * It uses a blurred background for a modern look and includes an icon, a label, and the corresponding value.
 * The component is designed to be used within the WeatherCard component to show specific details about the current weather conditions in a visually appealing way.
 * @component
 * @param {Object} props - The props for the DetailCard component.
 * @param {string} props.icon - The name of the icon to display (from MaterialCommunityIcons).
 * @param {string} props.label - The label or title of the weather information.
 * @param {string} props.value - The value or amount of the weather information.
 * @returns {JSX.Element} A React component that displays a weather detail in a stylized card format.
 */
export default function DetailCard({
  icon,
  label,
  value,
}: {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  label: string;
  value: string;
}) {
  return (
    <BlurView
      intensity={28}
      tint="light"
      className="w-[48%] overflow-hidden rounded-[24px] border border-white/15"
    >
      <View className="gap-3 p-4">
        <View className="h-10 w-10 items-center justify-center rounded-2xl bg-white/10">
          <MaterialCommunityIcons name={icon} size={20} color="white" />
        </View>
        <View>
          <Text className="text-[11px] uppercase tracking-[2px] text-white/55">
            {label}
          </Text>
          <Text className="mt-1 text-lg font-semibold text-white">{value}</Text>
        </View>
      </View>
    </BlurView>
  );
}