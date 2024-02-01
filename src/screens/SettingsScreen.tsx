import { useContext, useState } from "react"
import { StyleSheet, ScrollView, SafeAreaView, View } from "react-native"
import ButtonPaper from "../components/ButtonPaper"
import { AppStore } from "../context/AppContext"
import HeaderImage from "../components/HeaderImage"
import { flowerSetting, flowerSettingDark } from "../resources/images"
import AnimatedFABPaper from "../components/AnimatedFABPaper"
import normalize from "react-native-normalize"
import ReportButtonsWrapper from "../components/ReportButtonsWrapper"
import ReportButton from "../components/ReportButton"
import { usePaperColorScheme } from "../theme/theme"
import { useNavigation } from "@react-navigation/native"
import navigationRoutes from "../routes/navigationRoutes"

function SettingsScreen() {
  const navigation = useNavigation()

  const { logout } = useContext(AppStore)
  const [isExtended, setIsExtended] = useState(() => true)

  const theme = usePaperColorScheme()

  const onScroll = ({ nativeEvent }) => {
    const currentScrollPosition = Math.floor(nativeEvent?.contentOffset?.y) ?? 0

    setIsExtended(currentScrollPosition <= 0)
  }


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView onScroll={onScroll}>
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

        <ReportButtonsWrapper>
          <ReportButton
            text="Master"
            color={theme.colors.greenContainer}
            icon="billboard"
            //@ts-ignore
            onPress={() => navigation.navigate(navigationRoutes.masterChooseScreen)}
          />
          <ReportButton
            text="Item Wise"
            color={theme.colors.orangeContainer}
            icon="billboard"
            onPress={() => console.log("Rprt Pressed!")}
          />
          <ReportButton
            text="Operaotr Wise"
            color={theme.colors.tertiaryContainer}
            icon="billboard"
            onPress={() => console.log("Rprt Pressed!")}
          />
          <ReportButton
            text="Duplicate Receipt"
            color={theme.colors.primaryContainer}
            icon="billboard"
            onPress={() => console.log("Rprt Pressed!")}
          />
          <ReportButton
            text="Month Wise"
            color={theme.colors.pinkContainer}
            icon="billboard"
            onPress={() => console.log("Rprt Pressed!")}
          />
          <ReportButton
            text="Year Wise"
            color={theme.colors.orangeContainer}
            icon="billboard"
            onPress={() => console.log("Rprt Pressed!")}
          />
          <ReportButton
            text="Day Wise"
            color={theme.colors.pinkContainer}
            icon="billboard"
            onPress={() => console.log("Rprt Pressed!")}
          />
          <ReportButton
            text="GST Report"
            color={theme.colors.primaryContainer}
            icon="billboard"
            onPress={() => console.log("Rprt Pressed!")}
          />
          <ReportButton
            text="Printer Connect"
            color={theme.colors.greenContainer}
            icon="printer"
            onPress={() => navigation.navigate(navigationRoutes.printMain as never)}
          />
        </ReportButtonsWrapper>
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
  fabStyle: {
    bottom: normalize(16),
    right: normalize(16),
    position: "absolute",
  },
})
