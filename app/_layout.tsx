import { useState, useEffect } from "react"
import { CreateUserContext } from "@/context/CreateUserContext"
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native"
import { useFonts } from "expo-font"
import { Stack } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import "react-native-reanimated"
import { ToastProvider } from "react-native-toast-notifications"

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [userData, setUserData] = useState(null)
  const [refresh, setRefresh] = useState(false)
  const [editStoredData, setEditStoredData] = useState(false)
  const [editLabel, setEditLabel] = useState(false)

  useEffect(() => {
    SplashScreen.hideAsync()
  }, [])

  return (
    <CreateUserContext.Provider
      value={{
        userData,
        setUserData,
        refresh,
        setRefresh,
        editStoredData,
        setEditStoredData,
        editLabel,
        setEditLabel,
      }}
    >
      <ToastProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
      </ToastProvider>
    </CreateUserContext.Provider>
  )
}
