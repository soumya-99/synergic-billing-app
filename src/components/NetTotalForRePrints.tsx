import { View } from "react-native"
import { TouchableRipple, Text } from "react-native-paper"
import normalize from "react-native-normalize"
import { useContext } from "react"
import { AppStore } from "../context/AppContext"
import { ShowBillData } from "../models/api_types"
import { gstFilterationAndTotalForRePrint } from "../utils/gstFilterTotalForRePrint"
import useCalculations from "../hooks/useCalculations"

type NetTotalForRePrintsProps = {
    backgroundColor: string
    textColor: string
    netTotal: number
    totalDiscount: number
    addedProductsList?: ShowBillData[]
    onPress?: () => void
    height?: number | "auto"
    width?: number
    disabled?: boolean
    cgst?: number
    sgst?: number
}

export default function NetTotalForRePrints({
    disabled = false,
    backgroundColor,
    textColor,
    addedProductsList,
    netTotal,
    totalDiscount,
    width = 320,
    height = "auto",
    cgst,
    sgst,
    onPress,
}: NetTotalForRePrintsProps) {
    const { receiptSettings } = useContext(AppStore)

    const {
        netTotalCalculate,
        netTotalWithGSTCalculate,
        roundingOffCalculate,
        grandTotalCalculate,
        roundingOffWithGSTCalculate,
        grandTotalWithGSTCalculate
    } = useCalculations()

    // let { totalCGST_5, totalCGST_12, totalCGST_18, totalCGST_28, totalSGST_5, totalSGST_12, totalSGST_18, totalSGST_28, totalGST } = gstFilterationAndTotalForRePrint(addedProductsList)

    let gstTotals = gstFilterationAndTotalForRePrint(addedProductsList)
    let { totalGST } = gstTotals // Destructure totalGST for separate handling

    // Filter keys for CGST and SGST display
    const gstKeys = Object.keys(gstTotals).filter((key) => key.includes('totalCGST') || key.includes('totalSGST'))

    let gstFlag = addedProductsList[0]?.gst_flag
    let discountType = addedProductsList[0]?.discount_type

    return (
        gstFlag !== "Y" ? (
            <TouchableRipple
                disabled={disabled}
                style={{
                    width: normalize(width),
                    height: height,
                    backgroundColor: backgroundColor,
                    alignSelf: "center",
                    borderRadius: normalize(30),
                    marginTop: normalize(15),
                }}
                onPress={onPress}>
                <View
                    style={{
                        margin: normalize(15),
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexDirection: "row",
                    }}>
                    <View>
                        <Text style={{ color: textColor }}>TOTAL AMOUNT</Text>
                        <Text style={{ color: textColor }}>DISCOUNT</Text>
                        <Text style={{ color: textColor }}>NET TOTAL</Text>
                        <Text style={{ color: textColor }}>ROUNDING OFF</Text>
                        <Text style={{ color: textColor }}>GRAND TOTAL</Text>
                    </View>
                    <View>
                        <Text style={{ color: textColor }}>₹{netTotal?.toFixed(2)}</Text>
                        <Text style={{ color: textColor }}>₹{totalDiscount?.toFixed(2)}</Text>
                        <Text style={{ color: textColor }}>
                            ₹
                            {/* {(netTotal - totalDiscount).toFixed(2)} */}
                            {netTotalCalculate(netTotal, totalDiscount)}
                        </Text>
                        <Text style={{ color: textColor }}>
                            ₹
                            {/* {(Math.round(parseFloat((netTotal - totalDiscount).toFixed(2))) - parseFloat((netTotal - totalDiscount).toFixed(2))).toFixed(2)} */}
                            {roundingOffCalculate(netTotal, totalDiscount)}
                        </Text>
                        <Text style={{ color: textColor }}>
                            ₹
                            {/* {Math.round(parseFloat((netTotal - totalDiscount).toFixed(2)))} */}
                            {grandTotalCalculate(netTotal, totalDiscount)}
                        </Text>
                    </View>
                </View>
            </TouchableRipple>
        ) : (
            <TouchableRipple
                disabled={disabled}
                style={{
                    width: normalize(width),
                    height: height,
                    backgroundColor: backgroundColor,
                    alignSelf: "center",
                    borderRadius: normalize(30),
                    marginTop: normalize(15),
                }}
                onPress={onPress}>
                <View
                    style={{
                        margin: normalize(15),
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexDirection: "row",
                    }}>
                    <View>
                        <Text style={{ color: textColor }}>TOTAL AMOUNT</Text>
                        <Text style={{ color: textColor }}>DISCOUNT</Text>

                        {gstKeys.map((key) => (
                            <Text key={key} style={{ color: textColor }}>
                                {key.includes('CGST') ? 'CGST' : 'SGST'} @
                                {key.replace(/total(CGST|SGST)_/, '').replace('_', '.') + '%'}
                            </Text>
                        ))}

                        <Text style={{ color: textColor }}>NET TOTAL</Text>
                        <Text style={{ color: textColor }}>ROUNDING OFF</Text>
                        <Text style={{ color: textColor }}>GRAND TOTAL</Text>
                    </View>
                    <View>
                        <Text style={{ color: textColor }}>₹{netTotal?.toFixed(2)}</Text>
                        <Text style={{ color: textColor }}>₹{totalDiscount?.toFixed(2)}</Text>
                        {/* <Text style={{ color: textColor }}>{cgst}%</Text>
            <Text style={{ color: textColor }}>{sgst}%</Text> */}

                        {gstKeys.map((key) => (
                            <Text key={key} style={{ color: textColor }}>₹{gstTotals[key].toFixed(2)}</Text>
                        ))}

                        <Text style={{ color: textColor }}>
                            {/* {(netTotal - totalDiscount + totalGST).toFixed(2)} */}
                            {netTotalWithGSTCalculate(netTotal, totalDiscount, totalGST)}
                        </Text>

                        <Text style={{ color: textColor }}>
                            {/* {(Math.round(parseFloat((netTotal - totalDiscount + totalGST).toFixed(2))) - parseFloat((netTotal - totalDiscount + totalGST).toFixed(2))).toFixed(2)} */}
                            {roundingOffWithGSTCalculate(netTotal, totalDiscount, totalGST)}
                        </Text>



                        <Text style={{ color: textColor }}>
                            ₹
                            {/* {Math.round(parseFloat((netTotal - totalDiscount + totalGST).toFixed(2))).toFixed(2)} */}
                            {grandTotalWithGSTCalculate(netTotal, totalDiscount, totalGST)}
                        </Text>
                    </View>
                </View>
            </TouchableRipple>
        )

    )
}