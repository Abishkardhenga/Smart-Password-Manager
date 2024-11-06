import { getStoredData } from "@/configs/StoredataManagement.config"
import { StoreDataProps } from "@/types/PasswordManager.types"
import { useEffect, useState } from "react"

export const useStoredData = () => {
  const [StoredData, setStoredData] = useState<StoreDataProps[]>([])

  const fetchStoredData = async () => {
    try {
      const data = await getStoredData()
      setStoredData(data)
    } catch (error) {
      console.error("Error fetching labels:", error)
    }
  }

  useEffect(() => {
    fetchStoredData()
  }, [])

  return { StoredData, fetchStoredData, setStoredData }
}
