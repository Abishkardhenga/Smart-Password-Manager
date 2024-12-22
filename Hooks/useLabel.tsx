import { getLabelsByUser } from "@/lib/LabelManagement.confi"
import { LabelProps } from "@/types/PasswordManager.types"
import { useEffect, useState } from "react"

export const useLabel = () => {
  const [Label, setLabel] = useState<LabelProps[]>([]) // Start with an empty array

  const fetchLabel = async () => {
    try {
      const data = await getLabelsByUser()
      setLabel(data) // Update the state with fetched labels
    } catch (error) {
      console.error("Error fetching labels:", error)
    }
  }

  useEffect(() => {
    fetchLabel() // Fetch labels on mount
  }, [])

  return { Label, fetchLabel, setLabel } // Expose fetchLabel for external calls
}
