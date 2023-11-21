import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  View,
  PixelRatio,
  ToastAndroid,
} from "react-native"
import { Appbar, Searchbar, Text } from "react-native-paper"
import HeaderImage from "../components/HeaderImage"
import { productHeader, productHeaderDark } from "../resources/images"
import { usePaperColorScheme } from "../theme/theme"
import { useState } from "react"
import PRODUCTS_DATA from "../data/products_dummy_data.json"
import DialogBox from "../components/DialogBox"
import { useNavigation } from "@react-navigation/native"
import InputPaper from "../components/InputPaper"
import normalize from "react-native-normalize"
import ProductListSuggestion from "../components/ProductListSuggestion"
import AddedProductList from "../components/AddedProductList"
import ScrollableListContainer from "../components/ScrollableListContainer"
import NetTotalButton from "../components/NetTotalButton"
import { clearStates } from "../utils/clearStates"

// type ProductsData = {
//   [key: string]: any
// }

type ProductsDataObject = {
  id: number
  item: string
  description: string
  unit_price: number
  unit: string
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

  const [product, setProduct] = useState<ProductsDataObject>({
    id: 0,
    item: "",
    description: "",
    unit_price: 0,
    unit: "",
  })

  const [noOfProducts, setNoOfProducts] = useState<string>(() => "")
  const [discount, setDiscount] = useState<string>(() => "0")

  const [addedProductsList, setAddedProductsList] = useState<
    ProductsDataObject[]
  >(() => [])

  // const [netTotal, setNetTotal] = useState<number>(() => 0)

  let netTotal = 0
  let totalDiscount = 0

  const productDetails = (item: ProductsDataObject) => {
    setProduct(item)
    setVisible(!visible)
  }

  const onDialogFailure = () => {
    setSearch(() => "")
    setVisible(!visible)
  }

  const onDialogSuccecss = () => {
    if (noOfProducts !== "" || noOfProducts.includes(" ")) {
      // check for 0 will be added
      console.log("OK PRODUCT: ", product.item)
      addProducts()
      // setSearch(() => "")
      // setNoOfProducts(() => "")
      clearStates([setSearch, setNoOfProducts], () => "")
      setDiscount(() => "0")
      setVisible(!visible)
      setFilteredItems(() => [])
    } else {
      ToastAndroid.showWithGravityAndOffset(
        "Try adding some items.",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
        25,
        50,
      )
    }
  }

  const addProducts = () => {
    addedProductsList.push(product)
    product["quantity"] = parseInt(noOfProducts)
    product["discount"] = parseInt(discount)
    setAddedProductsList([...addedProductsList])
    console.log(
      "==========UPDATED ADDED PRODUCTS LIST==========",
      addedProductsList,
    )
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* <Appbar.Header
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
      </Appbar.Header> */}
      <DialogBox
        iconSize={40}
        visible={visible}
        hide={hideDialog}
        titleStyle={styles.title}
        btnSuccess="ADD"
        onFailure={onDialogFailure}
        onSuccess={onDialogSuccecss}>
        <View style={{ justifyContent: "space-between", height: 150 }}>
          <View style={{ alignItems: "center" }}>
            <View>
              <Text variant="titleLarge">{product.item}</Text>
            </View>
          </View>

          <View
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              marginLeft: 10,
              marginRight: 10,
            }}>
            <View>
              <Text variant="labelMedium">Product ID:</Text>
            </View>
            <View>
              <Text variant="labelMedium">{product.id}</Text>
            </View>
          </View>

          <View
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              marginLeft: 10,
              marginRight: 10,
            }}>
            <View>
              <Text variant="labelMedium">Unit Price:</Text>
            </View>
            <View>
              <Text variant="labelMedium">₹{product.unit_price}</Text>
            </View>
          </View>

          <View></View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 5,
            }}>
            <View style={{ width: "50%" }}>
              <InputPaper
                label="Quantity"
                onChangeText={(txt: string) => setNoOfProducts(txt)}
                value={noOfProducts}
                keyboardType="numeric"
                autoFocus={true}
                mode="outlined"
              />
            </View>
            <View style={{ width: "50%" }}>
              <InputPaper
                label="Discount"
                onChangeText={(txt: string) => setDiscount(txt)}
                value={discount}
                keyboardType="numeric"
                mode="outlined"
              />
            </View>
          </View>
        </View>
      </DialogBox>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={{ alignItems: "center" }}>
          <HeaderImage
            imgLight={productHeader}
            imgDark={productHeaderDark}
            borderRadius={30}
            blur={10}
            isBackEnabled
            navigation={navigation}>
            My Products
          </HeaderImage>
        </View>

        <View style={{ padding: normalize(20) }}>
          <Searchbar
            placeholder="Search Products"
            onChangeText={onChangeSearch}
            value={search}
            elevation={search && 2}
            // loading={search ? true : false}
            autoFocus
          />
        </View>

        <View style={{ paddingBottom: PixelRatio.roundToNearestPixel(10) }}>
          {search && (
            <ScrollableListContainer
              backgroundColor={theme.colors.surfaceVariant}>
              {filteredItems.map(item => (
                <ProductListSuggestion
                  key={item.id}
                  itemName={item.item}
                  onPress={() => productDetails(item)}
                  unitPrice={item.unit_price}
                />
              ))}
            </ScrollableListContainer>
          )}

          {addedProductsList.length > 0 && !search && (
            <ScrollableListContainer
              backgroundColor={theme.colors.pinkContainer}>
              {addedProductsList.map(item => {
                netTotal += item.unit_price * item["quantity"]
                totalDiscount += parseInt(item["discount"])
                return (
                  <AddedProductList
                    key={item.id}
                    itemName={item.item}
                    quantity={item["quantity"]}
                    unitPrice={item.unit_price}
                    discount={item["discount"]}
                    unit={item.unit}
                  />
                )
              })}
            </ScrollableListContainer>
          )}

          {netTotal > 0 && (
            <NetTotalButton
              backgroundColor={theme.colors.greenContainer}
              textColor={theme.colors.onGreenContainer}
              netTotal={netTotal}
              totalDiscount={totalDiscount}
              onPress={() =>
                ToastAndroid.showWithGravityAndOffset(
                  "Printing feature will be added in some days.",
                  ToastAndroid.SHORT,
                  ToastAndroid.CENTER,
                  25,
                  50,
                )
              }
            />
          )}
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
