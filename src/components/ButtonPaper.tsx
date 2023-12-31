import { PropsWithChildren } from "react"
import { Button } from "react-native-paper"

type ButtonPaperProps = {
  children: React.ReactNode
  mode: "text" | "outlined" | "contained" | "elevated" | "contained-tonal"
  onPress: (e: any) => void
  icon?: string
  buttonColor?: string
  textColor?: string
  style?: {}
}

const ButtonPaper = ({
  children,
  mode,
  onPress,
  icon,
  buttonColor,
  textColor,
  style,
}: PropsWithChildren<ButtonPaperProps>) => (
  <Button
    icon={icon}
    mode={mode}
    onPress={onPress}
    buttonColor={buttonColor}
    textColor={textColor}
    style={style}>
    {children}
  </Button>
)

export default ButtonPaper
