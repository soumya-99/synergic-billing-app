export default function useCalculations() {
    const netTotalCalculate = (netTotal: number, totalDiscount: number) => {
        return (netTotal - totalDiscount).toFixed(2)
    }

    const roundingOffCalculate = (netTotal: number, totalDiscount: number) => {
        return (Math.round(parseFloat((netTotal - totalDiscount).toFixed(2))) - parseFloat((netTotal - totalDiscount).toFixed(2))).toFixed(2)
    }

    const grandTotalCalculate = (netTotal: number, totalDiscount: number) => {
        return Math.round(parseFloat((netTotal - totalDiscount).toFixed(2)))
    }

    const netTotalWithGSTCalculate = (netTotal: number, totalDiscount: number, totalGST: number) => {
        return (netTotal - totalDiscount + totalGST).toFixed(2)
    }

    const roundingOffWithGSTCalculate = (netTotal: number, totalDiscount: number, totalGST: number) => {
        return (Math.round(parseFloat((netTotal - totalDiscount + totalGST).toFixed(2))) - parseFloat((netTotal - totalDiscount + totalGST).toFixed(2))).toFixed(2)
    }

    const grandTotalWithGSTCalculate = (netTotal: number, totalDiscount: number, totalGST: number) => {
        return Math.round(parseFloat((netTotal - totalDiscount + totalGST).toFixed(2))).toFixed(2)
    }

    return {
        netTotalCalculate,
        roundingOffCalculate,
        grandTotalCalculate,

        netTotalWithGSTCalculate,
        roundingOffWithGSTCalculate,
        grandTotalWithGSTCalculate
    }
}