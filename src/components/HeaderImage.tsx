// import { ImageBackground, useColorScheme, Dimensions, StyleSheet } from 'react-native'
// import { Text } from 'react-native-paper'

// type HeaderImageProps = {
//     text: string
//     imgLight: string
//     imgDark?: string
//     borderRadius?: number
//     blur?: number
// }

// export default function HeaderImage({ text, imgLight, imgDark, borderRadius, blur }: HeaderImageProps) {
//     const colorScheme = useColorScheme()
//     return (
//         <ImageBackground
//             imageStyle={{ borderRadius: borderRadius }}
//             blurRadius={blur}
//             source={
//                 colorScheme !== "dark"
//                     ? require(imgLight) // not working
//                     : require(imgDark)
//             }
//             style={styles.surface}>
//             <Text
//                 variant="displaySmall"
//                 style={{ fontFamily: "ProductSans-Medium", textAlign: "center" }}>
//                 {text}
//             </Text>
//         </ImageBackground>
//     )
// }

// const styles = StyleSheet.create({
//     surface: {
//         margin: 20,
//         height: Dimensions.get("window").height - 550,
//         borderRadius: 30,
//         width: Dimensions.get("window").width - 40,
//         alignItems: "center",
//         justifyContent: "center",
//     },
// })
