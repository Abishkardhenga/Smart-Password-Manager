import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native"
import React, { useState } from "react"
import CustomInput from "@/components/CustomInput"
import CustomButton from "@/components/CustomButton"
import { Colors } from "@/constants/Colors"
import { router } from "expo-router"
import Firstoval from "@/assets/images/Firstoval.svg"
import Secondoval from "@/assets/images/Secondoval.svg"
import Authheader from "@/components/Authheader"
import { signup } from "@/configs/Firebase.config"
import { showToast } from "@/utilis/Toast.message"

const Signup = () => {
  const [email, setEmail] = useState<string>("")
  const [name, setName] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const onCreateAccount = async (
    email: string,
    password: string,
    name: string
  ) => {
    if (!email || !password || !name) {
      showToast({ type: "success", text1: "Please fill in all details " })
      console.log("Please fill in all details")

      return
    }

    const data = await signup(email, password)
    showToast({ type: "success", text1: "Signup successfully" })

    router.push("/(tabs)/")
    console.log("Data on signup:", data)
  }

  return (
    <SafeAreaView style={styles.container}>
      <Authheader />

      <View style={styles.innerContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Create User Account</Text>
          <Text style={styles.subtitle}>Become a New User</Text>
        </View>

        <View style={styles.inputContainer}>
          <CustomInput
            label="Name"
            placeholder="Aabiskar Dhenga"
            secureTextEntry={false}
            value={name}
            onChangeText={setName}
          />
          <CustomInput
            label="Email"
            placeholder="example@gmail.com"
            secureTextEntry={false}
            value={email}
            onChangeText={setEmail}
          />
          <CustomInput
            label="Password"
            placeholder="Enter your password"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <View style={styles.termsContainer}>
          <Text style={styles.termsText}>I agree with</Text>
          <TouchableOpacity>
            <Text style={styles.linkText}> Terms and Conditions</Text>
          </TouchableOpacity>
        </View>

        <CustomButton
          text="Sign Up"
          color={Colors.GREEN}
          onPress={() => onCreateAccount(email, password, name)}
        />

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => router.replace("/(auth)/Login")}>
            <Text style={styles.signinText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Signup

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
    alignItems: "flex-start",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.BLACK,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.BLACK,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
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
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  footerText: {
    fontSize: 14,
    color: Colors.BLACK,
  },
  signinText: {
    fontSize: 14,
    color: Colors.GREEN,
    fontWeight: "bold",
    marginLeft: 5,
  },
})
