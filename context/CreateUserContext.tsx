import { createContext } from "react"
import { LabelProps, StoreDataProps } from "@/types/Label.types"

type ContextData = {
  userData: any
  setUserData: (data: any) => void
  refresh: boolean
  setRefresh: (data: boolean) => void
  IsEditStoredData: boolean
  setIsEditStoredData: (data: boolean) => void
  IsEditLabel: boolean
  setIsEditLabel: (data: boolean) => void
  StoreDataforedit: StoreDataProps | null
  setStoreDataforedit: (data: StoreDataProps | null) => void
  LabelDataforedit: LabelProps | null
  setLabelDataforedit: (data: LabelProps | null) => void
}

export const CreateUserContext = createContext<ContextData>({
  userData: null,
  setUserData: () => {},
  refresh: false,
  setRefresh: () => {},
  IsEditStoredData: false,
  setIsEditStoredData: () => {},
  IsEditLabel: false,
  setIsEditLabel: () => {},
  StoreDataforedit: null,
  setStoreDataforedit: () => {},
  LabelDataforedit: null,
  setLabelDataforedit: () => {},
})
