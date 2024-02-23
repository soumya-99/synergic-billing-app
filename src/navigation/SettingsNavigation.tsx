import { createNativeStackNavigator } from "@react-navigation/native-stack"
import navigationRoutes from "../routes/navigationRoutes"
import SettingsScreen from "../screens/SettingsScreen"
import MasterChooseScreen from "../screens/MasterChooseScreen"
import ItemMasterScreen from "../screens/ItemMasterScreen"
import PrintMain from "../screens/printer_connect_screens/PrintMain"
import HeaderFooterScreen from "../screens/HeaderFooterScreen"
import ManageProductsScreen from "../screens/ManageProductsScreen"
import ReceiptSettingsEditScreen from "../screens/ReceiptSettingsEditScreen"
import LogoUploadScreen from "../screens/LogoUploadScreen"

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
        name={navigationRoutes.manageProductsScreen}
        component={ManageProductsScreen}
      />
      <Stack.Screen
        name={navigationRoutes.receiptSettingsEditScreen}
        component={ReceiptSettingsEditScreen}
      />
      <Stack.Screen
        name={navigationRoutes.logoUploadScreen}
        component={LogoUploadScreen}
      />
      <Stack.Screen
        name={navigationRoutes.printMain}
        component={PrintMain}
      />
    </Stack.Navigator>
  )
}
