import { createContext } from "react"

type ContextData = {
  userData: any
  setUserData: (data: any) => void
}

export const CreateUserContext = createContext<ContextData>({
  userData: null,
  setUserData: () => {},
})
