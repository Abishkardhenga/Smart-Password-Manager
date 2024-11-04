import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native"
import React, { useContext, useState } from "react"
import CustomInput from "@/components/CustomInput"
import CustomButton from "@/components/CustomButton"
import { Colors } from "@/constants/Colors"
import { router } from "expo-router"
import Authheader from "@/components/Authheader"
import firebase from "firebase/app"
import { sendPasswordResetEmail } from "firebase/auth"
import { auth, db } from "@/configs/Firebase.config"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { showToast } from "@/utilis/Toast.message"

const ForgetPassword = () => {
  const [email, setEmail] = useState<string>("")
  const [errorMessage, setErrorMessage] = useState(null)

  const handleSendOTP = async () => {
    try {
      const otp = Math.floor(100000 + Math.random() * 900000).toString() // Random 6 digit OTP
      await sendPasswordResetEmail(auth, email)
      showToast({
        type: "success",
        text: "Successfully send the reset password link in your email",
      })

      console.log(`OTP for ${email}: ${otp}`)
    } catch (error) {
      setErrorMessage(error as any)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Authheader />

      <View style={styles.innerContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Forget Password</Text>
          <Text
            style={{
              textAlign: "center",
              width: "80%",
              marginVertical: 10,
              lineHeight: 22,
              fontSize: 14,
              color: Colors.GRAY,
            }}
          >
            Enter the email address you registered below to reset your password
          </Text>
        </View>

        <CustomInput
          placeholder="Email Address"
          secureTextEntry={false}
          value={email}
          onChangeText={setEmail}
        />

        <CustomButton
          text="Verify Email Address"
          color={Colors.GREEN}
          onPress={handleSendOTP}
        />

        <View style={styles.footer}>
          <Text style={styles.footerText}> Don't have an account ?</Text>
          <TouchableOpacity onPress={() => router.replace("/(auth)/Signup")}>
            <Text style={styles.signUpText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default ForgetPassword

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
  },

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  footerText: {
    fontSize: 14,
    color: Colors.BLACK,
  },
  signUpText: {
    fontSize: 14,
    color: Colors.GREEN,
    fontWeight: "bold",
    marginLeft: 5,
  },
})
