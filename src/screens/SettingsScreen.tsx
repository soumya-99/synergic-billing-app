import { useContext } from "react"
import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  View,
  PixelRatio,
} from "react-native"
import { Divider, Surface, Text, withTheme } from "react-native-paper"
import ButtonPaper from "../components/ButtonPaper"
import { AppStore } from "../context/AppContext"
import HeaderImage from "../components/HeaderImage"
import { flowerSetting, flowerSettingDark } from "../resources/images"

function SettingsScreen() {
  const { logout } = useContext(AppStore)
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <HeaderImage
          imgLight={flowerSetting}
          imgDark={flowerSettingDark}
          borderRadius={30}
          blur={10}>
          Settings
        </HeaderImage>
      </View>

      <View style={{ padding: 20 }}>
        <ButtonPaper icon="logout" mode="text" onPress={logout}>
          Log Out
        </ButtonPaper>
      </View>
    </SafeAreaView>
  )
}

export default SettingsScreen

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },

  title: {
    textAlign: "center",
  },
})
