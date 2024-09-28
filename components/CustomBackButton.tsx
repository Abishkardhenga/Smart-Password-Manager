import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React from "react"
import Ionicons from "@expo/vector-icons/Ionicons"
import { router } from "expo-router"
import { Colors } from "@/constants/Colors"

interface buttonProps {
  label: string
}

const CustomBackButton = ({ label }: buttonProps) => {
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        backgroundColor: Colors.WHITE,
        alignItems: "center",
        gap: 30,
      }}
    >
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back-outline" size={24} color={Colors.BLACK} />
      </TouchableOpacity>
      {label && (
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 30,
          }}
        >
          {label}
        </Text>
      )}
    </View>
  )
}

export default CustomBackButton

const styles = StyleSheet.create({})
