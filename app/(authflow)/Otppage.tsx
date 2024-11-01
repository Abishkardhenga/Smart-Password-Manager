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

const Otppage = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const { userData, setUserData } = useContext(CreateUserContext)

  const confirmOtp = () => {}

  return (
    <SafeAreaView style={styles.container}>
      <Authheader />

      <View style={styles.innerContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Forget Password</Text>
          {/* <Text>
            Enter the 6 digit Otp code that is sent through your email
          </Text> */}
        </View>

        <CustomInput
          label=" "
          placeholder="example@gmail.com"
          secureTextEntry={false}
          value={email}
          onChangeText={setEmail}
        />

        <View style={styles.termsContainer}>
          <Text style={styles.termsText}>Didn't get the code ?</Text>
          <TouchableOpacity>
            <Text style={styles.linkText}> Resend Code</Text>
          </TouchableOpacity>
        </View>

        <CustomButton
          text="Verify email Address"
          color={Colors.GREEN}
          onPress={() => router.push("/Resetpassword")}
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
