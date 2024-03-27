import { StyleSheet, ScrollView, SafeAreaView, View } from "react-native"

import HeaderImage from "../components/HeaderImage"
import { textureBill, textureBillDark } from "../resources/images"
import { usePaperColorScheme } from "../theme/theme"
import ReportButton from "../components/ReportButton"
import ReportButtonsWrapper from "../components/ReportButtonsWrapper"
import { CommonActions, useNavigation } from "@react-navigation/native"
import navigationRoutes from "../routes/navigationRoutes"
import { useContext } from "react"
import { AppStore } from "../context/AppContext"

function MoreScreen() {
    const navigation = useNavigation()
    const theme = usePaperColorScheme()

    const { receiptSettings } = useContext(AppStore)

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <ScrollView keyboardShouldPersistTaps="handled">
                <View style={{ alignItems: "center" }}>
                    <HeaderImage
                        imgLight={textureBill}
                        imgDark={textureBillDark}
                        borderRadius={30}
                        blur={10}>
                        Essentials
                    </HeaderImage>
                </View>
                <ReportButtonsWrapper>
                    {/* <ReportButton
                        text="Cancel Bill"
                        color={theme.colors.errorContainer}
                        icon="cancel"
                        onPress={() => navigation.dispatch(
                            CommonActions.navigate({
                                name: navigationRoutes.cancelBillScreen,
                            })
                        )}
                    /> */}
                    <ReportButton
                        text="Refund Item"
                        color={theme.colors.orangeContainer}
                        icon="billboard"
                        onPress={() => navigation.dispatch(
                            CommonActions.navigate({
                                name: navigationRoutes.refundItemsScreen,
                            })
                        )}
                    />
                </ReportButtonsWrapper>
            </ScrollView>
        </SafeAreaView>
    )
}

export default MoreScreen

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    },

    title: {
        textAlign: "center",
    },
})
