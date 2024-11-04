import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native"
import React, { useState, useRef } from "react"
import CustomButton from "@/components/CustomButton"
import { Colors } from "@/constants/Colors"
import { router } from "expo-router"
import Authheader from "@/components/Authheader"
import { auth, firebase } from "@/configs/Firebase.config"

const Otppage = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [errorMessage, setErrorMessage] = useState<string | null>(null) // Add error state

  const otpInputs = Array.from({ length: 6 }, () => useRef(null))

  return (
    <SafeAreaView style={styles.container}>
      <Authheader />

      <View style={styles.innerContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Verify OTP</Text>
          <Text style={styles.subtitle}>
            Enter the 6-digit code sent to your email below
          </Text>
        </View>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={otpInputs[index]}
              style={styles.otpInput}
              keyboardType="number-pad"
              maxLength={1}
              value={digit}
              onChangeText={() => {}}
            />
          ))}
        </View>

        {errorMessage && <Text style={{ color: "red" }}>{errorMessage}</Text>}

        <View style={styles.termsContainer}>
          <Text style={styles.termsText}>Didn't get the code?</Text>
          <TouchableOpacity onPress={() => console.log("Resend OTP logic")}>
            <Text style={styles.linkText}> Resend Code</Text>
          </TouchableOpacity>
        </View>

        <CustomButton
          text="Verify OTP"
          color={Colors.GREEN}
          onPress={() => {}}
        />
      </View>
    </SafeAreaView>
  )
}

export default Otppage

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: Colors.WHITE,
  },
  innerContainer: {
    height: "100%",
    width: "100%",
    paddingHorizontal: 30,
    justifyContent: "flex-start",
  },
  headerContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: Colors.BLACK,
    letterSpacing: 1,
    marginBottom: 10,
  },
  subtitle: {
    textAlign: "center",
    width: "90%",
    marginVertical: 10,
    lineHeight: 22,
    fontSize: 14,
    color: Colors.GRAY,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 30,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: Colors.GRAY,
    borderRadius: 8,
    textAlign: "center",
    fontSize: 18,
    color: Colors.BLACK,
  },
  termsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  termsText: {
    fontSize: 14,
    color: Colors.BLACK,
  },
  linkText: {
    fontSize: 14,
    color: Colors.GREEN,
    fontWeight: "bold",
    marginLeft: 5,
  },
})
