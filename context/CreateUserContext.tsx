import { createContext } from "react"
import { LabelProps, StoreDataProps } from "@/types/Label.types"

type ContextData = {
  userData: any
  setUserData: (data: any) => void
  refresh: boolean
  setRefresh: (data: boolean) => void
  editStoredData: boolean
  setEditStoredData: (data: boolean) => void
  editLabel: boolean
  setEditLabel: (data: boolean) => void
  StoreDataforedit: StoreDataProps | null
  setStoreDataforedit: (data: StoreDataProps | null) => void
}

// Initialize the context with default values
export const CreateUserContext = createContext<ContextData>({
  userData: null,
  setUserData: () => {},
  refresh: false,
  setRefresh: () => {},
  editStoredData: false,
  setEditStoredData: () => {},
  editLabel: false,
  setEditLabel: () => {},
  StoreDataforedit: null,
  setStoreDataforedit: () => {},
})
