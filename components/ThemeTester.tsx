import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import React, { useState } from "react";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";

type ThemeTesterProps = {
  onSelect: (
    weatherCode: number | null,
    isDay: 0 | 1 | null,
    time: string | null,
  ) => void;
};

const TEST_SCENARIOS = [
  { label: "Reset (Real Weather)", code: null, isDay: null, time: null },
  { label: "Clear Day", code: 0, isDay: 1, time: "2024-01-01T12:00" },
  { label: "Clear Night", code: 0, isDay: 0, time: "2024-01-01T23:00" },
  { label: "Mostly Clear Day", code: 1, isDay: 1, time: "2024-01-01T12:00" },
  { label: "Mostly Clear Night", code: 1, isDay: 0, time: "2024-01-01T23:00" },
  { label: "Partly Cloudy Day", code: 2, isDay: 1, time: "2024-01-01T12:00" },
  { label: "Partly Cloudy Night", code: 2, isDay: 0, time: "2024-01-01T23:00" },
  { label: "Sunrise", code: 0, isDay: 1, time: "2024-01-01T06:00" },
  { label: "Sunset", code: 0, isDay: 1, time: "2024-01-01T17:00" },
  { label: "Overcast", code: 3, isDay: 1, time: "2024-01-01T12:00" },
  { label: "Fog", code: 45, isDay: 1, time: "2024-01-01T12:00" },
  { label: "Drizzle", code: 51, isDay: 1, time: "2024-01-01T12:00" },
  { label: "Freezing Drizzle", code: 56, isDay: 1, time: "2024-01-01T12:00" },
  { label: "Rain", code: 63, isDay: 1, time: "2024-01-01T12:00" },
  { label: "Heavy Rain", code: 65, isDay: 1, time: "2024-01-01T12:00" },
  { label: "Freezing Rain", code: 66, isDay: 1, time: "2024-01-01T12:00" },
  { label: "Showers", code: 80, isDay: 1, time: "2024-01-01T12:00" },
  { label: "Snow", code: 71, isDay: 1, time: "2024-01-01T12:00" },
  { label: "Heavy Snow", code: 75, isDay: 1, time: "2024-01-01T12:00" },
  { label: "Thunderstorm", code: 95, isDay: 1, time: "2024-01-01T12:00" },
  { label: "Heavy Thunderstorm", code: 96, isDay: 1, time: "2024-01-01T12:00" },
];

export default function ThemeTester({ onSelect }: ThemeTesterProps) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Pressable
        onPress={() => setModalVisible(true)}
        className="absolute bottom-10 left-5 z-50 h-14 w-14 items-center justify-center rounded-full bg-black/50 border border-white/20"
      >
        <Ionicons name="color-palette" size={24} color="white" />
      </Pressable>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <BlurView intensity={80} tint="dark" className="flex-1 justify-end">
          <View className="bg-[#1a1a1a] rounded-t-3xl p-6 min-h-[50%] max-h-[80%]">
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-xl font-bold text-white">Theme Tester</Text>
              <Pressable
                onPress={() => setModalVisible(false)}
                className="h-8 w-8 items-center justify-center rounded-full bg-white/10"
              >
                <Ionicons name="close" size={20} color="white" />
              </Pressable>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View className="gap-3 pb-10">
                {TEST_SCENARIOS.map((scenario) => (
                  <Pressable
                    key={scenario.label}
                    onPress={() => {
                      onSelect(
                        scenario.code,
                        scenario.isDay as 0 | 1 | null,
                        scenario.time,
                      );
                      setModalVisible(false);
                    }}
                    className="rounded-xl border border-white/5 bg-white/10 p-4 active:bg-white/20"
                  >
                    <Text className="text-base font-medium text-white">
                      {scenario.label}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </ScrollView>
          </View>
        </BlurView>
      </Modal>
    </>
  );
}
