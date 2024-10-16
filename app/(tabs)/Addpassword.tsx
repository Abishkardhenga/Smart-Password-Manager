import React, { useContext, useEffect, useState } from "react"
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native"
import CustomInput from "@/components/CustomInput"
import CustomButton from "@/components/CustomButton"
import { Colors } from "@/constants/Colors"
import { router } from "expo-router"
import { showToast } from "@/utilis/Toast.message"
import { addStoredData, getLabelsByUser } from "@/configs/Firebase.config"
import uuid from "react-native-uuid"
import { CreateUserContext } from "@/context/CreateUserContext"

export interface CategoryProps {
  name: string
  color: string
  selectedColor?: string
  user_id?: string
  id?: string
}

const Addpassword = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [title, setTitle] = useState<string>("")
  const [website, setWebsite] = useState<string>("")
  const [contactinfo, setContactinfo] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const [category, setCategory] = useState<CategoryProps[]>([])

  const {
    refresh,
    setRefresh,
    editStoredData,
    setEditStoredData,
    StoreDataforedit,
    setStoreDataforedit,
  } = useContext(CreateUserContext)

  useEffect(() => {
    setContactinfo(StoreDataforedit?.contact_info!)
    setPassword(StoreDataforedit?.password!)
    setTitle(StoreDataforedit?.title!)
    setWebsite(StoreDataforedit?.website!)
    setSelectedCategory(StoreDataforedit?.label_name!)
  }, [editStoredData])

  const onAddPassword = async () => {
    try {
      if (
        !selectedCategory ||
        !title ||
        !website ||
        !contactinfo ||
        !password
      ) {
        showToast({ type: "warning", text: "Please fill in all the details" })
        return
      }

      const label_id = JSON.stringify(uuid.v4())
      const label_name = selectedCategory

      const storedata = await addStoredData(
        label_id,
        password,
        title,
        website,
        contactinfo,
        label_name
      )

      showToast({ type: "success", text: "Password successfully added" })
      console.log("refres", refresh)
      setRefresh(!refresh)
      router.back()

      setContactinfo("")
      setPassword("")
      setTitle("")
      setWebsite("")
    } catch (error) {
      console.error("Error adding password:", error)
      showToast({
        type: "danger",
        text: "Failed to add password. Please try again.",
      })
    }
  }

  const onPressUpdate = async () => {
    try {
      if (
        !selectedCategory ||
        !title ||
        !website ||
        !contactinfo ||
        !password
      ) {
        showToast({ type: "warning", text: "Please fill in all the details" })
        return
      }

      const label_id = JSON.stringify(uuid.v4())
      const label_name = selectedCategory

      const storedata = await addStoredData(
        label_id,
        password,
        title,
        website,
        contactinfo,
        label_name
      )

      showToast({ type: "success", text: "Password successfully updated" })
      setRefresh(!refresh)
      router.back()

      setContactinfo("")
      setPassword("")
      setTitle("")
      setWebsite("")
    } catch (error) {
      console.error("Error adding password:", error)
      showToast({
        type: "danger",
        text: "Failed to update password. Please try again.",
      })
    }
  }

  useEffect(() => {
    const fetchLabel = async () => {
      const label = await getLabelsByUser()
      console.log("Label:", label)
      setCategory(label)
    }

    fetchLabel() // Call the function to fetch labels
  }, [])

  const renderCategoryButton = ({
    name,
    color,
    selectedColor,
  }: CategoryProps) => {
    const isSelected = selectedCategory === name

    return (
      <TouchableOpacity
        key={name}
        style={[
          styles.categoryButton,
          {
            backgroundColor: isSelected ? selectedColor || "#000" : color, // Default to black if no selectedColor
            borderWidth: isSelected ? 2 : 0,
            borderColor: isSelected ? "black" : "transparent",
          },
        ]}
        onPress={() => setSelectedCategory(name)}
      >
        <Text
          style={[
            styles.categoryText,
            { color: isSelected ? "white" : Colors.BLACK },
          ]}
        >
          {name} {/* Changed from category to name to display category name */}
        </Text>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.container}>
          <Text style={styles.title}>
            {editStoredData ? "Edit Password" : "Add New Password"}
          </Text>
          <Text style={styles.subtitle}>Add new password to your records</Text>

          <CustomInput
            label="Title"
            value={title}
            onChangeText={setTitle}
            placeholder="Enter the title"
          />

          <View style={styles.categoryContainer}>
            <Text style={styles.label}>Choose Category</Text>
            <View style={styles.categoryOptions}>
              {category.map(({ name, color, user_id, id, selectedColor }) =>
                renderCategoryButton({ name, color, selectedColor })
              )}
            </View>
          </View>

          <CustomInput
            label="Website"
            value={website}
            onChangeText={setWebsite}
            placeholder="Enter the Website"
          />
          <CustomInput
            label="Email/Phone no."
            value={contactinfo}
            onChangeText={setContactinfo}
            placeholder="Enter Email / Phone no."
          />
          <CustomInput
            label="Password"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />

          <CustomButton
            color={Colors.BLACK}
            text={editStoredData ? "Update Password" : "Save Password"}
            onPress={() => (editStoredData ? onPressUpdate() : onAddPassword())}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Addpassword

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    padding: 20,
    height: "100%",
    width: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.BLACK,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.GRAY,
  },
  categoryContainer: {},
  label: {
    fontSize: 16,
    color: Colors.BLACK,
    marginBottom: 10,
  },
  categoryOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  categoryButton: {
    padding: 8,
    borderRadius: 8,
    marginRight: 10,
  },
  categoryText: {
    fontSize: 14,
  },
})
