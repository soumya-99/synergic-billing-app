import axios from "axios"
import { ADDRESSES } from "../../config/api_list"
import { RecentBillsData } from "../../models/api_types"

export default function useRecentBills() {
    const fetchRecentBills = async () => {
        return new Promise<PromiseLike<RecentBillsData>>((resolve, reject) => {
            axios.get(`${ADDRESSES.RECENT_BILLS}`).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    }
    return { fetchRecentBills }
}
