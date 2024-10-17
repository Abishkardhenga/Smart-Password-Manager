import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React from "react"
import Feather from "@expo/vector-icons/Feather"
import { Colors } from "@/constants/Colors"
import { showToast } from "@/utilis/Toast.message"
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder"
import { LinearGradient } from "expo-linear-gradient"

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)

interface ViewDetailCardProps {
  title: string
  value: string
  isLoading?: boolean
}

const ViewDetailsCard = ({ title, value, isLoading }: ViewDetailCardProps) => {
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
      {isLoading ? (
        <View style={{ flexDirection: "column" }}>
          <ShimmerPlaceholder
            style={{
              width: "100%",
              height: 24,
              borderRadius: 4,
              marginBottom: 8,
            }}
          />
          <ShimmerPlaceholder
            style={{
              width: "100%",
              height: 18,
              borderRadius: 4,
            }}
          />
        </View>
      ) : (
        <>
          <View style={{ flexDirection: "column" }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "600",
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
          {title !== "Title" && title !== "Label" && (
            <TouchableOpacity
              onPress={() =>
                showToast({ type: "success", text: "Successfully Copied" })
              }
            >
              <Feather name="clipboard" size={24} color={Colors.GRAY} />
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  )
}

export default ViewDetailsCard

const styles = StyleSheet.create({})
