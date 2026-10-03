import { Footer } from '@/components/Footer/Footer';
import { Header } from '@/components/Header/Header';
import { SensorCard } from '@/components/SensorCard/SensorCard';
import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import mqtt from 'mqtt';

interface SensorData {
  dht_valid: boolean;
  temp: number | null;
  hum: number | null;
  light: number;
  ir: boolean;
}

export default function HomeScreen() {
  const [sensorData, setSensorData] = useState<SensorData>({
    dht_valid: false,
    temp: null,
    hum: null,
    light: 0,
    ir: false,
  });

  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    const client = mqtt.connect('ws://broker.hivemq.com:8000/mqtt');

    client.on('connect', () => {
      client.subscribe('rainshield/sensors');
      setIsConnected(true);
    });

    client.on('message', (topic, message) => {
      try {
        const data = JSON.parse(message.toString());
        setSensorData(data);
      } catch (e) {
        console.error('Loi parse JSON:', e);
      }
    });

    return () => {
      client.end();
    };
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-slate-50">
      <StatusBar barStyle="dark-content" />
      
      {/* Khối chứa phần nội dung chính (Header + Cảm biến) */}
      <View style={{ flex: 1 }} className="pt-8 px-4">
        <Header isConnected={isConnected} />

        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
          <View className="px-3 md:px-8 lg:px-10 flex-row flex-wrap justify-evenly">
            <SensorCard 
              title="Nhiệt độ" 
              value={sensorData.dht_valid && sensorData.temp !== null ? sensorData.temp : 'N/A'} 
              unit={sensorData.dht_valid ? '°C' : ''} 
            />
            
            <SensorCard 
              title="Độ ẩm" 
              value={sensorData.dht_valid && sensorData.hum !== null ? sensorData.hum : 'N/A'} 
              unit={sensorData.dht_valid ? '%' : ''} 
            />
            
            <SensorCard 
              title="Ánh sáng" 
              value={sensorData.light} 
              unit="%" 
            />
            
            <SensorCard 
              title="Hồng ngoại (IR)" 
              value={sensorData.ir ? 'Phát hiện' : 'An toàn'} 
              valueColor={sensorData.ir ? 'text-pink-600' : 'text-emerald-600'}
            />
          </View>
        </ScrollView>
      </View>

      {/* Footer tự đính vào đáy màn hình */}
      <Footer />
    </SafeAreaView>
  );
}