import axios from "axios"
import { ADDRESSES } from "../../config/api_list"
import { OtpData } from "../../models/api_types"

export default function useFetchOtp() {
    const getOtp = async (phoneNumber: string) => {
        return new Promise<OtpData>((resolve, reject) => {
            axios.post(`${ADDRESSES.OTP}/${phoneNumber}`, {}, {}).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    }
    return { getOtp }
}