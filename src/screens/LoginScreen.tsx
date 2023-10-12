import { useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import { withTheme, Divider } from "react-native-paper"
import { usePaperColorScheme } from "../theme/theme"
import InputPaper from "../components/InputPaper"
import ButtonPaper from "../components/ButtonPaper"

function LoginScreen() {
  const theme = usePaperColorScheme()

  const [loginText, setLoginText] = useState("")
  const [passwordText, setPasswordText] = useState("")
  return (
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
      <View style={{ padding: 5 }}>
        <Divider />
      </View>
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
        <ButtonPaper mode="contained" onPress={e => console.log(e)}>
          Login
        </ButtonPaper>
      </View>
    </View>
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
