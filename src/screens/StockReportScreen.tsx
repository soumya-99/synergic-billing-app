import { StyleSheet, ScrollView, SafeAreaView, View, ToastAndroid } from "react-native"

import HeaderImage from "../components/HeaderImage"
import { blurReport, blurReportDark } from "../resources/images"
import { usePaperColorScheme } from "../theme/theme"
import { DataTable, Searchbar, Text } from "react-native-paper"
import ButtonPaper from "../components/ButtonPaper"
import { useEffect, useState } from "react"
import normalize from "react-native-normalize"
import { loginStorage } from "../storage/appStorage"
import { ItemReport, ItemsData, StockReportCredentials, StockReportResponse } from "../models/api_types"
import SurfacePaper from "../components/SurfacePaper"
import { useBluetoothPrint } from "../hooks/printables/useBluetoothPrint"
import useItemReport from "../hooks/api/useItemReport"
import { useIsFocused } from "@react-navigation/native"
import useItems from "../hooks/api/useItems"
import ScrollableListContainer from "../components/ScrollableListContainer"
import ProductListSuggestion from "../components/ProductListSuggestion"
import useStockReport from "../hooks/api/useStockReport"

function StockReportScreen() {
    const isFocused = useIsFocused()
    const theme = usePaperColorScheme()

    const loginStore = JSON.parse(loginStorage.getString("login-data"))

    const { fetchItems } = useItems()
    const { fetchStockReport } = useStockReport()
    const { printStockReport } = useBluetoothPrint()

    const [search, setSearch] = useState<string>(() => "")
    const [filteredItems, setFilteredItems] = useState<ItemsData[]>(() => [])
    const [items, setItems] = useState<ItemsData[]>(() => [])
    const [productId, setProductId] = useState<number>(() => undefined)
    const [itemName, setItemName] = useState<string>(() => "")

    const [stockReport, setStockReport] = useState<StockReportResponse[]>(() => [])

    const handleGetItems = async () => {
        const companyId = loginStore.comp_id
        let itemsData = await fetchItems(companyId)

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
        setProductId(item?.item_id)
        setItemName(item?.item_name)
        setSearch(() => "")
    }

    const handleGetStockReport = async () => {
        // if (itemName.length === 0) {
        //     ToastAndroid.show("Try searching for a product.", ToastAndroid.SHORT)
        //     return
        // }

        let stockReportCredsObject: StockReportCredentials = {
            br_id: loginStore?.br_id,
            comp_id: loginStore?.comp_id
        }
        await fetchStockReport(stockReportCredsObject).then(res => {
            setStockReport(res)
            console.log("XXXXXXXXXXXXXXXXX", res)
        }).catch(err => {
            ToastAndroid.show("Error fetching stock report.", ToastAndroid.SHORT)
        })
    }

    const handlePrint = (stockReport: StockReportResponse[]) => {
        if (stockReport.length !== 0) {
            printStockReport(stockReport)
        } else {
            ToastAndroid.show("No Report Found!", ToastAndroid.SHORT)
            return
        }
    }

    let totalGrossStock: number = 0
    let totalQty: number = 0

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <ScrollView keyboardShouldPersistTaps="handled">
                <View style={{ alignItems: "center" }}>
                    <HeaderImage
                        isBackEnabled
                        imgLight={blurReport}
                        imgDark={blurReportDark}
                        borderRadius={30}
                        blur={10}>
                        Stock Report
                    </HeaderImage>
                </View>

                {/* <View style={{ paddingHorizontal: normalize(20), paddingBottom: normalize(10) }}>
                    <Searchbar
                        placeholder="Search Products"
                        onChangeText={onChangeSearch}
                        value={search}
                        elevation={search && 2}
                        // loading={search ? true : false}
                        autoFocus
                    />
                </View> */}

                <View style={{ paddingBottom: normalize(10) }}>
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
                </View>

                <View style={{ paddingHorizontal: normalize(20), paddingBottom: normalize(10) }}>
                    <ButtonPaper
                        onPress={handleGetStockReport}
                        mode="contained-tonal"
                        buttonColor={theme.colors.green}
                        textColor={theme.colors.onGreen}>
                        SUBMIT
                    </ButtonPaper>
                </View>


                <SurfacePaper backgroundColor={theme.colors.surface}>
                    <DataTable>

                        <DataTable.Header>
                            <DataTable.Title>Product</DataTable.Title>
                            <DataTable.Title numeric>Stock</DataTable.Title>
                        </DataTable.Header>

                        {stockReport.map((item, i) => {
                            // totalNetAmount += item?.amount
                            totalQty += 1
                            totalGrossStock += item?.stock

                            return (
                                <DataTable.Row key={i}>
                                    <DataTable.Cell>{item?.item_name}</DataTable.Cell>
                                    <DataTable.Cell numeric>{item?.stock}</DataTable.Cell>
                                </DataTable.Row>
                            )
                        })}

                    </DataTable>
                    <View style={{ padding: normalize(10) }}>
                        <Text variant="labelMedium" style={{ color: theme.colors.purple }}>QUANTITY: {totalQty}  TOTAL STOCK: {totalGrossStock}</Text>
                    </View>
                </SurfacePaper>
                <View style={{ paddingHorizontal: normalize(20), paddingBottom: normalize(10) }}>
                    <ButtonPaper icon={"cloud-print-outline"} onPress={() => handlePrint(stockReport)} mode="contained-tonal">
                        PRINT
                    </ButtonPaper>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default StockReportScreen

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    },

    title: {
        textAlign: "center",
    },
})
