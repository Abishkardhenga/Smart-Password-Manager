import Passwordcard from "@/components/Passwordcard"
import { Colors } from "@/constants/Colors"
import { router } from "expo-router"
import React, { useContext, useEffect, useState } from "react"
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
import { showToast } from "@/utilis/Toast.message"
import { useLabel } from "@/Hooks/useLabel"
import { CreateUserContext } from "@/context/CreateUserContext"
import { useStoredData } from "@/Hooks/useStoredData"
import { getStoredData } from "@/lib/storedata"

const Saved = () => {
  const { Label, fetchLabel, setLabel } = useLabel()
  const { fetchStoredData, StoredData, setStoredData } = useStoredData()
  const { userData, setUserData, refresh, setRefresh } =
    useContext(CreateUserContext)

  useEffect(() => {
    const fetchApi = () => {
      fetchLabel()
      fetchStoredData()
    }
    fetchApi()
  }, [refresh])

  useEffect(() => {
    const fetchStoredData = async () => {
      const data = await getStoredData()
      setStoredData(data)
    }
    fetchStoredData()
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
            data={Label}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  router.push({
                    pathname: "/(tabs)/Label/[id]",
                    params: { id: item.id! },
                  })
                }}
                style={[
                  styles.categoryContainer,
                  { backgroundColor: item.color || "#ccc" },
                ]}
              >
                <Text style={[styles.categoryText, { color: "#fff" }]}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <View style={styles.noPasswordContainer}>
          {StoredData.length === 0 ? (
            <TouchableOpacity
              onPress={() => router.push("/(tabs)/Addpassword")}
            >
              <Text style={styles.noPasswordText}>No passwords saved</Text>
            </TouchableOpacity>
          ) : (
            <FlatList
              data={StoredData}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <Passwordcard
                  title={item.title}
                  emailOrNumber={item.contact_info}
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
          )}
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noPasswordText: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.BLACK,
    textAlign: "center",
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.BLACK,
    borderRadius: 5,
  },
})

export default Saved
