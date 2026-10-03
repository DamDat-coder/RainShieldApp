import React from "react";
import { Text, View } from "react-native";

export const Footer: React.FC = () => {
  return (
    <View className="w-full flex items-center bg-black justify-center mt-auto py-4 border-t border-slate-200">
      <Text className="text-xs text-slate-400 ">
        © 2026 RainShield System • Version 1.0.0
      </Text>
    </View>
  );
};
