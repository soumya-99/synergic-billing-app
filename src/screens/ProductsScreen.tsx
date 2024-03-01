import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  View,
  PixelRatio,
  ToastAndroid,
} from "react-native"
import { Searchbar, Text } from "react-native-paper"
import HeaderImage from "../components/HeaderImage"
import { productHeader, productHeaderDark } from "../resources/images"
import { usePaperColorScheme } from "../theme/theme"
import { useContext, useEffect, useRef, useState } from "react"
import DialogBox from "../components/DialogBox"
import { CommonActions, useIsFocused, useNavigation } from "@react-navigation/native"
import InputPaper from "../components/InputPaper"
import normalize, { SCREEN_HEIGHT, SCREEN_WIDTH } from "react-native-normalize"
import ProductListSuggestion from "../components/ProductListSuggestion"
import AddedProductList from "../components/AddedProductList"
import ScrollableListContainer from "../components/ScrollableListContainer"
import NetTotalButton from "../components/NetTotalButton"
import { clearStates } from "../utils/clearStates"
import { ItemsData } from "../models/api_types"
import ButtonPaper from "../components/ButtonPaper"
import navigationRoutes from "../routes/navigationRoutes"
import { AppStore } from "../context/AppContext"

function ProductsScreen() {
  const navigation = useNavigation()
  const isFocused = useIsFocused()

  const theme = usePaperColorScheme()

  const { receiptSettings, items, handleGetItems } = useContext(AppStore)

  const searchProductRef = useRef(null)

  const [visible, setVisible] = useState(() => false)
  const hideDialog = () => setVisible(() => false)
  const [editState, setEditState] = useState<boolean>(() => false)

  const [search, setSearch] = useState<string>(() => "")
  const [filteredItems, setFilteredItems] = useState<ItemsData[]>(
    () => [],
  )

  const [product, setProduct] = useState<ItemsData>()

  const [quantity, setQuantity] = useState<number>()
  const [discountState, setDiscountState] = useState<number>(() => 0)
  const [price, setPrice] = useState<number>(() => product?.price)

  const [addedProductsList, setAddedProductsList] = useState<
    ItemsData[]
  >(() => [])

  let totalPrice = 0
  let totalDiscountedAmount = 0

  useEffect(() => {
    handleGetItems()
  }, [isFocused])

  const onChangeSearch = (query: string) => {
    setSearch(query)

    const filtered = items.filter((item: ItemsData) => item?.item_name?.includes(query))
    setFilteredItems(filtered)
    if (query === "") setFilteredItems(() => [])
  }

  const productDetails = (item: ItemsData) => {
    setProduct(item)

    setDiscountState(item?.discount)
    setPrice(item?.price)
    setVisible(!visible)
  }

  const productEditAndDelete = (item: ItemsData) => {
    setEditState(true)

    setProduct(item)
    setQuantity(item?.quantity)
    setDiscountState(item?.discount)
    setPrice(item?.price)
    setVisible(!visible)
  }

  const handleOnDelete = (product: ItemsData) => {
    setAddedProductsList(prevData => prevData?.filter((item, index) => item.id !== product.id))

    setVisible(!visible)
    setEditState(false)
  }

  const onDialogFailure = () => {
    setEditState(false)
    setSearch(() => "")
    setQuantity(() => undefined)
    setVisible(!visible)
  }

  const onDialogSuccecss = () => {
    let isFoundDuplicate = false
    setEditState(false)

    console.log("OK PRODUCT: ", product?.item_name)

    for (let item of addedProductsList) {
      if (item?.id === product?.id) {
        ToastAndroid.show("Item already exists. Please edit from the list.", ToastAndroid.LONG)
        isFoundDuplicate = true
        break
      }
    }

    if (!isFoundDuplicate) {
      addProducts()

      discountState > 0 ? setDiscountState(() => discountState) : setDiscountState(() => product?.discount)
      price > 0 ? setPrice(() => price) : setPrice(() => product?.price)

      clearStates([setSearch], () => "")
      setQuantity(() => undefined)
      clearStates([setPrice, setDiscountState], () => 0)
      setVisible(!visible)
      setFilteredItems(() => [])
    }
    console.log("asiurweagsaygeutseygfsdytfgsydtfse", quantity)

    if (searchProductRef.current) {
      searchProductRef.current.focus()
    }
  }

  const onDialogSuccessChange = () => {
    if (quantity <= 0 || typeof quantity === "undefined" || quantity.toString() === "NaN") {
      ToastAndroid.show("Try adding some items.", ToastAndroid.SHORT)
      return
    }

    if (receiptSettings?.discount_type === "P") {
      if (discountState > 100) {
        ToastAndroid.show("Discount cannot be greater than 100%.", ToastAndroid.SHORT)
        return
      }
    } else if (product.price * quantity < discountState) {
      ToastAndroid.show("Give valid Discount Amount.", ToastAndroid.SHORT)
      return
    }

    onDialogSuccecss()
  }

  const onDialogUpdate = (product: ItemsData) => {
    setEditState(false)
    console.log("OK PRODUCT UPDATE: ", product?.item_name)

    let filteredSingleProductArray = addedProductsList?.filter((item, index) => (
      item?.id === product?.id
    ))

    filteredSingleProductArray[0]["quantity"] = quantity
    filteredSingleProductArray[0]["discount"] = discountState
    filteredSingleProductArray[0]["price"] = price

    discountState > 0 ? setDiscountState(() => discountState) : setDiscountState(() => product?.discount)
    price > 0 ? setPrice(() => price) : setPrice(() => product?.price)

    setProduct(filteredSingleProductArray[0])

    clearStates([setSearch], () => "")
    setQuantity(() => undefined)
    clearStates([setPrice, setDiscountState], () => 0)
    setVisible(!visible)
    setFilteredItems(() => [])
  }

  const onDialogUpdateChange = (product: ItemsData) => {
    if (quantity <= 0 || typeof quantity === "undefined" || quantity.toString() === "NaN") {
      ToastAndroid.show("Try adding some items.", ToastAndroid.SHORT)
      return
    }

    if (price <= 0 || typeof price === "undefined" || price.toString() === "NaN") {
      ToastAndroid.show("Try adding valid price.", ToastAndroid.SHORT)
      return
    }

    if (receiptSettings?.discount_type === "P" && discountState > 100) {
      ToastAndroid.show("Discount cannot be greater than 100%.", ToastAndroid.SHORT);
      return
    }

    if (receiptSettings?.discount_type === "P" || product.price * quantity >= discountState) {
      onDialogUpdate(product)
      return
    }

    ToastAndroid.show("Give valid Discount Amount.", ToastAndroid.SHORT)
  }

  const addProducts = () => {
    // addedProductsList.push(product)
    addedProductsList.unshift(product)
    product["quantity"] = quantity
    if (discountState > 0)
      product["discount"] = discountState
    if (price > 0)
      product["price"] = price
    setAddedProductsList([...addedProductsList])
    console.log(
      "==========ADDED PRODUCTS LIST==========",
      addedProductsList,
    )
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <DialogBox
        iconSize={40}
        visible={visible}
        hide={hideDialog}
        titleStyle={styles.title}
        btnSuccess={!editState ? "ADD" : "UPDATE"}
        onFailure={onDialogFailure}
        onSuccess={!editState ? onDialogSuccessChange : () => onDialogUpdateChange(product)}>
        <View style={styles.modalContainer}>
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
              marginHorizontal: SCREEN_WIDTH / 10
            }}>
            <View>
              <Text variant="labelMedium">PRODUCT ID:</Text>
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
              marginHorizontal: SCREEN_WIDTH / 10
            }}>
            {receiptSettings?.price_type === "A" ? (
              <>
                <View>
                  <Text variant="labelMedium">UNIT PRICE:</Text>
                </View>
                <View>
                  <Text variant="labelMedium">₹{product?.price}</Text>
                </View>
              </>
            ) : (
              <View style={{ width: "100%" }}>
                <InputPaper
                  label="Unit Price"
                  onChangeText={(txt: number) => setPrice(txt)}
                  value={price}
                  keyboardType="numeric"
                  autoFocus={true}
                  mode="outlined"
                />
              </View>
            )}
          </View>

          {/* <View></View> */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 5,
            }}>
            <View style={receiptSettings?.discount_flag === "Y" ? { width: "50%" } : { width: "100%" }}>
              <InputPaper
                label="Quantity"
                onChangeText={(txt: number) => setQuantity(txt)}
                value={quantity}
                keyboardType="numeric"
                autoFocus={true}
                mode="outlined"
              />
            </View>
            {receiptSettings?.discount_flag === "Y" && (
              <View style={{ width: "50%" }}>
                <InputPaper
                  label={receiptSettings?.discount_type === "A" ? "Discount (₹)" : "Discount (%)"}
                  onChangeText={(dis: number) => setDiscountState(dis)}
                  value={discountState}
                  keyboardType="numeric"
                  mode="outlined"
                />
              </View>
            )}
          </View>
          {editState && <View>
            <ButtonPaper mode="text" textColor={theme.colors.purple} icon="trash-can-outline" onPress={() => handleOnDelete(product)}>
              DELETE ITEM
            </ButtonPaper>
          </View>}
        </View>
      </DialogBox>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={{ alignItems: "center" }}>
          <HeaderImage
            imgLight={productHeader}
            imgDark={productHeaderDark}
            borderRadius={30}
            blur={10}
            isBackEnabled>
            My Products
          </HeaderImage>
        </View>

        <View style={{ padding: normalize(20) }}>
          <Searchbar
            ref={searchProductRef}
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
                totalPrice += item?.price * item["quantity"]

                receiptSettings?.discount_type === "A"
                  //@ts-ignore
                  ? totalDiscountedAmount += parseFloat(item["discount"])
                  : totalDiscountedAmount += parseFloat((item?.price * item["quantity"] * item["discount"] / 100).toFixed(2))
                console.log("totalDiscount", totalDiscountedAmount)

                return (
                  <AddedProductList
                    key={item?.id}
                    itemName={item?.item_name}
                    quantity={item["quantity"]}
                    unitPrice={item["price"]}
                    discount={item["discount"]}
                    onPress={() => productEditAndDelete(item)}
                  />
                )
              })}
            </ScrollableListContainer>
          )}

          {totalPrice > 0 && (
            <>
              <NetTotalButton
                disabled
                backgroundColor={theme.colors.greenContainer}
                textColor={theme.colors.onGreenContainer}
                addedProductsList={addedProductsList}
                netTotal={totalPrice}
                totalDiscount={totalDiscountedAmount}
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
              <View style={{ padding: normalize(15), width: SCREEN_WIDTH / 1.16, alignSelf: "center", justifyContent: "center", }}>
                <ButtonPaper mode="text" textColor={theme.colors.purple} onPress={() => navigation.dispatch(
                  CommonActions.navigate({
                    name: navigationRoutes.customerDetailsFillScreen,
                    params: {
                      added_products: addedProductsList,
                      net_total: totalPrice,
                      total_discount: totalDiscountedAmount
                    }
                  })
                )}>
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
  modalContainer: {
    justifyContent: "space-between",
    minHeight: SCREEN_HEIGHT / 3.5,
    height: "auto"
  }
})
