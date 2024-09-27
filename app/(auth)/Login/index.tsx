import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native"
import React from "react"
import CustomInput from "@/components/CustomInput"
import CustomButton from "@/components/CustomButton"
import { Colors } from "@/constants/Colors"
import { router } from "expo-router"

const Login = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Welcome Back !!!</Text>
        </View>

        {/* Input Fields */}
        <View style={styles.inputContainer}>
          <CustomInput
            label="Email"
            placeholder="example@gmail.com"
            secureTextEntry={false}
          />
          <CustomInput
            label="Password"
            placeholder="Enter your password"
            secureTextEntry={true}
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
          address={() => router.push("/(tabs)/")}
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
    alignItems: "flex-start",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.BLACK,
    marginBottom: 5,
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
