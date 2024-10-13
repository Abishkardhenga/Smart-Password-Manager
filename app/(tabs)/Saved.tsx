import Passwordcard from "@/components/Passwordcard"
import { Colors } from "@/constants/Colors"
import { router } from "expo-router"
import React, { useEffect, useState } from "react"
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
import { getLabelsByUser } from "@/configs/Firebase.config"
import { CategoryProps } from "./Addpassword"
import uuid from "react-native-uuid"

const Saved = () => {
  const [category, setCategory] = useState<CategoryProps[]>([])

  useEffect(() => {
    const fetchLabel = async () => {
      const label = await getLabelsByUser()
      console.log("Label:", label)
      setCategory(label)
    }

    fetchLabel() // Call the function to fetch labels
  }, [])

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
              </View>
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <View style={styles.noPasswordContainer}>
          {/* Placeholder for password cards; replace with actual data later */}
          <Passwordcard
            title="Facebook"
            emailOrNumber="98765456789"
            address={() => router.push("/(tabs)/ViewDetails")}
            color="#000"
          />
          <Passwordcard
            title="Gmail"
            emailOrNumber="98765456789"
            address={() => router.push("/(tabs)/ViewDetails")}
            color="#f44336"
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
