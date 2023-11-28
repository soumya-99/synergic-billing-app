import React, { PropsWithChildren } from "react"
import { Text, IconButton, TouchableRipple } from "react-native-paper"
import { IconSource } from "react-native-paper/lib/typescript/components/Icon"

type ReportButtonProps = {
  text: string
  onPress?: () => void
  icon?: IconSource
  color?: string
}

export default function ReportButton({
  text,
  icon,
  color,
  onPress,
}: PropsWithChildren<ReportButtonProps>) {
  return (
    <TouchableRipple
      onPress={onPress}
      style={{
        width: 100,
        height: 100,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        backgroundColor: color,
      }}>
      <>
        <IconButton icon={icon} />
        <Text style={{ textAlign: "center" }}>{text}</Text>
      </>
    </TouchableRipple>
  )
}
