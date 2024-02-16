import { MMKV } from "react-native-mmkv"

export const loginStorage = new MMKV({
    id: "login-store"
})

// export const receiptSettingsStorage = new MMKV({
//     id: "receipt-settings-store"
// })

export const fileStorage = new MMKV({
    id: "file-store"
})