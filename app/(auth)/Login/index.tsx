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
import LoginScreenImg from "@/assets/images/loginscreenimg.svg"
import Firstoval from "@/assets/images/Firstoval.svg"
import Secondoval from "@/assets/images/Secondoval.svg"
import Authheader from "@/components/Authheader"
import { login, sendEmailVerificationn } from "@/configs/Firebase.config"
import { showToast } from "@/utilis/Toast.message"
import { CreateUserContext } from "@/context/CreateUserContext"
import { ActivityIndicator, MD2Colors } from "react-native-paper"

const Login = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const { userData, setUserData } = useContext(CreateUserContext)

  const onLogin = async (email: string, password: string) => {
    // Check for missing email or password
    if (!email || !password) {
      showToast({
        type: "danger",
        text: "Please enter both email and password.",
      })
      return
    }

    // Show loading indicator
    setLoading(true)

    try {
      // Attempt to log in the user
      const loginUser = await login(email, password)

      // Check if the user's email is verified
      if (!loginUser?.emailVerified) {
        await sendEmailVerificationn(loginUser!)
        showToast({
          type: "danger",
          text: "Email not verified. A new verification email has been sent.",
        })
        return
      }

      setUserData(loginUser)
      router.push("/(tabs)/")
      console.log("LoginUser:", loginUser)

      showToast({
        type: "success",
        text: "Successfully logged in.",
      })
    } catch (error: any) {
      let errorMessage = "Something went wrong"

      if (error.code === "auth/invalid-email") {
        errorMessage = "The email address is not registered."
      } else if (error.code === "auth/user-not-found") {
        errorMessage = "No user found with this email."
      } else if (error.code === "auth/wrong-password") {
        errorMessage = "Incorrect password. Please try again."
      } else if (error.code === "auth/network-request-failed") {
        errorMessage = "Network error. Please check your connection."
      } else {
        console.error("Unexpected error:", error)
      }

      // Log the error for debugging purposes
      console.error("Error during login: ", error)

      // Show error message to the user
      showToast({
        type: "danger",
        text: errorMessage,
      })
    } finally {
      // Hide loading indicator
      setLoading(false)
    }
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
          <Text style={styles.termsText}>Remember me</Text>
          <TouchableOpacity
            onPress={() => {
              router.push("/(authflow)/Forgetpassword")
            }}
          >
            <Text style={styles.linkText}> Forget Password ? </Text>
          </TouchableOpacity>
        </View>

        <CustomButton
          text={loading ? null : "Login"}
          color={Colors.GREEN}
          onPress={() => onLogin(email, password)}
        >
          {loading && (
            <ActivityIndicator animating={true} color={MD2Colors.white} />
          )}
        </CustomButton>

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
