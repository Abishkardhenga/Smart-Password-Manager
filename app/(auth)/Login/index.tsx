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
import LoginScreenImg from "@/assets/images/loginscreenimg.svg"
import Firstoval from "@/assets/images/Firstoval.svg"
import Secondoval from "@/assets/images/Secondoval.svg"
import Authheader from "@/components/Authheader"
import { login } from "@/configs/Firebase.config"
import { showToast } from "@/utilis/Toast.message"

const Login = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const onLogin = async (emai: string, password: string) => {
    if (!email && !password) {
      showToast({ type: "error", text1: "Please fill in all details " })
      return
    }
    const loginUser = await login(email, password)
    router.push("/(tabs)/")
    console.log("loginUser", loginUser)
    showToast({ type: "success", text1: "Login successfully" })
  }
  return (
    <SafeAreaView style={styles.container}>
      <Authheader />

      <View style={styles.innerContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Welcome Back !!!</Text>
        </View>
        <LoginScreenImg width={250} height={150} />

        <View style={styles.inputContainer}>
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
          text="Login"
          color={Colors.GREEN}
          onPress={() => onLogin(email, password)}
        />

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => router.replace("/(auth)/Signup")}>
            <Text style={styles.signUpText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Login

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
    fontSize: 24,
    fontWeight: "bold",
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
  signUpText: {
    fontSize: 14,
    color: Colors.GREEN,
    fontWeight: "bold",
    marginLeft: 5,
  },
})
