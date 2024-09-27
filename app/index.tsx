import React from "react"
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import Onboard from "@/assets/images/onboard.svg" // Ensure this path is correct
import { Colors } from "@/constants/Colors"
import { router } from "expo-router"

const Index = () => {
  return (
    <SafeAreaView>
      <StatusBar hidden />
      <View style={styles.container}>
        <Onboard width={300} height={300} />

        <Text
          style={{
            color: Colors.WHITE,
            fontSize: 25,
            textAlign: "center",
            marginTop: 12,
          }}
        >
          Smart Password Manager
        </Text>
        <Text style={styles.text}>"No More Hassle, Secure the Castle"</Text>
        <Text style={styles.text}>"No More Fear, Security’s Here" </Text>

        <TouchableOpacity
          style={{
            backgroundColor: Colors.BLACK,
            padding: 20,
            borderRadius: 20,
            marginTop: 34,
          }}
          onPress={() => router.push("/(auth)/Signup")}
        >
          <Text
            style={{
              color: Colors.WHITE,
              textAlign: "center",
              fontSize: 18,
            }}
          >
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Index

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    padding: 20,
    backgroundColor: Colors.GREEN,
  },
  text: {
    color: Colors.WHITE,
    fontSize: 14,
    textAlign: "center",
    marginTop: 12,
  },
})
