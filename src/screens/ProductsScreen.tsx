import { StyleSheet, ScrollView, SafeAreaView, View } from "react-native"
import {
  Appbar,
  Badge,
  Divider,
  List,
  Searchbar,
  SegmentedButtons,
  Text,
} from "react-native-paper"
import HeaderImage from "../components/HeaderImage"
import { productHeader, productHeaderDark } from "../resources/images"
import { usePaperColorScheme } from "../theme/theme"
import { useState } from "react"
import PRODUCTS_DATA from "../data/products_dummy_data.json"
import DialogBox from "../components/DialogBox"
import { useNavigation } from "@react-navigation/native"

type ProductsDataObject = {
  id: number
  item: string
  description: string
  quantity: number
}

function ProductsScreen() {
  const navigation = useNavigation()
  const theme = usePaperColorScheme()

  const [visible, setVisible] = useState(() => false)
  const hideDialog = () => setVisible(() => false)

  const [search, setSearch] = useState<string>(() => "")
  const [filteredItems, setFilteredItems] = useState<ProductsDataObject[]>(
    () => [],
  )
  const onChangeSearch = (query: string) => {
    setSearch(query)

    const filtered = PRODUCTS_DATA.filter(item => item.item.includes(query))
    setFilteredItems(filtered)
    if (query === "") setFilteredItems(() => [])
  }

  const [productId, setProductId] = useState<number>()
  const [itemName, setItemName] = useState<string>()
  const [description, setDescription] = useState<string>()
  const [quantity, setQuantity] = useState<number>()

  const productDetails = (item: ProductsDataObject) => {
    setProductId(item.id)
    setItemName(item.item)
    setDescription(item.description)
    setQuantity(item.quantity)
    setVisible(!visible)
  }

  const onDialogFailure = () => {
    setVisible(!visible)
  }

  const onDialogSuccecss = () => {
    console.log("OK PRODUCT: ", itemName)
    setVisible(!visible)
  }

  const [value, setValue] = useState<string>(() => "")
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Appbar.Header
        style={{ backgroundColor: theme.colors.secondaryContainer }}>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack()
          }}
        />
        <Appbar.Content
          title="Your Products"
          color={theme.colors.onSecondaryContainer}
        />
      </Appbar.Header>
      <DialogBox
        title="Product Details"
        icon="basket"
        iconSize={40}
        visible={visible}
        hide={hideDialog}
        titleStyle={styles.title}
        onFailure={onDialogFailure}
        onSuccess={onDialogSuccecss}>
        <Text variant="labelMedium">Product ID: {productId}</Text>
        <Text variant="labelMedium">Product Name: {itemName}</Text>
        <Text variant="labelMedium">{description}</Text>
        <Text>Quantity: {quantity}</Text>
        <SegmentedButtons
          value={value}
          onValueChange={setValue}
          buttons={[
            {
              value: "minus",
            //   label: "-",
              icon: "minus",
              onPress: () => setQuantity(e => e - 1),
            },
            {
              value: "",
              label: quantity as unknown as string,
              disabled: true,
            },
            {
              value: "plus",
            //   label: "+",
              icon: "plus",
              onPress: () => setQuantity(e => e + 1),
            },
          ]}
        />
      </DialogBox>
      <ScrollView keyboardShouldPersistTaps="handled">
        <HeaderImage
          imgLight={productHeader}
          imgDark={productHeaderDark}
          borderRadius={30}
          blur={10}>
          Your Products
        </HeaderImage>

        <View style={{ padding: 20 }}>
          <Searchbar
            placeholder="Search Transactions"
            onChangeText={onChangeSearch}
            value={search}
            elevation={search && 2}
            // loading={filteredItems ? false : true}
          />
        </View>

        <View style={{ paddingBottom: 80 }}>
          {filteredItems.map(item => (
            <View key={item.id}>
              <List.Item
                title={item.item}
                description={item.description}
                onPress={() => productDetails(item)}
                left={props => <List.Icon {...props} icon="basket" />}
                right={props => (
                  <Badge
                    {...props}
                    style={{
                      backgroundColor: theme.colors.tertiaryContainer,
                      color: theme.colors.onTertiaryContainer,
                    }}>
                    {item.quantity}
                  </Badge>
                )}
              />
              <Divider />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ProductsScreen

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },

  title: {
    textAlign: "center",
  },
})
