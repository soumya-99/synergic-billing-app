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
import RefundItemsReportScreen from "../screens/RefundItemsReportScreen"

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
            <Stack.Screen
                name={navigationRoutes.collectionReportScreen}
                component={CollectionReportScreen}
            />
            <Stack.Screen
                name={navigationRoutes.itemReportScreen}
                component={ItemReportScreen}
            />
            <Stack.Screen
                name={navigationRoutes.gstStatementReportScreen}
                component={GstStatementReportScreen}
            />
            <Stack.Screen
                name={navigationRoutes.gstSummaryReportScreen}
                component={GstSummaryReportScreen}
            />
            <Stack.Screen
                name={navigationRoutes.stockReportScreen}
                component={StockReportScreen}
            />
            <Stack.Screen
                name={navigationRoutes.cancelledBillsReportScreen}
                component={CancelledBillsReportScreen}
            />
            <Stack.Screen
                name={navigationRoutes.refundItemsReportScreen}
                component={RefundItemsReportScreen}
            />
        </Stack.Navigator>
    )
}
