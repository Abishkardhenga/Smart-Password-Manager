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

import uuid from "react-native-uuid"
import { CreateUserContext } from "@/context/CreateUserContext"
import { useFocusEffect } from "@react-navigation/native"
import { useLabel } from "@/Hooks/useLabel"
import { ActivityIndicator, MD2Colors } from "react-native-paper"
import {
  addStoredData,
  editStoredDataa,
} from "@/lib/StoredataManagement.config"

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
  const [storeDataId, setStoreDataId] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const [category, setCategory] = useState<CategoryProps[]>([])
  const { Label, fetchLabel, setLabel } = useLabel()

  const {
    refresh,
    setRefresh,
    IsEditStoredData,
    setIsEditStoredData,
    StoreDataforedit,
    setStoreDataforedit,
  } = useContext(CreateUserContext)

  useEffect(() => {
    setContactinfo(StoreDataforedit?.contact_info!)
    setPassword(StoreDataforedit?.password!)
    setTitle(StoreDataforedit?.title!)
    setWebsite(StoreDataforedit?.website!)
    setSelectedCategory(StoreDataforedit?.label_name!)
    setStoreDataId(StoreDataforedit?.id!)
    console.log("is edit mode Iseditsotredata", IsEditStoredData)
  }, [IsEditStoredData])

  const onAddPassword = async () => {
    setLoading(true) // Start loading
    try {
      if (
        !selectedCategory ||
        !title ||
        !website ||
        !contactinfo ||
        !password
      ) {
        showToast({ type: "warning", text: "Please fill in all the details" })
        setLoading(false) // End loading
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
    } finally {
      setLoading(false) // End loading
    }
  }

  const onPressUpdate = async () => {
    setLoading(true) // Start loading
    try {
      if (
        !selectedCategory ||
        !title ||
        !website ||
        !contactinfo ||
        !password
      ) {
        showToast({ type: "warning", text: "Please fill in all the details" })
        setLoading(false) // End loading
        return
      }

      const label_id = StoreDataforedit?.label_id!
      const label_name = selectedCategory
      const contact_info = contactinfo

      if (!storeDataId) {
        showToast({
          type: "danger",
          text: "Error: No valid ID found for the stored data.",
        })
        setLoading(false) // End loading
        return
      }

      const updateSuccess = await editStoredDataa(storeDataId, {
        label_id,
        password,
        title,
        website,
        label_name,
        contact_info,
      })

      if (updateSuccess) {
        showToast({ type: "success", text: "Password successfully updated" })
        setRefresh(!refresh)
        router.back()

        // Reset fields
        setContactinfo("")
        setPassword("")
        setTitle("")
        setWebsite("")
        setStoreDataforedit(null)
      } else {
        showToast({
          type: "danger",
          text: "Failed to update password. Please try again.",
        })
        setContactinfo("")
        setPassword("")
        setTitle("")
        setWebsite("")
        setStoreDataforedit(null)
      }
    } catch (error) {
      console.error("Error updating password:", error)
      showToast({
        type: "danger",
        text: "Failed to update password. Please try again.",
      })
      setContactinfo("")
      setPassword("")
      setTitle("")
      setWebsite("")
      setStoreDataforedit(null)
    } finally {
      setLoading(false) // End loading
    }
  }

  useEffect(() => {
    const fetchLabelByUser = () => {
      fetchLabel()
      setCategory(Label)
    }
    fetchLabelByUser()
  }, [refresh, Label])

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

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        setContactinfo("")
        setPassword("")
        setTitle("")
        setWebsite("")
        setStoreDataId("")
        setSelectedCategory("")
        setStoreDataforedit(null)
        setIsEditStoredData(false)
      }
    }, [])
  )

  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.container}>
          <Text style={styles.title}>
            {IsEditStoredData ? "Edit Password" : "Add New Password"}
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
            text={IsEditStoredData ? "Update Password" : "Save Password"}
            onPress={() =>
              IsEditStoredData ? onPressUpdate() : onAddPassword()
            }
          >
            {loading && (
              <ActivityIndicator animating={true} color={MD2Colors.white} />
            )}
          </CustomButton>
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
    borderRadius: 4,
    marginRight: 8,
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "500",
  },
})
