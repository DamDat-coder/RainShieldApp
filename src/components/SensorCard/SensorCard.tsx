import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

interface SensorCardProps {
  title: string;
  value: string | number;
  unit?: string;
  valueColor?: string;
}

export const SensorCard: React.FC<SensorCardProps> = ({ title, value, unit, valueColor }) => {
  const { colors } = useTheme();

  return (
    <View 
      style={{ backgroundColor: colors.backgroundElement }} 
      className="w-[47%] p-4 rounded-2xl mb-2 shadow-sm border border-slate-200/10"
    >
      <Text style={{ color: colors.textSecondary }} className="text-sm font-medium mb-2">
        {title}
      </Text>
      <View className="flex-row items-baseline">
        <Text style={{ color: colors.text }} className={`text-2xl font-bold ${valueColor || ''}`}>
          {value}
        </Text>
        {unit && (
          <Text style={{ color: colors.textSecondary }} className="text-sm font-semibold ml-1">
            {unit}
          </Text>
        )}
      </View>
    </View>
  );
};