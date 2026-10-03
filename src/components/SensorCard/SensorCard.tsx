import React from 'react';
import { View, Text } from 'react-native';

interface SensorCardProps {
  title: string;
  value: string | number;
  unit?: string;
  valueColor?: string;
}

export const SensorCard: React.FC<SensorCardProps> = ({ 
  title, 
  value, 
  unit = '', 
  valueColor = 'text-slate-900' 
}) => {
  return (
    <View className="bg-white w-[48%] p-5 rounded-2xl mb-4 shadow-sm border border-slate-100">
      <Text className="text-sm text-slate-500 mb-2 font-medium">{title}</Text>
      <Text className={`text-2xl font-bold ${valueColor}`}>
        {value} {unit}
      </Text>
    </View>
  );
};