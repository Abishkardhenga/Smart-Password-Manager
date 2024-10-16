import { getLabelsByUser } from "@/configs/Firebase.config"
import { LabelProps } from "@/types/Label.types"
import React, { useEffect, useState } from "react"

const useLabel = () => {
  const [Label, setLabel] = useState<LabelProps[]>()
  useEffect(() => {
    const fetchLabel = async () => {
      const data = await getLabelsByUser()
      setLabel(data)
    }

    fetchLabel()
  }, [Label])
  return [Label]
}

export default useLabel
