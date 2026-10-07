import React from 'react';
import { View } from 'react-native';
import { Footer } from '@/components/Footer/Footer';
import { useTheme } from '@/context/ThemeContext';
import { Navigation } from '@/components/Navigation/Navigtation'; // Nhập đường dẫn đúng tới file Nav của bạn

export default function TabLayout() {
  const { colors } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }} className='px-4 md:px-4 lg:px-10 xl:px-16'>
      <Navigation />
      <Footer />
    </View>
  );
}