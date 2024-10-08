import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React from "react"
import Ionicons from "@expo/vector-icons/Ionicons"
import AppLogo from "@/assets/images/applogo.svg"
import { Colors } from "@/constants/Colors"
import { router } from "expo-router"

const Index = () => {
  return (
    <View style={styles.container}>
      <AppLogo width={200} height={200} />
      <Text style={styles.title}>Smart Password Manager</Text>

      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => router.navigate("/Addpassword")}
      >
        <Ionicons name="add-circle-outline" size={80} color={Colors.GREEN} />
      </TouchableOpacity>
    </View>
  )
}

export default Index

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
  iconContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
    padding: 10,
  },
})
