import { View } from "react-native"
import { TouchableRipple, Text } from "react-native-paper"
import normalize from "react-native-normalize"
import { useContext } from "react"
import { AppStore } from "../context/AppContext"
import { ItemsData, ShowBillData } from "../models/api_types"
import { gstFilterationAndTotals } from "../utils/gstFilterTotal"

type NetTotalButtonProps = {
  backgroundColor: string
  textColor: string
  netTotal: number
  totalDiscount: number
  addedProductsList?: ItemsData[]
  onPress?: () => void
  height?: number | "auto"
  width?: number
  disabled?: boolean
  cgst?: number
  sgst?: number
}

export default function NetTotalButton({
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
}: NetTotalButtonProps) {
  const { receiptSettings } = useContext(AppStore)

  // addedProductsList?.filter((item, i) => item.discount)
  let { totalCGST_5, totalCGST_12, totalCGST_18, totalCGST_28, totalSGST_5, totalSGST_12, totalSGST_18, totalSGST_28 } = gstFilterationAndTotals(addedProductsList)

  return (
    receiptSettings?.gst_flag !== "Y" ? (
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
              {(netTotal - totalDiscount).toFixed(2)}
            </Text>
            <Text style={{ color: textColor }}>
              ₹
              {(Math.round(parseFloat((netTotal - totalDiscount).toFixed(2))) - parseFloat((netTotal - totalDiscount).toFixed(2))).toFixed(2)}
            </Text>
            <Text style={{ color: textColor }}>
              ₹
              {Math.round(parseFloat((netTotal - totalDiscount).toFixed(2)))}
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

            {totalCGST_5 > 0 && <Text style={{ color: textColor }}>CGST @5%</Text>}
            {totalSGST_5 > 0 && <Text style={{ color: textColor }}>SGST @5%</Text>}
            {totalCGST_12 > 0 && <Text style={{ color: textColor }}>CGST @12%</Text>}
            {totalSGST_12 > 0 && <Text style={{ color: textColor }}>SGST @12%</Text>}
            {totalCGST_18 > 0 && <Text style={{ color: textColor }}>CGST @18%</Text>}
            {totalSGST_18 > 0 && <Text style={{ color: textColor }}>SGST @18%</Text>}
            {totalCGST_28 > 0 && <Text style={{ color: textColor }}>CGST @28%</Text>}
            {totalSGST_28 > 0 && <Text style={{ color: textColor }}>SGST @28%</Text>}

            <Text style={{ color: textColor }}>NET TOTAL</Text>
            <Text style={{ color: textColor }}>ROUNDING OFF</Text>
            <Text style={{ color: textColor }}>GRAND TOTAL</Text>
          </View>
          <View>
            <Text style={{ color: textColor }}>₹{netTotal}</Text>
            <Text style={{ color: textColor }}>₹{totalDiscount}</Text>
            {/* <Text style={{ color: textColor }}>{cgst}%</Text>
            <Text style={{ color: textColor }}>{sgst}%</Text> */}

            {totalCGST_5 > 0 && <Text style={{ color: textColor }}>{totalCGST_5 && totalCGST_5.toFixed(2)}</Text>}
            {totalSGST_5 > 0 && <Text style={{ color: textColor }}>{totalSGST_5 && totalSGST_5.toFixed(2)}</Text>}
            {totalCGST_12 > 0 && <Text style={{ color: textColor }}>{totalCGST_12 && totalCGST_12.toFixed(2)}</Text>}
            {totalSGST_12 > 0 && <Text style={{ color: textColor }}>{totalSGST_12 && totalSGST_12.toFixed(2)}</Text>}
            {totalCGST_18 > 0 && <Text style={{ color: textColor }}>{totalCGST_18 && totalCGST_18.toFixed(2)}</Text>}
            {totalSGST_18 > 0 && <Text style={{ color: textColor }}>{totalSGST_18 && totalSGST_18.toFixed(2)}</Text>}
            {totalCGST_28 > 0 && <Text style={{ color: textColor }}>{totalCGST_28 && totalCGST_28.toFixed(2)}</Text>}
            {totalSGST_28 > 0 && <Text style={{ color: textColor }}>{totalSGST_28 && totalSGST_28.toFixed(2)}</Text>}

            <Text style={{ color: textColor }}>{(netTotal - totalDiscount + totalCGST_5 + totalSGST_5 + totalCGST_12 + totalSGST_12 + totalCGST_18 + totalSGST_18 + totalCGST_28 + totalSGST_28).toFixed(2)}</Text>

            <Text style={{ color: textColor }}>{(Math.round(parseFloat((netTotal - totalDiscount + totalCGST_5 + totalSGST_5 + totalCGST_12 + totalSGST_12 + totalCGST_18 + totalSGST_18 + totalCGST_28 + totalSGST_28).toFixed(2))) - parseFloat((netTotal - totalDiscount + totalCGST_5 + totalSGST_5 + totalCGST_12 + totalSGST_12 + totalCGST_18 + totalSGST_18 + totalCGST_28 + totalSGST_28).toFixed(2))).toFixed(2)}</Text>



            <Text style={{ color: textColor }}>
              ₹
              {Math.round(parseFloat((netTotal - totalDiscount + totalCGST_5 + totalSGST_5 + totalCGST_12 + totalSGST_12 + totalCGST_18 + totalSGST_18 + totalCGST_28 + totalSGST_28).toFixed(2)))}
            </Text>
          </View>
        </View>
      </TouchableRipple>
    )

  )
}