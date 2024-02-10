import { RouteProp } from "@react-navigation/native"
import { ItemsData } from "./api_types"

type RootStackParamList = {
    ProductsScreen: {
        added_products: ItemsData[]
        net_total: number
        total_discount: number
    }
}

type ProductsScreenRouteProp = RouteProp<RootStackParamList, "ProductsScreen">

export type { ProductsScreenRouteProp }