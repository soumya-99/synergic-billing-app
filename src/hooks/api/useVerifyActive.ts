import axios from "axios"
import { ADDRESSES } from "../../config/api_list"
import { BasicResponse } from "../../models/api_types"



export default function useVerifyActive() {
    const verifyActive = async (phoneNumber: string) => {
        return new Promise<BasicResponse>((resolve, reject) => {
            axios.post(`${ADDRESSES.VERYFY_ACTIVE}/${phoneNumber}`).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    }
    return { verifyActive }
}