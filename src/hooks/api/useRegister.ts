import axios from "axios"
import { ADDRESSES } from "../../config/api_list"
import { RegisterData } from "../../models/api_types"



export default function useRegister() {
    const register = async (phoneNumber: string) => {
        return new Promise<RegisterData>((resolve, reject) => {
            axios.post(`${ADDRESSES.REGISTER}/${phoneNumber}`, {}, {}).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    }
    return { register }
}