import { Alert, SafeAreaView, ScrollView, StyleSheet, ToastAndroid, View } from 'react-native'
import { HelperText, Text } from "react-native-paper"
import LinearGradient from 'react-native-linear-gradient'
import normalize, { SCREEN_HEIGHT, SCREEN_WIDTH } from 'react-native-normalize'
import { usePaperColorScheme } from '../theme/theme'
import InputPaper from '../components/InputPaper'
import { useState } from 'react'
import ButtonPaper from '../components/ButtonPaper'
import useCreatePin from '../hooks/api/useCreatePin'
import { CommonActions, useNavigation, useRoute } from '@react-navigation/native'
import { clearStates } from '../utils/clearStates'
import navigationRoutes from '../routes/navigationRoutes'
import HeaderImage from '../components/HeaderImage'
import { productHeader, productHeaderDark } from '../resources/images'
import { useBluetoothPrint } from '../hooks/printables/useBluetoothPrint'

const CustomerDetailsFillScreen = () => {
    const navigation = useNavigation()
    const { params } = useRoute()

    const { printReceipt, printReceiptWithoutGst } = useBluetoothPrint()

    const theme = usePaperColorScheme()


    const [customerName, setCustomerName] = useState<string>(() => "")
    const [customerMobileNumber, setCustomerMobileNumber] = useState<string>(() => "")

    const handlePrintReceipt = async () => {
        // Printing receipts
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
                            Customer Details
                        </HeaderImage>
                    </View>
                    {/* <View style={{ padding: normalize(20) }}>
                        <Text variant='displayMedium' style={{ color: theme.colors.onPrimary, textAlign: 'center' }}>Customer Details</Text>
                    </View> */}

                    <View style={{ justifyContent: 'center' }}>
                        <View style={{ padding: normalize(20), marginVertical: SCREEN_HEIGHT / 20 }}>
                            <InputPaper label='Enter Name (Optional)' value={customerName} onChangeText={(confirmPin: string) => setCustomerName(confirmPin)} keyboardType='default' leftIcon='account-circle-outline' maxLength={15} customStyle={{ marginBottom: normalize(10) }} />

                            <InputPaper label='Enter Mobile (Optional)' value={customerMobileNumber} onChangeText={(pin: string) => setCustomerMobileNumber(pin)} keyboardType='number-pad' leftIcon='card-account-phone-outline' maxLength={10} />
                        </View>
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
                    </View>
                </LinearGradient>
            </ScrollView>
        </SafeAreaView>
    )
}

export default CustomerDetailsFillScreen

const styles = StyleSheet.create({})