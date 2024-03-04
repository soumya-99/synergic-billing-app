import { ShowBillData } from "../models/api_types"

export function gstFilterationAndTotalForRePrint(addedProducts: ShowBillData[]) {
    let productsCGST_5: ShowBillData[] = []
    let productsCGST_12: ShowBillData[] = []
    let productsCGST_18: ShowBillData[] = []
    let productsCGST_28: ShowBillData[] = []

    let productsSGST_5: ShowBillData[] = []
    let productsSGST_12: ShowBillData[] = []
    let productsSGST_18: ShowBillData[] = []
    let productsSGST_28: ShowBillData[] = []

    let totalCGST_5: number = 0
    let totalCGST_12: number = 0
    let totalCGST_18: number = 0
    let totalCGST_28: number = 0

    let totalSGST_5: number = 0
    let totalSGST_12: number = 0
    let totalSGST_18: number = 0
    let totalSGST_28: number = 0

    let totalGST: number = 0

    for (const product of addedProducts ?? []) {
        if (product.cgst_prtg === 5) {
            productsCGST_5.push(product)
            totalCGST_5 += (((product.qty * product.price)) * product.cgst_prtg) / 100
        } else if (product.cgst_prtg === 12) {
            productsCGST_12.push(product)
            totalCGST_12 += (((product.qty * product.price)) * product.cgst_prtg) / 100
        } else if (product.cgst_prtg === 18) {
            productsCGST_18.push(product)
            totalCGST_18 += (((product.qty * product.price)) * product.cgst_prtg) / 100
        } else if (product.cgst_prtg === 28) {
            productsCGST_28.push(product)
            totalCGST_28 += (((product.qty * product.price)) * product.cgst_prtg) / 100
        }

        if (product.sgst_prtg === 5) {
            productsSGST_5.push(product)
            totalSGST_5 += (((product.qty * product.price)) * product.sgst_prtg) / 100
        } else if (product.sgst_prtg === 12) {
            productsSGST_12.push(product)
            totalSGST_12 += (((product.qty * product.price)) * product.sgst_prtg) / 100
        } else if (product.sgst_prtg === 18) {
            productsSGST_18.push(product)
            totalSGST_18 += (((product.qty * product.price)) * product.sgst_prtg) / 100
        } else if (product.sgst_prtg === 28) {
            productsSGST_28.push(product)
            totalSGST_28 += (((product.qty * product.price)) * product.sgst_prtg) / 100
        }
    }

    totalGST = totalCGST_5
        + totalCGST_12
        + totalCGST_18
        + totalCGST_28
        + totalSGST_5
        + totalSGST_12
        + totalSGST_18
        + totalSGST_28

    return {
        productsCGST_5,
        productsCGST_12,
        productsCGST_18,
        productsCGST_28,
        productsSGST_5,
        productsSGST_12,
        productsSGST_18,
        productsSGST_28,
        totalCGST_5,
        totalCGST_12,
        totalCGST_18,
        totalCGST_28,
        totalSGST_5,
        totalSGST_12,
        totalSGST_18,
        totalSGST_28,
        totalGST
    }
}