export type FilteredItem = {
    comp_id: number
    br_id: number
    item_id: number
    price: number
    discount_amt: number
    cgst_amt?: number
    sgst_amt?: number
    qty: number
    amount: number
    pay_mode: string
    received_amt: string
    pay_dtls: string
    cust_name: string
    phone_no: string
    created_by: string
}