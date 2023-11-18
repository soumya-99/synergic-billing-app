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
  TouchableRipple,
  withTheme,
} from "react-native-paper"

import TRANS_DATA from "../data/transaction_dummy_data.json"
import HeaderImage from "../components/HeaderImage"
import {
  blurReport,
  blurReportDark,
  blurredBlue,
  blurredBlueDark,
} from "../resources/images"
import { usePaperColorScheme } from "../theme/theme"

type TransactionDataObject = {
  id: number
  item: string
  description: string
}

function ReportsScreen() {
  const theme = usePaperColorScheme()
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
        <View style={{ alignItems: "center" }}>
          <HeaderImage
            imgLight={blurReport}
            imgDark={blurReportDark}
            borderRadius={30}
            blur={10}>
            Your Reports
          </HeaderImage>
        </View>

        {/* <View style={{ padding: 20 }}>
          <Searchbar
            placeholder="Search Transactions"
            onChangeText={onChangeSearch}
            value={search}
            elevation={search && 2}
            // loading={search && true}
          />
        </View> */}
        <View style={{ padding: 20 }}>
          {/* {filteredItems.map(item => (
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
          ))} */}
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 20,
            }}>
            <TouchableRipple
              onPress={() => console.log("pressed rept")}
              style={{
                width: 100,
                height: 100,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 20,
                backgroundColor: theme.colors.greenContainer,
              }}>
              <Text>Report 1</Text>
            </TouchableRipple>
            <TouchableRipple
              onPress={() => console.log("pressed rept")}
              style={{
                width: 100,
                height: 100,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 20,
                backgroundColor: theme.colors.orangeContainer,
              }}>
              <Text>Report 2</Text>
            </TouchableRipple>
            <TouchableRipple
              rippleColor="rgba(255, 0, 0, .32)"
              onPress={() => console.log("pressed rept")}
              style={{
                width: 100,
                height: 100,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 20,
                backgroundColor: theme.colors.tertiaryContainer,
              }}>
              <Text>Report 3</Text>
            </TouchableRipple>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 20,
            }}>
            <TouchableRipple
              onPress={() => console.log("pressed rept")}
              style={{
                width: 100,
                height: 100,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 20,
                backgroundColor: theme.colors.primaryContainer,
              }}>
              <Text>Report 4</Text>
            </TouchableRipple>
            <TouchableRipple
              onPress={() => console.log("pressed rept")}
              style={{
                width: 100,
                height: 100,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 20,
                backgroundColor: theme.colors.pinkContainer,
              }}>
              <Text>Report 5</Text>
            </TouchableRipple>
            <TouchableRipple
              onPress={() => console.log("pressed rept")}
              style={{
                width: 100,
                height: 100,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 20,
                backgroundColor: theme.colors.secondaryContainer,
              }}>
              <Text>Report 6</Text>
            </TouchableRipple>
          </View>
        </View>
        {/* {[...new Array(50).keys()].map((_, i) => (
          <Text key={i}>{i + 1}</Text>
        ))} */}
      </ScrollView>
    </SafeAreaView>
  )
}

export default ReportsScreen

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },

  title: {
    textAlign: "center",
  },
})
