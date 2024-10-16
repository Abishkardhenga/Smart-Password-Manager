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
  const [details, setDetails] = useState<StoreDataProps | null>(null) // Store fetched details

  useEffect(() => {
    const fetchStoreDataById = async () => {
      setDetails(null)
      if (id) {
        const data = await getStoreDatabyId(id as string)
        setDetails(data as StoreDataProps)
      }
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
        <Viewdetailscard title="Title" value={details?.title!} />
        <Viewdetailscard title="Website" value={details?.website!} />
        <Viewdetailscard title="Label" value={details?.label_name!} />
        <Viewdetailscard
          title="Email/Phone no."
          value={details?.contact_info!}
        />
        <Viewdetailscard title="Password" value={details?.password!} />
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
