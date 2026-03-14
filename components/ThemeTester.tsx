import { TEST_SCENARIOS } from "@/constants/test";
import { ThemeTesterProps } from "@/types/weatherTypes";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import React, { useState } from "react";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";

export default function ThemeTester({
  onSelect,
  visible = true,
}: ThemeTesterProps) {
  const [modalVisible, setModalVisible] = useState(false);

  if (!visible) {
    return null;
  }

  return (
    <>
      <Pressable
        onPress={() => setModalVisible(true)}
        className="absolute bottom-16 left-5 z-50 h-14 w-14 items-center justify-center rounded-full bg-black/50 border border-white/20"
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
