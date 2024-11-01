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
import { login } from "@/configs/Firebase.config"
import { showToast } from "@/utilis/Toast.message"
import { CreateUserContext } from "@/context/CreateUserContext"

const Resetpassword = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const { userData, setUserData } = useContext(CreateUserContext)

  const resetPassword = () => {}

  return (
    <SafeAreaView style={styles.container}>
      <Authheader />

      <View style={styles.innerContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Reset Password !!!</Text>
        </View>

        <View style={styles.inputContainer}>
          <CustomInput
            label=" "
            placeholder="New  password"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
          <CustomInput
            label=" "
            placeholder="Enter  password Again"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <CustomButton
          text="Reset Password"
          color={Colors.GREEN}
          onPress={() => {}}
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
