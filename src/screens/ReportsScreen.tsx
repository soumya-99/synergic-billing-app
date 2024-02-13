import { StyleSheet, ScrollView, SafeAreaView, View } from "react-native"

import HeaderImage from "../components/HeaderImage"
import { blurReport, blurReportDark } from "../resources/images"
import { usePaperColorScheme } from "../theme/theme"
import ReportButton from "../components/ReportButton"
import ReportButtonsWrapper from "../components/ReportButtonsWrapper"
import { CommonActions, useNavigation } from "@react-navigation/native"
import navigationRoutes from "../routes/navigationRoutes"

function ReportsScreen() {
  const navigation = useNavigation()
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
            text="Sale Report"
            color={theme.colors.greenContainer}
            icon="billboard"
            onPress={() => navigation.dispatch(
              CommonActions.navigate({
                name: navigationRoutes.saleReportScreen,
              })
            )}
          />
          <ReportButton
            text="Collection Report"
            color={theme.colors.orangeContainer}
            icon="billboard"
            onPress={() => navigation.dispatch(
              CommonActions.navigate({
                name: navigationRoutes.collectionReportScreen,
              })
            )}
          />
          <ReportButton
            text="Item Report"
            color={theme.colors.tertiaryContainer}
            icon="billboard"
            onPress={() => navigation.dispatch(
              CommonActions.navigate({
                name: navigationRoutes.itemReportScreen,
              })
            )}
          />
          <ReportButton
            text="GST Statement"
            color={theme.colors.primaryContainer}
            icon="billboard"
            onPress={() => navigation.dispatch(
              CommonActions.navigate({
                name: navigationRoutes.gstStatementReportScreen,
              })
            )}
          />
          <ReportButton
            text="GST Summary"
            color={theme.colors.pinkContainer}
            icon="billboard"
            onPress={() => navigation.dispatch(
              CommonActions.navigate({
                name: navigationRoutes.gstSummaryReportScreen,
              })
            )}
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
