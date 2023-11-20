import React, { PropsWithChildren } from "react"
import { Text, IconButton, TouchableRipple } from "react-native-paper"
import { IconSource } from "react-native-paper/lib/typescript/components/Icon"

type ReportButtonProps = {
  text: string
  icon?: IconSource
  color?: string
}

export default function ReportButton({
  text,
  icon,
  color,
}: PropsWithChildren<ReportButtonProps>) {
  return (
    <TouchableRipple
      onPress={() => console.log("pressed rept")}
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
