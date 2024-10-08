import { Toast } from "react-native-toast-notifications"
type ToastType = "normal" | "success" | "warning" | "danger" | "custom"

interface toastProps {
  type: ToastType // This ensures that only one of the defined values can be assigned
  text: string
  visibilityTime?: number
}

export const showToast = ({ type, text }: toastProps) => {
  Toast.show(text, {
    type: type,
    placement: "top",
    duration: 1000,
    animationType: "slide-in",
  })
}
