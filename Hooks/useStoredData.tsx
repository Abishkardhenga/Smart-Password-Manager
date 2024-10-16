import { getStoredData } from "@/configs/Firebase.config"
import { StoreDataProps } from "@/types/Label.types"
import { useEffect, useState } from "react"

export const useStoredData = () => {
  const [StoredData, setStoredData] = useState<StoreDataProps[]>([])

  const fetchStoredData = async () => {
    try {
      const data = await getStoredData()
      console.log("hook", data)
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
