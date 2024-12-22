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
import Firstoval from "@/assets/images/Firstoval.svg"
import Secondoval from "@/assets/images/Secondoval.svg"
import Authheader from "@/components/Authheader"
import { showToast } from "@/utilis/Toast.message"
import { CreateUserContext } from "@/context/CreateUserContext"
import { ActivityIndicator, MD2Colors } from "react-native-paper"
import { signup } from "@/lib/authentication"

const Signup = () => {
  const [email, setEmail] = useState<string>("")
  const [name, setName] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const { userData, setUserData } = useContext(CreateUserContext)

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const onCreateAccount = async (
    email: string,
    password: string,
    name: string
  ) => {
    setLoading(true) // Start loading

    try {
      if (!email || !password || !name) {
        showToast({ type: "danger", text: "Please fill in all the details." })
        setLoading(false) // Stop loading
        return
      }

      if (!isValidEmail(email)) {
        showToast({
          type: "danger",
          text: "Please enter a valid email address.",
        })
        setLoading(false) // Stop loading
        return
      }

      if (password.length < 6) {
        showToast({
          type: "danger",
          text: "Password must be at least 6 characters.",
        })
        setLoading(false) // Stop loading
        return
      }

      const data = await signup(email, password, name)
      setUserData(data)
      showToast({
        type: "success",
        text: "Signup successful! A verification email has been sent.",
      })
    } catch (error: any) {
      console.error("Error during signup:", error)

      if (error.code === "auth/email-already-in-use") {
        showToast({
          type: "danger",
          text: "This email is already in use. Please use a different email.",
        })
      } else {
        showToast({
          type: "danger",
          text: error.message || "Signup failed. Please try again.",
        })
      }
    } finally {
      setLoading(false) // Ensure loading stops after success or error
    }
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
          <Text style={styles.termsText}>Remember me </Text>
          <TouchableOpacity
            onPress={() => router.push("/(authflow)/Forgetpassword")}
          >
            <Text style={styles.linkText}> Forget Password ? </Text>
          </TouchableOpacity>
        </View>

        <CustomButton
          text="Sign Up"
          color={Colors.GREEN}
          onPress={() => onCreateAccount(email, password, name)}
        >
          {loading && (
            <ActivityIndicator animating={true} color={MD2Colors.white} />
          )}
        </CustomButton>

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
