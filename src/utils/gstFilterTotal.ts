import { ItemsData } from "../models/api_types"

// export function gstFilterationAndTotals(addedProducts: ItemsData[]) {
//     let productsCGST_5: ItemsData[] = []
//     let productsCGST_12: ItemsData[] = []
//     let productsCGST_18: ItemsData[] = []
//     let productsCGST_28: ItemsData[] = []

//     let productsSGST_5: ItemsData[] = []
//     let productsSGST_12: ItemsData[] = []
//     let productsSGST_18: ItemsData[] = []
//     let productsSGST_28: ItemsData[] = []

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
//         if (product.cgst === 5) {
//             productsCGST_5.push(product)
//             totalCGST_5 += (((product.quantity * product.price)) * product.cgst) / 100
//         } else if (product.cgst === 12) {
//             productsCGST_12.push(product)
//             totalCGST_12 += (((product.quantity * product.price)) * product.cgst) / 100
//         } else if (product.cgst === 18) {
//             productsCGST_18.push(product)
//             totalCGST_18 += (((product.quantity * product.price)) * product.cgst) / 100
//         } else if (product.cgst === 28) {
//             productsCGST_28.push(product)
//             totalCGST_28 += (((product.quantity * product.price)) * product.cgst) / 100
//         }

//         if (product.sgst === 5) {
//             productsSGST_5.push(product)
//             totalSGST_5 += (((product.quantity * product.price)) * product.sgst) / 100
//         } else if (product.sgst === 12) {
//             productsSGST_12.push(product)
//             totalSGST_12 += (((product.quantity * product.price)) * product.sgst) / 100
//         } else if (product.sgst === 18) {
//             productsSGST_18.push(product)
//             totalSGST_18 += (((product.quantity * product.price)) * product.sgst) / 100
//         } else if (product.sgst === 28) {
//             productsSGST_28.push(product)
//             totalSGST_28 += (((product.quantity * product.price)) * product.sgst) / 100
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

export function gstFilterationAndTotals(addedProducts: ItemsData[]) {
    const initialTotals = {
        CGST: { 5: 0, 12: 0, 18: 0, 28: 0 },
        SGST: { 5: 0, 12: 0, 18: 0, 28: 0 },
        totalGST: 0
    }

    const totals = addedProducts.reduce((acc, product) => {
        const { cgst, sgst, quantity, price } = product
        const cgstAmount = (quantity * price * cgst) / 100
        const sgstAmount = (quantity * price * sgst) / 100

        acc.CGST[cgst] += cgstAmount
        acc.SGST[sgst] += sgstAmount
        acc.totalGST += cgstAmount + sgstAmount

        return acc
    }, initialTotals)

    const {
        CGST: { 5: totalCGST_5, 12: totalCGST_12, 18: totalCGST_18, 28: totalCGST_28 },
        SGST: { 5: totalSGST_5, 12: totalSGST_12, 18: totalSGST_18, 28: totalSGST_28 },
        totalGST
    } = totals

    const filterByCGST = (cgst: number) => addedProducts.filter((product) => product.cgst === cgst)
    const filterBySGST = (sgst: number) => addedProducts.filter((product) => product.sgst === sgst)

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
