import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { ThemeToggle } from '../ThemeToggle';

export const Header = ({ isConnected }: { isConnected: boolean }) => {
  const { colors } = useTheme();

  return (
    <View className="flex-row items-center justify-between py-4 px-1">
      <View>
        <Text style={{ color: colors.text }} className="text-2xl font-bold">
          RainShield
        </Text>
        <View className="flex-row items-center mt-1">
          <View className={`w-2.5 h-2.5 rounded-full mr-2 ${isConnected ? 'bg-emerald-500' : 'bg-rose-500'}`} />
          <Text style={{ color: colors.textSecondary }} className="text-xs">
            {isConnected ? 'Đã kết nối' : 'Mất kết nối'}
          </Text>
        </View>
      </View>

      {/* Nút chuyển đổi Theme ở góc trên bên phải */}
      <ThemeToggle />
    </View>
  );
};