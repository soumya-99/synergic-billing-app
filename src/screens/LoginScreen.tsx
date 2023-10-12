import { View, Text, StyleSheet } from "react-native"
import React from "react"
import { withTheme } from "react-native-paper"
import { theme } from "../theme/theme"

function LoginScreen() {
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
