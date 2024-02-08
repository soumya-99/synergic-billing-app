import { BluetoothEscposPrinter } from "react-native-bluetooth-escpos-printer"
import { BASE_64_IMAGE } from "../../resources/base64/logo"
import { loginStorage } from "../../storage/appStorage"
import { useContext } from "react"
import { AppStore } from "../../context/AppContext"
import { ItemsData } from "../../models/api_types"
// import base64Img fro

export const useBluetoothPrint = () => {
    const { receiptSettings } = useContext(AppStore)

    async function printReceipt(billNo?: number, totalAmt?: number, discount?: number, cgst?: number, sgst?: number, netAmt?: number) {
        try {

            let columnWidths = [11, 1, 18]
            let columnWidthsHeader = [8, 1, 21]
            let columnWidthsItemTotal = [18, 12]

            let newColumnWidths: number[] = [9, 9, 6, 7]

            // await BluetoothEscposPrinter.printerLineSpace()

            await BluetoothEscposPrinter.printerAlign(
                BluetoothEscposPrinter.ALIGN.CENTER,
            )
            await BluetoothEscposPrinter.printText("My Snacks Corner".toUpperCase(), {
                align: "center",
                widthtimes: 1.2,
                heigthtimes: 2,
            })
            await BluetoothEscposPrinter.printText("\n", {})
            // await BluetoothEscposPrinter.printText("hasifughaf", { align: "center" })
            await BluetoothEscposPrinter.printPic(BASE_64_IMAGE, { width: 300, align: "center", left: 30 })
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
            await BluetoothEscposPrinter.printText("ACROPOLIS, KASBA, KOL-700015", {
                align: "center",
            })
            await BluetoothEscposPrinter.printText("\n", {})
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
                ["MOBILE", ":", "7596897870"],
                {},
            )
            await BluetoothEscposPrinter.printColumn(
                columnWidthsHeader,
                [
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.CENTER,
                    BluetoothEscposPrinter.ALIGN.RIGHT,
                ],
                ["EMAIL", ":", "SOUMYA@GMAIL.COM"],
                {},
            )
            await BluetoothEscposPrinter.printColumn(
                columnWidthsHeader,
                [
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.CENTER,
                    BluetoothEscposPrinter.ALIGN.RIGHT,
                ],
                ["SITE", ":", "SHOPNAME.COM"],
                {},
            )
            await BluetoothEscposPrinter.printColumn(
                columnWidthsHeader,
                [
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.CENTER,
                    BluetoothEscposPrinter.ALIGN.RIGHT,
                ],
                ["GSTIN", ":", "19AAAOCS0397R1Z8"],
                {},
            )

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
                ["RCPT.NO", ":", "15474"],
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
                ["CASHIER", ":", `AMIT MONDAL`],
                {},
            )

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
                ["NAME", ":", `SOUMYADEEP MONDAL`],
                {},
            )
            await BluetoothEscposPrinter.printColumn(
                columnWidthsHeader,
                [
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.CENTER,
                    BluetoothEscposPrinter.ALIGN.RIGHT,
                ],
                ["PHONE", ":", `9021241450`],
                {},
            )

            await BluetoothEscposPrinter.printText(
                "------------------------",
                { align: "center" },
            )
            await BluetoothEscposPrinter.printText("\n", {})

            await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER)
            await BluetoothEscposPrinter.printColumn(
                newColumnWidths,
                [
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.CENTER,
                    BluetoothEscposPrinter.ALIGN.CENTER,
                    BluetoothEscposPrinter.ALIGN.RIGHT,
                ],
                ["ITEM", "QTY", "PRICE", "AMOUNT"],
                {},
            )
            await BluetoothEscposPrinter.printColumn(
                newColumnWidths,
                [
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.CENTER,
                    BluetoothEscposPrinter.ALIGN.CENTER,
                    BluetoothEscposPrinter.ALIGN.RIGHT,
                ],
                ["HSN", "DIS.", "SGST%", "CGST%"],
                {},
            )

            await BluetoothEscposPrinter.printText(
                "------------------------",
                { align: "center" },
            )
            await BluetoothEscposPrinter.printText("\n", {})
            await BluetoothEscposPrinter.printColumn(
                newColumnWidths,
                [
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.CENTER,
                    BluetoothEscposPrinter.ALIGN.CENTER,
                    BluetoothEscposPrinter.ALIGN.RIGHT,
                ],
                ["Biriyani", "1", "100", "100"],
                {},
            )
            await BluetoothEscposPrinter.printColumn(
                newColumnWidths,
                [
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.CENTER,
                    BluetoothEscposPrinter.ALIGN.CENTER,
                    BluetoothEscposPrinter.ALIGN.RIGHT,
                ],
                ["04012016", "10", "5", "5"],
                {},
            )
            await BluetoothEscposPrinter.printText("\n", {})

            await BluetoothEscposPrinter.printColumn(
                newColumnWidths,
                [
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.CENTER,
                    BluetoothEscposPrinter.ALIGN.CENTER,
                    BluetoothEscposPrinter.ALIGN.RIGHT,
                ],
                ["Egg Chowmin".slice(0, 8), "2", "91.01", "182.02"],
                {},
            )
            await BluetoothEscposPrinter.printColumn(
                newColumnWidths,
                [
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.CENTER,
                    BluetoothEscposPrinter.ALIGN.CENTER,
                    BluetoothEscposPrinter.ALIGN.RIGHT,
                ],
                ["04012026", "20", "5", "5"],
                {},
            )
            await BluetoothEscposPrinter.printText("\n", {})

            await BluetoothEscposPrinter.printColumn(
                newColumnWidths,
                [
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.CENTER,
                    BluetoothEscposPrinter.ALIGN.CENTER,
                    BluetoothEscposPrinter.ALIGN.RIGHT,
                ],
                ["Sunfeast Dark Fantacy".slice(0, 8), "1", "80", "80"],
                {},
            )
            await BluetoothEscposPrinter.printColumn(
                newColumnWidths,
                [
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.CENTER,
                    BluetoothEscposPrinter.ALIGN.CENTER,
                    BluetoothEscposPrinter.ALIGN.RIGHT,
                ],
                ["04112026", "30", "2.50", "2.50"],
                {},
            )

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
                ["ITEM: 3 QTY: 4", "AMT: 362.02"],
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
                ["DISCOUNT", ":", "60"],
                {},
            )
            await BluetoothEscposPrinter.printColumn(
                columnWidths,
                [
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.CENTER,
                    BluetoothEscposPrinter.ALIGN.RIGHT,
                ],
                ["TOTAL", ":", "302.02"],
                {},
            )
            await BluetoothEscposPrinter.printColumn(
                columnWidths,
                [
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.CENTER,
                    BluetoothEscposPrinter.ALIGN.RIGHT,
                ],
                ["TOTAL GST", ":", "11.5"],
                {},
            )
            await BluetoothEscposPrinter.printColumn(
                columnWidths,
                [
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.CENTER,
                    BluetoothEscposPrinter.ALIGN.RIGHT,
                ],
                ["TOTAL AMT", ":", "313.52"],
                {},
            )
            await BluetoothEscposPrinter.printColumn(
                columnWidths,
                [
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.CENTER,
                    BluetoothEscposPrinter.ALIGN.RIGHT,
                ],
                ["ROUND OFF", ":", "+0.48"],
                {},
            )
            await BluetoothEscposPrinter.printColumn(
                columnWidths,
                [
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.CENTER,
                    BluetoothEscposPrinter.ALIGN.RIGHT,
                ],
                ["NET AMT", ":", "314"],
                {},
            )

            await BluetoothEscposPrinter.printText("\n", {})
            await BluetoothEscposPrinter.printText(
                "------------------------",
                { align: "center" },
            )
            await BluetoothEscposPrinter.printText("\n", {})
            await BluetoothEscposPrinter.printText(
                "PAYMENT MODE",
                { align: "center" },
            )
            await BluetoothEscposPrinter.printText("\n", {})
            await BluetoothEscposPrinter.printText(
                "CASH RECEIVED:       500",
                { align: "center" },
            )
            await BluetoothEscposPrinter.printText("\n", {})
            await BluetoothEscposPrinter.printText(
                "RETURNED AMT:        186",
                { align: "center" },
            )

            await BluetoothEscposPrinter.printText("\n", {})
            await BluetoothEscposPrinter.printText(
                "------------------------",
                { align: "center" },
            )
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
            await BluetoothEscposPrinter.printText("\n", {})

            await BluetoothEscposPrinter.printText("\r\n\r\n\r\n", {})
        } catch (e) {
            console.log(e.message || "ERROR")
        }
    }

    async function printReceiptWithoutGst(addedProducts: ItemsData[], netTotal: number, totalDiscountAmount: number, cashAmount?: number, returnedAmt?: number, customerName?: string, customerPhone?: string, rcptNo?: number) {
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

            {
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

    return { printReceipt, printReceiptWithoutGst }
}
