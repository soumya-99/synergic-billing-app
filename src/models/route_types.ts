import { RouteProp } from "@react-navigation/native"
import { ItemsData } from "./api_types"

type RootStackParamList = {
    CustomerDetailsFillScreen: {
        added_products: ItemsData[]
        net_total: number
        total_discount: number
    }
}

type CustomerDetailsFillScreenRouteProp = RouteProp<RootStackParamList, "CustomerDetailsFillScreen">

export type { CustomerDetailsFillScreenRouteProp }