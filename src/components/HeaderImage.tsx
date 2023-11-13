import { PropsWithChildren } from 'react'
import { ImageBackground, useColorScheme, StyleSheet, PixelRatio } from 'react-native'
import { Text } from 'react-native-paper'

type HeaderImageProps = {
    imgLight: { uri: string }
    imgDark?: { uri: string }
    borderRadius?: number
    blur?: number
}

export default function HeaderImage({ imgLight, imgDark, borderRadius, blur, children }: PropsWithChildren<HeaderImageProps>) {
    const colorScheme = useColorScheme()
    return (
        <ImageBackground
            imageStyle={{ borderRadius: borderRadius }}
            blurRadius={blur}
            source={
                colorScheme !== "dark"
                    ? imgLight
                    : imgDark
            }
            style={styles.surface}>
            <Text
                variant="displaySmall"
                style={{ fontFamily: "ProductSans-Medium", textAlign: "center" }}>
                {children}
            </Text>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    surface: {
        margin: 20,
        height: PixelRatio.roundToNearestPixel(200),
        borderRadius: 30,
        width: PixelRatio.roundToNearestPixel(320),
        alignItems: "center",
        justifyContent: "center",
    },
})
