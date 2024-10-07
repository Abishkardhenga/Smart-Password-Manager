import Toast from "react-native-toast-message"

interface toastProps {
  type: string
  text1: string
}

export const showToast = ({ type, text1 }: toastProps) => {
  Toast.show({
    type: type,
    text1: text1,
  })
}
