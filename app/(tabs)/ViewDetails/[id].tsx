import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import React, { useEffect, useState } from "react"
import CustomBackButton from "@/components/CustomBackButton"
import Viewdetailscard from "@/components/Viewdetailscard"
import Feather from "@expo/vector-icons/Feather"
import { Colors } from "@/constants/Colors"
import { router, useLocalSearchParams } from "expo-router"
import { getStoreDatabyId } from "@/configs/Firebase.config"
import { StoreDataProps } from "@/types/Label.types"

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
  const { id } = useLocalSearchParams()
  const [details, setDetails] = useState<StoreDataProps>()

  useEffect(() => {
    const fetchStoreDataById = async () => {
      const data = await getStoreDatabyId(
        "05e497b9-f3b5-4a80-aa4c-86c29f46f60b"
      )
      console.log("data", data)
    }
    fetchStoreDataById()
  }, [id])

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
          onPress={() => router.push("/Addpassword")}
        >
          <Feather name="edit" size={36} color={Colors.BLACK} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default ViewDetails

const styles = StyleSheet.create({})
