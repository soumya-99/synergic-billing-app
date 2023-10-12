import React from "react"
import { Button } from "react-native-paper"

type ButtonPaperProps = {
  children: React.ReactNode
  mode: "text" | "outlined" | "contained" | "elevated" | "contained-tonal"
  onPress: (e: any) => void
}

const ButtonPaper = ({ children, mode, onPress }: ButtonPaperProps) => (
  <Button mode={mode} onPress={onPress}>
    {children}
  </Button>
)

export default ButtonPaper
