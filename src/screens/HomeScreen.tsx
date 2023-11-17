import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  View,
  PixelRatio,
} from "react-native"
import { useState } from "react"
import AnimatedFABPaper from "../components/AnimatedFABPaper"
import { Surface, Text } from "react-native-paper"
import { usePaperColorScheme } from "../theme/theme"
import HeaderImage from "../components/HeaderImage"
import { hills, hillsDark } from "../resources/images"
import navigationRoutes from "../routes/navigationRoutes"
import { useNavigation } from "@react-navigation/native"

function HomeScreen() {
  const navigation = useNavigation()
  const theme = usePaperColorScheme()
  const [isExtended, setIsExtended] = useState(() => true)

  const onScroll = ({ nativeEvent }) => {
    const currentScrollPosition = Math.floor(nativeEvent?.contentOffset?.y) ?? 0

    setIsExtended(currentScrollPosition <= 0)
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView onScroll={onScroll} keyboardShouldPersistTaps="handled">
        <HeaderImage
          imgLight={hills}
          imgDark={hillsDark}
          borderRadius={30}
          blur={10}>
          Welcome Back, Soumyadeep!
        </HeaderImage>

        <Surface style={styles.bill} elevation={2}>
          <Text
            variant="headlineSmall"
            style={{
              fontFamily: "ProductSans-Medium",
              textAlign: "center",
              marginBottom: 5,
            }}>
            Summary
          </Text>

          <View
            style={{
              width: PixelRatio.roundToNearestPixel(320),
              borderStyle: "dashed",
              borderWidth: 1,
              marginBottom: 5,
              borderColor: theme.colors.primary,
            }}></View>

          <View>
            {[...new Array(5).keys()].map((_, i) => (
              <Text key={i}>{i}</Text>
            ))}
          </View>
        </Surface>

        {/* {[...new Array(100).keys()].map((_, i) => (
          <Text key={i}>{i}</Text>
        ))} */}
      </ScrollView>
      <AnimatedFABPaper
        icon="plus"
        label="Generate Receipt"
        //@ts-ignore
        onPress={() => navigation.navigate(navigationRoutes.productsScreen)}
        extended={isExtended}
        animateFrom="right"
        iconMode="dynamic"
        customStyle={styles.fabStyle}
      />
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },

  title: {
    textAlign: "center",
  },

  bill: {
    margin: 20,
    padding: 10,
    minHeight: 200,
    height: "auto",
    maxHeight: "auto",
    borderRadius: 30,
    width: 320,
    alignItems: "center",
  },

  fabStyle: {
    bottom: 16,
    right: 16,
    position: "absolute",
  },
})
