import { createNativeStackNavigator } from "@react-navigation/native-stack"
import navigationRoutes from "../routes/navigationRoutes"
import SettingsScreen from "../screens/SettingsScreen"
import { NavigationContainer } from "@react-navigation/native"
import MasterChooseScreen from "../screens/MasterChooseScreen"
import ItemMasterScreen from "../screens/ItemMasterScreen"

export default function SettingsNavigation() {
  const Stack = createNativeStackNavigator()

  return (
    <NavigationContainer independent>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name={navigationRoutes.settingsScreen}
          component={SettingsScreen}
        />
        <Stack.Screen
          name={navigationRoutes.masterChooseScreen}
          component={MasterChooseScreen}
        />
        <Stack.Screen
          name={navigationRoutes.itemMasterScreen}
          component={ItemMasterScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
