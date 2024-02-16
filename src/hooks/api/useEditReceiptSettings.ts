import axios from "axios"
import { ADDRESSES } from "../../config/api_list"
import { ReceiptSettingsEditData } from "../../models/api_types"

export default function useEditReceiptSettings() {
    const editReceiptSettings = async (
        companyId: number,
        receiptType: "P" | "S" | "B",
        gstFlag: "Y" | "N",
        custInfo: "Y" | "N",
        payMode: "Y" | "N",
        discountType: "P" | "A",
        createdBy: string,
        modifiedBy: string
    ) => {
        return new Promise<PromiseLike<ReceiptSettingsEditData>>((resolve, reject) => {
            axios.post(`${ADDRESSES.EDIT_RECEIPT_SETTINGS}`, {
                comp_id: companyId,
                rcpt_type: receiptType,
                gst_flag: gstFlag,
                cust_inf: custInfo,
                pay_mode: payMode,
                discount_type: discountType,
                created_by: createdBy,
                modified_by: modifiedBy
            }).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    }
    return { editReceiptSettings }
}
