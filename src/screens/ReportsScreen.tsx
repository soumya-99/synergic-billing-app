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
  MD3Colors,
  Searchbar,
  Surface,
  Text,
  TouchableRipple,
  withTheme,
  IconButton,
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
import ReportButton from "../components/ReportButton"
import ReportButtonsWrapper from "../components/ReportButtonsWrapper"

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
            My Reports
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
        <ReportButtonsWrapper>
          <ReportButton
            text="Bill Wise"
            color={theme.colors.greenContainer}
            icon="billboard"
          />
          <ReportButton
            text="Item Wise"
            color={theme.colors.orangeContainer}
            icon="billboard"
          />
          <ReportButton
            text="Operaotr Wise"
            color={theme.colors.tertiaryContainer}
            icon="billboard"
          />
          <ReportButton
            text="Duplicate Receipt"
            color={theme.colors.primaryContainer}
            icon="billboard"
          />
          <ReportButton
            text="Month Wise"
            color={theme.colors.pinkContainer}
            icon="billboard"
          />
          <ReportButton
            text="Year Wise"
            color={theme.colors.orangeContainer}
            icon="billboard"
          />
          <ReportButton
            text="Day Wise"
            color={theme.colors.pinkContainer}
            icon="billboard"
          />
          <ReportButton
            text="GST Report"
            color={theme.colors.primaryContainer}
            icon="billboard"
          />
        </ReportButtonsWrapper>
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
