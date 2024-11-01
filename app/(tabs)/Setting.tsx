import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native"
import React, { useEffect, useState, useCallback, useContext } from "react"
import Ionicons from "@expo/vector-icons/Ionicons"
import { Colors } from "@/constants/Colors"
import FontAwesome5 from "@expo/vector-icons/FontAwesome5"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import { deleteLabel, getLabelsByUser, logout } from "@/configs/Firebase.config"
import { LabelProps } from "@/types/Label.types"
import MaterialIcons from "@expo/vector-icons/MaterialIcons"
import Feather from "@expo/vector-icons/Feather"
import Entypo from "@expo/vector-icons/Entypo"
import { useLabel } from "@/Hooks/useLabel"
import { CreateUserContext } from "@/context/CreateUserContext"
import { showToast } from "@/utilis/Toast.message"
import { router } from "expo-router"

const Setting = () => {
  const [openedMenuLabelId, setOpenedMenuLabelId] = useState<string | null>(
    null
  )
  const { Label, fetchLabel, setLabel } = useLabel()

  const [isLabelOpened, setIsLabelOpened] = useState<boolean>(false)
  const {
    userData,
    setUserData,
    refresh,
    setRefresh,
    setLabelDataforedit,
    setIsEditLabel,
  } = useContext(CreateUserContext)

  const onPressLogout = async () => {
    await logout()
  }

  const deleteLabels = async (id: string) => {
    console.log("Deleting item", id)
    const deleted = await deleteLabel(id)

    if (deleted) {
      showToast({ type: "success", text: "Successfully deleted label" })
      setRefresh(!refresh)
      console.log("Label deleted successfully")
    } else {
      showToast({ type: "danger", text: "Failed to delete label" })
      console.log("Failed to delete label")
    }
  }

  useEffect(() => {
    const fetchLabelByUser = () => {
      fetchLabel()
    }
    fetchLabelByUser()
  }, [refresh])

  const toggleMenu = (labelId: string) => {
    setOpenedMenuLabelId((prev) => (prev === labelId ? null : labelId))
  }

  const onPressEditLabel = (item: LabelProps) => {
    router.push("/(tabs)/AddLabel")
    setIsEditLabel(true)
    setLabelDataforedit(item)
  }

  const renderLabelItem = useCallback(
    ({ item }: { item: LabelProps }) => (
      <View style={styles.labelItemContainer}>
        <Text style={styles.labelText}>{item.name}</Text>
        <TouchableOpacity onPress={() => toggleMenu(item.id!)}>
          <Entypo name="dots-three-vertical" size={24} color={Colors.BLACK} />
        </TouchableOpacity>
        {openedMenuLabelId === item.id && (
          <View style={styles.menuContainer}>
            <TouchableOpacity
              style={styles.menuIcon}
              onPress={() => deleteLabels(item.id!)}
            >
              <MaterialIcons name="delete" size={24} color={Colors.BLACK} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuIcon}
              onPress={() => onPressEditLabel(item)}
            >
              <Feather name="edit" size={24} color={Colors.BLACK} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    ),
    [openedMenuLabelId]
  )

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.heading}>Settings</Text>
        <View style={styles.optionContainer}>
          <Ionicons name="person" size={24} color={Colors.BLACK} />
          <Text style={styles.optionText}>My Information</Text>
        </View>
        <View style={styles.labelcontainer}>
          <TouchableOpacity
            style={styles.optionContainer}
            onPress={() => setIsLabelOpened(!isLabelOpened)}
          >
            <MaterialIcons name="label" size={24} color={Colors.BLACK} />
            <Text style={styles.optionText}>Label</Text>
          </TouchableOpacity>
          {isLabelOpened && (
            <FlatList data={Label} renderItem={renderLabelItem} />
          )}
        </View>
        <View style={styles.optionContainer}>
          <FontAwesome5 name="key" size={24} color={Colors.BLACK} />
          <Text style={styles.optionText}>Change Password</Text>
        </View>
        <TouchableOpacity
          style={styles.optionContainer}
          onPress={() => onPressLogout()}
        >
          <MaterialCommunityIcons
            name="logout-variant"
            size={24}
            color={Colors.BLACK}
          />
          <Text style={styles.optionText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Setting

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  container: {
    flex: 1,
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
    marginTop: 16,
  },
  optionText: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  labelItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: Colors.LIGHT_GRAY,
    borderBottomWidth: 1,
    borderBottomColor: Colors.GRAY,
  },
  labelText: {
    fontSize: 16,
  },
  labelcontainer: {},
  menuContainer: {
    flexDirection: "row",
    marginLeft: 10,
  },
  menuIcon: {
    marginHorizontal: 8,
  },
})
