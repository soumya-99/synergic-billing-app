import { PixelRatio, StyleSheet, View } from "react-native"
import { Surface, Text, ThemeProvider, useTheme } from "react-native-paper"
import { usePaperColorScheme } from "../theme/theme"
import { PropsWithChildren } from "react"
import { ElevationLevels } from "react-native-paper/lib/typescript/types"

type SurfacePaperProps = {
  heading?: string
  elevation?: ElevationLevels
  customTheme?: {}
  backgroundColor: string
}

export default function SurfacePaper({
  heading,
  elevation,
  backgroundColor,
  children,
}: PropsWithChildren<SurfacePaperProps>) {
  const theme = usePaperColorScheme()
  return (
    <Surface
      style={[styles.bill, { backgroundColor: backgroundColor }]}
      elevation={elevation}>
      <Text
        variant="headlineSmall"
        style={{
          fontFamily: "ProductSans-Medium",
          textAlign: "center",
          marginBottom: 5,
        }}>
        {heading}
      </Text>

      <View
        style={{
          width: PixelRatio.roundToNearestPixel(320),
          borderStyle: "dashed",
          borderWidth: 0.5,
          // marginBottom: 5,
          borderColor: theme.colors.primary,
        }}></View>
      {children}
    </Surface>
  )
}

const styles = StyleSheet.create({
  bill: {
    margin: 20,
    padding: 10,
    // minHeight: 200,
    height: "auto",
    maxHeight: "auto",
    borderRadius: 30,
    width: 330,
    alignItems: "center",
  },
})
