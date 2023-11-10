import { KeyboardTypeOptions } from "react-native"
import { TextInput } from "react-native-paper"

type InputPaperProps = {
  label: string
  value: string
  onChangeText: (msg: string) => void
  secureTextEntry?: boolean
  keyboardType?: KeyboardTypeOptions
  customStyle?: {}
  leftIcon?: string
}


const InputPaper = ({
  label,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType,
  customStyle,
  leftIcon
}: InputPaperProps) => {
  return (
    <TextInput
      keyboardType={keyboardType}
      label={label}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      style={customStyle}
      left={leftIcon && <TextInput.Icon icon={leftIcon} />}
      // right={<TextInput.Icon icon={secureTextEntry ? "eye-off" : "eye"} onPress={() => setSecureTextEntry(!secureTextEntry)} />}
    />
  )
}

export default InputPaper
