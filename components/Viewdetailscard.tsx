import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React from "react"
import Feather from "@expo/vector-icons/Feather"
import { Colors } from "@/constants/Colors"
import { showToast } from "@/utilis/Toast.message"

interface viewdetailCardProps {
  title: string
  value: string
}

const Viewdetailscard = ({ title, value }: viewdetailCardProps) => {
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 17,
      }}
    >
      <View
        style={{
          flexDirection: "column",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "semibold",
            color: Colors.BLACK,
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            fontSize: 15,
            fontWeight: "400",
            color: Colors.GRAY,
          }}
        >
          {value}
        </Text>
      </View>
      {title === "Title" || title === "Label" ? null : (
        <TouchableOpacity
          onPress={() =>
            showToast({ type: "success", text: "Successfully Copied" })
          }
        >
          <Feather name="clipboard" size={24} color={Colors.GRAY} />
        </TouchableOpacity>
      )}
    </View>
  )
}

export default Viewdetailscard

const styles = StyleSheet.create({})
