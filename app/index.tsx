import React from "react"
import { StyleSheet, Text, View } from "react-native"
import Onboard from "@/assets/images/onboard.svg" // Ensure this path is correct

const Index = () => {
  return (
    <View style={styles.container}>
      <Onboard width={200} height={200} />
      <Text>Index</Text>
    </View>
  )
}

export default Index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})
