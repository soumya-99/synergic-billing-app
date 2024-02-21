import { View, ScrollView, StyleSheet, ToastAndroid } from "react-native"
import React, { useContext, useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { Divider, List } from "react-native-paper"
import normalize, { SCREEN_HEIGHT, SCREEN_WIDTH } from "react-native-normalize"
import HeaderImage from "../components/HeaderImage"
import { flowerHome, flowerHomeDark } from "../resources/images"
import { usePaperColorScheme } from "../theme/theme"
import { loginStorage } from "../storage/appStorage"
import { useIsFocused } from "@react-navigation/native"
import { AppStore } from "../context/AppContext"
import MenuPaper from "../components/MenuPaper"
import ButtonPaper from "../components/ButtonPaper"
import useEditReceiptSettings from "../hooks/api/useEditReceiptSettings"

export default function ReceiptSettingsEditScreen() {
    const theme = usePaperColorScheme()
    const isFocused = useIsFocused()

    const loginStore = JSON.parse(loginStorage.getString("login-data"))

    const { receiptSettings, handleGetReceiptSettings } = useContext(AppStore)

    const { editReceiptSettings } = useEditReceiptSettings()

    const [rcptType, setRcptType] = useState<"P" | "B" | "S">(() => receiptSettings?.rcpt_type)
    const [gstFlag, setGstFlag] = useState<"Y" | "N">(() => receiptSettings?.gst_flag)
    const [customerInfo, setCustomerInfo] = useState<"Y" | "N">(() => receiptSettings?.cust_inf)
    const [payMode, setPayMode] = useState<"Y" | "N">(() => receiptSettings?.pay_mode)
    const [discountType, setDiscountType] = useState<"P" | "A">(() => receiptSettings?.discount_type)

    let receiptTypeArr = [
        { icon: "cloud-print-outline", title: "Print", func: () => setRcptType("P") },
        { icon: "android-messages", title: "SMS", func: () => setRcptType("S") },
        { icon: "all-inclusive", title: "Both", func: () => setRcptType("B") },
    ]

    let gstFlagArr = [
        { icon: "check-outline", title: "Allow", func: () => setGstFlag("Y") },
        { icon: "cancel", title: "Deny", func: () => setGstFlag("N") },
    ]

    let customerInfoArr = [
        { icon: "check-outline", title: "Allow", func: () => setCustomerInfo("Y") },
        { icon: "cancel", title: "Deny", func: () => setCustomerInfo("N") },
    ]

    let payModeArr = [
        { icon: "check-outline", title: "Allow", func: () => setPayMode("Y") },
        { icon: "cancel", title: "Deny", func: () => setPayMode("N") },
    ]

    let discountTypeArr = [
        { icon: "percent-outline", title: "Percentage", func: () => setDiscountType("P") },
        { icon: "cash", title: "Amount", func: () => setDiscountType("A") },
    ]

    const handleReceiptSettingsUpdate = async () => {
        await editReceiptSettings(loginStore?.comp_id, rcptType, gstFlag, customerInfo, payMode, discountType, loginStore?.user_name, loginStore?.user_name)
            .then(res => {
                ToastAndroid.show("Receipt Settings Updated!", ToastAndroid.SHORT)
                handleGetReceiptSettings()
            })
            .catch(err => {
                ToastAndroid.show("Something went wrong while updating!", ToastAndroid.SHORT)
            })
    }

    return (
        <SafeAreaView style={[{ backgroundColor: theme.colors.background, height: "100%" }]}>
            <ScrollView keyboardShouldPersistTaps="handled">
                <View style={{ alignItems: "center" }}>
                    <HeaderImage
                        isBackEnabled
                        imgLight={flowerHome}
                        imgDark={flowerHomeDark}
                        borderRadius={30}
                        blur={10}>
                        Receipt Settings
                    </HeaderImage>
                </View>

                <View style={{ padding: normalize(20) }}>
                    <List.Item
                        title="Receipt Type"
                        description={rcptType === "P" ? "Print" : rcptType === "S" ? "SMS" : rcptType === "B" ? "Both" : "Error Occurred!"}
                        left={props => <List.Icon {...props} icon="receipt" />}
                        right={props => {
                            return (
                                <MenuPaper menuArrOfObjects={receiptTypeArr} />
                            )
                        }}
                        descriptionStyle={{ color: theme.colors.primary }}
                    />
                    <Divider />
                    <List.Item
                        title="GST Flag"
                        description={gstFlag === "Y" ? "Allowed" : gstFlag === "N" ? "Denied" : "Error Occurred!"}
                        left={props => <List.Icon {...props} icon="account-cash-outline" />}
                        right={props => {
                            return (
                                <MenuPaper menuArrOfObjects={gstFlagArr} />
                            )
                        }}
                        descriptionStyle={{ color: gstFlag === "Y" ? theme.colors.green : theme.colors.error }}
                    />
                    <Divider />
                    <List.Item
                        title="Customer Information"
                        description={customerInfo === "Y" ? "Allowed" : customerInfo === "N" ? "Denied" : "Error Occurred!"}
                        left={props => <List.Icon {...props} icon="account-circle-outline" />}
                        right={props => {
                            return (
                                <MenuPaper menuArrOfObjects={customerInfoArr} />
                            )
                        }}
                        descriptionStyle={{ color: customerInfo === "Y" ? theme.colors.green : theme.colors.error }}
                    />
                    <Divider />
                    <List.Item
                        title="Payment Mode"
                        description={payMode === "Y" ? "Allowed" : payMode === "N" ? "Denied" : "Error Occurred!"}
                        left={props => <List.Icon {...props} icon="contactless-payment-circle-outline" />}
                        right={props => {
                            return (
                                <MenuPaper menuArrOfObjects={payModeArr} />
                            )
                        }}
                        descriptionStyle={{ color: payMode === "Y" ? theme.colors.green : theme.colors.error }}
                    />
                    <Divider />
                    <List.Item
                        title="Discount Type"
                        description={discountType === "P" ? "Percentage (%)" : discountType === "A" ? "Amount (₹)" : "Error Occurred!"}
                        left={props => <List.Icon {...props} icon="cash-minus" />}
                        right={props => {
                            return (
                                <MenuPaper menuArrOfObjects={discountTypeArr} />
                            )
                        }}
                        descriptionStyle={{ color: theme.colors.primary }}
                    />
                    <Divider />
                </View>
                <View style={{ paddingHorizontal: normalize(20), paddingVertical: normalize(10) }}>
                    {loginStore?.user_type === "M" ? (
                        <ButtonPaper icon="cloud-upload-outline" mode="contained" onPress={handleReceiptSettingsUpdate}>
                            UPDATE
                        </ButtonPaper>
                    ) : (
                        <ButtonPaper disabled mode="elevated" onPress={() => console.log("UPDATE")}>
                            YOU CAN'T UPDATE
                        </ButtonPaper>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    iconBtnStyle: {
        justifyContent: 'center',
        alignItems: "center",
        width: SCREEN_WIDTH / 10,
        height: SCREEN_HEIGHT / 20,
    },
    iconStyle: {
        alignSelf: "center"
    }
})
