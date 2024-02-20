import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { usePaperColorScheme } from "../theme/theme"
import SettingsNavigation from "./SettingsNavigation"
import HomeNavigation from "./HomeNavigation"
import ReportsNavigation from "./ReportsNavigation"

const Tab = createMaterialBottomTabNavigator()

function BottomNavigationPaper() {
  const theme = usePaperColorScheme()
  return (
    <Tab.Navigator
      theme={theme}
      initialRouteName="Home"
      activeColor={theme.colors.primary}
      inactiveColor={theme.colors.onSurface}
      barStyle={{ backgroundColor: theme.colors.surface }}>
      <Tab.Screen
        name="Home"
        component={HomeNavigation}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, focused }) => (
            !focused ? <MaterialCommunityIcons name="home-outline" color={color} size={26} /> : <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Reports"
        component={ReportsNavigation}
        options={{
          tabBarLabel: "Reports",
          tabBarIcon: ({ color, focused }) => (
            !focused ? <MaterialCommunityIcons name="cash" color={color} size={26} /> : <MaterialCommunityIcons name="cash-multiple" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsNavigation}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color, focused }) => (
            !focused ? <MaterialCommunityIcons name="cog-outline" color={color} size={26} /> : <MaterialCommunityIcons name="cog" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default BottomNavigationPaper
