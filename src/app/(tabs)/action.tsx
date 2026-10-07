import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import mqtt, { MqttClient } from "mqtt";
import { useTheme } from "@/context/ThemeContext";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function ActionScreen() {
  const { colors, theme } = useTheme();
  const [motorState, setMotorState] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [mqttClient, setMqttClient] = useState<MqttClient | null>(null);

  useEffect(() => {
    const client = mqtt.connect("ws://broker.hivemq.com:8000/mqtt");

    client.on("connect", () => {
      setMqttClient(client);
    });

    return () => {
      client.end();
    };
  }, []);

  const handleToggleMotor = (newState: boolean) => {
    if (isDisabled) return;

    setMotorState(newState);
    setIsDisabled(true);

    if (mqttClient) {
      const payload = JSON.stringify({ motor: newState ? "ON" : "OFF" });
      mqttClient.publish("rainshield/control", payload);
    }

    setTimeout(() => {
      setIsDisabled(false);
    }, 2000);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View>
        <View className="flex-row items-center justify-between py-4 px-1">
          <Text style={{ color: colors.text }} className="text-2xl font-bold">
            Điều Khiển Động Cơ
          </Text>
          <ThemeToggle />
        </View>

        {/* Khối công tắc (Switch) với màu nền động */}
        <View
          style={{
            backgroundColor: colors.backgroundElement,
            borderColor: theme === "dark" ? "#27272a" : "#e2e8f0",
          }}
          className="w-full p-6 rounded-2xl border shadow-sm flex-row items-center justify-between mb-6"
        >
          <View>
            <Text
              style={{ color: colors.text }}
              className="text-lg font-semibold"
            >
              Động cơ (Motor)
            </Text>
            <Text
              style={{ color: colors.textSecondary }}
              className="text-sm mt-1"
            >
              {motorState ? "Trạng thái: Đang chạy" : "Trạng thái: Đã dừng"}
            </Text>
          </View>

          <Switch
            value={motorState}
            onValueChange={handleToggleMotor}
            disabled={isDisabled}
            trackColor={{
              false: theme === "dark" ? "#3f3f46" : "#cbd5e1", // Màu xám đậm hơn khi OFF
              true: "#3b82f6", // Màu xanh nổi bật khi ON
            }}
            ios_backgroundColor={theme === "dark" ? "#3f3f46" : "#cbd5e1"} // Màu nền chuẩn cho iOS khi OFF
            thumbColor={motorState ? "#ffffff" : "#f8fafc"}
          />
        </View>

        {/* Nút bấm lớn */}
        <TouchableOpacity
          onPress={() => handleToggleMotor(!motorState)}
          disabled={isDisabled}
          className={`w-full py-4 rounded-xl items-center justify-center flex-row ${
            isDisabled
              ? "bg-slate-400"
              : motorState
                ? "bg-red-500"
                : "bg-blue-600"
          }`}
        >
          {isDisabled && <ActivityIndicator color="#ffffff" className="mr-2" />}
          <Text className="text-white font-bold text-lg">
            {isDisabled
              ? "Đang thực thi"
              : motorState
                ? "TẮT ĐỘNG CƠ"
                : "BẬT ĐỘNG CƠ"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
