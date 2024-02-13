import axios from "axios"
import { ADDRESSES } from "../../config/api_list"
import { ItemReportData } from "../../models/api_types"

export default function useItemReport() {
    const fetchItemReport = async (fromDate: string, toDate: string, companyId: number, branchId: number, itemId: number) => {
        return new Promise<PromiseLike<ItemReportData>>((resolve, reject) => {
            axios.post(`${ADDRESSES.ITEM_REPORT}`, {
                from_date: fromDate,
                to_date: toDate,
                comp_id: companyId,
                br_id: branchId,
                item_id: itemId
            }).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    }
    return { fetchItemReport }
}
