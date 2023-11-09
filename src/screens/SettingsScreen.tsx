import { useContext } from 'react'
import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
  ImageBackground,
  useColorScheme,
  View
} from 'react-native'
import { Divider, Surface, Text } from 'react-native-paper';
import ButtonPaper from '../components/ButtonPaper'
import { AppStore } from '../context/AppContext'

export default function SettingsScreen() {
  const colorScheme = useColorScheme()
  const { logout } = useContext(AppStore)
  return (
    <SafeAreaView style={styles.container}>
        <ImageBackground imageStyle={{ borderRadius: 30 }}
          blurRadius={10} source={colorScheme !== "dark" ? require("../resources/images/flower_settings.jpg") : require("../resources/images/flower_settings-dark.jpg")} style={styles.surface}>
          <Text variant="displaySmall" style={{ fontFamily: "ProductSans-Medium", textAlign: "center" }}>Settings</Text>
        </ImageBackground>

        <View>
        <ButtonPaper mode='text' onPress={logout}>Log Out</ButtonPaper>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },

  title: {
    textAlign: 'center',
  },

  surface: {
    margin: 20,
    height: Dimensions.get("window").height - 550,
    borderRadius: 30,
    width: Dimensions.get("window").width - 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});