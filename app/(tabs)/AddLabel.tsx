import React, { useContext, useEffect, useState } from "react"
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native"
import ColorPicker from "react-native-wheel-color-picker"

import CustomInput from "@/components/CustomInput"
import CustomButton from "@/components/CustomButton"
import { Colors } from "@/constants/Colors"
import { router } from "expo-router"
import { showToast } from "@/utilis/Toast.message"
import uuid from "react-native-uuid"
import { CreateUserContext } from "@/context/CreateUserContext"
import { useLabel } from "@/Hooks/useLabel"
import { useFocusEffect } from "@react-navigation/native"
import { addLabel, editLabel } from "@/configs/LabelManagement.confi"

interface CategoryProps {
  label: string
  color: string
  selectedColor?: string
}

const AddLabel = () => {
  const [label, setLabel] = useState<string>("")
  const [currentColor, setCurrentColor] = useState<string>("")

  const {
    userData,
    setUserData,
    refresh,
    setRefresh,
    IsEditLabel,
    LabelDataforedit,
    setLabelDataforedit,
    setIsEditLabel,
  } = useContext(CreateUserContext)
  const { fetchLabel } = useLabel()

  const onSaveLabel = async () => {
    if (label === "" || !currentColor) {
      showToast({ type: "warning", text: "Please enter all the details" })
      return
    }

    try {
      await addLabel(label, currentColor)

      showToast({ type: "success", text: "Label successfully created" })
      setRefresh(!refresh)

      setLabel("")
      setCurrentColor("")
      router.back()
    } catch (error) {
      // Handle failure case and show error message
      showToast({ type: "danger", text: "Failed to add the label" })
      console.error("Error adding label:", error) // Log the error for debugging
    }
  }

  useEffect(() => {
    setLabel(LabelDataforedit?.name!)
    setCurrentColor(LabelDataforedit?.color!)
  }, [IsEditLabel])

  const onUpdateLabel = async () => {
    if (
      !LabelDataforedit?.id ||
      !LabelDataforedit?.name ||
      !LabelDataforedit?.color
    ) {
      showToast({
        type: "warning",
        text: "Invalid label data. Please try again.",
      })
      return
    }

    try {
      const response = await editLabel(
        LabelDataforedit.id,
        LabelDataforedit.name,
        LabelDataforedit.color
      )

      if (response.success) {
        showToast({
          type: "success",
          text: response.message || "Label successfully updated",
        })

        setIsEditLabel(false)
        setCurrentColor("")
        setLabel("")
        setLabelDataforedit(null)
      } else {
        showToast({
          type: "danger",
          text: response.message || "Failed to update label",
        })
      }
    } catch (error) {
      console.error("Error updating label:", error)
      showToast({
        type: "danger",
        text: "An error occurred while updating the label",
      })
    }
  }

  useEffect(() => {
    fetchLabel()
  }, [refresh])

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        setIsEditLabel(false)
        setCurrentColor("")
        setLabel("")
        setLabelDataforedit(null)
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
            {IsEditLabel ? "Edit Label" : "Add New Label"}
          </Text>
          <Text style={styles.subtitle}>Add new Label to your records</Text>

          <CustomInput
            label="Name"
            value={label}
            onChangeText={setLabel}
            placeholder="Enter the Label Name"
          />
          <View style={styles.colorPickerContainer}>
            <ColorPicker
              color={currentColor}
              onColorChange={(color) => setCurrentColor(color)}
              thumbSize={40}
              sliderSize={40}
              noSnap={true}
              row={false}
              wheelLoadingIndicator={<ActivityIndicator size={40} />}
              sliderLoadingIndicator={<ActivityIndicator size={20} />}
              useNativeDriver={false}
            />
          </View>

          <CustomButton
            color={Colors.BLACK}
            text={IsEditLabel ? "Update Label" : "Save Label"}
            onPress={() => (IsEditLabel ? onUpdateLabel() : onSaveLabel())}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default AddLabel

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
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.GRAY,
    marginBottom: 20,
  },
  colorPickerContainer: {
    marginVertical: 20,
  },
  categoryButton: {
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
  },
  categoryText: {
    fontSize: 14,
  },
})
