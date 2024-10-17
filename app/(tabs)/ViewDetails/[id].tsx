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

const ViewDetails = () => {
  const { id } = useLocalSearchParams()
  const [details, setDetails] = useState<StoreDataProps | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchStoreDataById = async () => {
      setIsLoading(true)
      if (id) {
        const data = await getStoreDatabyId(id as string)
        setDetails(data as StoreDataProps)
      }
      setIsLoading(false)
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
        <Viewdetailscard
          title="Title"
          value={details?.title!}
          isLoading={isLoading}
        />
        <Viewdetailscard
          title="Website"
          value={details?.website!}
          isLoading={isLoading}
        />
        <Viewdetailscard
          title="Label"
          value={details?.label_name!}
          isLoading={isLoading}
        />
        <Viewdetailscard
          title="Email/Phone no."
          value={details?.contact_info!}
          isLoading={isLoading}
        />
        <Viewdetailscard
          title="Password"
          value={details?.password!}
          isLoading={isLoading}
        />
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
