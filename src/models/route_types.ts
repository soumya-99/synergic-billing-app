import { RouteProp } from "@react-navigation/native"
import { ItemsData, RefundListResponse, ShowBillData } from "./api_types"

type RootStackParamList = {
    ProductsScreen: {
        added_products: ItemsData[]
        net_total: number
        total_discount: number
    },
    RefundItemsScreen: {
        // billed_sale_data: ShowBillData[]
        customer_phone_number: string
        bills_data: RefundListResponse[]
    },
    ReceiptsAgainstMobileScreen: {
        billed_sale_data: ShowBillData[]
        // customer_phone_number: string
    }
}

type ProductsScreenRouteProp = RouteProp<RootStackParamList, "ProductsScreen">
type RefundItemsScreenRouteProp = RouteProp<RootStackParamList, "RefundItemsScreen">
type ReceiptsAgainstMobileScreenRouteProp = RouteProp<RootStackParamList, "ReceiptsAgainstMobileScreen">

export type { ProductsScreenRouteProp, RefundItemsScreenRouteProp, ReceiptsAgainstMobileScreenRouteProp }