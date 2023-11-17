import { useState } from "react"
import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  useColorScheme,
  View,
  PixelRatio,
} from "react-native"
import {
  Divider,
  List,
  Searchbar,
  Surface,
  Text,
  withTheme,
} from "react-native-paper"

import TRANS_DATA from "../data/transaction_dummy_data.json"
import HeaderImage from "../components/HeaderImage"
import { blurredBlue, blurredBlueDark } from "../resources/images"

type TransactionDataObject = {
  id: number
  item: string
  description: string
}

function TransactionScreen() {
  const [search, setSearch] = useState<string>(() => "")
  const [filteredItems, setFilteredItems] = useState<TransactionDataObject[]>(
    () => [],
  )
  const onChangeSearch = (query: string) => {
    setSearch(query)

    const filtered = TRANS_DATA.filter(item => item.item.includes(query))
    setFilteredItems(filtered)
    if (query === "") setFilteredItems(() => [])
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={{alignItems: "center"}}>
        <HeaderImage
          imgLight={blurredBlue}
          imgDark={blurredBlueDark}
          borderRadius={30}
          blur={10}>
          Your Transactions
        </HeaderImage>
        </View>

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
                left={props => (
                  <List.Icon {...props} icon="clipboard-text-clock" />
                )}
              />
              <Divider />
            </View>
          ))}
        </View>
        {/* {[...new Array(50).keys()].map((_, i) => (
          <Text key={i}>{i + 1}</Text>
        ))} */}
      </ScrollView>
    </SafeAreaView>
  )
}

export default TransactionScreen

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },

  title: {
    textAlign: "center",
  },
})
