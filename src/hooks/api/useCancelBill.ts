import axios from "axios"
import { ADDRESSES } from "../../config/api_list"
import { CANCEL_BILL_RESPONSE } from "../../models/api_types"

export default function useCancelBill() {
    const cancelBill = async (receiptNo: number, userId: string) => {
        return new Promise<CANCEL_BILL_RESPONSE>((resolve, reject) => {
            axios.post(`${ADDRESSES.CANCEL_BILL}`, {
                receipt_no: receiptNo,
                user_id: userId,
            }).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    }
    return { cancelBill }
}