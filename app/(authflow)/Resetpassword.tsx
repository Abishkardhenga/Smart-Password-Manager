import { SafeAreaView, StyleSheet, Text, View } from "react-native"
import React, { useContext, useState } from "react"
import CustomInput from "@/components/CustomInput"
import CustomButton from "@/components/CustomButton"
import { Colors } from "@/constants/Colors"
import Authheader from "@/components/Authheader"
import { showToast } from "@/utilis/Toast.message"
import { CreateUserContext } from "@/context/CreateUserContext"
import { router } from "expo-router"
import { firebase } from "@/configs/Firebase.config"

const Resetpassword = () => {
  const [password, setPassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")
  const { userData } = useContext(CreateUserContext)

  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      showToast({ type: "danger", text: "Password don't match" })
      return
    }
    try {
      const user = firebase.auth().currentUser
      if (user) {
        await user.updatePassword(password) // Update the password
        showToast({ type: "success", text: "Successfull reset the password" })
        router.back() // Navigate back to the login screen
      } else {
        showToast({ type: "danger", text: "User not authenticated" })
      }
    } catch (error: any) {
      showToast(error.message || "Error resetting password")
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Authheader />

      <View style={styles.innerContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Reset Password</Text>
          <Text style={styles.subtitle}>
            Enter your new password below. Make sure it's a strong combination.
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <CustomInput
            placeholder="New password"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
          <CustomInput
            placeholder="Confirm new password"
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>

        <CustomButton
          text="Reset Password"
          color={Colors.GREEN}
          onPress={handleResetPassword}
        />
      </View>
    </SafeAreaView>
  )
}

export default Resetpassword

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
  subtitle: {
    textAlign: "center",
    width: "90%",
    marginVertical: 10,
    lineHeight: 22,
    fontSize: 14,
    color: Colors.GRAY,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
})
