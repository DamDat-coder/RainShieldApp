import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';

export function Navigation() {
  const { colors, theme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2563eb', // Màu xanh khi active
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.background, // Đổi màu nền Tab bar
          borderTopWidth: 1,
          borderTopColor: theme === 'dark' ? '#27272a' : '#e2e8f0',
          height: 60,
          paddingBottom: 8,
          paddingTop: 6,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Trang chủ',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name={focused ? 'home' : 'home-outline'} 
              size={20} 
              color={color} 
            />
          ),
        }}
      />

      <Tabs.Screen
        name="action"
        options={{
          title: 'Điều khiển',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name={focused ? 'settings' : 'settings-outline'} 
              size={20} 
              color={color} 
            />
          ),
        }}
      />
    </Tabs>
  );
}