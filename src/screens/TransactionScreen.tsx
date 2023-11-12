import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
  ImageBackground,
  useColorScheme,
  View,
} from "react-native"
import { Divider, Surface, Text } from "react-native-paper"

export default function TransactionScreen() {
  const colorScheme = useColorScheme()

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        imageStyle={{ borderRadius: 30 }}
        blurRadius={10}
        source={
          colorScheme !== "dark"
            ? require("../resources/images/blurredblue.jpg")
            : require("../resources/images/blurredblue-dark.jpg")
        }
        style={styles.surface}>
        <Text
          variant="displaySmall"
          style={{ fontFamily: "ProductSans-Medium", textAlign: "center" }}>
          Your Transactions
        </Text>
      </ImageBackground>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },

  title: {
    textAlign: "center",
  },

  surface: {
    margin: 20,
    height: Dimensions.get("window").height - 550,
    borderRadius: 30,
    width: Dimensions.get("window").width - 40,
    alignItems: "center",
    justifyContent: "center",
  },
})
