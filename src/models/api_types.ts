export type RegisterData = {
    status: number
    data: string
}

export type VerifyActiveData = {
    status: number
    data: string
}

export type OtpData = {
    status: number
    data: string
}

export type CreatePinData = {
    status: number
    data: string
}

export type LoginData = {
    suc: 0 | 1
    msg: {
        comp_id: number
        company_name: string
        br_id: number
        branch_name: string
        user_id: string
        user_name: string
        phone_no: number
        email_id: string
        device_id: string
        password: string
        created_by: string
        created_dt: string
        active_flag: "Y" | "N"
    } | ""
}