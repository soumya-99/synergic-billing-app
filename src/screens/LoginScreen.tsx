import { View, Text, StyleSheet } from "react-native"
import React from "react"
import { useTheme, withTheme } from "react-native-paper"
import { theme } from "../theme/theme"

function LoginScreen() {
  const theme = useTheme()
  return (
    <View style={styles.loginWrapper}>
      <Text>LoginScreen</Text>
    </View>
  )
}

export default withTheme(LoginScreen)

const styles = StyleSheet.create({
  loginWrapper: {
    backgroundColor: theme.colors.primary,
    height: "100%"
  },
})
