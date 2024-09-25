import { StyleSheet, Text, View } from "react-native"
import React from "react"
import { Tabs } from "expo-router"

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="Saved" options={{ title: "Search" }} />
      <Tabs.Screen name="Setting" options={{ title: "Settings" }} />
    </Tabs>
  )
}

export default TabLayout

const styles = StyleSheet.create({})
