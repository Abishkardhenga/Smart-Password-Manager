import { StoreDataProps } from "@/types/Label.types"
import { createContext } from "react"

type ContextData = {
  userData: any
  setUserData: (data: any) => void
  refresh: boolean
  setRefresh: (data: boolean) => void
  editStoredData: boolean
  setEditStoredData: (data: boolean) => void
  editLabel: boolean
  setEditLabel: (data: boolean) => void
}

export const CreateUserContext = createContext<ContextData>({
  userData: null,
  setUserData: () => {},
  refresh: false,
  setRefresh: () => {},
  editStoredData: false,
  setEditStoredData: () => {},
  editLabel: false,
  setEditLabel: () => {},
})
