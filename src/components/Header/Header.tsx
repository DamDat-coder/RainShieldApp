import React from 'react';
import { View, Text } from 'react-native';

interface HeaderProps {
  isConnected: boolean;
}

export const Header: React.FC<HeaderProps> = ({ isConnected }) => {
  return (
    <View className="items-center py-6">
      <Text className="text-2xl font-bold text-slate-800 mb-2">
        RainShield
      </Text>
      <View className="flex-row items-center">
        <View 
          className={`w-2.5 h-2.5 rounded-full mr-2 ${
            isConnected ? 'bg-green-500' : 'bg-red-500'
          }`} 
        />
        <Text className="text-sm text-slate-500 font-medium">
          {isConnected ? 'Đã kết nối' : 'Mất kết nối'}
        </Text>
      </View>
    </View>
  );
};