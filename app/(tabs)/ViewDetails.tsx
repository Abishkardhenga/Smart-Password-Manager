import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import React from "react"
import CustomBackButton from "@/components/CustomBackButton"
import Viewdetailscard from "@/components/Viewdetailscard"
import Feather from "@expo/vector-icons/Feather"
import { Colors } from "@/constants/Colors"

interface viewdetailsProps {
  title: string
  website: string
  Label?: string
  emailorphone: string
  password: string
}

const ViewDetails = ({
  title,
  website,
  Label,
  emailorphone,
  password,
}: viewdetailsProps) => {
  return (
    <SafeAreaView>
      <View
        style={{
          height: "100%",
          width: "100%",
          padding: 20,
        }}
      >
        <CustomBackButton label="View Details" />
        <Viewdetailscard title="Title" value="Facebook Password" />
        <Viewdetailscard title="Website" value="www.facebook.com" />
        <Viewdetailscard title="Label" value="Personal" />
        <Viewdetailscard
          title="Email/Phone no."
          value="Aabiskardhenga29@gmail.com"
        />
        <Viewdetailscard title="Password" value="Hackmeifyoucan" />
        <TouchableOpacity
          style={{
            position: "absolute",
            bottom: 42,
            right: 12,
          }}
        >
          <Feather name="edit" size={36} color={Colors.BLACK} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default ViewDetails

const styles = StyleSheet.create({})
