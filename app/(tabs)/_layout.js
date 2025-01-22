import { Tabs } from 'expo-router';
import React from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather'; 

function TabBarIcon({ name, size, color }) {
  return <MaterialIcons name={name} size={size} color={color} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false, // Hides the text labels
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <Feather name="check-square" size={24} color="grey" />
          ),
        }}
      />
      <Tabs.Screen
        name="notes"
        options={{
          tabBarIcon: () => (
            <MaterialIcons name="notes" size={24} color="grey" />
          ),
        }}
      />
    </Tabs>
  );
}
