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
        id: number
        comp_id: number
        company_name: string
        address: string
        br_id: number
        branch_name: string
        branch_address: string
        user_id: string
        user_name: string
        user_type: "U" | "A"
        phone_no: number
        email_id: string
        device_id: string
        password: string
        created_by: string
        created_dt: string
        active_flag: "Y" | "N"
        modified_by: string | null
        modified_dt: string | null
        location: number
        logo: string,
        web_portal: "N"
        contact_person: string
    } | ""
}

export type ReceiptSettingsData = {
    comp_id: number
    rcpt_type: "B" | "S" | "P"
    gst_flag: "N" | "Y"
    cust_inf: "Y" | "N"
    pay_mode: "Y" | "N"
    discount_type: "P" | "A"
    created_by: string
    created_at: string
    modified_by: string
    modified_at: string
    header1: string
    on_off_flag1: "Y" | "N"
    header2: string
    on_off_flag2: "Y" | "N"
    footer1: string
    on_off_flag3: "Y" | "N"
    footer2: string
    on_off_flag4: "Y" | "N"
}

export type ItemsData = {
    id: number
    com_id: number
    hsn_code: string
    item_name: string
    description: string
    unit_id: number
    container_id: number
    created_by: string
    created_dt: string
    modified_by: string
    modified_dt: string
    item_id: number
    price: number
    discount: number
    cgst: number
    sgst: number
    quantity?: number
}

export type SaleInsertData = {
    status: number
    data: {
        status: number
        data: number
    }
}

export type BillSummaryData = {
    status: number
    data: [
        {
            total_bills: number
            amount_collected: number
        }
    ]
}

export type RecentBillsData = {
    "receipt_no": number
    "trn_date": string
    "price": number
    "discount_amt": number
    "cgst_amt": number
    "sgst_amt": number
    "amount": number
    "round_off": number
    "net_amt": number
    "pay_mode": "C" | "D" | "U"
    "received_amt": number
    "pay_dtls": string
    "cust_name": string
    "phone_no": string
    "created_by": string
    "created_dt": string
    "modified_by": null
    "modified_dt": null
}

export type ShowBillResponseData = {
    "status": number
    "data": ShowBillData[]
}

export type ShowBillData = {
    "receipt_no": number
    "comp_id": number
    "br_id": number
    "item_id": number
    "trn_date": string
    "price": number
    "discount_amt": number
    "cgst_amt": number
    "sgst_amt": number
    "qty": number
    "created_by": string
    "created_dt": string
    "modified_by": null
    "modified_dt": null
    "item_name": string
}

export type SearchBillsData = {
    "status": 1,
    "data": SearchedBills[]
}

export type SearchedBills = {
    "receipt_no": number
    "trn_date": string
    "price": number
    "discount_amt": number
    "cgst_amt": number
    "sgst_amt": number
    "amount": number
    "round_off": number
    "net_amt": number
    "pay_mode": "C" | "D" | "U"
    "received_amt": number
    "pay_dtls": string
    "cust_name": string
    "phone_no": string
    "created_by": string
    "created_dt": string
    "modified_by": null
    "modified_dt": null
}