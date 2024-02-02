import { BASE_URL } from "./config";

export const ADDRESSES = {
    REGISTER: `${BASE_URL}/api/verify_phone`,
    VERYFY_ACTIVE: `${BASE_URL}/api/verify_active`,
    OTP: `${BASE_URL}/api/otp`,
    CREATE_PIN: `${BASE_URL}/api/create_pin`,
    LOGIN: `${BASE_URL}/api/login`,
}