import { View } from "react-native"
import normalize from "react-native-normalize"
import { Divider, Text } from "react-native-paper"

type AddedProductListProps = {
  itemName: string
  unitPrice: number
  quantity: number
  discount?: number
  unit: string
}

export default function AddedProductList({
  itemName,
  unitPrice,
  quantity,
  discount,
  unit,
}: AddedProductListProps) {
  return (
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
            <Text>
              {quantity}x{unitPrice}={unitPrice * quantity}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}>
          <View>
            <Text>Discount</Text>
          </View>
          <View>
            <Text>₹{discount}</Text>
          </View>
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
          <View>
            <Text>TOTAL: ₹{unitPrice * quantity - discount}</Text>
          </View>
        </View>
      </View>
      <Divider />
    </>
  )
}
