import axios from "axios"
import { ADDRESSES } from "../../config/api_list"
import { SaleReportData } from "../../models/api_types"

export default function useSaleReport() {
    const fetchSaleReport = async (fromDate: string, toDate: string, companyId: number, branchId: number, userId: string) => {
        return new Promise<PromiseLike<SaleReportData>>((resolve, reject) => {
            axios.post(`${ADDRESSES.SALE_REPORT}`, {
                from_date: fromDate,
                to_date: toDate,
                comp_id: companyId,
                br_id: branchId,
                user_id: userId
            }).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    }
    return { fetchSaleReport }
}
