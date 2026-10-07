import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

export const Footer: React.FC = () => {
  const { colors, theme } = useTheme();

  return (
    <View 
      style={{ 
        backgroundColor: colors.backgroundElement,
        borderColor: theme === 'dark' ? '#27272a' : '#e2e8f0' 
      }} 
      className="w-full py-4 border-t items-center"
    >
      <Text style={{ color: colors.textSecondary }} className="text-xs">
        © 2026 RainShield System • Version 1.0.0
      </Text>
    </View>
  );
};