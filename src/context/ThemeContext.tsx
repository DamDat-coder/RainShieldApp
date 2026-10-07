import { Colors } from '@/constants/theme';
import React, { createContext, useContext, useState } from 'react';


type ThemeMode = 'light' | 'dark';

// Định nghĩa kiểu chung đại diện cho bộ màu (màu sắc là string)
type ThemeColorSet = Record<keyof typeof Colors.light, string>;

interface ThemeContextType {
  theme: ThemeMode;
  colors: ThemeColorSet;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeMode>('light');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Ép kiểu về ThemeColorSet để TypeScript hiểu đúng kiểu string linh hoạt
  const colors = Colors[theme] as ThemeColorSet;

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};