import { StyleSheet, Text, View, SafeAreaView } from "react-native"
import React from "react"
import Ionicons from "@expo/vector-icons/Ionicons"
import { Colors } from "@/constants/Colors"
import FontAwesome5 from "@expo/vector-icons/FontAwesome5"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import MaterialIcons from "@expo/vector-icons/MaterialIcons"

const Setting = () => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.heading}>Settings</Text>
        <View style={styles.optionContainer}>
          <Ionicons name="person" size={24} color={Colors.BLACK} />
          <Text style={styles.optionText}>My Information</Text>
        </View>
        <View style={styles.optionContainer}>
          <MaterialIcons name="label" size={24} color={Colors.BLACK} />
          <Text style={styles.optionText}>Label</Text>
        </View>
        <View style={styles.optionContainer}>
          <FontAwesome5 name="key" size={24} color={Colors.BLACK} />
          <Text style={styles.optionText}>Change Password</Text>
        </View>
        <View style={styles.optionContainer}>
          <MaterialCommunityIcons
            name="logout-variant"
            size={24}
            color={Colors.BLACK}
          />
          <Text style={styles.optionText}>Logout</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Setting

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: Colors.WHITE,
    padding: 16,
  },
  heading: {
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 20,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  optionText: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
})
