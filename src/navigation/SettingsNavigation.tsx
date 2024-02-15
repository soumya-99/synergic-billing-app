import { createNativeStackNavigator } from "@react-navigation/native-stack"
import navigationRoutes from "../routes/navigationRoutes"
import SettingsScreen from "../screens/SettingsScreen"
import { NavigationContainer } from "@react-navigation/native"
import MasterChooseScreen from "../screens/MasterChooseScreen"
import ItemMasterScreen from "../screens/ItemMasterScreen"
import PrintMain from "../screens/printer_connect_screens/PrintMain"
import HeaderFooterScreen from "../screens/HeaderFooterScreen"

export default function SettingsNavigation() {
  const Stack = createNativeStackNavigator()

  return (
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
      <Stack.Screen
        name={navigationRoutes.headerFooterScreen}
        component={HeaderFooterScreen}
      />
      <Stack.Screen
        name={navigationRoutes.printMain}
        component={PrintMain}
      />
    </Stack.Navigator>
  )
}
