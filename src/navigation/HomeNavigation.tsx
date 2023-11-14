import React, { useContext } from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import LoginScreen from "../screens/LoginScreen"
import navigationRoutes from "../routes/navigationRoutes"
import { AppStore } from "../context/AppContext"
import { NavigationContainer } from "@react-navigation/native"
import BottomNavigationPaper from "./BottomNavigationPaper"
import ProductsScreen from "../screens/ProductsScreen"
import HomeScreen from "../screens/HomeScreen"

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
    </Stack.Navigator>
  )
}
