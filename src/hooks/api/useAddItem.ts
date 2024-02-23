import axios from "axios"
import { ADDRESSES } from "../../config/api_list"
import { AddItemCredentials, AddedItemResponse } from "../../models/api_types"

// export default function useAddItem() {
//     const sendAddedItem = async (addedItem: AddItemCredentials) => {
//         return new Promise<AddedItemResponse>((resolve, reject) => {
//             axios.post(`${ADDRESSES.ADD_ITEM}`, addedItem).then(res => {
//                 resolve(res.data)
//             }).catch(err => {
//                 reject(err)
//             })
//         })
//     }
//     return { sendAddedItem }
// }


export default function useAddItem() {
    const sendAddedItem = async (addedItem: AddItemCredentials) => {
        return new Promise<AddedItemResponse>((resolve, reject) => {
            axios.post(`${ADDRESSES.ADD_ITEM}`, addedItem).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    }
    return { sendAddedItem }
}