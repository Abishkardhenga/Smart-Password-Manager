import { StyleSheet, Text, View } from "react-native"
import React from "react"
import Firstoval from "@/assets/images/Firstoval.svg"
import Secondoval from "@/assets/images/Secondoval.svg"

const Authheader = () => {
  return (
    <View
      style={{
        flexDirection: "row",
      }}
    >
      <Firstoval width={200} height={100} />
      <Secondoval
        width={400}
        style={{
          position: "absolute",
        }}
        height={80}
      />
    </View>
  )
}

export default Authheader

const styles = StyleSheet.create({})
