import { useContext, useEffect, useState } from "react"
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
  ImageBackground,
  useColorScheme,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  ToastAndroid,
} from "react-native"
import { withTheme, Text, TouchableRipple } from "react-native-paper"
import SmoothPinCodeInput from "react-native-smooth-pincode-input"
import { usePaperColorScheme } from "../theme/theme"
import InputPaper from "../components/InputPaper"
import ButtonPaper from "../components/ButtonPaper"
import normalize, { SCREEN_HEIGHT, SCREEN_WIDTH } from "react-native-normalize"
import { CommonActions, useNavigation } from "@react-navigation/native"
import SmsRetriever from 'react-native-sms-retriever'
import navigationRoutes from "../routes/navigationRoutes"
import { AppStore } from "../context/AppContext"
import LinearGradient from "react-native-linear-gradient"
import { logo, logoDark, flower2, flower2Dark } from "../resources/images"
import { loginStorage } from "../storage/appStorage"

function LoginScreen() {
  const navigation = useNavigation()

  const { handleLogin } = useContext(AppStore)

  const theme = usePaperColorScheme()
  const colorScheme = useColorScheme()

  const [loginText, setLoginText] = useState<string>(() => "")
  const [passwordText, setPasswordText] = useState<string>(() => "")
  const [next, setNext] = useState<boolean>(() => false)

  const openPhoneHintModal = async () => {
    if (Platform.OS === 'android') {
      try {
        await SmsRetriever.requestPhoneNumber().then(phoneNumber => {
          console.log(phoneNumber, 'PhoneNumber')
          setLoginText(phoneNumber?.slice(3, 13))
        }).then(() => {
          setNext(true)
        }).catch(err => {
          // ToastAndroid.show("Put Your Phone Number.", ToastAndroid.SHORT)
        })
      } catch (error) {
        console.log(JSON.stringify(error))
      }
    }
  }

  useEffect(() => {
    if (!loginStorage.contains("login-data")) {
      openPhoneHintModal()
    }
  }, [])

  return (
    <SafeAreaView>
      <ScrollView keyboardShouldPersistTaps="handled">
        <ImageBackground
          resizeMode="cover"
          blurRadius={10}
          source={
            colorScheme === "dark"
              ? flower2Dark
              : flower2
          }
          style={[
            styles.loginWrapper,
            { backgroundColor: theme.colors.background },
          ]}>
          <LinearGradient start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }} colors={[theme.colors.onPrimary, theme.colors.primaryContainer]} style={styles.containerBox}>
            <View
              style={{
                alignSelf: "center",
              }}>
              <Image
                source={colorScheme === "dark" ? logoDark : logo}
                style={{ height: 477 / 4.5, width: 384 / 4.5 }}
              />
            </View>
            <View>
              {!next && (
                <View
                  style={{
                    paddingHorizontal: normalize(40),
                    width: "100%",
                    flexDirection: "column",
                    gap: 20,
                  }}>
                  <View>
                    <InputPaper
                      value={loginText}
                      label={"Mobile Number"}
                      onChangeText={(text: string) => setLoginText(text)}
                      // customStyle={{ marginBottom: 20 }}
                      leftIcon="account-circle-outline"
                      keyboardType="phone-pad"
                      autoFocus
                    />
                  </View>
                  <View>
                    <ButtonPaper
                      mode="contained"
                      onPress={() => {
                        if (loginText !== "") setNext(!next)
                      }}
                      icon="arrow-right">
                      NEXT
                    </ButtonPaper>
                  </View>

                  <View style={{ justifyContent: 'space-around', alignItems: 'center' }}>
                    <Text style={{ color: theme.colors.primary }}>Don't have an account?</Text>
                    <TouchableOpacity onPress={() => (navigation.dispatch(
                      CommonActions.navigate({
                        name: navigationRoutes.register,
                      }))
                    )}>
                      <Text style={{
                        textTransform: 'uppercase',
                        color: theme.colors.green,
                        textDecorationLine: 'underline'
                      }}>
                        Create new account
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}

              {next && (
                <View
                  style={{
                    paddingHorizontal: normalize(40),
                    width: "100%",
                    flexDirection: "column",
                    gap: 20,
                  }}>
                  <View style={{ alignSelf: "center" }}>
                    <SmoothPinCodeInput
                      autoFocus={true}
                      // placeholder="🙈"
                      placeholder={<Text style={{
                        fontSize: normalize(25),
                        color: theme.colors.onSurface,
                        textAlign: "center",
                      }}>◌</Text>}
                      textStyle={{
                        fontSize: 20,
                        color: theme.colors.primary
                      }}
                      mask={
                        <View
                          style={{
                            width: 10,
                            height: 10,
                            borderRadius: normalize(30),
                            backgroundColor: theme.colors.onPrimaryContainer,
                          }}></View>
                      }
                      maskDelay={1000}
                      password={true}
                      cellStyle={{
                        borderWidth: 1,
                        borderRadius: 5,
                        borderColor: theme.colors.secondary,
                      }}
                      cellStyleFocused={null}
                      value={passwordText}
                      onTextChange={(text: string) => setPasswordText(text)}
                    />
                  </View>
                  <View
                    style={{
                      // margin: 20,
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexDirection: "row",
                      gap: 15,
                    }}>
                    <ButtonPaper
                      mode="contained"
                      buttonColor={theme.colors.error}
                      textColor={theme.colors.onError}
                      onPress={() => {
                        setNext(!next)
                      }}
                      style={{ width: normalize(100) }}
                      icon="arrow-left">
                      BACK
                    </ButtonPaper>
                    <ButtonPaper
                      mode="contained"
                      onPress={() => handleLogin(loginText, passwordText)}
                      icon="login"
                      style={{
                        paddingLeft: normalize(30),
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      LOGIN
                    </ButtonPaper>
                  </View>

                  <View style={{
                    justifyContent: "space-around",
                    flexDirection: "row",
                    marginVertical: normalize(10),
                    alignItems: "center"
                  }}>
                    <TouchableRipple onPress={
                      () => (navigation.dispatch(
                        CommonActions.navigate({
                          name: navigationRoutes.forgotPinScreen,
                        }))
                      )
                    }>
                      <Text variant="labelSmall" style={[styles.forgotOrResetText, { color: theme.colors.error }]}>Forgot Pin?</Text>
                    </TouchableRipple>
                  </View>
                </View>
              )}
            </View>
            <View>
              <Text style={{
                textAlign: "center",
                justifyContent: "flex-end",
                backgroundColor: theme.colors.surface,
                color: theme.colors.onSurface,
                padding: normalize(5)
              }}>
                Powered by, Synergic Softek Solutions Pvt. Ltd.
              </Text>
            </View>
          </LinearGradient>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  )
}

export default withTheme(LoginScreen)

const styles = StyleSheet.create({
  loginWrapper: {
    height: SCREEN_HEIGHT,
    justifyContent: "center",
    padding: normalize(20, "width"),
    width: SCREEN_WIDTH
  },

  containerBox: {
    paddingTop: normalize(30),
    height: SCREEN_HEIGHT / 1.80,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    justifyContent: "space-between"
  },

  forgotOrResetText: {
    textTransform: "uppercase",
    textAlign: "center"
  },
})
