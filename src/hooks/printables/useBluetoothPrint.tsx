import { BluetoothEscposPrinter } from "react-native-bluetooth-escpos-printer"
import { BASE_64_IMAGE } from "../../resources/base64/logo"
import { loginStorage } from "../../storage/appStorage"
import { useContext } from "react"
import { AppStore } from "../../context/AppContext"
import { CollectionReport, GstStatement, GstSummary, ItemReport, ItemsData, SaleReport, ShowBillData } from "../../models/api_types"
import { gstFilterationAndTotals } from "../../utils/gstFilterTotal"
import { gstFilterationAndTotalForRePrint } from "../../utils/gstFilterTotalForRePrint"

export const useBluetoothPrint = () => {
    const { receiptSettings } = useContext(AppStore)

    async function printReceipt(addedProducts: ItemsData[], netTotal: number, totalDiscountAmount: number, cashAmount?: number, returnedAmt?: number, customerName?: string, customerPhone?: string, rcptNo?: number, paymentMode?: string) {
        const loginStore = JSON.parse(loginStorage.getString("login-data"))

        const shopName: string = loginStore?.company_name?.toString()
        const address: string = loginStore?.address?.toString()
        const location: string = loginStore?.branch_name?.toString()
        const shopMobile: string = loginStore?.phone_no?.toString()
        const shopEmail: string = loginStore?.email_id?.toString()
        const cashier: string = loginStore?.user_name?.toString()

        let { totalCGST_5, totalCGST_12, totalCGST_18, totalCGST_28, totalSGST_5, totalSGST_12, totalSGST_18, totalSGST_28 } = gstFilterationAndTotals(addedProducts)

        let totalQuantities: number = 0
        let totalAmountAfterDiscount: number = 0

        try {

            let columnWidths = [11, 1, 18]
            let columnWidthsHeader = [8, 1, 21]
            let columnWidthsProductsHeaderAndBody = [8, 4, 6, 5, 7]
            // let columnWidthsProductsHeaderAndBody = [18, 3, 4, 3, 4]
            let columnWidthsItemTotal = [18, 12]
            let columnWidthIfNameIsBig = [32]

            // let newColumnWidths: number[] = [9, 9, 6, 7]

            await BluetoothEscposPrinter.printerAlign(
                BluetoothEscposPrinter.ALIGN.CENTER,
            )
            await BluetoothEscposPrinter.printText(shopName.toUpperCase(), {
                align: "center",
                widthtimes: 1.2,
                heigthtimes: 2,
            })
            await BluetoothEscposPrinter.printText("\n", {})
            // await BluetoothEscposPrinter.printText("hasifughaf", { align: "center" })

            if (receiptSettings?.on_off_flag1 === "Y") {
                await BluetoothEscposPrinter.printText(receiptSettings?.header1, {})
                await BluetoothEscposPrinter.printText("\n", {})
            }

            if (receiptSettings?.on_off_flag2 === "Y") {
                await BluetoothEscposPrinter.printText(receiptSettings?.header2, {})
            }
            await BluetoothEscposPrinter.printText("\n", {})

            await BluetoothEscposPrinter.printText("RECEIPT", {
                align: "center",
            })

            await BluetoothEscposPrinter.printText("\n", {})

            await BluetoothEscposPrinter.printText(
                "------------------------",
                { align: "center" },
            )


            await BluetoothEscposPrinter.printText("\n", {})
            await BluetoothEscposPrinter.printText(address, {
                align: "center",
            })
            await BluetoothEscposPrinter.printText("\n", {})
            await BluetoothEscposPrinter.printText(location, {
                align: "center",
            })
            await BluetoothEscposPrinter.printText("\n", {})
            await BluetoothEscposPrinter.printText(
                "------------------------",
                { align: "center" },
            )
            await BluetoothEscposPrinter.printText("\n", {})

            // await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.LEFT)


            await BluetoothEscposPrinter.printColumn(
                columnWidthsHeader,
                [
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.CENTER,
                    BluetoothEscposPrinter.ALIGN.RIGHT,
                ],
                ["MOBILE", ":", shopMobile],
                {},
            )
            await BluetoothEscposPrinter.printColumn(
                columnWidthsHeader,
                [
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.CENTER,
                    BluetoothEscposPrinter.ALIGN.RIGHT,
                ],
                ["EMAIL", ":", shopEmail],
                {},
            )
            // await BluetoothEscposPrinter.printColumn(
            //     columnWidthsHeader,
            //     [
            //         BluetoothEscposPrinter.ALIGN.LEFT,
            //         BluetoothEscposPrinter.ALIGN.CENTER,
            //         BluetoothEscposPrinter.ALIGN.RIGHT,
            //     ],
            //     ["SITE", ":", "SHOPNAME.COM"],
            //     {},
            // )

            await BluetoothEscposPrinter.printText(
                "------------------------",
                { align: "center" },
            )
            await BluetoothEscposPrinter.printText("\n", {})

            await BluetoothEscposPrinter.printColumn(
                columnWidthsHeader,
                [
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.CENTER,
                    BluetoothEscposPrinter.ALIGN.RIGHT,
                ],
                ["RCPT.NO", ":", rcptNo?.toString()],
                {},
            )
            await BluetoothEscposPrinter.printColumn(
                columnWidthsHeader,
                [
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.CENTER,
                    BluetoothEscposPrinter.ALIGN.RIGHT,
                ],
                ["DATE", ":", `${new Date().toLocaleString("en-GB")}`],
                {},
            )
            await BluetoothEscposPrinter.printColumn(
                columnWidthsHeader,
                [
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.CENTER,
                    BluetoothEscposPrinter.ALIGN.RIGHT,
                ],
                ["CASHIER", ":", cashier],
                {},
            )

            await BluetoothEscposPrinter.printText(
                "------------------------",
                { align: "center" },
            )
            await BluetoothEscposPrinter.printText("\n", {})

            if (customerName.length !== 0 || customerPhone.length !== 0) {
                receiptSettings?.cust_inf === "Y" && await BluetoothEscposPrinter.printColumn(
                    columnWidthsHeader,
                    [
                        BluetoothEscposPrinter.ALIGN.LEFT,
                        BluetoothEscposPrinter.ALIGN.CENTER,
                        BluetoothEscposPrinter.ALIGN.RIGHT,
                    ],
                    ["NAME", ":", customerName],
                    {},
                )
                await BluetoothEscposPrinter.printColumn(
                    columnWidthsHeader,
                    [
                        BluetoothEscposPrinter.ALIGN.LEFT,
                        BluetoothEscposPrinter.ALIGN.CENTER,
                        BluetoothEscposPrinter.ALIGN.RIGHT,
                    ],
                    ["PHONE", ":", customerPhone],
                    {},
                )
            }

            await BluetoothEscposPrinter.printText(
                "------------------------",
                { align: "center" },
            )


            await BluetoothEscposPrinter.printText("\n", {})

            await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER)
            await BluetoothEscposPrinter.printColumn(
                columnWidthsProductsHeaderAndBody,
                [
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.CENTER,
                    BluetoothEscposPrinter.ALIGN.RIGHT,
                    BluetoothEscposPrinter.ALIGN.RIGHT,
                ],
                ["ITEM", "QTY", "PRICE", "DIS.", "AMT"],
                {},
            )

            await BluetoothEscposPrinter.printText(
                "------------------------",
                { align: "center" },
            )

            await BluetoothEscposPrinter.printText("\n", {})

            for (const item of addedProducts) {
                //@ts-ignore
                totalQuantities += parseInt(item?.quantity)
                receiptSettings?.discount_type === "P"
                    ? totalAmountAfterDiscount += ((item?.price * item?.quantity) - ((item?.price * item?.quantity * item?.discount) / 100))
                    : totalAmountAfterDiscount += ((item?.price * item?.quantity) - item?.discount)

                if (item?.item_name?.length > 9) {
                    await BluetoothEscposPrinter.printColumn(
                        columnWidthIfNameIsBig,
                        [BluetoothEscposPrinter.ALIGN.LEFT],
                        [item?.item_name],
                        {},
                    )
                    await BluetoothEscposPrinter.printColumn(
                        columnWidthsProductsHeaderAndBody,
                        [
                            BluetoothEscposPrinter.ALIGN.LEFT,
                            BluetoothEscposPrinter.ALIGN.LEFT,
                            BluetoothEscposPrinter.ALIGN.CENTER,
                            BluetoothEscposPrinter.ALIGN.RIGHT,
                            BluetoothEscposPrinter.ALIGN.RIGHT,
                        ],
                        ["", item?.quantity.toString(), item?.price.toString(), (((item?.price * item?.quantity * item?.discount) / 100).toFixed(2)).toString(), `${((item?.price * item?.quantity) - ((item?.price * item?.quantity * item?.discount) / 100)).toFixed(2).toString()}`],
                        {},
                    )
                } else {
                    await BluetoothEscposPrinter.printColumn(
                        columnWidthsProductsHeaderAndBody,
                        [
                            BluetoothEscposPrinter.ALIGN.LEFT,
                            BluetoothEscposPrinter.ALIGN.LEFT,
                            BluetoothEscposPrinter.ALIGN.CENTER,
                            BluetoothEscposPrinter.ALIGN.RIGHT,
                            BluetoothEscposPrinter.ALIGN.RIGHT,
                        ],
                        [item?.item_name, item?.quantity.toString(), item?.price.toString(), (((item?.price * item?.quantity * item?.discount) / 100).toFixed(2)).toString(), `${(item?.price * item?.quantity).toString()}`],
                        {},
                    );
                    await BluetoothEscposPrinter.printText("\n", {});
                }
            }

            await BluetoothEscposPrinter.printText("\n", {})
            await BluetoothEscposPrinter.printText(
                "------------------------",
                { align: "center" },
            )

            await BluetoothEscposPrinter.printText("\n", {})

            await BluetoothEscposPrinter.printColumn(
                columnWidthsItemTotal,
                [
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.RIGHT,
                ],
                [`ITEM: ${addedProducts?.length?.toString()} QTY: ${totalQuantities.toString()}`, `AMT: ${netTotal?.toFixed(2)}`],
                {},
            )
            await BluetoothEscposPrinter.printText("\n", {})

            await BluetoothEscposPrinter.printColumn(
                columnWidths,
                [
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.CENTER,
                    BluetoothEscposPrinter.ALIGN.RIGHT,
                ],
                ["DISCOUNT", ":", totalDiscountAmount.toFixed(2).toString()],
                {},
            )


            totalCGST_5 > 0 &&
                await BluetoothEscposPrinter.printColumn(
                    columnWidths,
                    [
                        BluetoothEscposPrinter.ALIGN.LEFT,
                        BluetoothEscposPrinter.ALIGN.CENTER,
                        BluetoothEscposPrinter.ALIGN.RIGHT,
                    ],
                    ["CGST @5%", ":", totalCGST_5.toFixed(2).toString()],
                    {},
                )
            totalSGST_5 > 0 &&
                await BluetoothEscposPrinter.printColumn(
                    columnWidths,
                    [
                        BluetoothEscposPrinter.ALIGN.LEFT,
                        BluetoothEscposPrinter.ALIGN.CENTER,
                        BluetoothEscposPrinter.ALIGN.RIGHT,
                    ],
                    ["SGST @5%", ":", totalSGST_5.toFixed(2).toString()],
                    {},
                )
            totalCGST_12 > 0 &&
                await BluetoothEscposPrinter.printColumn(
                    columnWidths,
                    [
                        BluetoothEscposPrinter.ALIGN.LEFT,
                        BluetoothEscposPrinter.ALIGN.CENTER,
                        BluetoothEscposPrinter.ALIGN.RIGHT,
                    ],
                    ["CGST @12%", ":", totalCGST_12.toFixed(2).toString()],
                    {},
                )
            totalSGST_12 > 0 &&
                await BluetoothEscposPrinter.printColumn(
                    columnWidths,
                    [
                        BluetoothEscposPrinter.ALIGN.LEFT,
                        BluetoothEscposPrinter.ALIGN.CENTER,
                        BluetoothEscposPrinter.ALIGN.RIGHT,
                    ],
                    ["SGST @12%", ":", totalSGST_12.toFixed(2).toString()],
                    {},
                )
            totalCGST_18 > 0 &&
                await BluetoothEscposPrinter.printColumn(
                    columnWidths,
                    [
                        BluetoothEscposPrinter.ALIGN.LEFT,
                        BluetoothEscposPrinter.ALIGN.CENTER,
                        BluetoothEscposPrinter.ALIGN.RIGHT,
                    ],
                    ["CGST @18%", ":", totalCGST_18.toFixed(2).toString()],
                    {},
                )
            totalSGST_18 > 0 &&
                await BluetoothEscposPrinter.printColumn(
                    columnWidths,
                    [
                        BluetoothEscposPrinter.ALIGN.LEFT,
                        BluetoothEscposPrinter.ALIGN.CENTER,
                        BluetoothEscposPrinter.ALIGN.RIGHT,
                    ],
                    ["SGST @18%", ":", totalSGST_18.toFixed(2).toString()],
                    {},
                )
            totalCGST_28 > 0 &&
                await BluetoothEscposPrinter.printColumn(
                    columnWidths,
                    [
                        BluetoothEscposPrinter.ALIGN.LEFT,
                        BluetoothEscposPrinter.ALIGN.CENTER,
                        BluetoothEscposPrinter.ALIGN.RIGHT,
                    ],
                    ["CGST @28%", ":", totalCGST_28.toFixed(2).toString()],
                    {},
                )
            totalSGST_28 > 0 &&
                await BluetoothEscposPrinter.printColumn(
                    columnWidths,
                    [
                        BluetoothEscposPrinter.ALIGN.LEFT,
                        BluetoothEscposPrinter.ALIGN.CENTER,
                        BluetoothEscposPrinter.ALIGN.RIGHT,
                    ],
                    ["SGST @28%", ":", totalSGST_28.toFixed(2).toString()],
                    {},
                )

            await BluetoothEscposPrinter.printColumn(
                columnWidths,
                [
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.CENTER,
                    BluetoothEscposPrinter.ALIGN.RIGHT,
                ],
                ["TOTAL GST", ":", (totalCGST_5 + totalSGST_5 + totalCGST_12 + totalSGST_12 + totalCGST_18 + totalSGST_18 + totalCGST_28 + totalSGST_28).toFixed(2).toString()],
                {},
            )

            await BluetoothEscposPrinter.printColumn(
                columnWidths,
                [
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.CENTER,
                    BluetoothEscposPrinter.ALIGN.RIGHT,
                ],
                ["TOTAL", ":", `${(netTotal - totalDiscountAmount + totalCGST_5 + totalSGST_5 + totalCGST_12 + totalSGST_12 + totalCGST_18 + totalSGST_18 + totalCGST_28 + totalSGST_28).toFixed(2)}`],
                {},
            )
            await BluetoothEscposPrinter.printColumn(
                columnWidths,
                [
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.CENTER,
                    BluetoothEscposPrinter.ALIGN.RIGHT,
                ],
                ["ROUND OFF", ":", `${(Math.round(parseFloat((netTotal - totalDiscountAmount + totalCGST_5 + totalSGST_5 + totalCGST_12 + totalSGST_12 + totalCGST_18 + totalSGST_18 + totalCGST_28 + totalSGST_28).toFixed(2))) - parseFloat((netTotal - totalDiscountAmount + totalCGST_5 + totalSGST_5 + totalCGST_12 + totalSGST_12 + totalCGST_18 + totalSGST_18 + totalCGST_28 + totalSGST_28).toFixed(2))).toFixed(2)}`],
                {},
            )
            await BluetoothEscposPrinter.printColumn(
                columnWidths,
                [
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.CENTER,
                    BluetoothEscposPrinter.ALIGN.RIGHT,
                ],
                ["NET AMT", ":", `${Math.round(parseFloat((netTotal - totalDiscountAmount + totalCGST_5 + totalSGST_5 + totalCGST_12 + totalSGST_12 + totalCGST_18 + totalSGST_18 + totalCGST_28 + totalSGST_28).toFixed(2)))}`],
                {},
            )

            await BluetoothEscposPrinter.printText("\n", {})
            await BluetoothEscposPrinter.printText(
                "------------------------",
                { align: "center" },
            )
            await BluetoothEscposPrinter.printText("\n", {})
            if (paymentMode === "C") {
                await BluetoothEscposPrinter.printText(
                    "PAYMENT MODE",
                    { align: "center" },
                )
                await BluetoothEscposPrinter.printText("\n", {})
                await BluetoothEscposPrinter.printText(
                    `CASH RECEIVED:       ${cashAmount}`,
                    { align: "center" },
                )
                await BluetoothEscposPrinter.printText("\n", {})
                await BluetoothEscposPrinter.printText(
                    `RETURNED AMT:        ${returnedAmt}`,
                    { align: "center" },
                )

                await BluetoothEscposPrinter.printText("\n", {})
                await BluetoothEscposPrinter.printText(
                    "------------------------",
                    { align: "center" },
                )
            }
            await BluetoothEscposPrinter.printText("\n", {})


            if (receiptSettings?.on_off_flag3 === "Y") {
                await BluetoothEscposPrinter.printText(receiptSettings?.footer1, {})
                await BluetoothEscposPrinter.printText("\n", {})
            }
            if (receiptSettings?.on_off_flag4 === "Y") {
                await BluetoothEscposPrinter.printText(receiptSettings?.footer2, {})
            }
            await BluetoothEscposPrinter.printText("\n", {})


            await BluetoothEscposPrinter.printText(
                "THANK YOU, VISIT AGAIN!",
                { align: "center" },
            )
            await BluetoothEscposPrinter.printText("\n", {})

            await BluetoothEscposPrinter.printText(
                "------X------",
                {},
            )
            await BluetoothEscposPrinter.printText("\n\r\n\r\n\r", {})
        } catch (e) {
            console.log(e.message || "ERROR")
        }
    }

    async function printReceiptWithoutGst(addedProducts: ItemsData[], netTotal: number, totalDiscountAmount: number, cashAmount?: number, returnedAmt?: number, customerName?: string, customerPhone?: string, rcptNo?: number, paymentMode?: string) {
        const loginStore = JSON.parse(loginStorage.getString("login-data"))

        const shopName: string = loginStore?.company_name?.toString()
        const address: string = loginStore?.address?.toString()
        const location: string = loginStore?.branch_name?.toString()
        const shopMobile: string = loginStore?.phone_no?.toString()
        const shopEmail: string = loginStore?.email_id?.toString()
        const cashier: string = loginStore?.user_name?.toString()

        let totalQuantities: number = 0
        let totalAmountAfterDiscount: number = 0

        try {

            let columnWidths = [11, 1, 18]
            let columnWidthsHeader = [8, 1, 21]
            let columnWidthsProductsHeaderAndBody = [8, 4, 6, 5, 7]
            // let columnWidthsProductsHeaderAndBody = [18, 3, 4, 3, 4]
            let columnWidthsItemTotal = [18, 12]
            let columnWidthIfNameIsBig = [32]

            // let newColumnWidths: number[] = [9, 9, 6, 7]

            await BluetoothEscposPrinter.printerAlign(
                BluetoothEscposPrinter.ALIGN.CENTER,
            )
            await BluetoothEscposPrinter.printText(shopName.toUpperCase(), {
                align: "center",
                widthtimes: 1.2,
                heigthtimes: 2,
            })
            await BluetoothEscposPrinter.printText("\n", {})
            // await BluetoothEscposPrinter.printText("hasifughaf", { align: "center" })

            if (receiptSettings?.on_off_flag1 === "Y") {
                await BluetoothEscposPrinter.printText(receiptSettings?.header1, {})
                await BluetoothEscposPrinter.printText("\n", {})
            }

            if (receiptSettings?.on_off_flag2 === "Y") {
                await BluetoothEscposPrinter.printText(receiptSettings?.header2, {})
            }
            await BluetoothEscposPrinter.printText("\n", {})

            await BluetoothEscposPrinter.printText("RECEIPT", {
                align: "center",
            })

            await BluetoothEscposPrinter.printText("\n", {})

            await BluetoothEscposPrinter.printText(
                "------------------------",
                { align: "center" },
            )


            await BluetoothEscposPrinter.printText("\n", {})
            await BluetoothEscposPrinter.printText(address, {
                align: "center",
            })
            await BluetoothEscposPrinter.printText("\n", {})
            await BluetoothEscposPrinter.printText(location, {
                align: "center",
            })
            await BluetoothEscposPrinter.printText("\n", {})
            await BluetoothEscposPrinter.printText(
                "------------------------",
                { align: "center" },
            )
            await BluetoothEscposPrinter.printText("\n", {})

            // await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.LEFT)


            await BluetoothEscposPrinter.printColumn(
                columnWidthsHeader,
                [
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.CENTER,
                    BluetoothEscposPrinter.ALIGN.RIGHT,
                ],
                ["MOBILE", ":", shopMobile],
                {},
            )
            await BluetoothEscposPrinter.printColumn(
                columnWidthsHeader,
                [
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.CENTER,
                    BluetoothEscposPrinter.ALIGN.RIGHT,
                ],
                ["EMAIL", ":", shopEmail],
                {},
            )
            // await BluetoothEscposPrinter.printColumn(
            //     columnWidthsHeader,
            //     [
            //         BluetoothEscposPrinter.ALIGN.LEFT,
            //         BluetoothEscposPrinter.ALIGN.CENTER,
            //         BluetoothEscposPrinter.ALIGN.RIGHT,
            //     ],
            //     ["SITE", ":", "SHOPNAME.COM"],
            //     {},
            // )

            await BluetoothEscposPrinter.printText(
                "------------------------",
                { align: "center" },
            )
            await BluetoothEscposPrinter.printText("\n", {})

            await BluetoothEscposPrinter.printColumn(
                columnWidthsHeader,
                [
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.CENTER,
                    BluetoothEscposPrinter.ALIGN.RIGHT,
                ],
                ["RCPT.NO", ":", rcptNo?.toString()],
                {},
            )
            await BluetoothEscposPrinter.printColumn(
                columnWidthsHeader,
                [
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.CENTER,
                    BluetoothEscposPrinter.ALIGN.RIGHT,
                ],
                ["DATE", ":", `${new Date().toLocaleString("en-GB")}`],
                {},
            )
            await BluetoothEscposPrinter.printColumn(
                columnWidthsHeader,
                [
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.CENTER,
                    BluetoothEscposPrinter.ALIGN.RIGHT,
                ],
                ["CASHIER", ":", cashier],
                {},
            )

            await BluetoothEscposPrinter.printText(
                "------------------------",
                { align: "center" },
            )
            await BluetoothEscposPrinter.printText("\n", {})

            if (customerName.length !== 0 || customerPhone.length !== 0) {
                receiptSettings?.cust_inf === "Y" && await BluetoothEscposPrinter.printColumn(
                    columnWidthsHeader,
                    [
                        BluetoothEscposPrinter.ALIGN.LEFT,
                        BluetoothEscposPrinter.ALIGN.CENTER,
                        BluetoothEscposPrinter.ALIGN.RIGHT,
                    ],
                    ["NAME", ":", customerName],
                    {},
                )
                await BluetoothEscposPrinter.printColumn(
                    columnWidthsHeader,
                    [
                        BluetoothEscposPrinter.ALIGN.LEFT,
                        BluetoothEscposPrinter.ALIGN.CENTER,
                        BluetoothEscposPrinter.ALIGN.RIGHT,
                    ],
                    ["PHONE", ":", customerPhone],
                    {},
                )
            }

            await BluetoothEscposPrinter.printText(
                "------------------------",
                { align: "center" },
            )


            await BluetoothEscposPrinter.printText("\n", {})

            await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER)
            await BluetoothEscposPrinter.printColumn(
                columnWidthsProductsHeaderAndBody,
                [
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.CENTER,
                    BluetoothEscposPrinter.ALIGN.RIGHT,
                    BluetoothEscposPrinter.ALIGN.RIGHT,
                ],
                ["ITEM", "QTY", "PRICE", "DIS.", "AMT"],
                {},
            )

            await BluetoothEscposPrinter.printText(
                "------------------------",
                { align: "center" },
            )

            await BluetoothEscposPrinter.printText("\n", {})

            for (const item of addedProducts) {
                //@ts-ignore
                totalQuantities += parseInt(item?.quantity)
                receiptSettings?.discount_type === "P"
                    ? totalAmountAfterDiscount += ((item?.price * item?.quantity) - ((item?.price * item?.quantity * item?.discount) / 100))
                    : totalAmountAfterDiscount += ((item?.price * item?.quantity) - item?.discount)

                if (item?.item_name?.length > 9) {
                    await BluetoothEscposPrinter.printColumn(
                        columnWidthIfNameIsBig,
                        [BluetoothEscposPrinter.ALIGN.LEFT],
                        [item?.item_name],
                        {},
                    )
                    await BluetoothEscposPrinter.printColumn(
                        columnWidthsProductsHeaderAndBody,
                        [
                            BluetoothEscposPrinter.ALIGN.LEFT,
                            BluetoothEscposPrinter.ALIGN.LEFT,
                            BluetoothEscposPrinter.ALIGN.CENTER,
                            BluetoothEscposPrinter.ALIGN.RIGHT,
                            BluetoothEscposPrinter.ALIGN.RIGHT,
                        ],
                        ["", item?.quantity.toString(), item?.price.toString(), (((item?.price * item?.quantity * item?.discount) / 100).toFixed(2)).toString(), `${((item?.price * item?.quantity) - ((item?.price * item?.quantity * item?.discount) / 100)).toFixed(2).toString()}`],
                        {},
                    )
                } else {
                    await BluetoothEscposPrinter.printColumn(
                        columnWidthsProductsHeaderAndBody,
                        [
                            BluetoothEscposPrinter.ALIGN.LEFT,
                            BluetoothEscposPrinter.ALIGN.LEFT,
                            BluetoothEscposPrinter.ALIGN.CENTER,
                            BluetoothEscposPrinter.ALIGN.RIGHT,
                            BluetoothEscposPrinter.ALIGN.RIGHT,
                        ],
                        [item?.item_name, item?.quantity.toString(), item?.price.toString(), (((item?.price * item?.quantity * item?.discount) / 100).toFixed(2)).toString(), `${(item?.price * item?.quantity).toString()}`],
                        {},
                    );
                    await BluetoothEscposPrinter.printText("\n", {});
                }
            }

            await BluetoothEscposPrinter.printText("\n", {})
            await BluetoothEscposPrinter.printText(
                "------------------------",
                { align: "center" },
            )

            await BluetoothEscposPrinter.printText("\n", {})

            await BluetoothEscposPrinter.printColumn(
                columnWidthsItemTotal,
                [
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.RIGHT,
                ],
                [`ITEM: ${addedProducts?.length?.toString()} QTY: ${totalQuantities.toString()}`, `AMT: ${netTotal?.toFixed(2)}`],
                {},
            )
            await BluetoothEscposPrinter.printText("\n", {})

            await BluetoothEscposPrinter.printColumn(
                columnWidths,
                [
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.CENTER,
                    BluetoothEscposPrinter.ALIGN.RIGHT,
                ],
                ["DISCOUNT", ":", totalDiscountAmount.toFixed(2).toString()],
                {},
            )
            await BluetoothEscposPrinter.printColumn(
                columnWidths,
                [
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.CENTER,
                    BluetoothEscposPrinter.ALIGN.RIGHT,
                ],
                ["TOTAL", ":", `${(netTotal - totalDiscountAmount).toFixed(2)}`],
                {},
            )
            await BluetoothEscposPrinter.printColumn(
                columnWidths,
                [
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.CENTER,
                    BluetoothEscposPrinter.ALIGN.RIGHT,
                ],
                ["ROUND OFF", ":", `${(Math.round(parseFloat((netTotal - totalDiscountAmount).toFixed(2))) - parseFloat((netTotal - totalDiscountAmount).toFixed(2))).toFixed(2)}`],
                {},
            )
            await BluetoothEscposPrinter.printColumn(
                columnWidths,
                [
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.CENTER,
                    BluetoothEscposPrinter.ALIGN.RIGHT,
                ],
                ["NET AMT", ":", `${Math.round(parseFloat((netTotal - totalDiscountAmount).toFixed(2)))}`],
                {},
            )

            await BluetoothEscposPrinter.printText("\n", {})
            await BluetoothEscposPrinter.printText(
                "------------------------",
                { align: "center" },
            )
            await BluetoothEscposPrinter.printText("\n", {})
            if (paymentMode === "C") {
                await BluetoothEscposPrinter.printText(
                    "PAYMENT MODE",
                    { align: "center" },
                )
                await BluetoothEscposPrinter.printText("\n", {})
                await BluetoothEscposPrinter.printText(
                    `CASH RECEIVED:       ${cashAmount}`,
                    { align: "center" },
                )
                await BluetoothEscposPrinter.printText("\n", {})
                await BluetoothEscposPrinter.printText(
                    `RETURNED AMT:        ${returnedAmt}`,
                    { align: "center" },
                )

                await BluetoothEscposPrinter.printText("\n", {})
                await BluetoothEscposPrinter.printText(
                    "------------------------",
                    { align: "center" },
                )
            }
            await BluetoothEscposPrinter.printText("\n", {})


            if (receiptSettings?.on_off_flag3 === "Y") {
                await BluetoothEscposPrinter.printText(receiptSettings?.footer1, {})
                await BluetoothEscposPrinter.printText("\n", {})
            }
            if (receiptSettings?.on_off_flag4 === "Y") {
                await BluetoothEscposPrinter.printText(receiptSettings?.footer2, {})
            }
            await BluetoothEscposPrinter.printText("\n", {})


            await BluetoothEscposPrinter.printText(
                "THANK YOU, VISIT AGAIN!",
                { align: "center" },
            )
            await BluetoothEscposPrinter.printText("\n", {})

            await BluetoothEscposPrinter.printText(
                "------X------",
                {},
            )
            await BluetoothEscposPrinter.printText("\n\r\n\r\n\r", {})
        } catch (e) {
            console.log(e.message || "ERROR")
        }
    }

    async function rePrintWithoutGst(addedProducts: ShowBillData[], netTotal: number, totalDiscountAmount: number, cashAmount?: number, returnedAmt?: number, customerName?: string, customerPhone?: string, rcptNo?: number, paymentMode?: string) {
        const loginStore = JSON.parse(loginStorage.getString("login-data"))

        const shopName: string = loginStore?.company_name?.toString()
        const address: string = loginStore?.address?.toString()
        const location: string = loginStore?.branch_name?.toString()
        const shopMobile: string = loginStore?.phone_no?.toString()
        const shopEmail: string = loginStore?.email_id?.toString()
        const cashier: string = loginStore?.user_name?.toString()

        let totalQuantities: number = 0
        let totalAmountAfterDiscount: number = 0

        try {

            let columnWidths = [11, 1, 18]
            let columnWidthsHeader = [8, 1, 21]
            let columnWidthsProductsHeaderAndBody = [8, 4, 6, 5, 7]
            // let columnWidthsProductsHeaderAndBody = [18, 3, 4, 3, 4]
            let columnWidthsItemTotal = [18, 12]
            let columnWidthIfNameIsBig = [32]

            // let newColumnWidths: number[] = [9, 9, 6, 7]

            await BluetoothEscposPrinter.printerAlign(
                BluetoothEscposPrinter.ALIGN.CENTER,
            )
            await BluetoothEscposPrinter.printText(shopName.toUpperCase(), {
                align: "center",
                widthtimes: 1.2,
                heigthtimes: 2,
            })
            await BluetoothEscposPrinter.printText("\n", {})
            // await BluetoothEscposPrinter.printText("hasifughaf", { align: "center" })

            if (receiptSettings?.on_off_flag1 === "Y") {
                await BluetoothEscposPrinter.printText(receiptSettings?.header1, {})
                await BluetoothEscposPrinter.printText("\n", {})
            }

            if (receiptSettings?.on_off_flag2 === "Y") {
                await BluetoothEscposPrinter.printText(receiptSettings?.header2, {})
            }
            await BluetoothEscposPrinter.printText("\n", {})

            await BluetoothEscposPrinter.printText("DUPLICATE RECEIPT", {
                align: "center",
            })

            await BluetoothEscposPrinter.printText("\n", {})

            await BluetoothEscposPrinter.printText(
                "------------------------",
                { align: "center" },
            )


            await BluetoothEscposPrinter.printText("\n", {})
            await BluetoothEscposPrinter.printText(address, {
                align: "center",
            })
            await BluetoothEscposPrinter.printText("\n", {})
            await BluetoothEscposPrinter.printText(location, {
                align: "center",
            })
            await BluetoothEscposPrinter.printText("\n", {})
            await BluetoothEscposPrinter.printText(
                "------------------------",
                { align: "center" },
            )
            await BluetoothEscposPrinter.printText("\n", {})

            // await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.LEFT)


            await BluetoothEscposPrinter.printColumn(
                columnWidthsHeader,
                [
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.CENTER,
                    BluetoothEscposPrinter.ALIGN.RIGHT,
                ],
                ["MOBILE", ":", shopMobile],
                {},
            )
            await BluetoothEscposPrinter.printColumn(
                columnWidthsHeader,
                [
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.CENTER,
                    BluetoothEscposPrinter.ALIGN.RIGHT,
                ],
                ["EMAIL", ":", shopEmail],
                {},
            )
            // await BluetoothEscposPrinter.printColumn(
            //     columnWidthsHeader,
            //     [
            //         BluetoothEscposPrinter.ALIGN.LEFT,
            //         BluetoothEscposPrinter.ALIGN.CENTER,
            //         BluetoothEscposPrinter.ALIGN.RIGHT,
            //     ],
            //     ["SITE", ":", "SHOPNAME.COM"],
            //     {},
            // )

            await BluetoothEscposPrinter.printText(
                "------------------------",
                { align: "center" },
            )
            await BluetoothEscposPrinter.printText("\n", {})

            await BluetoothEscposPrinter.printColumn(
                columnWidthsHeader,
                [
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.CENTER,
                    BluetoothEscposPrinter.ALIGN.RIGHT,
                ],
                ["RCPT.NO", ":", rcptNo?.toString()],
                {},
            )
            await BluetoothEscposPrinter.printColumn(
                columnWidthsHeader,
                [
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.CENTER,
                    BluetoothEscposPrinter.ALIGN.RIGHT,
                ],
                ["DATE", ":", `${new Date().toLocaleString("en-GB")}`],
                {},
            )
            await BluetoothEscposPrinter.printColumn(
                columnWidthsHeader,
                [
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.CENTER,
                    BluetoothEscposPrinter.ALIGN.RIGHT,
                ],
                ["CASHIER", ":", cashier],
                {},
            )

            await BluetoothEscposPrinter.printText(
                "------------------------",
                { align: "center" },
            )
            await BluetoothEscposPrinter.printText("\n", {})

            if (customerName.length !== 0 || customerPhone.length !== 0) {
                receiptSettings?.cust_inf === "Y" && await BluetoothEscposPrinter.printColumn(
                    columnWidthsHeader,
                    [
                        BluetoothEscposPrinter.ALIGN.LEFT,
                        BluetoothEscposPrinter.ALIGN.CENTER,
                        BluetoothEscposPrinter.ALIGN.RIGHT,
                    ],
                    ["NAME", ":", customerName],
                    {},
                )
                await BluetoothEscposPrinter.printColumn(
                    columnWidthsHeader,
                    [
                        BluetoothEscposPrinter.ALIGN.LEFT,
                        BluetoothEscposPrinter.ALIGN.CENTER,
                        BluetoothEscposPrinter.ALIGN.RIGHT,
                    ],
                    ["PHONE", ":", customerPhone],
                    {},
                )
            }

            await BluetoothEscposPrinter.printText(
                "------------------------",
                { align: "center" },
            )


            await BluetoothEscposPrinter.printText("\n", {})

            await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER)
            await BluetoothEscposPrinter.printColumn(
                columnWidthsProductsHeaderAndBody,
                [
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.CENTER,
                    BluetoothEscposPrinter.ALIGN.RIGHT,
                    BluetoothEscposPrinter.ALIGN.RIGHT,
                ],
                ["ITEM", "QTY", "PRICE", "DIS.", "AMT"],
                {},
            )

            await BluetoothEscposPrinter.printText(
                "------------------------",
                { align: "center" },
            )

            await BluetoothEscposPrinter.printText("\n", {})

            for (const item of addedProducts) {
                //@ts-ignore
                totalQuantities += parseInt(item?.qty)
                receiptSettings?.discount_type === "P"
                    ? totalAmountAfterDiscount += ((item?.price * item?.qty) - ((item?.price * item?.qty * item?.discount_amt) / 100))
                    : totalAmountAfterDiscount += ((item?.price * item?.qty) - item?.discount_amt)

                if (item?.item_name?.length > 9) {
                    await BluetoothEscposPrinter.printColumn(
                        columnWidthIfNameIsBig,
                        [BluetoothEscposPrinter.ALIGN.LEFT],
                        [item?.item_name],
                        {},
                    )
                    await BluetoothEscposPrinter.printColumn(
                        columnWidthsProductsHeaderAndBody,
                        [
                            BluetoothEscposPrinter.ALIGN.LEFT,
                            BluetoothEscposPrinter.ALIGN.LEFT,
                            BluetoothEscposPrinter.ALIGN.CENTER,
                            BluetoothEscposPrinter.ALIGN.RIGHT,
                            BluetoothEscposPrinter.ALIGN.RIGHT,
                        ],
                        ["", item?.qty.toString(), item?.price.toString(), (((item?.price * item?.qty * item?.discount_amt) / 100).toFixed(2)).toString(), `${((item?.price * item?.qty) - ((item?.price * item?.qty * item?.discount_amt) / 100)).toFixed(2).toString()}`],
                        {},
                    )
                } else {
                    await BluetoothEscposPrinter.printColumn(
                        columnWidthsProductsHeaderAndBody,
                        [
                            BluetoothEscposPrinter.ALIGN.LEFT,
                            BluetoothEscposPrinter.ALIGN.LEFT,
                            BluetoothEscposPrinter.ALIGN.CENTER,
                            BluetoothEscposPrinter.ALIGN.RIGHT,
                            BluetoothEscposPrinter.ALIGN.RIGHT,
                        ],
                        [item?.item_name, item?.qty.toString(), item?.price.toString(), (((item?.price * item?.qty * item?.discount_amt) / 100).toFixed(2)).toString(), `${(item?.price * item?.qty).toString()}`],
                        {},
                    );
                    await BluetoothEscposPrinter.printText("\n", {});
                }
            }

            await BluetoothEscposPrinter.printText("\n", {})
            await BluetoothEscposPrinter.printText(
                "------------------------",
                { align: "center" },
            )

            await BluetoothEscposPrinter.printText("\n", {})

            await BluetoothEscposPrinter.printColumn(
                columnWidthsItemTotal,
                [
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.RIGHT,
                ],
                [`ITEM: ${addedProducts?.length?.toString()} QTY: ${totalQuantities.toString()}`, `AMT: ${netTotal?.toFixed(2)}`],
                {},
            )
            await BluetoothEscposPrinter.printText("\n", {})

            await BluetoothEscposPrinter.printColumn(
                columnWidths,
                [
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.CENTER,
                    BluetoothEscposPrinter.ALIGN.RIGHT,
                ],
                ["DISCOUNT", ":", totalDiscountAmount.toFixed(2).toString()],
                {},
            )
            await BluetoothEscposPrinter.printColumn(
                columnWidths,
                [
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.CENTER,
                    BluetoothEscposPrinter.ALIGN.RIGHT,
                ],
                ["TOTAL", ":", `${(netTotal - totalDiscountAmount).toFixed(2)}`],
                {},
            )
            await BluetoothEscposPrinter.printColumn(
                columnWidths,
                [
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.CENTER,
                    BluetoothEscposPrinter.ALIGN.RIGHT,
                ],
                ["ROUND OFF", ":", `${(Math.round(parseFloat((netTotal - totalDiscountAmount).toFixed(2))) - parseFloat((netTotal - totalDiscountAmount).toFixed(2))).toFixed(2)}`],
                {},
            )
            await BluetoothEscposPrinter.printColumn(
                columnWidths,
                [
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.CENTER,
                    BluetoothEscposPrinter.ALIGN.RIGHT,
                ],
                ["NET AMT", ":", `${Math.round(parseFloat((netTotal - totalDiscountAmount).toFixed(2)))}`],
                {},
            )

            await BluetoothEscposPrinter.printText("\n", {})
            await BluetoothEscposPrinter.printText(
                "------------------------",
                { align: "center" },
            )
            await BluetoothEscposPrinter.printText("\n", {})
            if (paymentMode === "C") {
                await BluetoothEscposPrinter.printText(
                    "PAYMENT MODE",
                    { align: "center" },
                )
                await BluetoothEscposPrinter.printText("\n", {})
                await BluetoothEscposPrinter.printText(
                    `CASH RECEIVED:       ${cashAmount}`,
                    { align: "center" },
                )
                await BluetoothEscposPrinter.printText("\n", {})
                await BluetoothEscposPrinter.printText(
                    `RETURNED AMT:        ${returnedAmt}`,
                    { align: "center" },
                )

                await BluetoothEscposPrinter.printText("\n", {})
                await BluetoothEscposPrinter.printText(
                    "------------------------",
                    { align: "center" },
                )
            }
            await BluetoothEscposPrinter.printText("\n", {})


            if (receiptSettings?.on_off_flag3 === "Y") {
                await BluetoothEscposPrinter.printText(receiptSettings?.footer1, {})
                await BluetoothEscposPrinter.printText("\n", {})
            }
            if (receiptSettings?.on_off_flag4 === "Y") {
                await BluetoothEscposPrinter.printText(receiptSettings?.footer2, {})
            }
            await BluetoothEscposPrinter.printText("\n", {})


            await BluetoothEscposPrinter.printText(
                "THANK YOU, VISIT AGAIN!",
                { align: "center" },
            )
            await BluetoothEscposPrinter.printText("\n", {})

            await BluetoothEscposPrinter.printText(
                "------X------",
                {},
            )
            await BluetoothEscposPrinter.printText("\n\r\n\r\n\r", {})
        } catch (e) {
            console.log(e.message || "ERROR")
        }
    }

    async function rePrint(addedProducts: ShowBillData[], netTotal: number, totalDiscountAmount: number, cashAmount?: number, returnedAmt?: number, customerName?: string, customerPhone?: string, rcptNo?: number, paymentMode?: string) {
        const loginStore = JSON.parse(loginStorage.getString("login-data"))

        const shopName: string = loginStore?.company_name?.toString()
        const address: string = loginStore?.address?.toString()
        const location: string = loginStore?.branch_name?.toString()
        const shopMobile: string = loginStore?.phone_no?.toString()
        const shopEmail: string = loginStore?.email_id?.toString()
        const cashier: string = loginStore?.user_name?.toString()

        let { totalCGST_5, totalCGST_12, totalCGST_18, totalCGST_28, totalSGST_5, totalSGST_12, totalSGST_18, totalSGST_28 } = gstFilterationAndTotalForRePrint(addedProducts)

        let totalQuantities: number = 0
        let totalAmountAfterDiscount: number = 0

        try {

            let columnWidths = [11, 1, 18]
            let columnWidthsHeader = [8, 1, 21]
            let columnWidthsProductsHeaderAndBody = [8, 4, 6, 5, 7]
            // let columnWidthsProductsHeaderAndBody = [18, 3, 4, 3, 4]
            let columnWidthsItemTotal = [18, 12]
            let columnWidthIfNameIsBig = [32]

            // let newColumnWidths: number[] = [9, 9, 6, 7]

            await BluetoothEscposPrinter.printerAlign(
                BluetoothEscposPrinter.ALIGN.CENTER,
            )
            await BluetoothEscposPrinter.printText(shopName.toUpperCase(), {
                align: "center",
                widthtimes: 1.2,
                heigthtimes: 2,
            })
            await BluetoothEscposPrinter.printText("\n", {})
            // await BluetoothEscposPrinter.printText("hasifughaf", { align: "center" })

            if (receiptSettings?.on_off_flag1 === "Y") {
                await BluetoothEscposPrinter.printText(receiptSettings?.header1, {})
                await BluetoothEscposPrinter.printText("\n", {})
            }

            if (receiptSettings?.on_off_flag2 === "Y") {
                await BluetoothEscposPrinter.printText(receiptSettings?.header2, {})
            }
            await BluetoothEscposPrinter.printText("\n", {})

            await BluetoothEscposPrinter.printText("DUPLICATE RECEIPT", {
                align: "center",
            })

            await BluetoothEscposPrinter.printText("\n", {})

            await BluetoothEscposPrinter.printText(
                "------------------------",
                { align: "center" },
            )


            await BluetoothEscposPrinter.printText("\n", {})
            await BluetoothEscposPrinter.printText(address, {
                align: "center",
            })
            await BluetoothEscposPrinter.printText("\n", {})
            await BluetoothEscposPrinter.printText(location, {
                align: "center",
            })
            await BluetoothEscposPrinter.printText("\n", {})
            await BluetoothEscposPrinter.printText(
                "------------------------",
                { align: "center" },
            )
            await BluetoothEscposPrinter.printText("\n", {})

            // await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.LEFT)


            await BluetoothEscposPrinter.printColumn(
                columnWidthsHeader,
                [
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.CENTER,
                    BluetoothEscposPrinter.ALIGN.RIGHT,
                ],
                ["MOBILE", ":", shopMobile],
                {},
            )
            await BluetoothEscposPrinter.printColumn(
                columnWidthsHeader,
                [
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.CENTER,
                    BluetoothEscposPrinter.ALIGN.RIGHT,
                ],
                ["EMAIL", ":", shopEmail],
                {},
            )
            // await BluetoothEscposPrinter.printColumn(
            //     columnWidthsHeader,
            //     [
            //         BluetoothEscposPrinter.ALIGN.LEFT,
            //         BluetoothEscposPrinter.ALIGN.CENTER,
            //         BluetoothEscposPrinter.ALIGN.RIGHT,
            //     ],
            //     ["SITE", ":", "SHOPNAME.COM"],
            //     {},
            // )

            await BluetoothEscposPrinter.printText(
                "------------------------",
                { align: "center" },
            )
            await BluetoothEscposPrinter.printText("\n", {})

            await BluetoothEscposPrinter.printColumn(
                columnWidthsHeader,
                [
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.CENTER,
                    BluetoothEscposPrinter.ALIGN.RIGHT,
                ],
                ["RCPT.NO", ":", rcptNo?.toString()],
                {},
            )
            await BluetoothEscposPrinter.printColumn(
                columnWidthsHeader,
                [
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.CENTER,
                    BluetoothEscposPrinter.ALIGN.RIGHT,
                ],
                ["DATE", ":", `${new Date().toLocaleString("en-GB")}`],
                {},
            )
            await BluetoothEscposPrinter.printColumn(
                columnWidthsHeader,
                [
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.CENTER,
                    BluetoothEscposPrinter.ALIGN.RIGHT,
                ],
                ["CASHIER", ":", cashier],
                {},
            )

            await BluetoothEscposPrinter.printText(
                "------------------------",
                { align: "center" },
            )
            await BluetoothEscposPrinter.printText("\n", {})

            if (customerName.length !== 0 || customerPhone.length !== 0) {
                receiptSettings?.cust_inf === "Y" && await BluetoothEscposPrinter.printColumn(
                    columnWidthsHeader,
                    [
                        BluetoothEscposPrinter.ALIGN.LEFT,
                        BluetoothEscposPrinter.ALIGN.CENTER,
                        BluetoothEscposPrinter.ALIGN.RIGHT,
                    ],
                    ["NAME", ":", customerName],
                    {},
                )
                await BluetoothEscposPrinter.printColumn(
                    columnWidthsHeader,
                    [
                        BluetoothEscposPrinter.ALIGN.LEFT,
                        BluetoothEscposPrinter.ALIGN.CENTER,
                        BluetoothEscposPrinter.ALIGN.RIGHT,
                    ],
                    ["PHONE", ":", customerPhone],
                    {},
                )
            }

            await BluetoothEscposPrinter.printText(
                "------------------------",
                { align: "center" },
            )


            await BluetoothEscposPrinter.printText("\n", {})

            await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER)
            await BluetoothEscposPrinter.printColumn(
                columnWidthsProductsHeaderAndBody,
                [
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.CENTER,
                    BluetoothEscposPrinter.ALIGN.RIGHT,
                    BluetoothEscposPrinter.ALIGN.RIGHT,
                ],
                ["ITEM", "QTY", "PRICE", "DIS.", "AMT"],
                {},
            )

            await BluetoothEscposPrinter.printText(
                "------------------------",
                { align: "center" },
            )

            await BluetoothEscposPrinter.printText("\n", {})

            for (const item of addedProducts) {
                //@ts-ignore
                totalQuantities += parseInt(item?.qty)
                receiptSettings?.discount_type === "P"
                    ? totalAmountAfterDiscount += ((item?.price * item?.qty) - ((item?.price * item?.qty * item?.dis_pertg) / 100))
                    : totalAmountAfterDiscount += ((item?.price * item?.qty) - item?.discount_amt)

                if (item?.item_name?.length > 9) {
                    await BluetoothEscposPrinter.printColumn(
                        columnWidthIfNameIsBig,
                        [BluetoothEscposPrinter.ALIGN.LEFT],
                        [item?.item_name],
                        {},
                    )
                    await BluetoothEscposPrinter.printColumn(
                        columnWidthsProductsHeaderAndBody,
                        [
                            BluetoothEscposPrinter.ALIGN.LEFT,
                            BluetoothEscposPrinter.ALIGN.LEFT,
                            BluetoothEscposPrinter.ALIGN.CENTER,
                            BluetoothEscposPrinter.ALIGN.RIGHT,
                            BluetoothEscposPrinter.ALIGN.RIGHT,
                        ],
                        ["", item?.qty.toString(), item?.price.toString(), (((item?.price * item?.qty * item?.dis_pertg) / 100).toFixed(2)).toString(), `${((item?.price * item?.qty) - ((item?.price * item?.qty * item?.dis_pertg) / 100)).toFixed(2).toString()}`],
                        {},
                    )
                } else {
                    await BluetoothEscposPrinter.printColumn(
                        columnWidthsProductsHeaderAndBody,
                        [
                            BluetoothEscposPrinter.ALIGN.LEFT,
                            BluetoothEscposPrinter.ALIGN.LEFT,
                            BluetoothEscposPrinter.ALIGN.CENTER,
                            BluetoothEscposPrinter.ALIGN.RIGHT,
                            BluetoothEscposPrinter.ALIGN.RIGHT,
                        ],
                        [item?.item_name, item?.qty.toString(), item?.price.toString(), (((item?.price * item?.qty * item?.dis_pertg) / 100).toFixed(2)).toString(), `${(item?.price * item?.qty).toString()}`],
                        {},
                    );
                    await BluetoothEscposPrinter.printText("\n", {});
                }
            }

            await BluetoothEscposPrinter.printText("\n", {})
            await BluetoothEscposPrinter.printText(
                "------------------------",
                { align: "center" },
            )

            await BluetoothEscposPrinter.printText("\n", {})

            await BluetoothEscposPrinter.printColumn(
                columnWidthsItemTotal,
                [
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.RIGHT,
                ],
                [`ITEM: ${addedProducts?.length?.toString()} QTY: ${totalQuantities.toString()}`, `AMT: ${netTotal?.toFixed(2)}`],
                {},
            )
            await BluetoothEscposPrinter.printText("\n", {})

            await BluetoothEscposPrinter.printColumn(
                columnWidths,
                [
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.CENTER,
                    BluetoothEscposPrinter.ALIGN.RIGHT,
                ],
                ["DISCOUNT", ":", totalDiscountAmount.toFixed(2).toString()],
                {},
            )


            totalCGST_5 > 0 &&
                await BluetoothEscposPrinter.printColumn(
                    columnWidths,
                    [
                        BluetoothEscposPrinter.ALIGN.LEFT,
                        BluetoothEscposPrinter.ALIGN.CENTER,
                        BluetoothEscposPrinter.ALIGN.RIGHT,
                    ],
                    ["CGST @5%", ":", totalCGST_5.toFixed(2).toString()],
                    {},
                )
            totalSGST_5 > 0 &&
                await BluetoothEscposPrinter.printColumn(
                    columnWidths,
                    [
                        BluetoothEscposPrinter.ALIGN.LEFT,
                        BluetoothEscposPrinter.ALIGN.CENTER,
                        BluetoothEscposPrinter.ALIGN.RIGHT,
                    ],
                    ["SGST @5%", ":", totalSGST_5.toFixed(2).toString()],
                    {},
                )
            totalCGST_12 > 0 &&
                await BluetoothEscposPrinter.printColumn(
                    columnWidths,
                    [
                        BluetoothEscposPrinter.ALIGN.LEFT,
                        BluetoothEscposPrinter.ALIGN.CENTER,
                        BluetoothEscposPrinter.ALIGN.RIGHT,
                    ],
                    ["CGST @12%", ":", totalCGST_12.toFixed(2).toString()],
                    {},
                )
            totalSGST_12 > 0 &&
                await BluetoothEscposPrinter.printColumn(
                    columnWidths,
                    [
                        BluetoothEscposPrinter.ALIGN.LEFT,
                        BluetoothEscposPrinter.ALIGN.CENTER,
                        BluetoothEscposPrinter.ALIGN.RIGHT,
                    ],
                    ["SGST @12%", ":", totalSGST_12.toFixed(2).toString()],
                    {},
                )
            totalCGST_18 > 0 &&
                await BluetoothEscposPrinter.printColumn(
                    columnWidths,
                    [
                        BluetoothEscposPrinter.ALIGN.LEFT,
                        BluetoothEscposPrinter.ALIGN.CENTER,
                        BluetoothEscposPrinter.ALIGN.RIGHT,
                    ],
                    ["CGST @18%", ":", totalCGST_18.toFixed(2).toString()],
                    {},
                )
            totalSGST_18 > 0 &&
                await BluetoothEscposPrinter.printColumn(
                    columnWidths,
                    [
                        BluetoothEscposPrinter.ALIGN.LEFT,
                        BluetoothEscposPrinter.ALIGN.CENTER,
                        BluetoothEscposPrinter.ALIGN.RIGHT,
                    ],
                    ["SGST @18%", ":", totalSGST_18.toFixed(2).toString()],
                    {},
                )
            totalCGST_28 > 0 &&
                await BluetoothEscposPrinter.printColumn(
                    columnWidths,
                    [
                        BluetoothEscposPrinter.ALIGN.LEFT,
                        BluetoothEscposPrinter.ALIGN.CENTER,
                        BluetoothEscposPrinter.ALIGN.RIGHT,
                    ],
                    ["CGST @28%", ":", totalCGST_28.toFixed(2).toString()],
                    {},
                )
            totalSGST_28 > 0 &&
                await BluetoothEscposPrinter.printColumn(
                    columnWidths,
                    [
                        BluetoothEscposPrinter.ALIGN.LEFT,
                        BluetoothEscposPrinter.ALIGN.CENTER,
                        BluetoothEscposPrinter.ALIGN.RIGHT,
                    ],
                    ["SGST @28%", ":", totalSGST_28.toFixed(2).toString()],
                    {},
                )

            await BluetoothEscposPrinter.printColumn(
                columnWidths,
                [
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.CENTER,
                    BluetoothEscposPrinter.ALIGN.RIGHT,
                ],
                ["TOTAL GST", ":", (totalCGST_5 + totalSGST_5 + totalCGST_12 + totalSGST_12 + totalCGST_18 + totalSGST_18 + totalCGST_28 + totalSGST_28).toFixed(2).toString()],
                {},
            )

            await BluetoothEscposPrinter.printColumn(
                columnWidths,
                [
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.CENTER,
                    BluetoothEscposPrinter.ALIGN.RIGHT,
                ],
                ["TOTAL", ":", `${(netTotal - totalDiscountAmount + totalCGST_5 + totalSGST_5 + totalCGST_12 + totalSGST_12 + totalCGST_18 + totalSGST_18 + totalCGST_28 + totalSGST_28).toFixed(2)}`],
                {},
            )
            await BluetoothEscposPrinter.printColumn(
                columnWidths,
                [
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.CENTER,
                    BluetoothEscposPrinter.ALIGN.RIGHT,
                ],
                ["ROUND OFF", ":", `${(Math.round(parseFloat((netTotal - totalDiscountAmount + totalCGST_5 + totalSGST_5 + totalCGST_12 + totalSGST_12 + totalCGST_18 + totalSGST_18 + totalCGST_28 + totalSGST_28).toFixed(2))) - parseFloat((netTotal - totalDiscountAmount + totalCGST_5 + totalSGST_5 + totalCGST_12 + totalSGST_12 + totalCGST_18 + totalSGST_18 + totalCGST_28 + totalSGST_28).toFixed(2))).toFixed(2)}`],
                {},
            )
            await BluetoothEscposPrinter.printColumn(
                columnWidths,
                [
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.CENTER,
                    BluetoothEscposPrinter.ALIGN.RIGHT,
                ],
                ["NET AMT", ":", `${Math.round(parseFloat((netTotal - totalDiscountAmount + totalCGST_5 + totalSGST_5 + totalCGST_12 + totalSGST_12 + totalCGST_18 + totalSGST_18 + totalCGST_28 + totalSGST_28).toFixed(2)))}`],
                {},
            )

            await BluetoothEscposPrinter.printText("\n", {})
            await BluetoothEscposPrinter.printText(
                "------------------------",
                { align: "center" },
            )
            await BluetoothEscposPrinter.printText("\n", {})
            if (paymentMode === "C") {
                await BluetoothEscposPrinter.printText(
                    "PAYMENT MODE",
                    { align: "center" },
                )
                await BluetoothEscposPrinter.printText("\n", {})
                await BluetoothEscposPrinter.printText(
                    `CASH RECEIVED:       ${cashAmount}`,
                    { align: "center" },
                )
                await BluetoothEscposPrinter.printText("\n", {})
                await BluetoothEscposPrinter.printText(
                    `RETURNED AMT:        ${returnedAmt}`,
                    { align: "center" },
                )

                await BluetoothEscposPrinter.printText("\n", {})
                await BluetoothEscposPrinter.printText(
                    "------------------------",
                    { align: "center" },
                )
            }
            await BluetoothEscposPrinter.printText("\n", {})


            if (receiptSettings?.on_off_flag3 === "Y") {
                await BluetoothEscposPrinter.printText(receiptSettings?.footer1, {})
                await BluetoothEscposPrinter.printText("\n", {})
            }
            if (receiptSettings?.on_off_flag4 === "Y") {
                await BluetoothEscposPrinter.printText(receiptSettings?.footer2, {})
            }
            await BluetoothEscposPrinter.printText("\n", {})


            await BluetoothEscposPrinter.printText(
                "THANK YOU, VISIT AGAIN!",
                { align: "center" },
            )
            await BluetoothEscposPrinter.printText("\n", {})

            await BluetoothEscposPrinter.printText(
                "------X------",
                {},
            )
            await BluetoothEscposPrinter.printText("\n\r\n\r\n\r", {})
        } catch (e) {
            console.log(e.message || "ERROR")
        }
    }

    async function printSaleReport(saleReport: SaleReport[], fromDate: string, toDate: string) {
        const loginStore = JSON.parse(loginStorage.getString("login-data"))

        const shopName: string = loginStore?.company_name?.toString()
        const address: string = loginStore?.address?.toString()
        const location: string = loginStore?.branch_name?.toString()
        const shopMobile: string = loginStore?.phone_no?.toString()
        const shopEmail: string = loginStore?.email_id?.toString()
        // const cashier: string = loginStore?.user_name?.toString()


        let totalQuantities: number = 0
        let totalPrice: number = 0
        let totalDiscount: number = 0
        let totalGSTs: number = 0
        let totalNet: number = 0

        try {

            let columnWidths = [11, 1, 18]
            let columnWidthsHeader = [8, 1, 21]
            let columnWidthsProductsHeaderAndBody = [5, 4, 8, 6, 4, 4] // 1 in hand
            // let columnWidthsProductsHeaderAndBody = [18, 3, 4, 3, 4]
            let columnWidthsTotals = [15, 15]
            let columnWidthIfNameIsBig = [32]

            // let newColumnWidths: number[] = [9, 9, 6, 7]

            await BluetoothEscposPrinter.printerAlign(
                BluetoothEscposPrinter.ALIGN.CENTER,
            )
            await BluetoothEscposPrinter.printText(shopName.toUpperCase(), {
                align: "center",
                widthtimes: 1.2,
                heigthtimes: 2,
            })
            await BluetoothEscposPrinter.printText("\n", {})
            // await BluetoothEscposPrinter.printText("hasifughaf", { align: "center" })

            // if (receiptSettings?.on_off_flag1 === "Y") {
            //     await BluetoothEscposPrinter.printText(receiptSettings?.header1, {})
            //     await BluetoothEscposPrinter.printText("\n", {})
            // }

            // if (receiptSettings?.on_off_flag2 === "Y") {
            //     await BluetoothEscposPrinter.printText(receiptSettings?.header2, {})
            // }
            // await BluetoothEscposPrinter.printText("\n", {})
            await BluetoothEscposPrinter.printText(
                "------------------------",
                { align: "center" },
            )

            await BluetoothEscposPrinter.printText("\n", {})

            await BluetoothEscposPrinter.printText("SALE REPORT", {
                align: "center",
            })

            await BluetoothEscposPrinter.printText("\n", {})

            await BluetoothEscposPrinter.printText(
                "------------------------",
                { align: "center" },
            )

            await BluetoothEscposPrinter.printText("\n", {})

            await BluetoothEscposPrinter.printText(`From: ${new Date(fromDate).toLocaleDateString("en-GB")}  To: ${new Date(toDate).toLocaleDateString("en-GB")}`, {})

            await BluetoothEscposPrinter.printText("\n", {})

            await BluetoothEscposPrinter.printText(
                "------------------------",
                { align: "center" },
            )

            await BluetoothEscposPrinter.printText("\n", {})
            await BluetoothEscposPrinter.printText(address, {
                align: "center",
            })
            await BluetoothEscposPrinter.printText("\n", {})
            await BluetoothEscposPrinter.printText(location, {
                align: "center",
            })
            await BluetoothEscposPrinter.printText("\n", {})

            await BluetoothEscposPrinter.printText(
                "------------------------",
                { align: "center" },
            )
            await BluetoothEscposPrinter.printText("\n", {})

            await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER)
            await BluetoothEscposPrinter.printColumn(
                columnWidthsProductsHeaderAndBody,
                [
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.RIGHT,
                    BluetoothEscposPrinter.ALIGN.RIGHT,
                    BluetoothEscposPrinter.ALIGN.RIGHT,
                ],
                ["RCPT", "QTY", "PRC", "DIS", "GST", "NET"],
                {},
            )

            await BluetoothEscposPrinter.printText(
                "------------------------",
                { align: "center" },
            )

            await BluetoothEscposPrinter.printText("\n", {})

            for (const item of saleReport) {
                let totalGST: number = 0

                totalGST += item?.cgst_amt + item?.sgst_amt
                totalQuantities += item?.no_of_items
                totalPrice += item?.price
                totalDiscount += item?.discount_amt
                totalGSTs += totalGST
                totalNet += item?.net_amt + item?.rount_off

                await BluetoothEscposPrinter.printColumn(
                    columnWidthsProductsHeaderAndBody,
                    [
                        BluetoothEscposPrinter.ALIGN.LEFT,
                        BluetoothEscposPrinter.ALIGN.LEFT,
                        BluetoothEscposPrinter.ALIGN.LEFT,
                        BluetoothEscposPrinter.ALIGN.RIGHT,
                        BluetoothEscposPrinter.ALIGN.RIGHT,
                        BluetoothEscposPrinter.ALIGN.RIGHT,
                    ],
                    [item?.receipt_no?.toString()?.substring(item?.receipt_no?.toString()?.length - 4), item?.no_of_items?.toString(), item?.price?.toFixed(2)?.toString(), item?.discount_amt?.toString(), totalGST?.toString(), (item?.net_amt + item?.rount_off)?.toString()],
                    {},
                )
            }

            await BluetoothEscposPrinter.printText("\n", {})
            await BluetoothEscposPrinter.printText(
                "------------------------",
                { align: "center" },
            )

            await BluetoothEscposPrinter.printText("\n", {})

            // await BluetoothEscposPrinter.printColumn(
            //     columnWidthsProductsHeaderAndBody,
            //     [
            //         BluetoothEscposPrinter.ALIGN.LEFT,
            //         BluetoothEscposPrinter.ALIGN.LEFT,
            //         BluetoothEscposPrinter.ALIGN.LEFT,
            //         BluetoothEscposPrinter.ALIGN.RIGHT,
            //         BluetoothEscposPrinter.ALIGN.RIGHT,
            //         BluetoothEscposPrinter.ALIGN.RIGHT,
            //     ],
            //     ["TOT", totalQuantities.toFixed(2).toString(), totalPrice?.toFixed(2)?.toString(), totalDiscount?.toString(), totalGSTs?.toFixed(2)?.toString(), totalNet?.toFixed(2)?.toString()],
            //     {},
            // )

            await BluetoothEscposPrinter.printColumn(
                columnWidthsTotals,
                [
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.RIGHT,
                ],
                [`QTY: ${totalQuantities.toString()}`, `PRICE: ${totalPrice?.toFixed(2)?.toString()}`],
                {},
            )
            await BluetoothEscposPrinter.printColumn(
                columnWidthsTotals,
                [
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.RIGHT,
                ],
                [`DISC: ${totalDiscount?.toString()}`, `GST: ${totalGSTs?.toFixed(2)?.toString()}`],
                {},
            )

            await BluetoothEscposPrinter.printText("\n", {})

            await BluetoothEscposPrinter.printText(
                "------------------------",
                { align: "center" },
            )


            await BluetoothEscposPrinter.printText("\n", {})

            await BluetoothEscposPrinter.printText(
                `NET TOTAL:   ${totalNet?.toFixed(2)?.toString()}`,
                { align: "center" },
            )

            await BluetoothEscposPrinter.printText("\n", {})

            await BluetoothEscposPrinter.printText(
                "------------------------",
                { align: "center" },
            )
            await BluetoothEscposPrinter.printText("\n", {})

            // if (receiptSettings?.on_off_flag3 === "Y") {
            //     await BluetoothEscposPrinter.printText(receiptSettings?.footer1, {})
            //     await BluetoothEscposPrinter.printText("\n", {})
            // }
            // if (receiptSettings?.on_off_flag4 === "Y") {
            //     await BluetoothEscposPrinter.printText(receiptSettings?.footer2, {})
            // }
            // await BluetoothEscposPrinter.printText("\n", {})


            // await BluetoothEscposPrinter.printText(
            //     "THANK YOU, VISIT AGAIN!",
            //     { align: "center" },
            // )

            await BluetoothEscposPrinter.printText("\n", {})

            await BluetoothEscposPrinter.printText(
                "------X------",
                {},
            )
            await BluetoothEscposPrinter.printText("\n\r\n\r\n\r", {})
        } catch (e) {
            console.log(e.message || "ERROR")
        }
    }

    async function printCollectionReport(collectionReport: CollectionReport[]) {
        const loginStore = JSON.parse(loginStorage.getString("login-data"))

        const shopName: string = loginStore?.company_name?.toString()
        const address: string = loginStore?.address?.toString()
        const location: string = loginStore?.branch_name?.toString()
        const shopMobile: string = loginStore?.phone_no?.toString()
        const shopEmail: string = loginStore?.email_id?.toString()
        const cashier: string = loginStore?.user_name?.toString()


        let totalQuantities: number = 0
        let totalAmountAfterDiscount: number = 0

        try {

            let columnWidths = [11, 1, 18]
            let columnWidthsHeader = [8, 1, 21]
            let columnWidthsProductsHeaderAndBody = [5, 4, 5, 5, 5, 6]
            // let columnWidthsProductsHeaderAndBody = [18, 3, 4, 3, 4]
            let columnWidthsItemTotal = [18, 12]
            let columnWidthIfNameIsBig = [32]

            // let newColumnWidths: number[] = [9, 9, 6, 7]

            await BluetoothEscposPrinter.printerAlign(
                BluetoothEscposPrinter.ALIGN.CENTER,
            )
            await BluetoothEscposPrinter.printText(shopName.toUpperCase(), {
                align: "center",
                widthtimes: 1.2,
                heigthtimes: 2,
            })
            await BluetoothEscposPrinter.printText("\n", {})
            // await BluetoothEscposPrinter.printText("hasifughaf", { align: "center" })

            if (receiptSettings?.on_off_flag1 === "Y") {
                await BluetoothEscposPrinter.printText(receiptSettings?.header1, {})
                await BluetoothEscposPrinter.printText("\n", {})
            }

            if (receiptSettings?.on_off_flag2 === "Y") {
                await BluetoothEscposPrinter.printText(receiptSettings?.header2, {})
            }
            await BluetoothEscposPrinter.printText("\n", {})

            await BluetoothEscposPrinter.printText("SALE REPORT", {
                align: "center",
            })

            await BluetoothEscposPrinter.printText("\n", {})

            await BluetoothEscposPrinter.printText(
                "------------------------",
                { align: "center" },
            )


            await BluetoothEscposPrinter.printText("\n", {})
            await BluetoothEscposPrinter.printText(address, {
                align: "center",
            })
            await BluetoothEscposPrinter.printText("\n", {})
            await BluetoothEscposPrinter.printText(location, {
                align: "center",
            })
            await BluetoothEscposPrinter.printText("\n", {})
            await BluetoothEscposPrinter.printText(
                "------------------------",
                { align: "center" },
            )
            await BluetoothEscposPrinter.printText("\n", {})

            // await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.LEFT)


            await BluetoothEscposPrinter.printColumn(
                columnWidthsHeader,
                [
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.CENTER,
                    BluetoothEscposPrinter.ALIGN.RIGHT,
                ],
                ["MOBILE", ":", shopMobile],
                {},
            )
            await BluetoothEscposPrinter.printColumn(
                columnWidthsHeader,
                [
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.CENTER,
                    BluetoothEscposPrinter.ALIGN.RIGHT,
                ],
                ["EMAIL", ":", shopEmail],
                {},
            )
            // await BluetoothEscposPrinter.printColumn(
            //     columnWidthsHeader,
            //     [
            //         BluetoothEscposPrinter.ALIGN.LEFT,
            //         BluetoothEscposPrinter.ALIGN.CENTER,
            //         BluetoothEscposPrinter.ALIGN.RIGHT,
            //     ],
            //     ["SITE", ":", "SHOPNAME.COM"],
            //     {},
            // )

            await BluetoothEscposPrinter.printText(
                "------------------------",
                { align: "center" },
            )
            await BluetoothEscposPrinter.printText("\n", {})

            await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER)
            await BluetoothEscposPrinter.printColumn(
                columnWidthsProductsHeaderAndBody,
                [
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.RIGHT,
                    BluetoothEscposPrinter.ALIGN.RIGHT,
                    BluetoothEscposPrinter.ALIGN.RIGHT,
                ],
                ["RCPT", "QTY", "PRC", "GST", "DIS", "TOT"],
                {},
            )

            await BluetoothEscposPrinter.printText(
                "------------------------",
                { align: "center" },
            )

            await BluetoothEscposPrinter.printText("\n", {})

            for (const item of collectionReport) {
                await BluetoothEscposPrinter.printColumn(
                    columnWidthsProductsHeaderAndBody,
                    [
                        BluetoothEscposPrinter.ALIGN.LEFT,
                        BluetoothEscposPrinter.ALIGN.LEFT,
                        BluetoothEscposPrinter.ALIGN.LEFT,
                        BluetoothEscposPrinter.ALIGN.RIGHT,
                        BluetoothEscposPrinter.ALIGN.RIGHT,
                        BluetoothEscposPrinter.ALIGN.RIGHT,
                    ],
                    ["", item?.qty.toString(), item?.price.toString(), (((item?.price * item?.qty * item?.dis_pertg) / 100).toFixed(2)).toString(), `${((item?.price * item?.qty) - ((item?.price * item?.qty * item?.dis_pertg) / 100)).toFixed(2).toString()}`, ""],
                    {},
                )
            }

            await BluetoothEscposPrinter.printText("\n", {})
            await BluetoothEscposPrinter.printText(
                "------------------------",
                { align: "center" },
            )

            await BluetoothEscposPrinter.printText("\n", {})
            await BluetoothEscposPrinter.printText(
                "------------------------",
                { align: "center" },
            )
            await BluetoothEscposPrinter.printText("\n", {})


            if (receiptSettings?.on_off_flag3 === "Y") {
                await BluetoothEscposPrinter.printText(receiptSettings?.footer1, {})
                await BluetoothEscposPrinter.printText("\n", {})
            }
            if (receiptSettings?.on_off_flag4 === "Y") {
                await BluetoothEscposPrinter.printText(receiptSettings?.footer2, {})
            }
            await BluetoothEscposPrinter.printText("\n", {})


            await BluetoothEscposPrinter.printText(
                "THANK YOU, VISIT AGAIN!",
                { align: "center" },
            )
            await BluetoothEscposPrinter.printText("\n", {})

            await BluetoothEscposPrinter.printText(
                "------X------",
                {},
            )
            await BluetoothEscposPrinter.printText("\n\r\n\r\n\r", {})
        } catch (e) {
            console.log(e.message || "ERROR")
        }
    }

    async function printItemReport(saleReport: ItemReport[]) { }

    async function printGstStatement(saleReport: GstStatement[]) { }

    async function printGstSummary(saleReport: GstSummary[]) { }

    return { printReceipt, printReceiptWithoutGst, rePrint, rePrintWithoutGst, printSaleReport, printCollectionReport, printItemReport, printGstStatement, printGstSummary }
}
