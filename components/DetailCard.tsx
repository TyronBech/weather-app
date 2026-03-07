import { BlurView } from 'expo-blur';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';

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