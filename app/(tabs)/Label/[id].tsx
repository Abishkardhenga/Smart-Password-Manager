import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import React, { useEffect, useState } from "react"
import { useLocalSearchParams } from "expo-router"
import CustomBackButton from "@/components/CustomBackButton"
import { StoreDataProps } from "@/types/Label.types"
import { getStoredDataByLabel } from "@/configs/Firebase.config"

const Label = () => {
  const { id } = useLocalSearchParams()

  const [loading, setLoading] = useState<boolean>(false)

  const fetchLabelbyId = async (id: string) => {
    setLoading(true)
    try {
      const data = await getStoredDataByLabel(id)
      console.log("Store data by label ", data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  useEffect(() => {
    if (id) {
      setLoading(true), console.log("item")
      fetchLabelbyId(id as string)
    } else {
      setLoading(false)
    }
  }, [id])

  return id ? (
    <View style={styles.container}>
      <CustomBackButton label="Personal" />
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search Password"
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>
      <Text>Dhenga</Text>
    </View>
  ) : (
    <View>
      <Text>No id </Text>
    </View>
  )
}

export default Label

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 8,
  },
  searchButton: {
    backgroundColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    paddingHorizontal: 16,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  container: {
    height: "100%",
    width: "100%",
    padding: 16,
  },
})
