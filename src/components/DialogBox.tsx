import { PropsWithChildren } from "react"
import { Dialog, Portal, Button } from "react-native-paper"
import { usePaperColorScheme } from "../theme/theme"

type DialogBoxProps = {
  visible: boolean
  onFailure: () => void
  onSuccess: () => void
  hide: () => void
  title?: string
  icon?: string
  iconSize?: number
  titleStyle?: {}
}

export default function DialogBox({
  children,
  visible,
  icon,
  iconSize,
  title,
  titleStyle,
  onFailure,
  onSuccess,
  hide,
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
            CANCEL
          </Button>
          <Button onPress={onSuccess}>NEXT</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )
}
