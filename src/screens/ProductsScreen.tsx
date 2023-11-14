import { StyleSheet, ScrollView, SafeAreaView, View } from "react-native"
import {
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

type ProductsDataObject = {
  id: number
  item: string
  description: string
  quantity: number
}

function ProductsScreen() {
  const theme = usePaperColorScheme()

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
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}>
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
            // loading={search && true}
          />
        </View>

        <View>
          {filteredItems.map(item => (
            <View key={item.id}>
              <List.Item
                title={item.item}
                description={item.description}
                onPress={() => console.log(item.item)}
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
