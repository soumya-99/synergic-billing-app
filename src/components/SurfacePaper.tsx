import { PixelRatio, StyleSheet, View } from "react-native"
import { Surface, Text } from "react-native-paper"
import { usePaperColorScheme } from "../theme/theme"
import { PropsWithChildren } from "react"
import { ElevationLevels } from "react-native-paper/lib/typescript/types"
import { SCREEN_WIDTH } from "react-native-normalize"

type SurfacePaperProps = {
  backgroundColor: string
  heading?: string
  elevation?: ElevationLevels
  customTheme?: {}
  isBorderEnabled?: boolean
  paddingEnabled?: boolean
  borderRadiusEnabled?: boolean
}

export default function SurfacePaper({
  heading,
  elevation,
  backgroundColor,
  children,
  isBorderEnabled,
  paddingEnabled,
  borderRadiusEnabled
}: PropsWithChildren<SurfacePaperProps>) {
  const theme = usePaperColorScheme()
  return (
    <Surface
      style={[styles.bill, { backgroundColor: backgroundColor, padding: paddingEnabled ? 10 : 0, borderRadius: borderRadiusEnabled ? 30 : 0 }]}
      elevation={elevation}>
      {heading && (
        <Text
          variant="headlineSmall"
          style={{
            fontFamily: "ProductSans-Medium",
            textAlign: "center",
            marginBottom: 5,
          }}>
          {heading}
        </Text>
      )}

      {isBorderEnabled && (
        <View
          style={{
            width: PixelRatio.roundToNearestPixel(320),
            borderStyle: "dashed",
            borderWidth: 0.5,
            // marginBottom: 5,
            borderColor: theme.colors.primary,
          }}></View>
      )}
      {children}
    </Surface>
  )
}

const styles = StyleSheet.create({
  bill: {
    alignSelf: "center",
    margin: 10,
    // padding: 10,
    // minHeight: 200,
    height: "auto",
    maxHeight: "auto",
    // borderRadius: 30,
    width: SCREEN_WIDTH / 1.05,
    alignItems: "center",
  },
})
