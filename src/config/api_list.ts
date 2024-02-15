import { BASE_URL } from "./config";

export const ADDRESSES = {
    REGISTER: `${BASE_URL}/api/verify_phone`,
    VERYFY_ACTIVE: `${BASE_URL}/api/verify_active`,
    OTP: `${BASE_URL}/api/otp`,
    CREATE_PIN: `${BASE_URL}/api/create_pin`,
    LOGIN: `${BASE_URL}/api/login`,
    RECEIPT_SETTINGS: `${BASE_URL}/api/receipt_settings`,
    ITEMS: `${BASE_URL}/api/items`,
    SALE_INSERT: `${BASE_URL}/api/saleinsert`,
    BILL_SUMMARY: `${BASE_URL}/api/billsummary`,
    RECENT_BILLS: `${BASE_URL}/api/recent_bills`,
    SHOW_BILL: `${BASE_URL}/api/show_bill`,
    SEARCH_BILLS: `${BASE_URL}/api/search_bills`,
    SALE_REPORT: `${BASE_URL}/api/sale_report`,
    COLLECTION_REPORT: `${BASE_URL}/api/collection_report`,
    ITEM_REPORT: `${BASE_URL}/api/item_report`,
    GST_STATEMENT: `${BASE_URL}/api/gst_statement`,
    GST_SUMMARY: `${BASE_URL}/api/gst_summary`,
    EDIT_HEADER_FOOTER: `${BASE_URL}/api/edit_header_footer`,
    EDIT_ITEM: `${BASE_URL}/api/edit_items`,
}