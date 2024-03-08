import axios from "axios"
import { ADDRESSES } from "../../config/api_list"
import { CancelledBillsReportCredentials, CancelledBillsReportResponse } from "../../models/api_types"

export default function useCancelledBillsReport() {
    const fetchCancelledBills = async (cancelledBills: CancelledBillsReportCredentials) => {
        return new Promise<PromiseLike<CancelledBillsReportResponse[]>>((resolve, reject) => {
            axios.post(`${ADDRESSES.CANCELLED_BILLS_REPORT}`, cancelledBills).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    }
    return { fetchCancelledBills }
}
