import React, { useContext } from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import LoginScreen from "../screens/LoginScreen"
import navigationRoutes from "../routes/navigationRoutes"
import { AppStore } from "../context/AppContext"
import { NavigationContainer, useTheme } from "@react-navigation/native"
import BottomNavigationPaper from "./BottomNavigationPaper"
import HomeNavigation from "./HomeNavigation"

export default function MainNavigation() {
  const Stack = createNativeStackNavigator()

  const { isLogin } = useContext(AppStore)
  const theme = useTheme()

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {isLogin ? (
            // <>
            //   <Stack.Screen
            //     name={navigationRoutes.tab_home}
            //     component={BottomNavigation}
            //   />
            //   <Stack.Screen
            //     name={mainNavigationRoutes.notificationScreen}
            //     component={NotificationScreen}
            //   />
            // </>
            <>
              <Stack.Screen
                name={navigationRoutes.bottomNavigationPaper}
                component={BottomNavigationPaper}
              />
              <Stack.Screen
                name={navigationRoutes.homeNavigation}
                component={HomeNavigation}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name={navigationRoutes.login}
                component={LoginScreen}
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
