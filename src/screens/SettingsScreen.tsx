import { useContext } from "react"
import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  View,
} from "react-native"
import ButtonPaper from "../components/ButtonPaper"
import { AppStore } from "../context/AppContext"
import HeaderImage from "../components/HeaderImage"
import { flowerSetting, flowerSettingDark } from "../resources/images"

function SettingsScreen() {
  const { logout } = useContext(AppStore)
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
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
      </ScrollView>
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
