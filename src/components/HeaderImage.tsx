import { PropsWithChildren } from "react"
import {
  ImageBackground,
  useColorScheme,
  StyleSheet,
  PixelRatio,
  View,
} from "react-native"
import normalize from "react-native-normalize"
import { IconButton, Text } from "react-native-paper"
import { usePaperColorScheme } from "../theme/theme"

type HeaderImageProps = {
  imgLight: { uri: string }
  imgDark?: { uri: string }
  borderRadius?: number
  blur?: number
  navigation?: any
  isBackEnabled?: boolean
}

export default function HeaderImage({
  imgLight,
  imgDark,
  borderRadius,
  blur,
  children,
  navigation,
  isBackEnabled,
}: PropsWithChildren<HeaderImageProps>) {
  const colorScheme = useColorScheme()
  const theme = usePaperColorScheme()
  // const navigation = useNavigation()
  return (
    <>
      {isBackEnabled && (
        <View>
          <IconButton
            icon="arrow-left"
            iconColor={theme.colors.onBackground}
            size={20}
            onPress={() => navigation.goBack()}
            style={{
              position: "absolute",
              top: normalize(20),
              right: normalize(110),
              zIndex: 10,
            }}
          />
        </View>
      )}
      <ImageBackground
        imageStyle={{ borderRadius: normalize(borderRadius) }}
        blurRadius={blur}
        source={colorScheme !== "dark" ? imgLight : imgDark}
        style={styles.surface}>
        <Text
          variant="displaySmall"
          style={{ fontFamily: "ProductSans-Medium", textAlign: "center" }}>
          {children}
        </Text>
      </ImageBackground>
    </>
  )
}

const styles = StyleSheet.create({
  surface: {
    margin: 20,
    height: PixelRatio.roundToNearestPixel(200),
    borderRadius: 30,
    width: PixelRatio.roundToNearestPixel(330),
    alignItems: "center",
    justifyContent: "center",
  },
})
