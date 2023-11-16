import { StyleSheet, ScrollView, SafeAreaView, View } from "react-native"
import {
  Appbar,
  Badge,
  Divider,
  List,
  Searchbar,
  Text,
} from "react-native-paper"
import HeaderImage from "../components/HeaderImage"
import { productHeader, productHeaderDark } from "../resources/images"
import { usePaperColorScheme } from "../theme/theme"
import { useState } from "react"
import PRODUCTS_DATA from "../data/products_dummy_data.json"
import DialogBox from "../components/DialogBox"
import { useNavigation } from "@react-navigation/native"
import InputPaper from "../components/InputPaper"
import ListSuggestion from "../components/ListSuggestion"

type ProductsDataObject = {
  id: number
  item: string
  description: string
  quantity: number
  unit_price: number
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
  // const [description, setDescription] = useState<string>()
  const [quantity, setQuantity] = useState<number>()

  const [product, setProduct] = useState<ProductsDataObject>()
  const [addedProductsList, setAddedProductsList] = useState<ProductsDataObject[]>(() => [])

  const productDetails = (item: ProductsDataObject) => {
    // setProductId(item.id)
    // setItemName(item.item)
    // // setDescription(item.description)
    // setQuantity(item.quantity)
    setProduct(item)
    setVisible(!visible)
  }

  const onDialogFailure = () => {
    setVisible(!visible)
  }

  const onDialogSuccecss = () => {
    console.log("OK PRODUCT: ", itemName)
    setVisible(!visible)
    setSearch(() => "")
    setFilteredItems(() => [])
  }

  const addingProducts = (item: ProductsDataObject) => {

  }

  // const [value, setValue] = useState<string>(() => "")
  const [noOfProducts, setNoOfProducts] = useState<string>(() => "")
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
        iconSize={40}
        visible={visible}
        hide={hideDialog}
        titleStyle={styles.title}
        onFailure={onDialogFailure}
        onSuccess={onDialogSuccecss}>
        <View style={{ justifyContent: "space-between", height: 130 }}>
          <View
            style={{
              justifyContent: "space-evenly",
              alignItems: "center",
              flexDirection: "row",
            }}>
            <View>
              <Text variant="labelMedium">Product ID:</Text>
            </View>
            <View>
              <Text variant="labelMedium">{product.id}</Text>
            </View>
          </View>

          <View style={{ alignItems: "center" }}>
            <View>
              <Text variant="titleLarge">{product.item}</Text>
            </View>
          </View>

          <View style={{ alignItems: "center" }}>
          <View>
              <Text variant="labelMedium">Unit Price:</Text>
            </View>
            <View>
              <Text variant="labelMedium">{product.unit_price}</Text>
            </View>
          </View>

          <View>
            <InputPaper
              label="Number of Products"
              onChangeText={(txt: string) => setNoOfProducts(txt)}
              value={noOfProducts}
              keyboardType="numeric"
              autoFocus={true}
            />
          </View>
        </View>
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

        <View style={{paddingBottom: 80, zIndex: 10}}>
          {filteredItems.map(item => (
            // <ScrollView key={item.id}>
            //   <List.Item
            //     title={item.item}
            //     description={item.description}
            //     onPress={() => productDetails(item)}
            //     left={props => <List.Icon {...props} icon="basket" />}
            //     right={props => (
            //       <Badge
            //         {...props}
            //         style={{
            //           backgroundColor: theme.colors.tertiaryContainer,
            //           color: theme.colors.onTertiaryContainer,
            //         }}>
            //         {`${item.unit_price}/-`}
            //       </Badge>
            //     )}
            //   />
            //   <Divider />
            // </ScrollView>
            
              <ListSuggestion key={item.id} id={item.id} itemName={item.item} onPress={() => productDetails(item)} unitPrice={item.unit_price} />
          ))}
          </View>
          <View>

          </View>
        </ScrollView>
      {/* </ScrollView> */}
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
