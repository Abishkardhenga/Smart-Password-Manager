import Passwordcard from "@/components/Passwordcard"
import { Colors } from "@/constants/Colors"
import { router } from "expo-router"
import React from "react"
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native"

const Saved = () => {
  const passwordCategories = [
    { id: "1", name: "All", backgroundColor: "#000", textColor: "#fff" },
    {
      id: "2",
      name: "Personal",
      backgroundColor: "#ffeb3b",
      textColor: "#000",
    },
    {
      id: "3",
      name: "Official",
      backgroundColor: "#f44336",
      textColor: "#fff",
    },
    { id: "4", name: "Finance", backgroundColor: "#4caf50", textColor: "#fff" },
  ]

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

        <FlatList
          data={passwordCategories}
          renderItem={({ item }) => (
            <View
              style={[
                styles.categoryContainer,
                { backgroundColor: item.backgroundColor },
              ]}
            >
              <Text style={[styles.categoryText, { color: item.textColor }]}>
                {item.name}
              </Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />

        <View style={styles.noPasswordContainer}>
          {/* <Text style={styles.noPasswordText}>No passwords to show</Text> */}
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
