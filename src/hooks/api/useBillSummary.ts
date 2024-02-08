import axios from "axios"
import { ADDRESSES } from "../../config/api_list"
import { BillSummaryData } from "../../models/api_types"

export default function useBillSummary() {
    const fetchBillSummary = async (date: string) => {
        return new Promise<BillSummaryData>((resolve, reject) => {
            axios.get(`${ADDRESSES.BILL_SUMMARY}/${date}`).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    }
    return { fetchBillSummary }
}