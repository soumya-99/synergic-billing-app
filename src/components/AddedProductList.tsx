import { useContext } from "react"
import { View } from "react-native"
import normalize from "react-native-normalize"
import { Divider, Text } from "react-native-paper"
import { AppStore } from "../context/AppContext"
import { ReceiptSettingsData } from "../models/api_types"
// import { receiptSettingsStorage } from "../storage/appStorage"

type AddedProductListProps = {
  itemName: string
  unitPrice: number
  quantity: number
  discount?: number
  unit?: string
}

export default function AddedProductList({
  itemName,
  unitPrice,
  quantity,
  discount,
  unit,
}: AddedProductListProps) {
  const { receiptSettings } = useContext(AppStore)

  return (
    receiptSettings?.gst_flag === "N" ? (
      <>
        <View
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
                ₹{unitPrice * quantity}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}>
            {receiptSettings?.discount_type === "A" ? (
              <View>
                <Text>Discount</Text>
              </View>
            ) : (
              <View>
                <Text>Discount ({discount}%)</Text>
              </View>
            )}
            {receiptSettings?.discount_type === "A" ? (
              <View>
                <Text>₹{discount}</Text>
              </View>
            ) : (
              <View>
                <Text>₹{(unitPrice * quantity * discount) / 100}</Text>
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
            {receiptSettings?.discount_type === "A" ? (
              <View>
                <Text>TOTAL: ₹{unitPrice * quantity - discount}</Text>
              </View>
            ) : (
              <View>
                <Text>TOTAL: ₹{((unitPrice * quantity) - ((unitPrice * quantity * discount) / 100))}</Text>
              </View>
            )}
          </View>
        </View>
        <Divider />
      </>
    ) : (
      <>
        <View
          style={{
            flex: 0.2,
            justifyContent: "space-between",
            margin: normalize(15),
          }}>
          <Text>gst_flag = Y is to be rendered later.</Text>
        </View>
        <Divider />
      </>
    )

  )
}