import { createNativeStackNavigator } from "@react-navigation/native-stack"
import navigationRoutes from "../routes/navigationRoutes"
import ReportsScreen from "../screens/ReportsScreen"
import SaleReportScreen from "../screens/SaleReportScreen"

export default function ReportsNavigation() {
    const Stack = createNativeStackNavigator()

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name={navigationRoutes.reportsScreen}
                component={ReportsScreen}
            />
            <Stack.Screen
                name={navigationRoutes.saleReportScreen}
                component={SaleReportScreen}
            />
        </Stack.Navigator>
    )
}
