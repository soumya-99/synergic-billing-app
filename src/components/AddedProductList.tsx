import { useContext } from "react"
import { TouchableOpacity, View } from "react-native"
import normalize from "react-native-normalize"
import { Divider, Text } from "react-native-paper"
import { AppStore } from "../context/AppContext"
import { ReceiptSettingsData } from "../models/api_types"

type AddedProductListProps = {
  itemName: string
  unitPrice: number
  quantity: number
  onPress?: () => void
  discount?: number
  unit?: string
  disabled?: boolean
  gstFlag?: "Y" | "N"
  discountType?: "P" | "A"
}

export default function AddedProductList({
  itemName,
  unitPrice,
  quantity,
  onPress,
  discount,
  unit,
  disabled,
  gstFlag: propGstFlag,
  discountType: propDiscountType
}: AddedProductListProps) {
  const { receiptSettings } = useContext(AppStore)

  const gstFlag = propGstFlag || receiptSettings?.gst_flag
  const discountType = propDiscountType || receiptSettings?.discount_type
  let discountForAmt: number = (quantity * discount)

  return (
    // receiptSettings?.gst_flag === "N" ? (
    <>
      <TouchableOpacity
        disabled={disabled}
        onPress={onPress}
        style={{
          flex: 0.2,
          justifyContent: "space-between",
          margin: normalize(15),
        }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}>
          <View>
            <Text>
              {itemName} (₹{unitPrice})
            </Text>
          </View>
          <View>
            {/* <Text>
              {quantity}x{unitPrice}={unitPrice * quantity}
            </Text> */}
            <Text>
              ₹{(unitPrice * quantity)?.toFixed(2)}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}>
          {discountType === "A" ? (
            <View>
              <Text>Discount</Text>
            </View>
          ) : (
            <View>
              <Text>Discount ({discount}%)</Text>
            </View>
          )}
          {discountType === "A" ? (
            <View>
              <Text>₹{discountForAmt?.toFixed(2)}</Text>
            </View>
          ) : (
            <View>
              <Text>₹{((unitPrice * quantity * discount) / 100).toFixed(2)}</Text>
            </View>
          )}
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}>
          <View>
            <Text>
              QTY: {quantity} {unit}
            </Text>
          </View>
          {/* {discountType === "A" ? (
            <View>
              <Text>TOTAL: ₹{(unitPrice * quantity - discountForAmt).toFixed(2)}</Text>
            </View>
          ) : (
            <View>
              <Text>TOTAL: ₹{((unitPrice * quantity) - ((unitPrice * quantity * discount) / 100)).toFixed(2)}</Text>
            </View>
          )} */}
        </View>
      </TouchableOpacity>
      <Divider />
    </>
  )
  //    : (
  //     <>
  //       <View
  //         style={{
  //           flex: 0.2,
  //           justifyContent: "space-between",
  //           margin: normalize(15),
  //         }}>
  //         <Text>gst_flag = Y is to be rendered later.</Text>
  //       </View>
  //       <Divider />
  //     </>
  //   )

  // )
}
