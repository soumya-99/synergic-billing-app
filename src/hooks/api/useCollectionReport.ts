import axios from "axios"
import { ADDRESSES } from "../../config/api_list"
import { CollectionReportData } from "../../models/api_types"

export default function useCollectionReport() {
    const fetchCollectionReport = async (fromDate: string, toDate: string, companyId: number, branchId: number, userId: string) => {
        return new Promise<PromiseLike<CollectionReportData>>((resolve, reject) => {
            axios.post(`${ADDRESSES.COLLECTION_REPORT}`, {
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
    return { fetchCollectionReport }
}
