import React, { useState } from "react"
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
interface categoryProps {
  label: string
  color: string
  selectedColor?: string
}

const categories = [
  { label: "Personal", color: "#FFD700", selectedColor: "#FFBF00" },
  { label: "Finance", color: "#4CAF50", selectedColor: "#388E3C" },
  { label: "Official", color: "#F44336", selectedColor: "#C62828" },
  { label: "Other", color: Colors.LIGHT_GRAY },
]

const Addpassword = () => {
  const [selectedCategory, setSelectedCategory] = useState("")
  const [editMode, setEditMode] = useState<boolean>(false)

  const renderCategoryButton = ({
    label,
    color,
    selectedColor,
  }: categoryProps) => {
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
            {editMode ? "Edit Password" : "Add New Password"}
          </Text>
          <Text style={styles.subtitle}>Add new password to your records</Text>

          <CustomInput label="Title" placeholder="Enter the title" />

          <View style={styles.categoryContainer}>
            <Text style={styles.label}>Choose Category</Text>
            <View style={styles.categoryOptions}>
              {categories.map(({ label, color, selectedColor }) =>
                renderCategoryButton({ label, color, selectedColor })
              )}
            </View>
          </View>

          <CustomInput label="Website" placeholder="Enter the Website" />
          <CustomInput
            label="Email/Phone no."
            placeholder="Enter Email / Phone no."
          />
          <CustomInput
            label="Password"
            placeholder="Password"
            secureTextEntry={true}
          />

          <CustomButton
            color={Colors.BLACK}
            text={editMode ? "Update Password" : "Save Password"}
            address={() => router.push("/(tabs)/")}
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
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
  },
  categoryText: {
    fontSize: 14,
  },
})
