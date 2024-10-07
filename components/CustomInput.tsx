import { StyleSheet, Text, TextInput, View } from "react-native"
import React, { useState } from "react"

interface inputProps {
  label: string
  placeholder: string
  secureTextEntry?: boolean
  value?: string
  onChangeText?: (text: string) => void
}

const CustomInput = ({
  label,
  placeholder,
  secureTextEntry = false,
  value,
  onChangeText,
}: inputProps) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  )
}

export default CustomInput

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 10,
    marginTop: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    borderRadius: 5,
  },
})
