import { useState } from "react"
import { BottomNavigation } from "react-native-paper"
import HomeScreen from "../screens/HomeScreen"
import SettingsScreen from "../screens/SettingsScreen"
import TransactionScreen from "../screens/TransactionScreen"
import HomeNavigation from "./HomeNavigation"
import { CommonActions, useNavigation } from "@react-navigation/native"
import navigationRoutes from "../routes/navigationRoutes"
// import { usePaperColorScheme } from '../theme/theme';

function BottomNavigationPaper() {
  // const theme = usePaperColorScheme()
  const navigation = useNavigation()

  const [index, setIndex] = useState(() => 0)
  const [routes] = useState([
    {
      key: "home",
      title: "Home",
      focusedIcon: "home",
      unfocusedIcon: "home-outline",
    },
    {
      key: "transaction",
      title: "Transaction",
      focusedIcon: "cash-multiple",
      unfocusedIcon: "cash",
    },
    {
      key: "settings",
      title: "Settings",
      focusedIcon: "cog",
      unfocusedIcon: "cog-outline",
    },
  ])

  const renderScene = BottomNavigation.SceneMap({
    home: HomeNavigation,
    transaction: TransactionScreen,
    settings: SettingsScreen,
  })

  return (
    <BottomNavigation
      navigationState={{ index, routes }} // this is not deprecated. It's vital.
      onIndexChange={setIndex}
      renderScene={renderScene}
      sceneAnimationEnabled
      sceneAnimationType="shifting"
      compact
      // onTabPress={() => navigation.dispatch(
      //   CommonActions.reset({
      //     index: 0,
      //     routes: [
      //       {
      //         name: navigationRoutes.homeScreen,
      //       }
      //     ],
      //   })
      // )}
      // theme={theme}
    />
  )
}

export default BottomNavigationPaper
