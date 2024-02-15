import { Alert, SafeAreaView, ScrollView, StyleSheet, ToastAndroid, View } from 'react-native'
import { RadioButton, Text } from "react-native-paper"
import LinearGradient from 'react-native-linear-gradient'
import normalize, { SCREEN_HEIGHT, SCREEN_WIDTH } from 'react-native-normalize'
import { usePaperColorScheme } from '../theme/theme'
import InputPaper from '../components/InputPaper'
import { useContext, useEffect, useState } from 'react'
import ButtonPaper from '../components/ButtonPaper'
import { CommonActions, useNavigation, useRoute } from '@react-navigation/native'
import HeaderImage from '../components/HeaderImage'
import { productHeader, productHeaderDark } from '../resources/images'
import { useBluetoothPrint } from '../hooks/printables/useBluetoothPrint'
import NetTotalButton from '../components/NetTotalButton'
import { AppStore } from '../context/AppContext'
import SquircleBox from '../components/SquircleBox'
import useSaleInsert from '../hooks/api/useSaleInsert'
import { ItemsData, ReceiptSettingsData } from '../models/api_types'
import { loginStorage } from '../storage/appStorage'
import { FilteredItem } from '../models/custom_types'
import navigationRoutes from '../routes/navigationRoutes'
import { ProductsScreenRouteProp } from '../models/route_types'
import { mapItemToFilteredItem } from '../utils/mapItemToFilteredItem'
import { gstFilterationAndTotals } from '../utils/gstFilterTotal'

const CustomerDetailsFillScreen = () => {
    const navigation = useNavigation()
    const { params } = useRoute<ProductsScreenRouteProp>()

    const { totalGST } = gstFilterationAndTotals(params?.added_products)

    const { receiptSettings } = useContext(AppStore)

    const theme = usePaperColorScheme()
    const { printReceipt, printReceiptWithoutGst } = useBluetoothPrint()
    const { sendSaleDetails } = useSaleInsert()

    const [customerName, setCustomerName] = useState<string>(() => "")
    const [customerMobileNumber, setCustomerMobileNumber] = useState<string>(() => "")
    const [cashAmount, setCashAmount] = useState<number | undefined>(() => undefined)
    const [finalCashAmount, setFinalCashAmount] = useState<number | undefined>(() => undefined)
    let receiptNumber: number | undefined = undefined

    const [checked, setChecked] = useState<string>(() => "C")

    useEffect(() => {
        setFinalCashAmount(() => (cashAmount !== undefined ? cashAmount - Math.round(parseFloat((params?.net_total - params?.total_discount).toFixed(2))) : 0))
    }, [cashAmount])

    const handleSendSaleData = async () => {
        const loginStore = JSON.parse(loginStorage.getString("login-data"))
        const branchId = loginStore.br_id
        const createdBy = loginStore.user_id

        let filteredData: FilteredItem[]

        filteredData = (params?.added_products).map(item =>
            mapItemToFilteredItem(item, receiptSettings, branchId, params, checked, cashAmount, customerName, customerMobileNumber, createdBy, totalGST)
        )

        console.log("filteredData - handleSendSaleData", filteredData)
        await sendSaleDetails(filteredData).then(res => {
            if (res.data.status === 1) {
                receiptNumber = res?.data?.data

                Alert.alert("Success", "Data Uploaded Successfully.")
                navigation.dispatch(
                    CommonActions.navigate({
                        name: navigationRoutes.homeScreen,
                    })
                )
            } else {
                Alert.alert("Fail", "Something Went Wrong!")
            }
        }).catch(err => {
            Alert.alert("Fail", "Something Went Wrong!")
        })
    }

    const handlePrintReceipt = async () => {
        if (checked === "C") {
            if (cashAmount === undefined) {
                ToastAndroid.show("Add valid cash amount.", ToastAndroid.SHORT)
                return
            } else {
                await handleSendSaleData()
                console.log("Sending data and printing receipts...")

                receiptSettings?.gst_flag === "N"
                    ? printReceiptWithoutGst(params?.added_products, params?.net_total, params?.total_discount as number, cashAmount, finalCashAmount, customerName, customerMobileNumber, receiptNumber, checked)
                    : printReceipt(params?.added_products, params?.net_total, params?.total_discount as number, cashAmount, finalCashAmount, customerName, customerMobileNumber, receiptNumber, checked)
                console.log("params?.added_products", params?.added_products)
            }
        } else {
            console.log("wquetwqagyrfasfkcbh,usdrgfyszgydfzguzxd")
            await handleSendSaleData()
            console.log("Sending data and printing receipts...")

            receiptSettings?.gst_flag === "N"
                ? printReceiptWithoutGst(params?.added_products, params?.net_total, params?.total_discount as number, cashAmount, finalCashAmount, customerName, customerMobileNumber, receiptNumber, checked)
                : printReceipt(params?.added_products, params?.net_total, params?.total_discount as number, cashAmount, finalCashAmount, customerName, customerMobileNumber, receiptNumber)
            console.log("params?.added_products", params?.added_products)
        }
    }

    return (
        <SafeAreaView>
            <ScrollView keyboardShouldPersistTaps='handled'>
                <LinearGradient
                    start={{ x: 1, y: 0 }}
                    end={{ x: 0, y: 2 }}
                    colors={[theme.colors.primary, theme.colors.pinkContainer]}
                    style={{
                        minHeight: SCREEN_HEIGHT,
                        height: 'auto'
                    }}>
                    <View style={{ alignItems: "center" }}>
                        <HeaderImage
                            imgLight={productHeader}
                            imgDark={productHeaderDark}
                            borderRadius={30}
                            blur={10}
                            isBackEnabled>
                            {receiptSettings?.cust_inf === "Y" ? "Customer Details & Print" : "Print"}
                        </HeaderImage>
                    </View>
                    {/* <View style={{ padding: normalize(20) }}>
                        <Text variant='displayMedium' style={{ color: theme.colors.onPrimary, textAlign: 'center' }}>Customer Details</Text>
                    </View> */}

                    <View>
                        <NetTotalButton
                            disabled
                            backgroundColor={theme.colors.primaryContainer}
                            textColor={theme.colors.onPrimaryContainer}
                            addedProductsList={params?.added_products}
                            netTotal={params?.net_total}
                            totalDiscount={params?.total_discount}
                            onPress={() =>
                                ToastAndroid.showWithGravityAndOffset(
                                    "Printing feature will be added in some days.",
                                    ToastAndroid.SHORT,
                                    ToastAndroid.CENTER,
                                    25,
                                    50,
                                )
                            }
                        />
                    </View>

                    {receiptSettings?.cust_inf === "Y" && (<View style={{ justifyContent: 'center' }}>
                        <View style={{ padding: normalize(20), marginVertical: SCREEN_HEIGHT / 100 }}>
                            <InputPaper label='Enter Name (Optional)' value={customerName} onChangeText={(confirmPin: string) => setCustomerName(confirmPin)} keyboardType='default' leftIcon='account-circle-outline' maxLength={15} customStyle={{ marginBottom: normalize(10) }} />

                            <InputPaper label='Enter Mobile (Optional)' value={customerMobileNumber} onChangeText={(pin: string) => setCustomerMobileNumber(pin)} keyboardType='number-pad' leftIcon='card-account-phone-outline' maxLength={10} />
                        </View>
                    </View>)}

                    {receiptSettings?.pay_mode === "Y" && (
                        <View style={{ flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", marginRight: normalize(10), marginTop: normalize(20) }}>
                            <RadioButton
                                value="C"
                                status={checked === 'C' ? 'checked' : 'unchecked'}
                                color={theme.colors.orangeContainer}
                                onPress={() => setChecked('C')}
                            />
                            <Text variant="labelLarge" style={checked === 'C' && { color: theme.colors.onPrimary }}>CASH</Text>
                            <RadioButton
                                value="D"
                                status={checked === 'D' ? 'checked' : 'unchecked'}
                                color={theme.colors.orangeContainer}
                                onPress={() => setChecked('D')}
                            />
                            <Text variant="labelLarge" style={checked === 'D' && { color: theme.colors.onPrimary }}>CARD</Text>
                            <RadioButton
                                value="U"
                                status={checked === 'U' ? 'checked' : 'unchecked'}
                                color={theme.colors.orangeContainer}
                                onPress={() => setChecked('U')}
                            />
                            <Text variant="labelLarge" style={checked === 'U' && { color: theme.colors.onPrimary }}>UPI</Text>
                        </View>
                    )}

                    {checked === "C" && (
                        <>
                            <View style={{ padding: normalize(20), marginVertical: SCREEN_HEIGHT / 150 }}>
                                <InputPaper label='Received Cash' value={cashAmount} onChangeText={(cash: number) => setCashAmount(cash)} keyboardType='number-pad' leftIcon='cash-multiple' maxLength={8} customStyle={{ marginBottom: normalize(10) }} />
                            </View>
                            <SquircleBox backgroundColor={theme.colors.primaryContainer} textColor={theme.colors.onPrimaryContainer} height={SCREEN_HEIGHT / 10}>
                                RETURNED AMOUNT: ₹{finalCashAmount}
                            </SquircleBox>
                        </>
                    )}

                    <View style={{ padding: normalize(20) }}>
                        <ButtonPaper
                            mode="contained"
                            buttonColor={theme.colors.primary}
                            textColor={theme.colors.primaryContainer}
                            onPress={handlePrintReceipt}
                            icon="cloud-print-outline">
                            PRINT
                        </ButtonPaper>
                    </View>
                </LinearGradient>
            </ScrollView>
        </SafeAreaView>
    )
}

export default CustomerDetailsFillScreen

const styles = StyleSheet.create({})