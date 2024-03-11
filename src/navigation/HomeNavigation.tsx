import { createNativeStackNavigator } from "@react-navigation/native-stack"
import navigationRoutes from "../routes/navigationRoutes"
import ProductsScreen from "../screens/ProductsScreen"
import HomeScreen from "../screens/HomeScreen"
import AllBillsScreen from "../screens/AllBillsScreen"
import CustomerDetailsFillScreen from "../screens/CustomerDetailsFillScreen"
import CancelBillScreen from "../screens/CancelBillScreen"

export default function HomeNavigation() {
  const Stack = createNativeStackNavigator()

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={navigationRoutes.homeScreen} component={HomeScreen} />
      <Stack.Screen
        name={navigationRoutes.productsScreen}
        component={ProductsScreen}
        options={{ animation: "slide_from_bottom" }}
      />
      <Stack.Screen
        name={navigationRoutes.allBillsScreen}
        component={AllBillsScreen}
        options={{ animation: "slide_from_left" }}
      />
      <Stack.Screen
        name={navigationRoutes.customerDetailsFillScreen}
        component={CustomerDetailsFillScreen}
        options={{ animation: "flip" }}
      />
      <Stack.Screen
        name={navigationRoutes.cancelBillScreen}
        component={CancelBillScreen}
        options={{ animation: "flip" }}
      />
    </Stack.Navigator>
  )
}
