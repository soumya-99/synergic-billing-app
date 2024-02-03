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
import { useContext, useEffect, useState } from "react"
import PRODUCTS_DATA from "../data/products_dummy_data.json"
import DialogBox from "../components/DialogBox"
import { useIsFocused, useNavigation } from "@react-navigation/native"
import InputPaper from "../components/InputPaper"
import normalize from "react-native-normalize"
import ProductListSuggestion from "../components/ProductListSuggestion"
import AddedProductList from "../components/AddedProductList"
import ScrollableListContainer from "../components/ScrollableListContainer"
import NetTotalButton from "../components/NetTotalButton"
import { clearStates } from "../utils/clearStates"
import { useBluetoothPrint } from "../hooks/printables/useBluetoothPrint"
import { loginStorage } from "../storage/appStorage"
import { ItemsData } from "../models/api_types"
import useItems from "../hooks/api/useItems"
import ButtonPaper from "../components/ButtonPaper"

function ProductsScreen() {
  const navigation = useNavigation()
  const isFocused = useIsFocused()

  const theme = usePaperColorScheme()
  const { printReceipt, printReceiptWithoutGst } = useBluetoothPrint()

  const [visible, setVisible] = useState(() => false)
  const hideDialog = () => setVisible(() => false)

  const [search, setSearch] = useState<string>(() => "")
  const [filteredItems, setFilteredItems] = useState<ItemsData[]>(
    () => [],
  )

  const { fetchItems } = useItems()

  const loginStore = JSON.parse(loginStorage.getString("login-data"))

  const [items, setItems] = useState<ItemsData[]>(() => [])
  const [product, setProduct] = useState<ItemsData>()

  const [noOfProducts, setNoOfProducts] = useState<string>(() => "")
  const [discountState, setDiscountState] = useState<number>(() => product?.discount | 0)

  const [addedProductsList, setAddedProductsList] = useState<
    ItemsData[]
  >(() => [])

  // const [netTotal, setNetTotal] = useState<number>(() => 0)

  let netTotal = 0
  let totalDiscount = 0


  const handleGetItems = async () => {
    const companyId = loginStore.comp_id
    let itemsData = await fetchItems(companyId)
    console.log("itemsData", itemsData)

    setItems(itemsData)
  }

  useEffect(() => {
    handleGetItems()
  }, [isFocused])

  const onChangeSearch = (query: string) => {
    setSearch(query)

    const filtered = items.filter(item => item?.item_name?.includes(query))
    setFilteredItems(filtered)
    if (query === "") setFilteredItems(() => [])
  }

  const productDetails = (item: ItemsData) => {
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
      console.log("OK PRODUCT: ", product?.item_name)
      addProducts()
      // setSearch(() => "")
      // setNoOfProducts(() => "")
      clearStates([setSearch, setNoOfProducts], () => "")

      discountState !== 0 ? setDiscountState(() => product?.discount) : setDiscountState(() => discountState)


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

  // const onDialogPrintFailure = () => {
  //   setVisible(!visible)
  // }
  // const onDialogPrintSuccecss = () => {
  //   setVisible(!visible)
  // }

  const addProducts = () => {
    addedProductsList.push(product)
    product["quantity"] = parseInt(noOfProducts)
    // product["discount"] = discountState
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
              <Text variant="titleLarge">{product?.item_name}</Text>
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
              <Text variant="labelMedium">{product?.id}</Text>
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
              <Text variant="labelMedium">₹{product?.price}</Text>
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
                onChangeText={(discount: number) => setDiscountState(discount)}
                value={discountState}
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
                  key={item?.id}
                  itemName={item?.item_name}
                  onPress={() => productDetails(item)}
                  unitPrice={item?.price}
                />
              ))}
            </ScrollableListContainer>
          )}

          {addedProductsList.length > 0 && !search && (
            <ScrollableListContainer
              backgroundColor={theme.colors.pinkContainer}>
              {addedProductsList.map(item => {
                netTotal += item?.price * item["quantity"]
                totalDiscount += item["discount"]
                return (
                  <AddedProductList
                    key={item?.id}
                    itemName={item?.item_name}
                    quantity={item["quantity"]}
                    unitPrice={item?.price}
                    discount={item["discount"]}
                  // unit={item.unit}
                  />
                )
              })}
            </ScrollableListContainer>
          )}

          {netTotal > 0 && (
            <>
              <NetTotalButton
                disabled
                backgroundColor={theme.colors.greenContainer}
                textColor={theme.colors.onGreenContainer}
                netTotal={netTotal}
                totalDiscount={totalDiscount}
                onPress={async () =>
                  // ToastAndroid.showWithGravityAndOffset(
                  //   "Printing feature will be added in some days.",
                  //   ToastAndroid.SHORT,
                  //   ToastAndroid.CENTER,
                  //   25,
                  //   50,
                  // )
                  // await printReceipt()
                  await printReceiptWithoutGst()
                }
              />
              <View style={{ padding: normalize(20) }}>
                <ButtonPaper mode="text" textColor={theme.colors.purple} onPress={() => console.log("PRINTING RCPT")}>
                  PRINT RECEIPT
                </ButtonPaper>
              </View>
            </>
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
