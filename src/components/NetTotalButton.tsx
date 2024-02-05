import { View } from "react-native"
import { TouchableRipple, Text } from "react-native-paper"
import normalize from "react-native-normalize"
import { useContext } from "react"
import { AppStore } from "../context/AppContext"

type NetTotalButtonProps = {
  backgroundColor: string
  textColor: string
  netTotal: number
  totalDiscount: number
  addedProductsList?: {}[]
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
            <Text style={{ color: textColor }}>NET AMOUNT</Text>
          </View>
          <View>
            <Text style={{ color: textColor }}>₹{netTotal?.toFixed(2)}</Text>
            <Text style={{ color: textColor }}>₹{totalDiscount?.toFixed(2)}</Text>
            <Text style={{ color: textColor }}>
              ₹
              {(netTotal - totalDiscount).toFixed(2)}
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
            <Text style={{ color: textColor }}>CGST</Text>
            <Text style={{ color: textColor }}>SGST</Text>
            <Text style={{ color: textColor }}>NET AMOUNT</Text>
          </View>
          <View>
            <Text style={{ color: textColor }}>₹{netTotal}</Text>
            <Text style={{ color: textColor }}>₹{totalDiscount}</Text>
            <Text style={{ color: textColor }}>{cgst}%</Text>
            <Text style={{ color: textColor }}>{sgst}%</Text>
            <Text style={{ color: textColor }}>
              ₹
              {netTotal - totalDiscount + ((cgst + sgst) / 100) * (netTotal - totalDiscount)}
            </Text>
          </View>
        </View>
      </TouchableRipple>
    )

  )
}
