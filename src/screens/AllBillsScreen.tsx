import { useContext, useState } from "react"
import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  View,
  PixelRatio,
} from "react-native"
import {
  Divider,
  IconButton,
  List,
  Searchbar,
  Surface,
  Text,
  withTheme,
} from "react-native-paper"
import ButtonPaper from "../components/ButtonPaper"
import { AppStore } from "../context/AppContext"
import HeaderImage from "../components/HeaderImage"
import { textureBill, textureBillDark } from "../resources/images"
import { usePaperColorScheme } from "../theme/theme"
import { useNavigation } from "@react-navigation/native"
import DialogBox from "../components/DialogBox"

function AllBillsScreen() {
  const theme = usePaperColorScheme()
  const navigation = useNavigation()

  const [search, setSearch] = useState<string>(() => "")
  const onChangeSearch = (query: string) => {
    setSearch(query)
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <IconButton
            icon="arrow-left"
            iconColor={theme.colors.onBackground}
            size={20}
            onPress={() => navigation.goBack()}
            style={{ position: "absolute", top: 20, left: "10%", zIndex: 10 }}
          />
        </View>
        <View style={{ alignItems: "center" }}>
          <HeaderImage
            imgLight={textureBill}
            imgDark={textureBillDark}
            borderRadius={30}
            blur={10}>
            Your Bills
          </HeaderImage>
        </View>

        <View style={{ padding: 20 }}>
          <Searchbar
            placeholder="Search Bills"
            onChangeText={onChangeSearch}
            value={search}
            elevation={search && 2}
            // loading={search ? true : false}
          />
        </View>

        <View style={{ width: "100%" }}>
          {[...new Array(20).keys()].map((_, i) => (
            <List.Item
              key={i}
              title={`Bill ${i + 1}`}
              description={"Cadbury, Oil, Daal..."}
              onPress={() => console.log(`Bill ${i + 1} clicked.`)}
              left={props => <List.Icon {...props} icon="basket" />}
              // right={props => (
              //   <List.Icon {...props} icon="download" />
              // )}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default AllBillsScreen

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },

  title: {
    textAlign: "center",
  },
})
