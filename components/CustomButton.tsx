import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React from "react"
import { Colors } from "@/constants/Colors"

interface buttonProps {
  color: string
  text: string
  address: () => void
}

const CustomButton = ({ color, text, address }: buttonProps) => {
  return (
    <View
      style={{
        backgroundColor: color,
        padding: 18,
        borderRadius: 18,
        width: "100%",
      }}
    >
      <TouchableOpacity onPress={address}>
        {text && (
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
