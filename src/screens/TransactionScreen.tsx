import { useState } from "react"
import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
  ImageBackground,
  useColorScheme,
  View,
  PixelRatio,
} from "react-native"
import { Divider, List, Searchbar, Surface, Text } from "react-native-paper"

import TRANS_DATA from "../data/transaction_dummy_data.json"

export default function TransactionScreen() {
  const colorScheme = useColorScheme()

  const [search, setSearch] = useState<string>(() => "")
  const onChangeSearch = (query: string) => setSearch(query)

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <ImageBackground
          imageStyle={{ borderRadius: 30 }}
          blurRadius={10}
          source={
            colorScheme !== "dark"
              ? require("../resources/images/blurredblue.jpg")
              : require("../resources/images/blurredblue-dark.jpg")
          }
          style={styles.surface}>
          <Text
            variant="displaySmall"
            style={{ fontFamily: "ProductSans-Medium", textAlign: "center" }}>
            Your Transactions
          </Text>
        </ImageBackground>

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
          {
            TRANS_DATA.map(item => (
              <>
              <List.Item
                key={item.id}
                title={item.item}
                description={item.description}
                onPress={() => console.log(item.item)}
                left={props => <List.Icon {...props} icon="clipboard-text-clock" />}
              />
              <Divider />
              </>
            ))
          }
        </View>
        {[...new Array(50).keys()].map((_, i) => (
          <Text key={i}>{i + 1}</Text>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },

  title: {
    textAlign: "center",
  },

  surface: {
    margin: 20,
    height: PixelRatio.roundToNearestPixel(200),
    borderRadius: 30,
    width: PixelRatio.roundToNearestPixel(320),
    alignItems: "center",
    justifyContent: "center",
  },
})
