import axios from "axios"
import { ADDRESSES } from "../../config/api_list"
import { } from "../../models/api_types"

export default function useCancelBill() {
    const cancelBill = async (receiptNo: number, userId: number) => {
        return new Promise<any>((resolve, reject) => {
            axios.post(`${ADDRESSES.CANCEL_BILL}`, {
                rcpt_no: receiptNo,
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