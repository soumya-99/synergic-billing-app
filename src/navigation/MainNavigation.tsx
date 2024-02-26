import React, { useContext } from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import LoginScreen from "../screens/LoginScreen"
import navigationRoutes from "../routes/navigationRoutes"
import { AppStore } from "../context/AppContext"
import { NavigationContainer } from "@react-navigation/native"
import BottomNavigationPaper from "./BottomNavigationPaper"
import RegisterScreen from "../screens/RegisterScreen"
import CreatePinScreen from "../screens/CreatePinScreen"
import ChangePinScreen from "../screens/ChangePinScreen"
import ForgotPinScreen from "../screens/ForgotPinScreen"

export default function MainNavigation() {
  const Stack = createNativeStackNavigator()

  const { isLogin } = useContext(AppStore)

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false, animation: "simple_push" }}>
          {isLogin ? (
            <>
              <Stack.Screen
                name={navigationRoutes.bottomNavigationPaper}
                component={BottomNavigationPaper}
              />
              {/* <Stack.Screen
                name={navigationRoutes.homeNavigation}
                component={HomeNavigation}
              />
              <Stack.Screen
                name={navigationRoutes.settingsNavigation}
                component={SettingsNavigation}
              /> */}
            </>
          ) : (
            <>
              <Stack.Screen
                name={navigationRoutes.login}
                component={LoginScreen}
              />
              <Stack.Screen
                name={navigationRoutes.register}
                component={RegisterScreen}
              />
              <Stack.Screen
                name={navigationRoutes.createPinScreen}
                component={CreatePinScreen}
              />
              <Stack.Screen
                name={navigationRoutes.changePinScreen}
                component={ChangePinScreen}
              />
              <Stack.Screen
                name={navigationRoutes.forgotPinScreen}
                component={ForgotPinScreen}
              />
              {/* <Stack.Screen
                name={mainNavigationRoutes.forgotPasscode}
                component={ForgotPasscode}
              /> */}
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}
