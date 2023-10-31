import { useContext, useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import { withTheme, Divider } from "react-native-paper"
import { usePaperColorScheme } from "../theme/theme"
import InputPaper from "../components/InputPaper"
import ButtonPaper from "../components/ButtonPaper"
import { AppStore } from "../context/AppContext"

function LoginScreen() {
  const { login } = useContext(AppStore)
  const theme = usePaperColorScheme()

  const [loginText, setLoginText] = useState("")
  const [passwordText, setPasswordText] = useState("")
  return (
    <>
    <View
      style={[
        styles.loginWrapper,
        { backgroundColor: theme.colors.background },
      ]}>
      <View
        style={{ margin: 20, justifyContent: "center", alignItems: "center" }}>
        <Text style={[styles.loginHeader, { color: theme.colors.primary }]}>
          Billing App
        </Text>
      </View>
      <View style={{position: "absolute", width: 90, height: 150, backgroundColor: "red", borderRadius: 10, transform: [{ rotate: '45deg' }], top: 25, right: 260, opacity: 0.5}}></View>
      
      {/* <View style={{ padding: 5 }}>
        <Divider />
      </View> */}
      <View style={styles.textFields}>
        <InputPaper
          value={loginText}
          label={"Username"}
          onChangeText={(text: string) => setLoginText(text)}
          customStyle={{ marginBottom: 20 }}
        />
        <InputPaper
          value={passwordText}
          label={"Password"}
          secureTextEntry={true}
          onChangeText={(text: string) => setPasswordText(text)}
        />
      </View>
      <View style={{ margin: 20 }}>
        <ButtonPaper mode="contained" onPress={login}>
          Login
        </ButtonPaper>
      </View>
      <View style={{margin: 5, padding: 5}}>
        <Text style={{fontSize: 10}}>Powered by: Synergic Softek Solutions Pvt. Ltd.</Text>
      </View>
    </View>
    </>
  )
}

export default withTheme(LoginScreen)

const styles = StyleSheet.create({
  loginWrapper: {
    height: "100%",
  },

  loginHeader: {
    fontSize: 40,
  },

  textFields: {
    flex: 1,
    margin: 20,
    height: "45%",
    justifyContent: "flex-end",
  },
})
