import React, { useState } from "react"
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

interface CategoryProps {
  label: string
  color: string
  selectedColor?: string
}

const AddLabel = () => {
  const [selectedCategory, setSelectedCategory] = useState("")
  const [editMode, setEditMode] = useState<boolean>(false)
  const [currentColor, setCurrentColor] = useState<string>("#FFFFFF") // Default color for ColorPicker

  const renderCategoryButton = ({
    label,
    color,
    selectedColor,
  }: CategoryProps) => {
    const isSelected = selectedCategory === label

    return (
      <TouchableOpacity
        key={label}
        style={[
          styles.categoryButton,
          {
            backgroundColor: isSelected ? selectedColor : color,
            borderWidth: isSelected ? 2 : 0,
            borderColor: isSelected ? "black" : "transparent",
          },
        ]}
        onPress={() => setSelectedCategory(label)}
      >
        <Text
          style={[
            styles.categoryText,
            { color: isSelected ? "white" : Colors.BLACK },
          ]}
        >
          {label}
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
            {editMode ? "Edit Label" : "Add New Label"}
          </Text>
          <Text style={styles.subtitle}>Add new Label to your records</Text>

          <CustomInput label="Name" placeholder="Enter the Label Name" />
          <View style={styles.colorPickerContainer}>
            <ColorPicker
              color={currentColor}
              onColorChange={(color) => setCurrentColor(color)}
              thumbSize={40}
              sliderSize={40}
              noSnap={true}
              row={false}
              wheelLodingIndicator={<ActivityIndicator size={40} />}
              sliderLodingIndicator={<ActivityIndicator size={20} />}
              useNativeDriver={false}
            />
          </View>

          <CustomButton
            color={Colors.BLACK}
            text={editMode ? "Update Label" : "Save Label"}
            onPress={() => router.push("/(tabs)/")}
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
