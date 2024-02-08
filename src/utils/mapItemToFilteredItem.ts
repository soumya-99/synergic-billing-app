import { ItemsData, ReceiptSettingsData } from "../models/api_types"
import { FilteredItem } from "../models/custom_types"

export function mapItemToFilteredItem(item: ItemsData, receiptSettings: ReceiptSettingsData, branchId: string, params: any, checked: string, cashAmount: number, customerName: string, customerMobileNumber: string, createdBy: string): FilteredItem {
    const { cgst, sgst, com_id, discount, item_id, quantity, price } = item

    const cgstAmt = receiptSettings?.gst_flag === "N" ? 0 : cgst
    const sgstAmt = receiptSettings?.gst_flag === "N" ? 0 : sgst

    const discountAmt = receiptSettings?.discount_type === "P" ?
        parseFloat((((price * quantity * discount) / 100).toFixed(2))) :
        parseFloat((discount).toFixed(2))

    const amount = parseFloat((params?.net_total - params?.total_discount).toFixed(2))
    const roundOff = parseFloat((Math.round(amount) - amount).toFixed(2))
    const netAmt = Math.round(amount)

    return {
        cgst_amt: cgstAmt,
        sgst_amt: sgstAmt,
        tcgst_amt: cgstAmt,
        tsgst_amt: sgstAmt,
        comp_id: com_id,
        discount_amt: discountAmt,
        item_id: item_id,
        qty: quantity,
        price: price,
        br_id: parseInt(branchId),
        tprice: parseFloat(params?.net_total?.toFixed(2)),
        tdiscount_amt: parseFloat(params?.total_discount?.toFixed(2)),
        amount: amount,
        round_off: roundOff,
        net_amt: netAmt,
        pay_mode: checked,
        received_amt: cashAmount?.toString() || (0).toString(),
        pay_dtls: receiptSettings?.discount_type === "P" ? "something P" : "something A",
        cust_name: customerName,
        phone_no: customerMobileNumber,
        created_by: createdBy?.toString()
    }
}