import { StyleSheet, ScrollView, SafeAreaView, View } from "react-native"

import HeaderImage from "../components/HeaderImage"
import { blurReport, blurReportDark } from "../resources/images"
import { usePaperColorScheme } from "../theme/theme"
import ReportButton from "../components/ReportButton"
import ReportButtonsWrapper from "../components/ReportButtonsWrapper"

function ReportsScreen() {
  const theme = usePaperColorScheme()

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={{ alignItems: "center" }}>
          <HeaderImage
            imgLight={blurReport}
            imgDark={blurReportDark}
            borderRadius={30}
            blur={10}>
            My Reports
          </HeaderImage>
        </View>
        <ReportButtonsWrapper>
          <ReportButton
            text="Bill Wise"
            color={theme.colors.greenContainer}
            icon="billboard"
            onPress={() => console.log("Rprt Pressed!")}
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
        </ReportButtonsWrapper>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ReportsScreen

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },

  title: {
    textAlign: "center",
  },
})
