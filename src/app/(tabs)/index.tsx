import { Header } from "@/components/Header/Header";
import { SensorCard } from "@/components/SensorCard/SensorCard";
import React, { useState, useEffect } from "react";
import { View, SafeAreaView, ScrollView } from "react-native";
import mqtt from "mqtt";
import { useTheme } from "@/context/ThemeContext";

interface SensorData {
  dht_valid: boolean;
  temp: number | null;
  hum: number | null;
  light: number;
}

export default function HomeScreen() {
  const { colors } = useTheme();
  const [sensorData, setSensorData] = useState<SensorData>({
    dht_valid: false,
    temp: null,
    hum: null,
    light: 0,
  });

  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    const client = mqtt.connect("ws://broker.hivemq.com:8000/mqtt");

    client.on("connect", () => {
      client.subscribe("rainshield/sensors");
      setIsConnected(true);
    });

    client.on("message", (topic, message) => {
      try {
        const data = JSON.parse(message.toString());
        setSensorData(data);
      } catch (e) {
        console.error("Loi parse JSON:", e);
      }
    });

    return () => {
      client.end();
    };
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={{ flex: 1 }} className="">
        <Header isConnected={isConnected} />

        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-row flex-wrap justify-evenly gap-2">
            <SensorCard
              title="Nhiệt độ"
              value={
                sensorData.dht_valid && sensorData.temp !== null
                  ? sensorData.temp
                  : "N/A"
              }
              unit={sensorData.dht_valid ? "°C" : ""}
            />
            <SensorCard
              title="Độ ẩm"
              value={
                sensorData.dht_valid && sensorData.hum !== null
                  ? sensorData.hum
                  : "N/A"
              }
              unit={sensorData.dht_valid ? "%" : ""}
            />
            <SensorCard title="Ánh sáng" value={sensorData.light} unit="%" />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
