import { StyleSheet } from "react-native"
import React from "react"
import { Tabs } from "expo-router"
import { Colors } from "@/constants/Colors"
import Ionicons from "@expo/vector-icons/Ionicons"
import AntDesign from "@expo/vector-icons/AntDesign"

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.GREEN,
          height: 60,
        },
        tabBarActiveTintColor: Colors.WHITE, // Active tab color is white
        tabBarInactiveTintColor: Colors.LIGHT_GRAY, // Inactive tab color is light gray
        tabBarLabelStyle: {
          fontSize: 14,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Saved"
        options={{
          title: "Saved",
          tabBarIcon: ({ color }) => (
            <Ionicons name="bookmark-outline" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Setting"
        options={{
          title: "Setting",
          tabBarIcon: ({ color }) => (
            <AntDesign name="setting" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  )
}

export default TabLayout

const styles = StyleSheet.create({})
