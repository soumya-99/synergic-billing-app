import axios from "axios"
import { ADDRESSES } from "../../config/api_list"
import { ReceiptSettingsEditCredentials, ReceiptSettingsEditData } from "../../models/api_types"

export default function useEditReceiptSettings() {
    const editReceiptSettings = async (editedRcptSettings: ReceiptSettingsEditCredentials) => {
        return new Promise<PromiseLike<ReceiptSettingsEditData>>((resolve, reject) => {
            axios.post(`${ADDRESSES.EDIT_RECEIPT_SETTINGS}`, editedRcptSettings).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    }
    return { editReceiptSettings }
}
