import { useContext, useState } from "react"
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
  ToastAndroid,
  ImageBackground,
  useColorScheme,
} from "react-native"
import { withTheme, Divider, Text } from "react-native-paper"
import { usePaperColorScheme } from "../theme/theme"
import InputPaper from "../components/InputPaper"
import ButtonPaper from "../components/ButtonPaper"
import { AppStore } from "../context/AppContext"

function LoginScreen() {
  const { login } = useContext(AppStore)
  const theme = usePaperColorScheme()
  const colorScheme = useColorScheme()

  const [loginText, setLoginText] = useState<string>(() => "")
  const [passwordText, setPasswordText] = useState<string>(() => "")

  return (
    <SafeAreaView>
      <ImageBackground
        blurRadius={10}
        source={
          colorScheme === "dark"
            ? require("../resources/images/flower-2_dark.png")
            : require("../resources/images/flower-2.png")
        }
        style={[
          styles.loginWrapper,
          { backgroundColor: theme.colors.background },
        ]}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={styles.loginHeader}>
            <Text
              variant="displayMedium"
              style={[styles.loginHeaderText, { color: theme.colors.primary }]}>
              Billing App
            </Text>
          </View>
          <View
            style={{
              position: "absolute",
              width: 90,
              height: 150,
              backgroundColor: "limegreen",
              borderRadius: 10,
              transform: [{ rotate: "45deg" }],
              top: 20,
              right: 260,
              opacity: 0.5,
            }}></View>
          <View
            style={{
              position: "absolute",
              width: 90,
              height: 150,
              backgroundColor: "dodgerblue",
              borderRadius: 30,
              transform: [{ rotate: "-65deg" }],
              top: 300,
              left: 260,
              opacity: 0.5,
            }}></View>

          {/* <View style={{ padding: 5 }}>
        <Divider />
      </View> */}

          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Image
              source={require("../resources/images/billingapplogo.jpg")}
              style={{ height: 260, width: 300, borderRadius: 30 }}
            />
          </View>
          <View style={styles.textFields}>
            <InputPaper
              value={loginText}
              label={"Username"}
              onChangeText={(text: string) => setLoginText(text)}
              customStyle={{ marginBottom: 20 }}
              leftIcon="account-circle-outline"
            />
            <InputPaper
              value={passwordText}
              label={"Password"}
              secureTextEntry={true}
              onChangeText={(text: string) => setPasswordText(text)}
              leftIcon="shield-lock-outline"
            />
          </View>
          <View style={{ margin: 20 }}>
            <ButtonPaper
              mode="contained"
              onPress={() =>
                login(loginText, passwordText, setLoginText, setPasswordText)
              }
              icon="login">
              LOGIN
            </ButtonPaper>
            <View style={{ margin: 2, padding: 2 }}>
              <Text style={{ fontFamily: "ProductSans-Regular", fontSize: 10 }}>
                Powered by, Synergic Softek Solutions Pvt. Ltd.
              </Text>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  )
}

export default withTheme(LoginScreen)

const styles = StyleSheet.create({
  loginWrapper: {
    height: "100%",
  },

  loginHeader: {
    margin: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  loginHeaderText: {
    fontWeight: "500",
  },

  textFields: {
    flex: 1,
    margin: 20,
    height: "45%",
    justifyContent: "flex-end",
  },
})
