import axios from "axios"
import { ADDRESSES } from "../../config/api_list"
import { } from "../../models/api_types"

export default function useEditItem() {
    const editItem = async (
        companyId: number,
        itemId: number,
        price: number,
        discount: number,
        cgst: number,
        sgst: number,
        modifiedBy: string
    ) => {
        return new Promise<PromiseLike<any>>((resolve, reject) => {
            axios.post(`${ADDRESSES.EDIT_ITEM}`, {
                com_id: companyId,
                item_id: itemId,
                price: price,
                discount: discount,
                cgst: cgst,
                sgst: sgst,
                modified_by: modifiedBy
            }).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    }
    return { editItem }
}
