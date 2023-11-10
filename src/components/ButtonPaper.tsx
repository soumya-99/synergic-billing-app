import { PropsWithChildren } from "react"
import { Button } from "react-native-paper"

type ButtonPaperProps = {
  children: React.ReactNode
  mode: "text" | "outlined" | "contained" | "elevated" | "contained-tonal"
  onPress: (e: any) => void,
  icon?: string
}

const ButtonPaper = ({ children, mode, onPress, icon }: PropsWithChildren<ButtonPaperProps>) => (
  <Button icon={icon} mode={mode} onPress={onPress}>
    {children}
  </Button>
)

export default ButtonPaper
