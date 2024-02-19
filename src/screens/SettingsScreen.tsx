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
import { CommonActions, useNavigation } from "@react-navigation/native"
import navigationRoutes from "../routes/navigationRoutes"
import { Button, Dialog, Portal, Text } from "react-native-paper"

function SettingsScreen() {
  const navigation = useNavigation()
  const theme = usePaperColorScheme()

  const { handleLogout } = useContext(AppStore)

  const [visible, setVisible] = useState(() => false)

  const showDialog = () => setVisible(true)
  const hideDialog = () => setVisible(false)

  const loggingOut = () => {
    handleLogout()
    hideDialog()
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
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

        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Logging Out</Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyMedium">Are you sure you want to log out?</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Cancel</Button>
              <Button onPress={loggingOut}>Yes</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>

        <View style={{ padding: 20 }}>
          <ButtonPaper icon="logout" mode="text" onPress={showDialog}>
            LOG OUT
          </ButtonPaper>
        </View>

        <ReportButtonsWrapper>
          {/* <ReportButton
            text="Master"
            color={theme.colors.greenContainer}
            icon="billboard"
            onPress={() =>
              navigation.dispatch(
                CommonActions.navigate({
                  name: navigationRoutes.masterChooseScreen,
                })
              )}
          /> */}
          <ReportButton
            text="Header/Footer"
            color={theme.colors.orangeContainer}
            icon="table-headers-eye"
            onPress={() => navigation.dispatch(
              CommonActions.navigate({
                name: navigationRoutes.headerFooterScreen,
              })
            )}
          />
          {/* <ReportButton
            text="Item Wise"
            color={theme.colors.orangeContainer}
            icon="billboard"
            onPress={() => console.log("Rprt Pressed!")}
          /> */}
          <ReportButton
            text="Edit Item"
            color={theme.colors.tertiaryContainer}
            icon="circle-edit-outline"
            onPress={() => navigation.dispatch(
              CommonActions.navigate({
                name: navigationRoutes.itemEditScreen,
              })
            )}
          />
          {/* <ReportButton
            text="Operaotr Wise"
            color={theme.colors.tertiaryContainer}
            icon="billboard"
            onPress={() => console.log("Rprt Pressed!")}
          /> */}
          <ReportButton
            text="Receipt Settings"
            color={theme.colors.primaryContainer}
            icon="card-bulleted-settings-outline"
            onPress={() => navigation.dispatch(
              CommonActions.navigate({
                name: navigationRoutes.receiptSettingsEditScreen,
              })
            )}
          />
          <ReportButton
            text="Logo Upload"
            color={theme.colors.primaryContainer}
            icon="emoticon-happy-outline"
            onPress={() => navigation.dispatch(
              CommonActions.navigate({
                name: navigationRoutes.logoUploadScreen,
              })
            )}
          />
          {/* <ReportButton
            text="Duplicate Receipt"
            color={theme.colors.primaryContainer}
            icon="billboard"
            onPress={() => console.log("Rprt Pressed!")}
          /> */}
          {/* <ReportButton
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
          /> */}
          {/* <ReportButton
            text="GST Report"
            color={theme.colors.primaryContainer}
            icon="billboard"
            onPress={() => console.log("Rprt Pressed!")}
          /> */}
          <ReportButton
            text="Printer Connect"
            color={theme.colors.greenContainer}
            icon="printer"
            onPress={() =>
              navigation.dispatch(
                CommonActions.navigate({
                  name: navigationRoutes.printMain,
                })
              )
            }
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
