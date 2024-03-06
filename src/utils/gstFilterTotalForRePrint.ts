import { ShowBillData } from "../models/api_types"

// export function gstFilterationAndTotalForRePrint(addedProducts: ShowBillData[]) {
//     let productsCGST_5: ShowBillData[] = []
//     let productsCGST_12: ShowBillData[] = []
//     let productsCGST_18: ShowBillData[] = []
//     let productsCGST_28: ShowBillData[] = []

//     let productsSGST_5: ShowBillData[] = []
//     let productsSGST_12: ShowBillData[] = []
//     let productsSGST_18: ShowBillData[] = []
//     let productsSGST_28: ShowBillData[] = []

//     let totalCGST_5: number = 0
//     let totalCGST_12: number = 0
//     let totalCGST_18: number = 0
//     let totalCGST_28: number = 0

//     let totalSGST_5: number = 0
//     let totalSGST_12: number = 0
//     let totalSGST_18: number = 0
//     let totalSGST_28: number = 0

//     let totalGST: number = 0

//     for (const product of addedProducts ?? []) {
//         if (product.cgst_prtg === 5) {
//             productsCGST_5.push(product)
//             totalCGST_5 += (((product.qty * product.price)) * product.cgst_prtg) / 100
//         } else if (product.cgst_prtg === 12) {
//             productsCGST_12.push(product)
//             totalCGST_12 += (((product.qty * product.price)) * product.cgst_prtg) / 100
//         } else if (product.cgst_prtg === 18) {
//             productsCGST_18.push(product)
//             totalCGST_18 += (((product.qty * product.price)) * product.cgst_prtg) / 100
//         } else if (product.cgst_prtg === 28) {
//             productsCGST_28.push(product)
//             totalCGST_28 += (((product.qty * product.price)) * product.cgst_prtg) / 100
//         }

//         if (product.sgst_prtg === 5) {
//             productsSGST_5.push(product)
//             totalSGST_5 += (((product.qty * product.price)) * product.sgst_prtg) / 100
//         } else if (product.sgst_prtg === 12) {
//             productsSGST_12.push(product)
//             totalSGST_12 += (((product.qty * product.price)) * product.sgst_prtg) / 100
//         } else if (product.sgst_prtg === 18) {
//             productsSGST_18.push(product)
//             totalSGST_18 += (((product.qty * product.price)) * product.sgst_prtg) / 100
//         } else if (product.sgst_prtg === 28) {
//             productsSGST_28.push(product)
//             totalSGST_28 += (((product.qty * product.price)) * product.sgst_prtg) / 100
//         }
//     }

//     totalGST = totalCGST_5
//         + totalCGST_12
//         + totalCGST_18
//         + totalCGST_28
//         + totalSGST_5
//         + totalSGST_12
//         + totalSGST_18
//         + totalSGST_28

//     return {
//         productsCGST_5,
//         productsCGST_12,
//         productsCGST_18,
//         productsCGST_28,
//         productsSGST_5,
//         productsSGST_12,
//         productsSGST_18,
//         productsSGST_28,
//         totalCGST_5,
//         totalCGST_12,
//         totalCGST_18,
//         totalCGST_28,
//         totalSGST_5,
//         totalSGST_12,
//         totalSGST_18,
//         totalSGST_28,
//         totalGST
//     }
// }

export function gstFilterationAndTotalForRePrint(addedProducts: ShowBillData[]) {
    const initialTotals = {
        CGST: { 5: 0, 12: 0, 18: 0, 28: 0 },
        SGST: { 5: 0, 12: 0, 18: 0, 28: 0 },
        totalGST: 0
    }

    const totals = addedProducts.reduce((acc, product) => {
        const { cgst_prtg, sgst_prtg, qty, price } = product
        const cgstAmount = (qty * price * cgst_prtg) / 100
        const sgstAmount = (qty * price * sgst_prtg) / 100

        acc.CGST[cgst_prtg] += cgstAmount
        acc.SGST[sgst_prtg] += sgstAmount
        acc.totalGST += cgstAmount + sgstAmount

        return acc
    }, initialTotals)

    const {
        CGST: { 5: totalCGST_5, 12: totalCGST_12, 18: totalCGST_18, 28: totalCGST_28 },
        SGST: { 5: totalSGST_5, 12: totalSGST_12, 18: totalSGST_18, 28: totalSGST_28 },
        totalGST
    } = totals

    const filterByCGST = (cgst: number) => addedProducts.filter((product) => product.cgst_prtg === cgst)
    const filterBySGST = (sgst: number) => addedProducts.filter((product) => product.sgst_prtg === sgst)

    const productsCGST_5 = filterByCGST(5)
    const productsCGST_12 = filterByCGST(12)
    const productsCGST_18 = filterByCGST(18)
    const productsCGST_28 = filterByCGST(28)

    const productsSGST_5 = filterBySGST(5)
    const productsSGST_12 = filterBySGST(12)
    const productsSGST_18 = filterBySGST(18)
    const productsSGST_28 = filterBySGST(28)

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
