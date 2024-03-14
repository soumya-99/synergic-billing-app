import { StyleSheet, ScrollView, SafeAreaView, View } from "react-native"

import HeaderImage from "../components/HeaderImage"
import { blurReport, blurReportDark } from "../resources/images"
import { usePaperColorScheme } from "../theme/theme"
import ReportButton from "../components/ReportButton"
import ReportButtonsWrapper from "../components/ReportButtonsWrapper"
import { CommonActions, useNavigation } from "@react-navigation/native"
import navigationRoutes from "../routes/navigationRoutes"
import { useContext } from "react"
import { AppStore } from "../context/AppContext"

function ReportsScreen() {
  const navigation = useNavigation()
  const theme = usePaperColorScheme()

  const { receiptSettings } = useContext(AppStore)

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
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
            text="Stock Report"
            color={theme.colors.tertiaryContainer}
            icon="billboard"
            onPress={() => navigation.dispatch(
              CommonActions.navigate({
                name: navigationRoutes.stockReportScreen,
              })
            )}
          />
          <ReportButton
            text="Cancelled Bills Report"
            color={theme.colors.secondaryContainer}
            icon="billboard"
            onPress={() => navigation.dispatch(
              CommonActions.navigate({
                name: navigationRoutes.cancelledBillsReportScreen,
              })
            )}
          />
          {/* <ReportButton
            text="Refund Items Report"
            color={theme.colors.orangeContainer}
            icon="billboard"
            onPress={() => navigation.dispatch(
              CommonActions.navigate({
                name: navigationRoutes.refundItemsReportScreen,
              })
            )}
          /> */}
          {receiptSettings?.gst_flag === "Y" && (
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
          )}

          {receiptSettings?.gst_flag === "Y" && (
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
          )}
          {/* <ReportButton
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
          /> */}
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
