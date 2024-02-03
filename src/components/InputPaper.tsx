import { KeyboardTypeOptions } from "react-native"
import { TextInput } from "react-native-paper"

type InputPaperProps = {
  label: string
  value: string | number
  onChangeText: (msg: string | number) => void
  secureTextEntry?: boolean
  keyboardType?: KeyboardTypeOptions
  customStyle?: {}
  leftIcon?: string
  autoFocus?: boolean
  mode?: "outlined" | "flat"
  maxLength?: number
}

const InputPaper = ({
  label,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType,
  customStyle,
  leftIcon,
  autoFocus,
  mode = "flat",
  maxLength = 10
}: InputPaperProps) => {
  return (
    <TextInput
      mode={mode}
      keyboardType={keyboardType}
      label={label}
      value={value.toString()}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      style={customStyle}
      left={leftIcon && <TextInput.Icon icon={leftIcon} />}
      // right={<TextInput.Icon icon={secureTextEntry ? "eye-off" : "eye"} onPress={() => setSecureTextEntry(!secureTextEntry)} />}
      autoFocus={autoFocus}
      maxLength={maxLength}
    />
  )
}

export default InputPaper
