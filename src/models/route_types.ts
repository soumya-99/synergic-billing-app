import { RouteProp } from "@react-navigation/native"
import { ItemsData, ShowBillData } from "./api_types"

type RootStackParamList = {
    ProductsScreen: {
        added_products: ItemsData[]
        net_total: number
        total_discount: number
    },
    RefundItemsScreen: {
        billed_sale_data: ShowBillData[]
    }
}

type ProductsScreenRouteProp = RouteProp<RootStackParamList, "ProductsScreen">
type RefundItemsScreenRouteProp = RouteProp<RootStackParamList, "RefundItemsScreen">

export type { ProductsScreenRouteProp, RefundItemsScreenRouteProp }