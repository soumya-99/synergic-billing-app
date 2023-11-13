import { useContext } from "react"
import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  View,
  PixelRatio,
} from "react-native"
import { Divider, Surface, Text } from "react-native-paper"
import ButtonPaper from "../components/ButtonPaper"
import { AppStore } from "../context/AppContext"
import HeaderImage from "../components/HeaderImage"
import { flowerSetting, flowerSettingDark } from "../resources/images"

export default function SettingsScreen() {
  const { logout } = useContext(AppStore)
  return (
    <SafeAreaView style={styles.container}>
      <HeaderImage
        imgLight={flowerSetting}
        imgDark={flowerSettingDark}
        borderRadius={30}
        blur={10}
      >
        Settings
      </HeaderImage>

      <View>
        <ButtonPaper icon="logout" mode="text" onPress={logout}>
          Log Out
        </ButtonPaper>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },

  title: {
    textAlign: "center",
  },

  surface: {
    margin: 20,
    height: PixelRatio.roundToNearestPixel(200),
    borderRadius: 30,
    width: PixelRatio.roundToNearestPixel(320),
    alignItems: "center",
    justifyContent: "center",
  },
})
