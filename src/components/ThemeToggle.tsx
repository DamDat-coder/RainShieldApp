import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme, colors } = useTheme();

  return (
    <TouchableOpacity
      onPress={toggleTheme}
      style={{ backgroundColor: colors.backgroundElement }}
      className="p-3 rounded-full shadow-sm border border-slate-200/20"
    >
      <Ionicons
        name={theme === 'light' ? 'moon' : 'sunny'}
        size={22}
        color={theme === 'light' ? '#2563eb' : '#f59e0b'}
      />
    </TouchableOpacity>
  );
};