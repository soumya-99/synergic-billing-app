import { Alert, SafeAreaView, ScrollView, StyleSheet, ToastAndroid, View } from 'react-native'
import { HelperText, RadioButton, Text } from "react-native-paper"
import LinearGradient from 'react-native-linear-gradient'
import normalize, { SCREEN_HEIGHT, SCREEN_WIDTH } from 'react-native-normalize'
import { usePaperColorScheme } from '../theme/theme'
import InputPaper from '../components/InputPaper'
import { useContext, useEffect, useRef, useState } from 'react'
import ButtonPaper from '../components/ButtonPaper'
import useCreatePin from '../hooks/api/useCreatePin'
import { CommonActions, ParamListBase, RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { clearStates } from '../utils/clearStates'
import navigationRoutes from '../routes/navigationRoutes'
import HeaderImage from '../components/HeaderImage'
import { productHeader, productHeaderDark } from '../resources/images'
import { useBluetoothPrint } from '../hooks/printables/useBluetoothPrint'
import NetTotalButton from '../components/NetTotalButton'
import { AppStore } from '../context/AppContext'
import SquircleBox from '../components/SquircleBox'

// type RouteProp<ParamListBase> = {
//     net_total: number
//     total_discount: number
// }

const CustomerDetailsFillScreen = () => {
    const navigation = useNavigation()
    const { params } = useRoute()

    const { receiptSettings } = useContext(AppStore)

    const { printReceipt, printReceiptWithoutGst } = useBluetoothPrint()

    const theme = usePaperColorScheme()


    const [customerName, setCustomerName] = useState<string>(() => "")
    const [customerMobileNumber, setCustomerMobileNumber] = useState<string>(() => "")
    const [cashAmount, setCashAmount] = useState<number | undefined>(() => undefined)
    const [finalCashAmount, setFinalCashAmount] = useState<number | undefined>(() => undefined)

    const [checked, setChecked] = useState<string>(() => "first")

    useEffect(() => {
        //@ts-ignore
        setFinalCashAmount(() => (cashAmount !== undefined ? cashAmount - Math.round(parseFloat((params?.net_total - params?.total_discount).toFixed(2))) : 0))
    }, [cashAmount])

    const handlePrintReceipt = async () => {
        // Printing receipts
        // printReceiptWithoutGst()
        console.log("Printing receipts...")
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
                            isBackEnabled
                            navigation={navigation}>
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
                            // addedProductsList={addedProductsList}
                            //@ts-ignore
                            netTotal={params?.net_total}
                            //@ts-ignore
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
                                value="first"
                                status={checked === 'first' ? 'checked' : 'unchecked'}
                                color={theme.colors.orangeContainer}
                                onPress={() => setChecked('first')}
                            />
                            <Text variant="labelLarge" style={checked === 'first' && { color: theme.colors.onPrimary }}>CASH</Text>
                            <RadioButton
                                value="second"
                                status={checked === 'second' ? 'checked' : 'unchecked'}
                                color={theme.colors.orangeContainer}
                                onPress={() => setChecked('second')}
                            />
                            <Text variant="labelLarge" style={checked === 'second' && { color: theme.colors.onPrimary }}>CARD</Text>
                            <RadioButton
                                value="third"
                                status={checked === 'third' ? 'checked' : 'unchecked'}
                                color={theme.colors.orangeContainer}
                                onPress={() => setChecked('third')}
                            />
                            <Text variant="labelLarge" style={checked === 'third' && { color: theme.colors.onPrimary }}>UPI</Text>
                        </View>
                    )}

                    {checked === "first" && (
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
                            icon="arrow-right">
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