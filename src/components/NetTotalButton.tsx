import { View } from "react-native"
import { TouchableRipple, Text } from "react-native-paper"
import normalize from "react-native-normalize"

type NetTotalButtonProps = {
  backgroundColor: string
  textColor: string
  netTotal: number
  totalDiscount: number
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
  netTotal,
  totalDiscount,
  width = 320,
  height = "auto",
  cgst = 9,
  sgst = 9,
  onPress,
}: NetTotalButtonProps) {
  return (
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
            {netTotal - totalDiscount + (18 / 100) * (netTotal - totalDiscount)}
          </Text>
        </View>
      </View>
    </TouchableRipple>
  )
}
