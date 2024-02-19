import { Alert, SafeAreaView, ScrollView, StyleSheet, ToastAndroid, View } from 'react-native'
import { Text } from "react-native-paper"
import LinearGradient from 'react-native-linear-gradient'
import normalize, { SCREEN_HEIGHT, SCREEN_WIDTH } from 'react-native-normalize'
import { usePaperColorScheme } from '../theme/theme'
import InputPaper from '../components/InputPaper'
import { useState } from 'react'
import ButtonPaper from '../components/ButtonPaper'
import useRegister from '../hooks/api/useRegister'
import useVerifyActive from '../hooks/api/useVerifyActive'
import useFetchOtp from '../hooks/api/useOtp'
import { CommonActions, useNavigation } from '@react-navigation/native'
import navigationRoutes from '../routes/navigationRoutes'

const RegisterScreen = () => {
    const navigation = useNavigation()
    const theme = usePaperColorScheme()

    const [mobileNo, setMobileNo] = useState<string>(() => "")
    const [otp, setOtp] = useState<string>(() => "")
    const [next, setNext] = useState<boolean>(() => false)

    const [fetchedOtp, setFetchedOtp] = useState<string>(() => "")

    const { register } = useRegister()
    const { verifyActive } = useVerifyActive()
    const { getOtp } = useFetchOtp()

    const handleRegister = async () => {
        await register(mobileNo).then(async res => {
            console.log("registeredData", res)

            if (res?.status === 0) {
                Alert.alert("Message", "Mobile No is not Registered.")
                setMobileNo("")
                return
            }
            else if (res?.status === 1) {
                await verifyActive(mobileNo).then(async res => {
                    console.log("verifyActiveData", res)

                    if (res?.status === -1) {
                        Alert.alert("Message", "Mobile No is already in use.")
                        setMobileNo("")
                        return
                    } else {
                        await getOtp(mobileNo).then(res => {
                            console.log("otpData", res)

                            setFetchedOtp(res?.data)
                            setNext(!next)
                        }).catch(err => {
                            ToastAndroid.show("Some error on server.", ToastAndroid.SHORT)
                        })
                    }
                }).catch(err => {
                    ToastAndroid.show("Some error on server.", ToastAndroid.SHORT)
                })
            }
        }).catch(err => {
            ToastAndroid.show("Some error on server.", ToastAndroid.SHORT)
        })
    }

    const handleOtpMatch = () => {
        if (otp === fetchedOtp) {
            console.log("OTP MATCHED...")
            navigation.dispatch(
                CommonActions.navigate({
                    name: navigationRoutes.createPinScreen,
                    params: {
                        mobile_no: mobileNo,
                    },
                })
            )
        } else {
            console.log("WRONG OTP!!!")

            Alert.alert("Error", "OTP doesn't match.")
            return
        }
    }

    return (
        <SafeAreaView>
            <ScrollView keyboardShouldPersistTaps='handled'>
                <LinearGradient
                    start={{ x: 1, y: 0 }}
                    end={{ x: 0, y: 2 }}
                    colors={[theme.colors.primary, theme.colors.onPrimary]}
                    style={{
                        minHeight: SCREEN_HEIGHT,
                        height: 'auto'
                    }}>
                    <View style={{ padding: normalize(20) }}>
                        <Text variant='displayMedium' style={{ color: theme.colors.onPrimary, textAlign: 'center' }}>Register</Text>
                    </View>

                    {!next && <View style={{ justifyContent: 'center' }}>
                        <View style={{ padding: normalize(20) }}>
                            <InputPaper label='Mobile Number' value={mobileNo} onChangeText={(mob: string) => setMobileNo(mob)} keyboardType='number-pad' leftIcon='account-arrow-up' autoFocus />
                        </View>
                        <View style={{ padding: normalize(20) }}>
                            <ButtonPaper
                                mode="contained"
                                buttonColor={theme.colors.secondaryContainer}
                                textColor={theme.colors.onSecondaryContainer}
                                onPress={handleRegister}
                                icon="arrow-right">
                                NEXT
                            </ButtonPaper>
                        </View>
                    </View>}

                    {next && <View style={{ justifyContent: 'center' }}>
                        <View style={{ padding: normalize(20) }}>
                            <InputPaper label='OTP' value={otp} onChangeText={(otp: string) => setOtp(otp)} keyboardType='number-pad' leftIcon='account-arrow-up' maxLength={4} />
                        </View>
                        <View style={{ padding: normalize(20) }}>
                            <ButtonPaper
                                mode="contained"
                                buttonColor={theme.colors.secondaryContainer}
                                textColor={theme.colors.onSecondaryContainer}
                                onPress={handleOtpMatch}
                                icon="arrow-right">
                                NEXT
                            </ButtonPaper>
                        </View>
                    </View>}
                </LinearGradient>
            </ScrollView>
        </SafeAreaView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({})