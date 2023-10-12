import { TextInput } from "react-native-paper"

type InputPaperProps = {
  label: string
  value: string
  onChangeText: (msg: string) => void
  secureTextEntry?: boolean
  customStyle?: {}
}

const InputPaper = ({
  label,
  value,
  onChangeText,
  secureTextEntry,
  customStyle,
}: InputPaperProps) => {
  return (
    <TextInput
      label={label}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      style={customStyle}
    />
  )
}

export default InputPaper
