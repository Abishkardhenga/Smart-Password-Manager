import { createContext } from "react"

type ContextData = {
  userData: any
  setUserData: (data: any) => void
  refresh: boolean
  setRefresh: (data: boolean) => void
}

export const CreateUserContext = createContext<ContextData>({
  userData: null,
  setUserData: () => {},
  refresh: false,
  setRefresh: () => {},
})
