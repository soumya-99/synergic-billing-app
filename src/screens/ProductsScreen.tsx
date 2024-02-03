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
import { useContext, useEffect, useState } from "react"
import DialogBox from "../components/DialogBox"
import { CommonActions, useIsFocused, useNavigation } from "@react-navigation/native"
import InputPaper from "../components/InputPaper"
import normalize from "react-native-normalize"
import ProductListSuggestion from "../components/ProductListSuggestion"
import AddedProductList from "../components/AddedProductList"
import ScrollableListContainer from "../components/ScrollableListContainer"
import NetTotalButton from "../components/NetTotalButton"
import { clearStates } from "../utils/clearStates"
import { loginStorage } from "../storage/appStorage"
import { ItemsData } from "../models/api_types"
import useItems from "../hooks/api/useItems"
import ButtonPaper from "../components/ButtonPaper"
import navigationRoutes from "../routes/navigationRoutes"
import { AppStore } from "../context/AppContext"

function ProductsScreen() {
  const navigation = useNavigation()
  const isFocused = useIsFocused()

  const theme = usePaperColorScheme()

  const { receiptSettings } = useContext(AppStore)

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
  const [discountState, setDiscountState] = useState<number>(() => 0)

  const [addedProductsList, setAddedProductsList] = useState<
    ItemsData[]
  >(() => [])

  // const [netTotal, setNetTotal] = useState<number>(() => 0)

  let totalPrice = 0
  let totalDiscountedAmount = 0
  let netTotal = 0


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
    if (noOfProducts.trim() !== "" && !/^0+$/.test(noOfProducts)) {
      console.log("OK PRODUCT: ", product?.item_name)
      addProducts()

      discountState > 0 ? setDiscountState(() => discountState) : setDiscountState(() => product?.discount)

      clearStates([setSearch, setNoOfProducts], () => "")
      setDiscountState(() => 0)
      setVisible(!visible)
      setFilteredItems(() => [])
    } else {
      ToastAndroid.show(
        "Try adding some items.",
        ToastAndroid.SHORT,
      )
    }
  }

  const addProducts = () => {
    addedProductsList.push(product)
    product["quantity"] = parseInt(noOfProducts)
    if (discountState > 0)
      product["discount"] = discountState!
    setAddedProductsList([...addedProductsList])
    console.log(
      "==========UPDATED ADDED PRODUCTS LIST==========",
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
                label={receiptSettings?.discount_type === "A" ? "Discount" : "Discount (%)"}
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
                totalPrice += item?.price * item["quantity"]

                receiptSettings?.discount_type === "A"
                  ? totalDiscountedAmount += item["discount"]
                  : totalDiscountedAmount += (item?.price * item["quantity"] * item["discount"] / 100)

                console.log("totalDiscount", totalDiscountedAmount)
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

          {totalPrice > 0 && (
            <>
              <NetTotalButton
                disabled
                backgroundColor={theme.colors.greenContainer}
                textColor={theme.colors.onGreenContainer}
                // addedProductsList={addedProductsList}
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
              <View style={{ padding: normalize(20) }}>
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
})
