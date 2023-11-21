import { StyleSheet, ScrollView, SafeAreaView, View } from "react-native"

import HeaderImage from "../components/HeaderImage"
import { blurReport, blurReportDark } from "../resources/images"
import { usePaperColorScheme } from "../theme/theme"
import ReportButton from "../components/ReportButton"
import ReportButtonsWrapper from "../components/ReportButtonsWrapper"

type TransactionDataObject = {
  id: number
  item: string
  description: string
}

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
          />
          <ReportButton
            text="Item Wise"
            color={theme.colors.orangeContainer}
            icon="billboard"
          />
          <ReportButton
            text="Operaotr Wise"
            color={theme.colors.tertiaryContainer}
            icon="billboard"
          />
          <ReportButton
            text="Duplicate Receipt"
            color={theme.colors.primaryContainer}
            icon="billboard"
          />
          <ReportButton
            text="Month Wise"
            color={theme.colors.pinkContainer}
            icon="billboard"
          />
          <ReportButton
            text="Year Wise"
            color={theme.colors.orangeContainer}
            icon="billboard"
          />
          <ReportButton
            text="Day Wise"
            color={theme.colors.pinkContainer}
            icon="billboard"
          />
          <ReportButton
            text="GST Report"
            color={theme.colors.primaryContainer}
            icon="billboard"
          />
        </ReportButtonsWrapper>
        {/* {[...new Array(50).keys()].map((_, i) => (
          <Text key={i}>{i + 1}</Text>
        ))} */}
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
