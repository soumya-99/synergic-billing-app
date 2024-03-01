import { PropsWithChildren } from "react"
import { Dialog, Portal, Button } from "react-native-paper"
import { usePaperColorScheme } from "../theme/theme"

type DialogBoxProps = {
  visible: boolean
  onFailure: () => void
  onSuccess: () => void
  hide: () => void
  title?: string
  btnFail?: string
  btnSuccess?: string
  icon?: string
  iconSize?: number
  titleStyle?: {}
  buttonSuccessIcon?: string
}

export default function DialogBox({
  children,
  visible,
  icon,
  iconSize,
  title,
  titleStyle,
  btnFail = "CANCEL",
  btnSuccess = "NEXT",
  onFailure,
  onSuccess,
  hide,
  buttonSuccessIcon
}: PropsWithChildren<DialogBoxProps>) {
  const theme = usePaperColorScheme()

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hide} theme={theme}>
        {icon && <Dialog.Icon icon={icon} size={iconSize} />}
        {title && <Dialog.Title style={titleStyle}>{title}</Dialog.Title>}
        <Dialog.Content>{children}</Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onFailure} textColor={theme.colors.error}>
            {btnFail}
          </Button>
          <Button onPress={onSuccess}>{btnSuccess}</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )
}
