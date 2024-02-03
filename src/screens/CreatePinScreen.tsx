import { Alert, SafeAreaView, ScrollView, StyleSheet, ToastAndroid, View } from 'react-native'
import { Text } from "react-native-paper"
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

const CreatePinScreen = () => {
    const navigation = useNavigation()
    const { params } = useRoute()
    const { mobile_no } = params as { mobile_no: string }

    const theme = usePaperColorScheme()

    const { createPin } = useCreatePin()

    const [pin, setPin] = useState<string>(() => "")
    const [confirmPin, setConfirmPin] = useState<string>(() => "")

    const handleCreatePin = async () => {
        if (pin !== confirmPin) {
            Alert.alert("Error", "PIN is not matching! Re-Enter PIN.")

            clearStates([setPin, setConfirmPin], () => "")
            return
        }
        let createPinData = await createPin(confirmPin, mobile_no)
        console.log("createPinData", createPinData)

        ToastAndroid.show("You're registered with us successfully.", ToastAndroid.SHORT)
        navigation.dispatch(
            CommonActions.navigate({
                name: navigationRoutes.login,
            })
        )
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
                        <Text variant='displayMedium' style={{ color: theme.colors.onPrimary, textAlign: 'center' }}>Create Pin</Text>
                    </View>

                    <View style={{ justifyContent: 'center' }}>
                        <View style={{ padding: normalize(20), marginVertical: SCREEN_HEIGHT / 20 }}>
                            <InputPaper label='Enter New PIN' value={pin} onChangeText={(pin: string) => setPin(pin)} keyboardType='number-pad' leftIcon='security' maxLength={4} secureTextEntry />
                            <InputPaper label='Re-Enter PIN' value={confirmPin} onChangeText={(confirmPin: string) => setConfirmPin(confirmPin)} keyboardType='number-pad' leftIcon='security' maxLength={4} secureTextEntry />
                        </View>
                        <View style={{ padding: normalize(20) }}>
                            <ButtonPaper
                                mode="contained"
                                buttonColor={theme.colors.secondaryContainer}
                                textColor={theme.colors.onSecondaryContainer}
                                onPress={handleCreatePin}
                                icon="arrow-right">
                                JOIN
                            </ButtonPaper>
                        </View>
                    </View>
                </LinearGradient>
            </ScrollView>
        </SafeAreaView>
    )
}

export default CreatePinScreen

const styles = StyleSheet.create({})