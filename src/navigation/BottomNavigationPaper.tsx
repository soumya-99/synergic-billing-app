import { useState } from "react"
import { BottomNavigation } from "react-native-paper"
import HomeScreen from "../screens/HomeScreen"
import SettingsScreen from "../screens/SettingsScreen"
import TransactionScreen from "../screens/TransactionScreen"
import HomeNavigation from "./HomeNavigation"
// import { usePaperColorScheme } from '../theme/theme';

function BottomNavigationPaper() {
  // const theme = usePaperColorScheme()

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
      // theme={theme}
    />
  )
}

export default BottomNavigationPaper
