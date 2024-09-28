import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React from "react"
import { Colors } from "@/constants/Colors"
import FontAwesome from "@expo/vector-icons/FontAwesome"

interface passwordcardProps {
  title: string
  address: () => void
  color: string
  emailOrNumber: string
}

const Passwordcard = ({
  title,
  address,
  color,
  emailOrNumber,
}: passwordcardProps) => {
  return (
    <View
      style={[
        {
          width: "70%",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 17,
          borderRadius: 12,
          padding: 15,
        },
        { backgroundColor: color },
      ]}
    >
      <View
        style={{
          flexDirection: "column",
          gap: 12,
        }}
      >
        <Text
          style={{
            fontSize: 10,
            fontWeight: "semibold",
            color: Colors.WHITE,
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            fontSize: 15,
            fontWeight: "400",
            color: Colors.WHITE,
          }}
        >
          {emailOrNumber}
        </Text>
      </View>
      <TouchableOpacity onPress={address}>
        <FontAwesome name="external-link" size={24} color={Colors.WHITE} />
      </TouchableOpacity>
    </View>
  )
}

export default Passwordcard

const styles = StyleSheet.create({})
