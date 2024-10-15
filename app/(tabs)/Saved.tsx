import Passwordcard from "@/components/Passwordcard"
import { Colors } from "@/constants/Colors"
import { router } from "expo-router"
import React, { useEffect, useState } from "react"
import MaterialIcons from "@expo/vector-icons/MaterialIcons"

import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native"
import Ionicons from "@expo/vector-icons/Ionicons"
import {
  deleteLabel,
  getLabelsByUser,
  getStoredData,
} from "@/configs/Firebase.config"
import { CategoryProps } from "./Addpassword"
import uuid from "react-native-uuid"
import { StoreDataProps } from "@/types/Label.types"

const Saved = () => {
  const [category, setCategory] = useState<CategoryProps[]>([])
  const [StoredData, setStoredData] = useState<StoreDataProps[]>([])

  useEffect(() => {
    const fetchLabel = async () => {
      const labels = await getLabelsByUser()
      console.log("Label:", labels)
      labels.forEach((labels: any) => {
        console.log("Label ID:", labels.id) // Ensure IDs are correct
      })
      setCategory(labels)
    }

    fetchLabel() // Call the function to fetch labels
  }, [])

  useEffect(() => {
    const FetchStore_data = async () => {
      const data = await getStoredData()
      setStoredData(data)
    }
    FetchStore_data()
  }, [])

  const deleteLabels = async (id: string) => {
    console.log("deleting item", id)
    const deleted = await deleteLabel(id)
    if (deleted) {
      console.log("Label deleted successfully")
    } else {
      console.log("Failed to delete label")
    }
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
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
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={() => router.push("/(tabs)/AddLabel")}>
            <Ionicons name="add-circle-outline" size={54} color="#f44336" />
          </TouchableOpacity>

          <FlatList
            data={category} // Use the dynamic category data
            renderItem={({ item }) => (
              <View
                style={[
                  styles.categoryContainer,
                  { backgroundColor: item.color || "#ccc" }, // Use a default color if not provided
                ]}
              >
                <Text style={[styles.categoryText, { color: "#fff" }]}>
                  {item.name}
                </Text>
                <TouchableOpacity onPress={() => deleteLabels(item.id!)}>
                  <MaterialIcons name="delete" size={24} color="black" />
                </TouchableOpacity>
              </View>
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <View style={styles.noPasswordContainer}>
          <FlatList
            data={StoredData}
            renderItem={({ item }) => (
              <Passwordcard
                title={item.title} // Assuming `StoredData` has title
                emailOrNumber={item.contact_info} // Assuming `StoredData` has emailOrNumber
                address={() =>
                  router.push({
                    pathname: "/(tabs)/ViewDetails/[id]",
                    params: { id: item.id! },
                  })
                }
                color="#000"
              />
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    padding: 16,
  },
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
  categoryContainer: {
    marginTop: 6,
    borderRadius: 18,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 23,
    marginRight: 12,
  },
  categoryText: {
    fontWeight: "bold",
    textAlign: "center",
  },
  noPasswordContainer: {
    height: "75%",
  },
  noPasswordText: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.BLACK,
  },
})

export default Saved
