import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React, { ReactNode } from "react"
import { Colors } from "@/constants/Colors"

interface buttonProps {
  color: string
  text: string | null
  onPress?: () => void
  children?: ReactNode
}

const CustomButton = ({ color, text, onPress, children }: buttonProps) => {
  return (
    <View
      style={{
        backgroundColor: color,
        padding: 18,
        borderRadius: 18,
        width: "100%",
      }}
    >
      <TouchableOpacity onPress={onPress}>
        {children ? (
          children // Render children if they exist (e.g., ActivityIndicator)
        ) : (
          <Text
            style={{
              color: Colors.WHITE,
              textAlign: "center",
              fontSize: 18,
            }}
          >
            {text}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  )
}

export default CustomButton

const styles = StyleSheet.create({})
