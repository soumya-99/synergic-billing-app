import { createNativeStackNavigator } from "@react-navigation/native-stack"
import navigationRoutes from "../routes/navigationRoutes"
import ReportsScreen from "../screens/ReportsScreen"
import SaleReportScreen from "../screens/SaleReportScreen"
import CollectionReportScreen from "../screens/CollectionReportScreen"
import ItemReportScreen from "../screens/ItemReportScreen"
import GstStatementReportScreen from "../screens/GstStatementReportScreen"
import GstSummaryReportScreen from "../screens/GstSummaryReportScreen"
import StockReportScreen from "../screens/StockReportScreen"
import CancelledBillsReportScreen from "../screens/CancelledBillsReport"
import CancelBillScreen from "../screens/CancelBillScreen"
import MoreScreen from "../screens/MoreScreen"
import RefundItemsScreen from "../screens/RefundItemsScreen"
import RefundItemsDataScreen from "../screens/RefunditemsDataScreen"
import ReceiptsAgainstMobileScreen from "../screens/ReceiptsAgainstMobileScreen"

export default function MoreNavigation() {
    const Stack = createNativeStackNavigator()

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name={navigationRoutes.moreScreen}
                component={MoreScreen}
            />
            <Stack.Screen
                name={navigationRoutes.cancelBillScreen}
                component={CancelBillScreen}
            />
            <Stack.Screen
                name={navigationRoutes.refundItemsScreen}
                component={RefundItemsScreen}
            />
            <Stack.Screen
                name={navigationRoutes.receiptsAgainstMobileScreen}
                component={ReceiptsAgainstMobileScreen}
            />
            <Stack.Screen
                name={navigationRoutes.refundItemsDataScreen}
                component={RefundItemsDataScreen}
            />
        </Stack.Navigator>
    )
}
