export type FilteredItem = {
    comp_id: number
    br_id: number
    item_id: number
    price: number
    discount_amt: number
    cgst_amt?: number
    sgst_amt?: number
    qty: number
    tprice: number
    tdiscount_amt: number
    tcgst_amt?: number
    tsgst_amt?: number
    amount: number
    round_off: number
    net_amt: number
    pay_mode: string
    received_amt: string
    pay_dtls: string
    cust_name: string
    phone_no: string
    created_by: string
}
